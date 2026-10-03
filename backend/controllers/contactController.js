import mongoose from "mongoose";

import ContactMessage, { CONTACT_STATUSES } from "../models/ContactMessage.js";
import { isNonEmptyString, validateContactMessage } from "../utils/validators.js";

export async function createContactMessage(req, res) {
  try {
    const { name, email, phone, subject, message } = req.body || {};
    const errors = validateContactMessage({ name, email, phone, subject, message });
    if (errors.length) {
      return res.status(400).json({ success: false, data: null, message: errors[0] });
    }

    const contactMessage = await ContactMessage.create({
      name: name.trim(),
      email: isNonEmptyString(email) ? email.trim().toLowerCase() : "",
      phone: isNonEmptyString(phone) ? phone.trim() : "",
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      data: { contactMessage },
      message: "Message sent — we'll get back to you within a few hours.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not send your message. Please try again." });
  }
}

export async function getContactMessages(req, res) {
  try {
    const filter = {};
    if (isNonEmptyString(req.query.status)) {
      if (!CONTACT_STATUSES.includes(req.query.status)) {
        return res.status(400).json({ success: false, data: null, message: `Status must be one of: ${CONTACT_STATUSES.join(", ")}` });
      }
      filter.status = req.query.status;
    }

    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: { messages, count: messages.length },
      message: "Messages fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not load messages. Please try again." });
  }
}

export async function updateContactMessage(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, data: null, message: "Message not found" });
    }

    const { status } = req.body || {};
    if (!isNonEmptyString(status) || !CONTACT_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, data: null, message: `Status must be one of: ${CONTACT_STATUSES.join(", ")}` });
    }

    const contactMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!contactMessage) {
      return res.status(404).json({ success: false, data: null, message: "Message not found" });
    }

    return res.status(200).json({ success: true, data: { contactMessage }, message: "Message updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not update the message. Please try again." });
  }
}

export async function deleteContactMessage(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, data: null, message: "Message not found" });
    }
    const contactMessage = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!contactMessage) {
      return res.status(404).json({ success: false, data: null, message: "Message not found" });
    }
    return res.status(200).json({ success: true, data: { contactMessage }, message: "Message deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: "Could not delete the message. Please try again." });
  }
}
