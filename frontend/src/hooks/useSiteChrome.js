import { useEffect, useState } from "react";

/**
 * Site-wide chrome behaviour that lives in the Header, which mounts once
 * (via Layout) and persists across route changes: dark-mode toggle,
 * layout-direction toggle, and the mobile nav drawer.
 */
export function useSiteChrome() {
  const [direction, setDirection] = useState(() => {
    try {
      return window.localStorage.getItem("nb-direction") === "rtl" ? "rtl" : "ltr";
    } catch (e) {
      return "ltr";
    }
  });

  function toggleDirection() {
    setDirection((current) => (current === "rtl" ? "ltr" : "rtl"));
  }

  useEffect(() => {
    const root = document.documentElement;
    const cleanups = [];

    // ---- Dark mode ----
    function applyTheme(theme) {
      root.setAttribute("data-theme", theme);
      const toggle = document.getElementById("theme-toggle");
      if (toggle) toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
    function initTheme() {
      let startTheme = "light";
      let saved = null;
      try {
        saved = window.localStorage.getItem("nb-theme");
      } catch (e) {
        saved = null;
      }
      if (saved === "light" || saved === "dark") {
        startTheme = saved;
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        startTheme = "dark";
      }
      applyTheme(startTheme);
    }
    function toggleTheme() {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        window.localStorage.setItem("nb-theme", next);
      } catch (e) {
        // ignore storage errors in restricted environments
      }
    }
    initTheme();
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", toggleTheme);
      cleanups.push(() => themeToggleBtn.removeEventListener("click", toggleTheme));
    }

    // ---- Mobile nav ----
    const navToggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("main-nav");
    const backdrop = document.getElementById("nav-backdrop");
    if (navToggle && nav) {
      function closeNav() {
        nav.classList.remove("is-open");
        if (backdrop) backdrop.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
      function openNav() {
        nav.classList.add("is-open");
        if (backdrop) backdrop.classList.add("is-open");
        navToggle.setAttribute("aria-expanded", "true");
      }
      const navToggleHandler = () => (nav.classList.contains("is-open") ? closeNav() : openNav());
      navToggle.addEventListener("click", navToggleHandler);
      cleanups.push(() => navToggle.removeEventListener("click", navToggleHandler));

      if (backdrop) {
        backdrop.addEventListener("click", closeNav);
        cleanups.push(() => backdrop.removeEventListener("click", closeNav));
      }
      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNav);
        cleanups.push(() => link.removeEventListener("click", closeNav));
      });
      const escHandler = (e) => {
        if (e.key === "Escape") closeNav();
      };
      window.addEventListener("keydown", escHandler);
      cleanups.push(() => window.removeEventListener("keydown", escHandler));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    try {
      window.localStorage.setItem("nb-direction", direction);
    } catch (e) {
      // restricted storage
    }
  }, [direction]);

  return { direction, toggleDirection };
}
