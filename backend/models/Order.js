import mongoose from "mongoose";

export const ORDER_STATUSES = ["Pending", "Processing", "Delivered", "Cancelled"];
export const PAYMENT_STATUSES = ["Pending", "Paid", "Refunded"];

const orderItemSchema = new mongoose.Schema(
  {
    flower: { type: mongoose.Schema.Types.ObjectId, ref: "Flower" },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    items: {
      type: [orderItemSchema],
      validate: { validator: (items) => Array.isArray(items) && items.length > 0, message: "An order needs at least one item" },
    },
    shippingAddress: {
      fullName: { type: String, required: [true, "Recipient name is required"], trim: true },
      phone: { type: String, required: [true, "Phone number is required"], trim: true },
      addressLine: { type: String, required: [true, "Delivery address is required"], trim: true },
      city: { type: String, required: [true, "City is required"], trim: true },
      state: { type: String, trim: true, default: "" },
      pincode: { type: String, required: [true, "PIN code is required"], trim: true },
    },
    notes: { type: String, trim: true, default: "" },
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, required: true, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: ["Cash on Delivery"], default: "Cash on Delivery" },
    paymentStatus: { type: String, enum: PAYMENT_STATUSES, default: "Pending" },
    orderStatus: {
      type: String,
      enum: { values: ORDER_STATUSES, message: "Order status must be one of: Pending, Processing, Delivered, Cancelled" },
      default: "Pending",
    },
  },
  { timestamps: true }
);

orderSchema.index({ createdAt: -1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;
