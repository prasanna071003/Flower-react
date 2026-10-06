import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import { fetchFlowerById, fetchFlowers } from "../services/flowerService";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import SEO, { absoluteUrl } from "../components/SEO";

const GALLERY_THUMBS = [
  "/images/inside.jpg",
  "/images/inside2.png",
  "/images/inside9.png",
];

const WRAP_SWATCHES = [
  { title: "Wine kraft", style: { background: "var(--wine-700)" } },
  { title: "Black kraft", style: { background: "var(--ink-900)" } },
  {
    title: "White paper",
    style: { background: "#fff", borderColor: "var(--border)" },
  },
];

const TABS = [
  { id: "details", label: "Product details" },
  { id: "care", label: "Care guide" },
  { id: "delivery", label: "Delivery" },
];

export default function FlowerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [flower, setFlower] = useState(null);
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [cartNote, setCartNote] = useState("");

  function handleAddToCart() {
    addItem(flower, qty);
    setCartNote(`Added ${qty} × ${flower.name} to your cart.`);
  }

  function handleBuyNow() {
    addItem(flower, qty);
    navigate("/checkout");
  }

  usePageEffects();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    setFlower(null);
    setQty(1);
    setActiveTab("details");
    setActiveThumb(0);
    setActiveSwatch(0);

    fetchFlowerById(id)
      .then((data) => {
        if (!active) return;
        setFlower(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    let active = true;
    fetchFlowers({ limit: 8 })
      .then((data) => {
        if (active)
          setPairs(
            (data.flowers || []).filter((item) => item._id !== id).slice(0, 4),
          );
      })
      .catch(() => {
        if (active) setPairs([]);
      });
    return () => {
      active = false;
    };
  }, [id]);

  function changeQty(event) {
    const digits = event.target.value.replace(/\D/g, "");
    setQty(digits === "" ? 1 : Math.min(99, Math.max(1, parseInt(digits, 10))));
  }

  if (loading) {
    return (
      <>
        <SEO title="Flower Details" noindex />
        <section
          className="page-header"
          style={{ "--header-photo": "url('/images/flowers_banner.png')" }}
        >
          <div className="container">
            <h1>Flower Details</h1>
            <p className="breadcrumb">
              <Link to="/">Home</Link> / <Link to="/flowers">Flowers</Link>
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <p style={{ color: "var(--text-muted)" }}>Loading flower…</p>
          </div>
        </section>
      </>
    );
  }

  if (error || !flower) {
    return (
      <>
        <SEO title="Flower not found" noindex />
        <section
          className="page-header"
          style={{ "--header-photo": "url('/images/flowers_banner.png')" }}
        >
          <div className="container">
            <h1>Flower not found</h1>
            <p className="breadcrumb">
              <Link to="/">Home</Link> / <Link to="/flowers">Flowers</Link>
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <p style={{ color: "var(--brand)" }}>{error || "Flower not found"}</p>
            <Link to="/flowers" className="btn btn-outline mt-2">
              Back to Flowers
            </Link>
          </div>
        </section>
      </>
    );
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: flower.name,
    description: flower.description || flower.meta || undefined,
    image: absoluteUrl(flower.image),
    brand: { "@type": "Brand", name: "Noor & Bloom" },
    offers: {
      "@type": "Offer",
      price: flower.price,
      priceCurrency: "INR",
      url: absoluteUrl(`/flower-details/${id}`),
    },
  };
  const productImages = [
    flower.image,
    ...GALLERY_THUMBS.filter((image) => image !== flower.image),
  ];

  return (
    <>
      <SEO
        title={flower.name}
        description={flower.meta || flower.description}
        image={flower.image}
        type="product"
        jsonLd={productJsonLd}
      />
      <section
        className="page-header"
        style={{ "--header-photo": "url('/images/flowers_banner.png')" }}
      >
        <div className="container">
          <h1>{flower.name}</h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/flowers">Flowers</Link> /{" "}
            {flower.name}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="pd-layout">
            <div className="pd-media">
              <div
                className="bloom-tile pd-main-image"
              >
                <img
                  className="pd-main-photo"
                  src={productImages[activeThumb]}
                  alt={flower.name}
                />
                {flower.badge ? (
                  <span className="tile-badge">{flower.badge}</span>
                ) : null}
              </div>
              <div className="pd-thumbs">
                {productImages.map((src, index) => (
                  <div
                    key={src}
                    className={`bloom-tile${index === activeThumb ? " is-active" : ""}`}
                    onClick={() => setActiveThumb(index)}
                    style={{ "--card-photo": `url('${src}')` }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Show product image ${index + 1}`}
                    aria-pressed={index === activeThumb}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveThumb(index);
                      }
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="pd-info">
              <div className="pd-title-row">
                <div>
                  <h2>{flower.name}</h2>
                  <div className="stars-row">
                    ★★★★★{" "}
                    <span
                      style={{ color: "var(--text-muted)", fontSize: ".85rem" }}
                    >
                      ({flower.reviews} reviews)
                    </span>
                  </div>
                </div>
                <button className="icon-btn" aria-label="Save to favourites">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="pd-price">
                {flower.priceFrom ? "From " : ""}
                {formatPrice(flower.price)}
                {flower.compareAtPrice ? (
                  <s>{formatPrice(flower.compareAtPrice)}</s>
                ) : null}
              </div>
              <p className="pd-product-meta">
                <span><strong>Category</strong> {flower.category}</span>
                <span><strong>Availability</strong> Available to order</span>
              </p>
              {flower.description ? <p>{flower.description}</p> : null}
              {flower.tags && flower.tags.length ? (
                <div className="tag-row mt-2">
                  {flower.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="mt-2">
                <strong>Wrap colour</strong>
                <div className="option-row">
                  {WRAP_SWATCHES.map((swatch, index) => (
                    <span
                      key={swatch.title}
                      className={`swatch${index === activeSwatch ? " is-active" : ""}`}
                      onClick={() => setActiveSwatch(index)}
                      style={swatch.style}
                      title={swatch.title}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="qty-row">
                <span>Quantity</span>
                <div className="qty-control">
                  <button
                    type="button"
                    onClick={() => setQty((value) => Math.max(1, value - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    id="qty-input"
                    value={qty}
                    inputMode="numeric"
                    aria-label="Quantity"
                    onChange={changeQty}
                  />
                  <button
                    type="button"
                    onClick={() => setQty((value) => Math.min(99, value + 1))}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="pd-actions">
                <button className="btn btn-primary" onClick={handleAddToCart}>
                  Add to Cart — {formatPrice(flower.price * qty)}
                </button>
                <button className="btn btn-outline" onClick={handleBuyNow}>
                  Buy Now
                </button>
                <Link to="/services#custom" className="btn btn-outline">
                  Customise This Bouquet
                </Link>
              </div>
              {cartNote ? (
                <p
                  style={{
                    color: "var(--brand)",
                    marginTop: "1rem",
                    fontWeight: "500",
                  }}
                >
                  {cartNote}
                </p>
              ) : null}
              <div className="pd-tabs" role="tablist">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    className={`pd-tab${activeTab === tab.id ? " is-active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {TABS.map((tab) => (
                <div
                  key={tab.id}
                  className={`pd-tab-panel${activeTab === tab.id ? " is-active" : ""}`}
                  role="tabpanel"
                >
                  <p>{flower[tab.id] || "Information for this arrangement will be available soon."}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {pairs.length ? (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head center">
              <div className="eyebrow">
                <span className="rule"></span>You Might Also Like
                <span className="rule"></span>
              </div>
              <h2>Pairs well with</h2>
            </div>
            <div className="grid grid-4">
              {pairs.map((pair) => (
                <article className="card" key={pair._id}>
                  <Link to={`/flower-details/${pair._id}`}>
                    <div
                      className="bloom-tile"
                      style={{ "--card-photo": `url('${pair.image}')` }}
                    ></div>
                  </Link>
                  <div className="card-body">
                    <h3>
                      <Link to={`/flower-details/${pair._id}`}>
                        {pair.name}
                      </Link>
                    </h3>
                    <span className="card-price">
                      {formatPrice(pair.price)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Complete the Look
              <span className="rule"></span>
            </div>
            <h2>These arrangements pair beautifully with this bouquet</h2>
          </div>
          <div className="grid grid-4">
            <div className="card">
              <div className="card-body">
                <h3>Soft Blush Roses</h3>
                <p>For an elegant, tonal pairing.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>Fresh Eucalyptus</h3>
                <p>Adds lightness and movement to the arrangement.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>Ivory Peony</h3>
                <p>Gives a lush, romantic accent.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>Mini Vase Set</h3>
                <p>A polished option for desks, bedside tables, or gifting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
