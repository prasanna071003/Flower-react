import { Router } from "express";
import { getDbState } from "../config/db.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      service: "Noor & Bloom API",
      status: "ok",
      database: getDbState(),
      timestamp: new Date().toISOString(),
    },
    message: "API is running",
  });
});

export default router;
