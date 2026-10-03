import mongoose from "mongoose";

export const FLOWER_CATEGORIES = ["roses", "bouquets", "seasonal", "weddings", "plants"];

const flowerSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Flower name is required"], trim: true },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: { values: FLOWER_CATEGORIES, message: "Category must be one of: roses, bouquets, seasonal, weddings, plants" },
    },
    price: { type: Number, required: [true, "Price is required"], min: [0, "Price cannot be negative"] },
    priceFrom: { type: Boolean, default: false },
    compareAtPrice: { type: Number, min: [0, "Compare-at price cannot be negative"], default: null },
    meta: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    image: { type: String, required: [true, "Image path is required"], trim: true },
    badge: { type: String, trim: true, default: "" },
    featured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    details: { type: String, trim: true, default: "" },
    care: { type: String, trim: true, default: "" },
    delivery: { type: String, trim: true, default: "" },
    reviews: { type: Number, default: 0, min: [0, "Review count cannot be negative"] },
  },
  { timestamps: true }
);

flowerSchema.index({ name: "text", meta: "text", description: "text" });

const Flower = mongoose.model("Flower", flowerSchema);

export default Flower;
