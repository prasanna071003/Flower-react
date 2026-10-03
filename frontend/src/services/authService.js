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

export async function fetchCurrentUser() {
  const payload = await apiRequest("/auth/me");
  return (payload && payload.data && payload.data.user) || null;
}

export function logoutUser() {
  clearToken();
}
