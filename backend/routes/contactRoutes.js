import { Router } from "express";

import {
  createContactMessage,
  deleteContactMessage,
  getContactMessages,
  updateContactMessage,
} from "../controllers/contactController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", createContactMessage);
router.get("/", protect, adminOnly, getContactMessages);
router.patch("/:id", protect, adminOnly, updateContactMessage);
router.delete("/:id", protect, adminOnly, deleteContactMessage);

export default router;
