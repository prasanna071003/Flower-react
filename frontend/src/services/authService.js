import { apiRequest, clearToken, setToken } from "./api";

export async function registerUser({ firstName, lastName, email, phone, password }) {
  const payload = await apiRequest("/auth/register", {
    method: "POST",
    auth: false,
    body: { firstName, lastName, email, phone, password },
  });
  const data = payload && payload.data;
  if (data && data.token) setToken(data.token);
  return data;
}

export async function loginUser({ email, password, rememberMe }) {
  const payload = await apiRequest("/auth/login", {
    method: "POST",
    auth: false,
    body: { email, password, rememberMe },
  });
  const data = payload && payload.data;
  if (data && data.token) setToken(data.token);
  return data;
}

export async function requestPasswordReset(email) {
  return apiRequest("/auth/forgot-password", {
    method: "POST",
    auth: false,
    body: { email },
  });
}

export async function resetPassword({ token, password }) {
  return apiRequest("/auth/reset-password", {
    method: "POST",
    auth: false,
    body: { token, password },
  });
}

export async function fetchCurrentUser() {
  const payload = await apiRequest("/auth/me");
  return (payload && payload.data && payload.data.user) || null;
}

export async function fetchCustomers() {
  const payload = await apiRequest("/auth/customers");
  return payload.data;
}

export function logoutUser() {
  clearToken();
}
