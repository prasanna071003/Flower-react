import { apiRequest } from "./api";

export function submitContactMessage({ name, email, phone, subject, message }) {
  return apiRequest("/contact", {
    method: "POST",
    auth: false,
    body: { name, email, phone, subject, message },
  });
}

export function fetchContactMessages() {
  return apiRequest("/contact").then((payload) => payload.data || { messages: [], count: 0 });
}

export function updateContactMessageStatus(id, status) {
  return apiRequest(`/contact/${id}`, { method: "PATCH", body: { status } }).then(
    (payload) => payload.data.contactMessage
  );
}

export function deleteContactMessage(id) {
  return apiRequest(`/contact/${id}`, { method: "DELETE" });
}
