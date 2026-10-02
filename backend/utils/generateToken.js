import jwt from "jsonwebtoken";

export default function generateToken(userId, rememberMe = false) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: rememberMe ? "30d" : "1d",
  });
}
