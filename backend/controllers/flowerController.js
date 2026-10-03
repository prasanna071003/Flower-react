import mongoose from "mongoose";

import Flower, { FLOWER_CATEGORIES } from "../models/Flower.js";
import { escapeRegex, isNonEmptyString, validateFlower } from "../utils/validators.js";

const SORT_OPTIONS = {
  featured: { featured: -1, _id: 1 },
  price_asc: { price: 1, _id: 1 },
  price_desc: { price: -1, _id: 1 },
  newest: { createdAt: -1, _id: -1 },
};

export async function getFlowers(req, res) {
  try {
    const { search, category, featured, sort, limit } = req.query;
    const filter = {};

    if (isNonEmptyString(category) && category !== "all") {
      if (!FLOWER_CATEGORIES.includes(category)) {
        return res.status(400).json({ success: false, data: null, message: `Category must be one of: ${FLOWER_CATEGORIES.join(", ")}` });
      }
      filter.category = category;
    }

    if (featured === "true" || featured === "false") {
      filter.featured = featured === "true";
    }

    if (isNonEmptyString(search)) {
      const term = escapeRegex(search.trim());
      filter.$or = [
        { name: { $regex: term, $options: "i" } },
        { meta: { $regex: term, $options: "i" } },
        { description: { $regex: term, $options: "i" } },
      ];
    }

    const sortSpec = SORT_OPTIONS[sort] || SORT_OPTIONS.featured;
    const parsedLimit = Number.parseInt(limit, 10);
    const query = Flower.find(filter).sort(sortSpec);
    if (Number.isInteger(parsedLimit) && parsedLimit > 0) {
      query.limit(Math.min(parsedLimit, 100));
    }

    const flowers = await query.exec();
    return res.status(200).json({
      success: true,
      data: { flowers, count: flowers.length },
      message: "Flowers fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not load flowers. Please try again." });
  }
}

export async function getFlowerById(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, data: null, message: "Flower not found" });
    }
    const flower = await Flower.findById(req.params.id);
    if (!flower) {
      return res.status(404).json({ success: false, data: null, message: "Flower not found" });
    }
    return res.status(200).json({ success: true, data: { flower }, message: "Flower fetched successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not load the flower. Please try again." });
  }
}

export async function createFlower(req, res) {
  try {
    const { name, category, price, image } = req.body || {};
    const errors = validateFlower({ name, category, price, image }, FLOWER_CATEGORIES);
    if (errors.length) {
      return res.status(400).json({ success: false, data: null, message: errors[0] });
    }

    const flower = await Flower.create({
      name: name.trim(),
      category,
      price: Number(price),
      priceFrom: Boolean(req.body.priceFrom),
      compareAtPrice: req.body.compareAtPrice === undefined || req.body.compareAtPrice === null || req.body.compareAtPrice === "" ? null : Number(req.body.compareAtPrice),
      meta: typeof req.body.meta === "string" ? req.body.meta.trim() : "",
      description: typeof req.body.description === "string" ? req.body.description.trim() : "",
      image: image.trim(),
      badge: typeof req.body.badge === "string" ? req.body.badge.trim() : "",
      featured: Boolean(req.body.featured),
      tags: Array.isArray(req.body.tags) ? req.body.tags.filter(isNonEmptyString).map((tag) => tag.trim()) : [],
      details: typeof req.body.details === "string" ? req.body.details.trim() : "",
      care: typeof req.body.care === "string" ? req.body.care.trim() : "",
      delivery: typeof req.body.delivery === "string" ? req.body.delivery.trim() : "",
      reviews: Number.isFinite(Number(req.body.reviews)) ? Number(req.body.reviews) : 0,
    });

    return res.status(201).json({ success: true, data: { flower }, message: "Flower created successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not create the flower. Please try again." });
  }
}

export async function updateFlower(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, data: null, message: "Flower not found" });
    }
    const flower = await Flower.findById(req.params.id);
    if (!flower) {
      return res.status(404).json({ success: false, data: null, message: "Flower not found" });
    }

    const { name, category, price, image } = req.body || {};
    const errors = validateFlower({
      name: name === undefined ? flower.name : name,
      category: category === undefined ? flower.category : category,
      price: price === undefined ? flower.price : price,
      image: image === undefined ? flower.image : image,
    }, FLOWER_CATEGORIES);
    if (errors.length) {
      return res.status(400).json({ success: false, data: null, message: errors[0] });
    }

    if (name !== undefined) flower.name = name.trim();
    if (category !== undefined) flower.category = category;
    if (price !== undefined) flower.price = Number(price);
    if (image !== undefined) flower.image = image.trim();
    if (req.body.priceFrom !== undefined) flower.priceFrom = Boolean(req.body.priceFrom);
    if (req.body.compareAtPrice !== undefined) {
      const compareAt = req.body.compareAtPrice;
      flower.compareAtPrice = compareAt === null || compareAt === "" ? null : Number(compareAt);
    }
    if (req.body.meta !== undefined) flower.meta = String(req.body.meta).trim();
    if (req.body.description !== undefined) flower.description = String(req.body.description).trim();
    if (req.body.badge !== undefined) flower.badge = String(req.body.badge).trim();
    if (req.body.featured !== undefined) flower.featured = Boolean(req.body.featured);
    if (req.body.tags !== undefined) {
      flower.tags = Array.isArray(req.body.tags) ? req.body.tags.filter(isNonEmptyString).map((tag) => tag.trim()) : [];
    }
    if (req.body.details !== undefined) flower.details = String(req.body.details).trim();
    if (req.body.care !== undefined) flower.care = String(req.body.care).trim();
    if (req.body.delivery !== undefined) flower.delivery = String(req.body.delivery).trim();
    if (req.body.reviews !== undefined && Number.isFinite(Number(req.body.reviews))) {
      flower.reviews = Number(req.body.reviews);
    }

    const updated = await flower.save();
    return res.status(200).json({ success: true, data: { flower: updated }, message: "Flower updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not update the flower. Please try again." });
  }
}

export async function deleteFlower(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, data: null, message: "Flower not found" });
    }
    const flower = await Flower.findByIdAndDelete(req.params.id);
    if (!flower) {
      return res.status(404).json({ success: false, data: null, message: "Flower not found" });
    }
    return res.status(200).json({ success: true, data: { flower }, message: "Flower deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not delete the flower. Please try again." });
  }
}
