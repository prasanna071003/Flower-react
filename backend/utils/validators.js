const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mongooseObjectIdPattern = /^[a-fA-F0-9]{24}$/;

export const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

export const isValidEmail = (value) => typeof value === "string" && EMAIL_PATTERN.test(value.trim());

export function validateRegistration({ firstName, lastName, email, password }) {
  const errors = [];
  if (!isNonEmptyString(firstName)) errors.push("First name is required");
  if (!isNonEmptyString(lastName)) errors.push("Last name is required");
  if (!isValidEmail(email)) errors.push("A valid email address is required");
  if (typeof password !== "string" || password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }
  return errors;
}

export function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function validateContactMessage({ name, email, phone, subject, message }) {
  const errors = [];
  if (!isNonEmptyString(name)) errors.push("Name is required");
  if (isNonEmptyString(email)) {
    if (!isValidEmail(email)) errors.push("A valid email address is required");
  } else if (!isNonEmptyString(phone)) {
    errors.push("An email address or phone number is required");
  }
  if (!isNonEmptyString(subject)) errors.push("Subject is required");
  if (!isNonEmptyString(message) || message.trim().length < 5) {
    errors.push("Message must be at least 5 characters");
  }
  return errors;
}

export function validateShippingAddress({ fullName, phone, addressLine, city, pincode }) {
  const errors = [];
  if (!isNonEmptyString(fullName)) errors.push("Recipient name is required");
  if (!isNonEmptyString(phone) || String(phone).trim().length < 6) errors.push("A valid phone number is required");
  if (!isNonEmptyString(addressLine)) errors.push("Delivery address is required");
  if (!isNonEmptyString(city)) errors.push("City is required");
  if (!isNonEmptyString(pincode) || String(pincode).trim().length < 4) errors.push("A valid PIN code is required");
  return errors;
}

export function validateOrderItems(items) {
  const errors = [];
  if (!Array.isArray(items) || items.length === 0) {
    return ["Your cart is empty"];
  }
  items.forEach((item, index) => {
    if (!item || typeof item.flower !== "string" || !mongooseObjectIdPattern.test(item.flower)) {
      errors.push(`Item ${index + 1} is not a valid flower`);
      return;
    }
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      errors.push(`Item ${index + 1} must have a quantity between 1 and 99`);
    }
  });
  return errors;
}

export function validateFlower({ name, category, price, image }, categories) {
  const errors = [];
  if (!isNonEmptyString(name)) errors.push("Flower name is required");
  if (!isNonEmptyString(category) || !categories.includes(category)) {
    errors.push(`Category must be one of: ${categories.join(", ")}`);
  }
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    errors.push("A valid price is required");
  }
  if (!isNonEmptyString(image)) errors.push("Image path is required");
  return errors;
}
