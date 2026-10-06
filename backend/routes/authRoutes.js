import { Router } from "express";
import { getCustomers, getMe, login, register, requestPasswordReset, resetPassword } from "../controllers/authController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { authRateLimiter } from "../middleware/securityMiddleware.js";

const router = Router();

router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);
router.post("/forgot-password", authRateLimiter, requestPasswordReset);
router.post("/reset-password", authRateLimiter, resetPassword);
router.get("/me", protect, getMe);
router.get("/customers", protect, adminOnly, getCustomers);

export default router;
