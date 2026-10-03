import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, data: null, message: "Not authorized — no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, data: null, message: "Not authorized — user no longer exists" });
    }

    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ success: false, data: null, message: "Not authorized — token is invalid or expired" });
  }
}

export function adminOnly(req, res, next) {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ success: false, data: null, message: "Admin access required" });
}
