import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import flowerRoutes from "./routes/flowerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { sanitizeRequest } from "./middleware/securityMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.disable("x-powered-by");
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(sanitizeRequest);

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/flowers", flowerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] Noor & Bloom API running on http://localhost:${PORT}`);
  });
};

start();
