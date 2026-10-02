import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { isNonEmptyString, isValidEmail, validateRegistration } from "../utils/validators.js";

export async function register(req, res) {
  try {
    const { firstName, lastName, email, phone, password } = req.body ?? {};

    const errors = validateRegistration({ firstName, lastName, email, password });
    if (errors.length) {
      return res.status(400).json({ success: false, data: null, message: errors[0] });
    }

    const normalisedEmail = email.trim().toLowerCase();

    const existing = await User.findOne({ email: normalisedEmail });
    if (existing) {
      return res.status(409).json({ success: false, data: null, message: "An account with this email already exists" });
    }

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalisedEmail,
      phone: isNonEmptyString(phone) ? phone.trim() : "",
      password,
      role: "customer",
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      data: { user, token },
      message: "Account created successfully",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, data: null, message: "An account with this email already exists" });
    }
    console.error(`[auth] register error: ${err.message}`);
    return res.status(500).json({ success: false, data: null, message: "Could not create the account. Please try again." });
  }
}

export async function login(req, res) {
  try {
    const { email, password, rememberMe } = req.body ?? {};

    if (!isValidEmail(email) || !isNonEmptyString(password)) {
      return res.status(400).json({ success: false, data: null, message: "A valid email and password are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, data: null, message: "Invalid email or password" });
    }

    const token = generateToken(user._id, rememberMe === true);

    return res.status(200).json({
      success: true,
      data: { user, token },
      message: "Login successful",
    });
  } catch (err) {
    console.error(`[auth] login error: ${err.message}`);
    return res.status(500).json({ success: false, data: null, message: "Could not sign in. Please try again." });
  }
}

export function getMe(req, res) {
  return res.status(200).json({ success: true, data: { user: req.user }, message: "Current user" });
}
