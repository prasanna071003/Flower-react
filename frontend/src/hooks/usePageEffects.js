import { useEffect } from "react";

/**
 * Re-attaches the site's page-level vanilla-JS behaviour (filters, tabs,
 * sliders, lightbox, forms, counters, estimator) whenever a page component
 * mounts. Ported from the original script.js so each page keeps behaving
 * exactly as it did as static HTML, just scoped to a single mount/unmount
 * cycle instead of a single DOMContentLoaded firing.
 */
export function usePageEffects() {
  useEffect(() => {
    const cleanups = [];
    const onWindow = (type, fn, opts) => {
      window.addEventListener(type, fn, opts);
      cleanups.push(() => window.removeEventListener(type, fn, opts));
    };

    // ---- Occasion & mood filter (index.html) ----
    (function moodFilter() {
      const moodChips = document.querySelectorAll("[data-mood-chip]");
      const moodCards = document.querySelectorAll("[data-mood-card]");
      if (!moodChips.length || !moodCards.length) return;
      moodChips.forEach((chip) => {
        const handler = () => {
          moodChips.forEach((c) => c.classList.remove("is-active"));
          chip.classList.add("is-active");
          const selectedMood = chip.getAttribute("data-mood-chip");
          moodCards.forEach((card) => {
            const cardMood = card.getAttribute("data-mood-card");
            const show = selectedMood === "all" || cardMood === selectedMood;
            card.style.display = show ? "" : "none";
          });
        };
        chip.addEventListener("click", handler);
        cleanups.push(() => chip.removeEventListener("click", handler));
      });
    })();

    // ---- Gallery lightbox (gallery.html) ----
    (function galleryLightbox() {
      const items = document.querySelectorAll("[data-gallery-item]");
      const lightbox = document.getElementById("lightbox");
      if (!items.length || !lightbox) return;
      const titleEl = lightbox.querySelector("[data-lightbox-title]");
      const descEl = lightbox.querySelector("[data-lightbox-desc]");
      const closeBtn = lightbox.querySelector(".lightbox-close");

      function close() {
        lightbox.classList.remove("is-open");
      }
      items.forEach((item) => {
        const handler = () => {
          if (titleEl) titleEl.textContent = item.getAttribute("data-title") || "";
          if (descEl) descEl.textContent = item.getAttribute("data-desc") || "";
          lightbox.classList.add("is-open");
        };
        item.addEventListener("click", handler);
        cleanups.push(() => item.removeEventListener("click", handler));
      });
      if (closeBtn) {
        closeBtn.addEventListener("click", close);
        cleanups.push(() => closeBtn.removeEventListener("click", close));
      }
      const backdropHandler = (e) => {
        if (e.target === lightbox) close();
      };
      lightbox.addEventListener("click", backdropHandler);
      cleanups.push(() => lightbox.removeEventListener("click", backdropHandler));

      const escHandler = (e) => {
        if (e.key === "Escape") close();
      };
      onWindow("keydown", escHandler);
    })();

    // ---- Footer year (safe to set from any page too) ----
    (function footerYear() {
      document.querySelectorAll("[data-year]").forEach((el) => {
        el.textContent = new Date().getFullYear();
      });
    })();

    // ---- Seasonal journal story slider ----
    (function storySlider() {
      document.querySelectorAll("[data-slider]").forEach((slider) => {
        const track = slider.querySelector(".story-slides");
        const slides = slider.querySelectorAll(".story-slide");
        const dots = slider.querySelectorAll("[data-slider-dot]");
        let current = 0;
        let timer;
        if (!track || slides.length < 2) return;

        function showSlide(index) {
          current = (index + slides.length) % slides.length;
          track.style.transform = `translateX(-${current * 100}%)`;
          dots.forEach((dot, dotIndex) => {
            dot.classList.toggle("is-active", dotIndex === current);
            dot.setAttribute("aria-current", dotIndex === current ? "true" : "false");
          });
        }
        function startTimer() {
          window.clearInterval(timer);
          timer = window.setInterval(() => showSlide(current + 1), 6000);
        }

        const next = slider.querySelector("[data-slider-next]");
        const previous = slider.querySelector("[data-slider-prev]");
        const nextHandler = () => { showSlide(current + 1); startTimer(); };
        const prevHandler = () => { showSlide(current - 1); startTimer(); };
        if (next) { next.addEventListener("click", nextHandler); cleanups.push(() => next.removeEventListener("click", nextHandler)); }
        if (previous) { previous.addEventListener("click", prevHandler); cleanups.push(() => previous.removeEventListener("click", prevHandler)); }
        dots.forEach((dot) => {
          const handler = () => { showSlide(parseInt(dot.getAttribute("data-slider-dot"), 10) || 0); startTimer(); };
          dot.addEventListener("click", handler);
          cleanups.push(() => dot.removeEventListener("click", handler));
        });
        const enterHandler = () => window.clearInterval(timer);
        slider.addEventListener("mouseenter", enterHandler);
        slider.addEventListener("mouseleave", startTimer);
        cleanups.push(() => {
          slider.removeEventListener("mouseenter", enterHandler);
          slider.removeEventListener("mouseleave", startTimer);
          window.clearInterval(timer);
        });
        showSlide(0);
        startTimer();
      });
    })();

    // ---- Studio pulse counters ----
    (function pulseCounters() {
      const pulse = document.querySelector("[data-pulse]");
      if (!pulse) return;
      const counters = pulse.querySelectorAll("[data-counter]");
      let started = false;

      function animateCounters() {
        if (started) return;
        started = true;
        pulse.classList.add("is-visible");
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-counter"), 10) || 0;
          const start = performance.now();
          function tick(now) {
            const progress = Math.min((now - start) / 1200, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased).toLocaleString();
            if (progress < 1) window.requestAnimationFrame(tick);
          }
          window.requestAnimationFrame(tick);
        });
      }

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        }, { threshold: 0.25 });
        observer.observe(pulse);
        cleanups.push(() => observer.disconnect());
      } else {
        animateCounters();
      }
    })();

    // ---- Universal progress-fill observer ----
    (function progressFill() {
      const progressBars = document.querySelectorAll(".progress-fill");
      if (!progressBars.length) return;

      if ("IntersectionObserver" in window) {
        const progressObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.width = entry.target.style.getPropertyValue("--progress") || "100%";
              progressObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        progressBars.forEach((bar) => progressObserver.observe(bar));
        cleanups.push(() => progressObserver.disconnect());
      } else {
        progressBars.forEach((bar) => {
          bar.style.width = bar.style.getPropertyValue("--progress") || "100%";
        });
      }
    })();

    // ---- Event florals estimator (services.html) ----
    (function eventEstimator() {
      const estimator = document.getElementById("event-estimator");
      if (!estimator) return;

      const state = { type: "wedding", scale: "100", density: "balanced", palette: "wine" };
      const basePrices = { wedding: 45000, corporate: 35000, intimate: 18000, gala: 75000 };
      const scaleMultipliers = { "30": 0.6, "100": 1.0, "250": 1.85, "500": 3.2 };
      const densityMultipliers = { minimalist: 0.75, balanced: 1.0, opulent: 1.55 };
      const stemBase = { "30": 120, "100": 350, "250": 850, "500": 1800 };

      const priceEl = document.getElementById("est-price-val");
      const stemsEl = document.getElementById("est-stems-val");
      const tablesEl = document.getElementById("est-tables-val");
      const setupsEl = document.getElementById("est-setups-val");
      const noteEl = document.getElementById("est-palette-note");

      const paletteNotes = {
        wine: "Velvet wine roses, deep dahlias, cascading eucalyptus, dark berries.",
        botanical: "Lush Italian ruscus, ivory peonies, monstera leaves, white hydrangeas.",
        pastel: "Blush sweet peas, lavender lilacs, ranunculus, cream spray roses.",
        gold: "Sunlit marigolds, golden cymbidium orchids, amber dried grasses, honey ranunculus.",
      };

      function recalculate() {
        const base = basePrices[state.type] || 45000;
        const sMul = scaleMultipliers[state.scale] || 1.0;
        const dMul = densityMultipliers[state.density] || 1.0;
        const total = Math.round(base * sMul * dMul);
        const guests = parseInt(state.scale, 10) || 100;
        const tables = Math.ceil(guests / 8);
        const stems = Math.round((stemBase[state.scale] || 350) * dMul);

        if (priceEl) priceEl.textContent = "₹" + total.toLocaleString("en-IN");
        if (stemsEl) stemsEl.textContent = stems + " premium stems";
        if (tablesEl) tablesEl.textContent = tables + ` tables (${tables} centrepieces)`;
        if (setupsEl) {
          setupsEl.textContent =
            state.type === "wedding" ? "Ceremony Arch + Bridal Set + Reception"
            : state.type === "corporate" ? "Stage Backdrop + VIP Tables + Entryway"
            : state.type === "gala" ? "Full Ballroom Styling + Photo Floral Wall"
            : "Focal Table Styling + Gift Corner";
        }
        if (noteEl) noteEl.textContent = paletteNotes[state.palette] || paletteNotes.wine;
      }

      estimator.querySelectorAll("[data-est-group]").forEach((group) => {
        const groupName = group.getAttribute("data-est-group");
        const btns = group.querySelectorAll("[data-est-val]");
        btns.forEach((btn) => {
          const handler = () => {
            btns.forEach((b) => b.classList.remove("is-active"));
            btn.classList.add("is-active");
            state[groupName] = btn.getAttribute("data-est-val");
            recalculate();
          };
          btn.addEventListener("click", handler);
          cleanups.push(() => btn.removeEventListener("click", handler));
        });
      });

      recalculate();
    })();

    // ---- Back to top button ----
    (function backToTop() {
      const backToTopBtn = document.querySelector(".back-to-top");
      if (!backToTopBtn) return;
      function checkScroll() {
        backToTopBtn.classList.toggle("is-visible", window.scrollY > 200);
      }
      onWindow("scroll", checkScroll, { passive: true });
      checkScroll();
      const clickHandler = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      backToTopBtn.addEventListener("click", clickHandler);
      cleanups.push(() => backToTopBtn.removeEventListener("click", clickHandler));
    })();

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
