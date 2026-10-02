import mongoose from "mongoose";

export const CONTACT_STATUSES = ["new", "read", "archived"];

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    subject: { type: String, required: [true, "Subject is required"], trim: true },
    message: { type: String, required: [true, "Message is required"], trim: true },
    status: {
      type: String,
      enum: { values: CONTACT_STATUSES, message: "Status must be one of: new, read, archived" },
      default: "new",
    },
  },
  { timestamps: true }
);

contactMessageSchema.index({ createdAt: -1 });

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;
