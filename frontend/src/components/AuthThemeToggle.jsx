import { useState } from "react";

export default function AuthThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute("data-theme") === "dark",
  );

  function toggleTheme() {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setDark(next === "dark");
    try {
      window.localStorage.setItem("nb-theme", next);
    } catch {
      // Keep the current page theme even when storage is unavailable.
    }
  }

  return (
    <button
      className="auth-theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      aria-pressed={dark}
    >
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}
