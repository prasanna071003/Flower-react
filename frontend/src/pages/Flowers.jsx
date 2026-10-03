import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import { fetchFlowers } from "../services/flowerService";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import SEO from "../components/SEO";

const SORT_OPTIONS = [
  { value: "featured", label: "Sort: Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

const CATEGORY_CHIPS = [
  { value: "all", label: "All" },
  { value: "roses", label: "Roses" },
  { value: "bouquets", label: "Bouquets" },
  { value: "seasonal", label: "Seasonal" },
  { value: "weddings", label: "Wedding & Events" },
  { value: "plants", label: "Potted Plants" },
];

export default function Flowers() {
  const { addItem } = useCart();
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  usePageEffects();

  useEffect(() => {
    let active = true;
    setLoading(true);
    const timer = window.setTimeout(() => {
      fetchFlowers({ search: search.trim(), category, sort })
        .then((data) => {
          if (!active) return;
          setFlowers(data.flowers || []);
          setError("");
        })
        .catch((err) => {
          if (!active) return;
          setFlowers([]);
          setError(err.message);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 200);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [search, category, sort]);

  const statusMessage = error
    ? error
    : loading
      ? flowers.length === 0
        ? "Loading flowers…"
        : ""
      : flowers.length === 0
        ? "No flowers match your search — try a different term or category."
        : "";

  return (
    <>
      <SEO
        title="Flower Collections"
        description="Browse Noor & Bloom's seasonal flower collections — roses, bouquets, seasonal stems, wedding & event florals, and potted plants, hand-tied fresh and delivered the same day."
        image="/images/flowers_banner.png"
      />
      <section
        className="page-header"
        style={{ "--header-photo": "url('/images/flowers_banner.png')" }}
      >
        <div className="container">
          {/* <div class="eyebrow" style="justify-content:center;"><span class="rule"></span>Shop<span class="rule"></span></div> */}
          <h1>Flowers</h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / Flowers
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="search-row">
            <input
              className="input"
              type="search"
              id="flower-search"
              placeholder="Search flowers — e.g. rose, peony, orchid"
              aria-label="Search flowers"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="select"
              style={{ maxWidth: "220px" }}
              aria-label="Sort by"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div
            className="filter-bar"
            role="group"
            aria-label="Filter by category"
          >
            {CATEGORY_CHIPS.map((chip) => (
              <button
                key={chip.value}
                className={`chip${category === chip.value ? " is-active" : ""}`}
                onClick={() => setCategory(chip.value)}
              >
                {chip.label}
              </button>
            ))}
          </div>
          <h2
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0 0 0 0)",
              clipPath: "inset(50%)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            Flower collection
          </h2>
          <div className="grid grid-4" id="flower-grid">
            {flowers.map((flower) => (
              <article className="card" key={flower._id}>
                <Link to={`/flower-details/${flower._id}`}>
                  <div
                    className="bloom-tile"
                    style={{ "--card-photo": `url('${flower.image}')` }}
                  >
                    {flower.badge ? (
                      <span className="tile-badge">{flower.badge}</span>
                    ) : null}
                  </div>
                </Link>
                <div className="card-body">
                  <h3>
                    <Link to={`/flower-details/${flower._id}`}>
                      {flower.name}
                    </Link>
                  </h3>
                  {flower.meta ? (
                    <p className="card-meta">{flower.meta}</p>
                  ) : null}
                  <span className="card-price">
                    {flower.priceFrom
                      ? `From ${formatPrice(flower.price)}`
                      : formatPrice(flower.price)}
                  </span>
                  <div className="card-foot">
                    <Link
                      to={`/flower-details/${flower._id}`}
                      className="btn btn-sm btn-outline"
                    >
                      Details
                    </Link>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => addItem(flower)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {statusMessage ? (
            <p
              id="flower-empty"
              style={{
                textAlign: "center",
                marginTop: "2rem",
                color: "var(--text-muted)",
              }}
            >
              {statusMessage}
            </p>
          ) : null}
        </div>
      </section>
      {/* ADVANCED SECTION 1: STEM VITALITY & FRESHNESS STANDARDS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Quality Assurance
              <span className="rule"></span>
            </div>
            <h2>Stem longevity & freshness standard</h2>
            <p>
              Every bunch is conditioned at harvest, balanced for natural
              longevity, and delivered in living hydration so your arrangements
              flourish longer at home.
            </p>
          </div>
          <div className="vitality-grid">
            <article className="vitality-card">
              <div className="vitality-header">
                <div className="vitality-icon">❄</div>
                <div>
                  <h3>Cold-Chain Sourcing</h3>
                  <p className="card-meta">Dawn Harvest to Doorstep</p>
                </div>
              </div>
              <p>
                Harvested before sunrise, stems rest in temperature-regulated
                water baths with natural electrolytes to lock in cellular
                hydration before tying.
              </p>
              <div className="vitality-metrics">
                <div>
                  <div className="vitality-metric-row">
                    <span>Cellular Hydration Index</span>
                    <span>96%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ "--progress": "96%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="vitality-metric-row">
                    <span>Petal Resilience Score</span>
                    <span>94%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ "--progress": "94%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="vitality-tag-list">
                <span className="tag">Zero Wilt Guarantee</span>
                <span className="tag">Hydration Pouch</span>
                <span className="tag">Dawn Cut</span>
              </div>
            </article>
            <article className="vitality-card">
              <div className="vitality-header">
                <div className="vitality-icon">✦</div>
                <div>
                  <h3>Vase-Life Longevity</h3>
                  <p className="card-meta">10–21 Days Average Display</p>
                </div>
              </div>
              <p>
                We pair stems with balanced bloom stages — allowing tight buds
                to unfurl gradually over days while mature focal blooms provide
                instant drama.
              </p>
              <div className="vitality-metrics">
                <div>
                  <div className="vitality-metric-row">
                    <span>Roses & Peonies (10–14 Days)</span>
                    <span>90%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ "--progress": "90%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="vitality-metric-row">
                    <span>Orchids & Lilies (14–21 Days)</span>
                    <span>98%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ "--progress": "98%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="vitality-tag-list">
                <span className="tag">Slow Unfurl</span>
                <span className="tag">Nutrient Sachets</span>
                <span className="tag">Care Guide</span>
              </div>
            </article>
            <article className="vitality-card">
              <div className="vitality-header">
                <div className="vitality-icon">🌿</div>
                <div>
                  <h3>Pure Botanical Care</h3>
                  <p className="card-meta">100% Eco-Friendly Materials</p>
                </div>
              </div>
              <p>
                Crafted without chemical shine sprays or microplastics. We wrap
                in FSC-certified kraft paper, natural raffia ribbons, and
                compostable stem hydration.
              </p>
              <div className="vitality-metrics">
                <div>
                  <div className="vitality-metric-row">
                    <span>Biodegradable Packaging</span>
                    <span>100%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ "--progress": "100%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="vitality-metric-row">
                    <span>Natural Aroma Retention</span>
                    <span>95%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ "--progress": "95%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="vitality-tag-list">
                <span className="tag">Plastic-Free</span>
                <span className="tag">Raw Kraft</span>
                <span className="tag">Organic Feed</span>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* ADVANCED SECTION 2: THE BLOOM CLUB SUBSCRIPTIONS */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>The Bloom Club
              <span className="rule"></span>
            </div>
            <h2>Curated seasonal floral subscriptions</h2>
            <p>
              Keep your spaces effortlessly styled with weekly, fortnightly, or
              monthly flower boxes crafted from the season's premier grower
              selections.
            </p>
          </div>
          <div className="plans-grid">
            <article className="plan-card">
              <h3 className="plan-tier-name">Petite Posy</h3>
              <p className="plan-tier-desc">
                12–15 market stems tailored for desks, side tables, and gentle
                everyday cheer.
              </p>
              <div className="plan-price-wrap">
                <span className="plan-price">₹1,499</span>
                <span className="plan-period">/ delivery</span>
                <span className="plan-discount">Save 15%</span>
              </div>
              <div className="plan-features">
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>12–15 fresh seasonal stems & foliage</span>
                </div>
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Fortnightly or monthly flexible delivery</span>
                </div>
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Organic stem food & step-by-step trimming card</span>
                </div>
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Pause, reschedule, or cancel anytime with 1 click</span>
                </div>
              </div>
              <Link
                to="/contact?plan=petite"
                className="btn btn-outline btn-block"
              >
                Subscribe Petite
              </Link>
            </article>
            <article className="plan-card is-featured">
              <div className="plan-featured-badge">Most Loved</div>
              <h3 className="plan-tier-name">Signature Bloom</h3>
              <p className="plan-tier-desc">
                24–28 luxury stems featuring garden roses, peonies, and lush
                imported foliage.
              </p>
              <div className="plan-price-wrap">
                <span className="plan-price">₹2,799</span>
                <span className="plan-period">/ delivery</span>
                <span className="plan-discount">Save 20%</span>
              </div>
              <div className="plan-features">
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>
                    <strong>Free artisan ceramic vase</strong> included with 1st
                    order
                  </span>
                </div>
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>
                    24–28 statement stems with rare seasonal varieties
                  </span>
                </div>
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Priority morning delivery slot reservation</span>
                </div>
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Complimentary bespoke gift card for special dates</span>
                </div>
              </div>
              <Link
                to="/contact?plan=signature"
                className="btn btn-primary btn-block"
              >
                Join Signature Club
              </Link>
            </article>
            <article className="plan-card">
              <h3 className="plan-tier-name">Grand Luxe</h3>
              <p className="plan-tier-desc">
                35+ lavish focal stems designed for grand dining tables, foyers,
                and executive suites.
              </p>
              <div className="plan-price-wrap">
                <span className="plan-price">₹4,999</span>
                <span className="plan-period">/ delivery</span>
                <span className="plan-discount">Save 25%</span>
              </div>
              <div className="plan-features">
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>
                    35+ grand botanical stems with architectural styling
                  </span>
                </div>
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Rotating luxury Italian glass vessel collection</span>
                </div>
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>
                    Personal florist consultation for custom colourways
                  </span>
                </div>
                <div className="plan-feature-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Free celebration add-on bouquets twice a year</span>
                </div>
              </div>
              <Link
                to="/contact?plan=grand"
                className="btn btn-outline btn-block"
              >
                Inquire Grande Luxe
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
