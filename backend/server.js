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

// Allowed frontend URLs
const allowedOrigins = [
  "https://flower-react-three.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
  "http://localhost:5179",
  "http://localhost:5180",
  "http://localhost:5181",

];

app.disable("x-powered-by");

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(sanitizeRequest);

// Routes
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/flowers", flowerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(
      "[server] Noor & Bloom API running on port " + PORT
    );
  });
};

start();
