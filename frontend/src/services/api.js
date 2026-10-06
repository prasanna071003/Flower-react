const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const TOKEN_KEY = "cb-token";

export function getToken() {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // Storage unavailable - auth will not persist across reloads.
  }
}

export function clearToken() {
  setToken(null);
}

export async function apiRequest(
  path,
  { method = "GET", body, auth = true } = {}
) {
  const headers = {};

  const token = getToken();

  if (auth && token) {
    headers.Authorization = "Bearer " + token;
  }

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  let response;

  try {
    response = await fetch(API_URL + path, {
      method,
      headers,
      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,
    });
  } catch {
    const error = new Error(
      "Cannot reach the server. Please check your connection and try again."
    );

    error.status = 0;

    throw error;
  }

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = new Error(
      (payload && payload.message) ||
        "Something went wrong. Please try again."
    );

    error.status = response.status;

    throw error;
  }

  return payload;
}