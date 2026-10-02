import { Router } from "express";

import {
  createFlower,
  deleteFlower,
  getFlowerById,
  getFlowers,
  updateFlower,
} from "../controllers/flowerController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getFlowers);
router.get("/:id", getFlowerById);

router.post("/", protect, adminOnly, createFlower);
router.put("/:id", protect, adminOnly, updateFlower);
router.delete("/:id", protect, adminOnly, deleteFlower);

export default router;
