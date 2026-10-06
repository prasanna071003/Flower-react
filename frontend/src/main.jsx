import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./styles/style.css";
import "./styles/responsive.css";

try {
  const savedTheme = window.localStorage.getItem("nb-theme");
  const systemPrefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute(
    "data-theme",
    savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : systemPrefersDark
        ? "dark"
        : "light",
  );
} catch {
  document.documentElement.setAttribute("data-theme", "light");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
