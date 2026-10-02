import mongoose from "mongoose";

import Flower from "../models/Flower.js";
import Order, { ORDER_STATUSES } from "../models/Order.js";
import { isNonEmptyString, validateOrderItems, validateShippingAddress } from "../utils/validators.js";

// Free city delivery: the storefront never advertises a delivery charge.
const DELIVERY_FEE = 0;

export async function createOrder(req, res) {
  try {
    const { items, shippingAddress, notes } = req.body || {};

    const itemErrors = validateOrderItems(items);
    if (itemErrors.length) {
      return res.status(400).json({ success: false, data: null, message: itemErrors[0] });
    }

    const addressErrors = validateShippingAddress(shippingAddress || {});
    if (addressErrors.length) {
      return res.status(400).json({ success: false, data: null, message: addressErrors[0] });
    }

    const flowerIds = items.map((item) => item.flower);
    const flowers = await Flower.find({ _id: { $in: flowerIds } });
    const flowersById = new Map(flowers.map((flower) => [String(flower._id), flower]));

    // Prices are always recomputed from the database, never trusted from the client.
    const orderItems = [];
    for (const item of items) {
      const flower = flowersById.get(String(item.flower));
      if (!flower) {
        return res.status(400).json({ success: false, data: null, message: "One or more flowers are no longer available" });
      }
      orderItems.push({
        flower: flower._id,
        name: flower.name,
        price: flower.price,
        quantity: Number(item.quantity),
        image: flower.image,
      });
    }

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + DELIVERY_FEE;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        phone: String(shippingAddress.phone).trim(),
        addressLine: shippingAddress.addressLine.trim(),
        city: shippingAddress.city.trim(),
        state: isNonEmptyString(shippingAddress.state) ? shippingAddress.state.trim() : "",
        pincode: String(shippingAddress.pincode).trim(),
      },
      notes: isNonEmptyString(notes) ? String(notes).trim() : "",
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    return res.status(201).json({ success: true, data: { order }, message: "Order placed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not place your order. Please try again." });
  }
}

export async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: { orders, count: orders.length },
      message: "Orders fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not load your orders. Please try again." });
  }
}

export async function getOrderById(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, data: null, message: "Order not found" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, data: null, message: "Order not found" });
    }

    const isOwner = String(order.user) === String(req.user._id);
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ success: false, data: null, message: "You can only view your own orders" });
    }

    return res.status(200).json({ success: true, data: { order }, message: "Order fetched successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not load the order. Please try again." });
  }
}

export async function getOrders(req, res) {
  try {
    const filter = {};
    if (isNonEmptyString(req.query.status)) {
      if (!ORDER_STATUSES.includes(req.query.status)) {
        return res.status(400).json({ success: false, data: null, message: `Order status must be one of: ${ORDER_STATUSES.join(", ")}` });
      }
      filter.orderStatus = req.query.status;
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 }).populate("user", "firstName lastName email");
    return res.status(200).json({
      success: true,
      data: { orders, count: orders.length },
      message: "Orders fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not load orders. Please try again." });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, data: null, message: "Order not found" });
    }

    const { orderStatus } = req.body || {};
    if (!isNonEmptyString(orderStatus) || !ORDER_STATUSES.includes(orderStatus)) {
      return res.status(400).json({ success: false, data: null, message: `Order status must be one of: ${ORDER_STATUSES.join(", ")}` });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, data: null, message: "Order not found" });
    }

    return res.status(200).json({ success: true, data: { order }, message: "Order status updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not update the order. Please try again." });
  }
}
