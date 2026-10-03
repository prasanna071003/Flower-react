import { apiRequest } from "./api";

export function createOrder({ items, shippingAddress, notes }) {
  return apiRequest("/orders", {
    method: "POST",
    body: { items, shippingAddress, notes },
  }).then((payload) => payload.data.order);
}

export function fetchMyOrders() {
  return apiRequest("/orders/mine").then((payload) => payload.data || { orders: [], count: 0 });
}

export function fetchAllOrders() {
  return apiRequest("/orders").then((payload) => payload.data || { orders: [], count: 0 });
}

export function updateOrderStatus(id, orderStatus) {
  return apiRequest(`/orders/${id}/status`, { method: "PATCH", body: { orderStatus } }).then(
    (payload) => payload.data.order
  );
}
