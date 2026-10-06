import { createHash, randomBytes } from "node:crypto";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { isNonEmptyString, isValidEmail, validateRegistration } from "../utils/validators.js";
import {
  getSmtpConfig,
  sendPasswordResetEmail,
} from "../utils/sendPasswordResetEmail.js";

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

export async function getCustomers(_req, res) {
  try {
    const users = await User.find({ role: "customer" })
      .select("firstName lastName email phone createdAt")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    return res.status(200).json({
      success: true,
      data: { users, count: users.length },
      message: "Customers retrieved",
    });
  } catch (err) {
    console.error(`[auth] customer list error: ${err.message}`);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Could not load customers. Please try again.",
    });
  }
}

export async function requestPasswordReset(req, res) {
  const { email } = req.body ?? {};
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, data: null, message: "A valid email address is required" });
  }

  try {
    if (!getSmtpConfig()) {
      return res.status(503).json({
        success: false,
        data: null,
        message: "Password reset email is temporarily unavailable. Please contact support or try again later.",
      });
    }
  } catch (err) {
    console.error(`[auth] password reset email configuration error: ${err.message}`);
    return res.status(503).json({
      success: false,
      data: null,
      message: "Password reset email is temporarily unavailable. Please contact support or try again later.",
    });
  }

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select(
      "+passwordResetTokenHash +passwordResetExpires",
    );
    if (!user) {
      return res.status(200).json({
        success: true,
        data: null,
        message: "If an account exists for that email, a reset link will be sent.",
      });
    }

    const token = randomBytes(32).toString("hex");
    user.passwordResetTokenHash = createHash("sha256").update(token).digest("hex");
    user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();

    try {
      await sendPasswordResetEmail(user.email, token);
    } catch (err) {
      user.passwordResetTokenHash = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      console.error(`[auth] password reset email error: ${err.message}`);
      return res.status(503).json({
        success: false,
        data: null,
        message: "Password reset email is temporarily unavailable. Please contact support or try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      data: null,
      message: "If an account exists for that email, a reset link will be sent.",
    });
  } catch (err) {
    console.error(`[auth] password reset request error: ${err.message}`);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Could not request a password reset. Please try again.",
    });
  }
}

export async function resetPassword(req, res) {
  const { token, password } = req.body ?? {};
  if (!isNonEmptyString(token) || !/^[a-fA-F0-9]{64}$/.test(token)) {
    return res.status(400).json({ success: false, data: null, message: "A valid reset link is required" });
  }
  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ success: false, data: null, message: "Password must be at least 6 characters" });
  }

  try {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpires: { $gt: new Date() },
    }).select("+passwordResetTokenHash +passwordResetExpires");

    if (!user) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "This reset link is invalid or has expired. Please request a new one.",
      });
    }

    user.password = password;
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      data: null,
      message: "Password updated. You can now sign in with your new password.",
    });
  } catch (err) {
    console.error(`[auth] password reset error: ${err.message}`);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Could not reset your password. Please try again.",
    });
  }
}
