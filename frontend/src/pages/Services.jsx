import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import { submitContactMessage } from "../services/contactService";
import SEO from "../components/SEO";

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Sympathy",
  "Wedding",
  "Just because",
];
const PALETTES = [
  "Wine & blush",
  "White & green",
  "Bold & bright",
  "Surprise me",
];

export default function Services() {
  const [request, setRequest] = useState({
    name: "",
    phone: "",
    occasion: "Birthday",
    palette: "Wine & blush",
    budget: "",
    date: "",
    notes: "",
  });
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  usePageEffects();

  function updateField(field) {
    return (event) =>
      setRequest((current) => ({ ...current, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setNote("");
    const lines = [
      `Occasion: ${request.occasion}`,
      `Preferred palette: ${request.palette}`,
    ];
    if (request.budget.trim())
      lines.push(`Budget (₹): ${request.budget.trim()}`);
    if (request.date) lines.push(`Needed by: ${request.date}`);
    lines.push(`Notes: ${request.notes.trim() || "—"}`);
    try {
      const payload = await submitContactMessage({
        name: request.name,
        phone: request.phone,
        subject: "Custom Bouquet Request",
        message: lines.join("\n"),
      });
      setNote(
        payload.message ||
          "Thanks — your custom bouquet request has been sent. We'll reply within a few hours.",
      );
      setRequest({
        name: "",
        phone: "",
        occasion: "Birthday",
        palette: "Wine & blush",
        budget: "",
        date: "",
        notes: "",
      });
    } catch (error) {
      setNote(
        error.message || "Could not send your request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Services — Weddings, Events & Custom Bouquets | Noor & Bloom"
        description="Wedding, event, and custom floral design from Noor & Bloom — bridal party florals, ceremony and reception styling, event packages, and made-to-order bouquets with same-day city delivery."
        image="/images/service_banner.png"
      />
      <section
        className="page-header"
        style={{ "--header-photo": "url('/images/service_banner.png')" }}
      >
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            {/* <span className="rule"></span>Services<span className="rule"></span> */}
          </div>
          <h1>Services</h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / Services
          </p>
        </div>
      </section>
      {/* WEDDINGS & EVENTS */}
      <section className="section" id="weddings">
        <div className="container split">
          <div>
            <div className="eyebrow">
              <span className="rule"></span>Weddings & Events
            </div>
            <h2>Florals for your ceremony, from arch to aisle</h2>
            <p>
              We plan around your date, venue, and colour story — bridal
              bouquets, ceremony arches, table runners, and reception styling,
              delivered and set up on-site by our team. We plan around your date, venue, and colour story — bridal bouquets, ceremony arches, table runners, and reception styling, delivered and set up on-site by our team.
            </p>
            <ul className="feature-list">
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Bridal party florals</strong>
                  <span>
                   Beautiful bouquets, boutonnieres, and floral crowns designed in your chosen palette. Every detail complements your bridal style perfectly.

                  </span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Ceremony & reception styling</strong>
                  <span>
                   Elegant arches, aisle markers, table runners, and floral centrepieces create a refined atmosphere. Each arrangement enhances your celebration beautifully.
                  </span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>On-site setup & teardown</strong>
                  <span>
                    Our team handles installation before your event and cleanup afterward with care.
                  </span>
                </div>
              </li>
            </ul>
            <Link to="/contact" className="btn btn-primary mt-2">
              Book a Consultation
            </Link>
          </div>
          <div
            className="split-media"
            aria-hidden="true"
            style={{ "--split-photo": "url('/images/inside2.png')" }}
          ></div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Event Packages
              <span className="rule"></span>
            </div>
            <h2>Choose a starting point, <br></br>then customise it</h2>
          </div>
          <div className="grid grid-3">
            <article className="card">
              <div className="card-body">
                <h3>Intimate</h3>
                <p className="card-meta">Up to 40 guests</p>
                <span className="card-price">From ₹22,000</span>
                <p className="mt-2">
                  Bridal bouquet, 2 boutonnieres, 4 table centrepieces. Ceremony flowers, 2 aisle arrangements, 4 floral accents.
                </p>
                <Link to="/contact" className="btn btn-sm btn-outline mt-2">
                  Enquire
                </Link>
              </div>
            </article>
            <article className="card" style={{ borderColor: "var(--brand)" }}>
              <div className="card-body">
                {/* <span className="tag" style={{ alignSelf: "flex-start" }}> */}
                  {/* Most booked */}
                {/* </span> */}
                <h3>Classic</h3>
                <p className="card-meta">Up to 150 guests</p>
                <span className="card-price">From ₹58,000</span>
                <p className="mt-2">
                  Ceremony arch, aisle florals, bridal party set, 10 centrepieces. Designed to create an elegant celebration.
                </p>
                <Link to="/contact" className="btn btn-sm btn-primary mt-2">
                  Enquire
                </Link>
              </div>
            </article>
            <article className="card">
              <div className="card-body">
                <h3>Grand</h3>
                <p className="card-meta">150+ guests</p>
                <span className="card-price">From ₹1,20,000</span>
                <p className="mt-2">
                  Full venue styling, statement installations, and dedicated on-site florist for an unforgettable celebration. 
                </p>
                <Link to="/contact" className="btn btn-sm btn-outline mt-2">
                  Enquire
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* CUSTOM BOUQUET REQUEST */}
      <section className="section" id="custom">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Custom Orders
              <span className="rule"></span>
            </div>
            <h2>Request a custom bouquet</h2>
            <p>
              Tell us the occasion, colours, and budget — our florists will
              sketch an arrangement and confirm the price before we make
              anything.
            </p>
          </div>
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="cb-name">Full name</label>
                <input
                  className="input"
                  type="text"
                  id="cb-name"
                  value={request.name}
                  onChange={updateField("name")}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="cb-phone">Phone number</label>
                <input
                  className="input"
                  type="tel"
                  id="cb-phone"
                  value={request.phone}
                  onChange={updateField("phone")}
                  required
                />
              </div>
              <div className="field full">
                <label htmlFor="cb-occasion">Occasion</label>
                <select
                  className="select"
                  id="cb-occasion"
                  value={request.occasion}
                  onChange={updateField("occasion")}
                >
                  {OCCASIONS.map((occasion) => (
                    <option key={occasion}>{occasion}</option>
                  ))}
                </select>
              </div>
              <div className="field full">
                <label>Preferred palette</label>
                <div className="radio-row">
                  {PALETTES.map((palette) => (
                    <label key={palette}>
                      <input
                        type="radio"
                        name="palette"
                        value={palette}
                        checked={request.palette === palette}
                        onChange={updateField("palette")}
                      />{" "}
                      {palette}
                    </label>
                  ))}
                </div>
              </div>
              <div className="field">
                <label htmlFor="cb-budget">Budget (₹)</label>
                <input
                  className="input"
                  type="text"
                  id="cb-budget"
                  value={request.budget}
                  onChange={updateField("budget")}
                  placeholder="e.g. 2,000 — 3,000"
                />
              </div>
              <div className="field">
                <label htmlFor="cb-date">Needed by</label>
                <input
                  className="input"
                  type="date"
                  id="cb-date"
                  value={request.date}
                  onChange={updateField("date")}
                />
              </div>
              <div className="field full">
                <label htmlFor="cb-notes">Anything else we should know?</label>
                <textarea
                  id="cb-notes"
                  rows="4"
                  value={request.notes}
                  onChange={updateField("notes")}
                  placeholder="Favourite flowers, allergies, delivery address..."
                ></textarea>
              </div>
            </div>
            <p
              style={{
                display: note ? "block" : "none",
                color: "var(--brand)",
                marginTop: "1rem",
                fontWeight: "500",
              }}
            >
              {note}
            </p>
            <button
              className="btn btn-primary mt-2"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Sending…" : "Send Custom Request"}
            </button>
          </form>
        </div>
      </section>
      {/* DELIVERY INFO */}
      <section className="section section-alt" id="delivery">
        <div className="container split">
          <div>
            <div className="eyebrow">
              <span className="rule"></span>Delivery
            </div>
            <h2>Flower delivery information</h2>
            <ul className="info-list mt-2">
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Same-day delivery: </strong>
                  <span>
                    Order before 3pm for delivery within city limits today. Enjoy fresh arrangements delivered promptly to your doorstep.
                  </span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Scheduled delivery: </strong>
                  <span>
                    Choose your preferred date and convenient 2-hour delivery window. Schedule orders up to 30 days in advance.
                  </span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>City-wide coverage: </strong>
                  <span>
                   We deliver across the city with reliable local service. Wider-area delivery is also available upon special request.
                  </span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Handled with care: </strong>
                  <span>Every arrangement is hand-carried in fresh water buckets. Flowers are never boxed flat, ensuring they arrive beautifully.</span>
                </div>
              </li>
            </ul>
          </div>
          <div
            className="split-media"
            aria-hidden="true"
            style={{ "--split-photo": "url('/images/inside9.png')" }}
          ></div>
        </div>
      </section>
      {/* ADVANCED SECTION 1: INTERACTIVE EVENT FLORALS CONCEPT & BUDGET ESTIMATOR */}
      <section className="section section-alt" id="estimator-section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Interactive Estimator
              <span className="rule"></span>
            </div>
            <h2>Event florals concept & budget estimator</h2>
            <p>
              Choose your celebration scale, styling density, and color palette
              to calculate estimated stems, table counts, and transparent budget
              expectations in real-time.
            </p>
          </div>
          <div className="estimator-container" id="event-estimator">
            <div className="estimator-layout">
              {/* Controls Panel */}
              <div className="estimator-form">
                {/* Event Type */}
                <div className="estimator-group">
                  <label>1. Celebration Type</label>
                  <div className="estimator-options" data-est-group="type">
                    <button
                      type="button"
                      className="estimator-opt-btn is-active"
                      data-est-val="wedding"
                    >
                      Wedding
                    </button>
                    <button
                      type="button"
                      className="estimator-opt-btn"
                      data-est-val="corporate"
                    >
                      Corporate
                    </button>
                    <button
                      type="button"
                      className="estimator-opt-btn"
                      data-est-val="intimate"
                    >
                      Intimate Soirée
                    </button>
                    <button
                      type="button"
                      className="estimator-opt-btn"
                      data-est-val="gala"
                    >
                      Ballroom Gala
                    </button>
                  </div>
                </div>
                {/* Scale */}
                <div className="estimator-group">
                  <label>2. Guest Count & Scope</label>
                  <div className="estimator-options" data-est-group="scale">
                    <button
                      type="button"
                      className="estimator-opt-btn"
                      data-est-val="30"
                    >
                      Up to 30 Guests
                    </button>
                    <button
                      type="button"
                      className="estimator-opt-btn is-active"
                      data-est-val="100"
                    >
                      100 Guests
                    </button>
                    <button
                      type="button"
                      className="estimator-opt-btn"
                      data-est-val="250"
                    >
                      250 Guests
                    </button>
                    <button
                      type="button"
                      className="estimator-opt-btn"
                      data-est-val="500"
                    >
                      500+ Guests
                    </button>
                  </div>
                </div>
                {/* Density */}
                <div className="estimator-group">
                  <label>3. Floral Styling Density</label>
                  <div className="estimator-options" data-est-group="density">
                    <button
                      type="button"
                      className="estimator-opt-btn"
                      data-est-val="minimalist"
                    >
                      Minimalist Ikebana
                    </button>
                    <button
                      type="button"
                      className="estimator-opt-btn is-active"
                      data-est-val="balanced"
                    >
                      Balanced Garden Luxe
                    </button>
                    <button
                      type="button"
                      className="estimator-opt-btn"
                      data-est-val="opulent"
                    >
                      Opulent Cascading
                    </button>
                  </div>
                </div>
                {/* Palette */}
                <div className="estimator-group">
                  <label>4. Preferred Palette Story</label>
                  <div className="estimator-options" data-est-group="palette">
                    <button
                      type="button"
                      className="estimator-opt-btn is-active"
                      data-est-val="wine"
                    >
                      Velvet Wine
                    </button>
                    <button
                      type="button"
                      className="estimator-opt-btn"
                      data-est-val="botanical"
                    >
                      Verde & Crisp Ivory
                    </button>
                    <button
                      type="button"
                      className="estimator-opt-btn"
                      data-est-val="pastel"
                    >
                      Soft Pastel Whisper
                    </button>
                    <button
                      type="button"
                      className="estimator-opt-btn"
                      data-est-val="gold"
                    >
                      Sunlit Coastal Gold
                    </button>
                  </div>
                </div>
              </div>
              {/* Dynamic Live Output Card */}
              <div className="estimator-summary-card">
                <div>
                  <span className="estimator-calc-title">
                    Estimated Concept Budget
                  </span>
                  <div
                    className="estimator-price-display mt-2"
                    id="est-price-val"
                  >
                    ₹45,000
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      marginTop: ".3rem",
                    }}
                  >
                    *Final pricing confirmed after venue inspection.
                  </p>
                </div>
                <div className="estimator-breakdown-list">
                  <div className="estimator-breakdown-row">
                    <span>Calculated Stems:</span>
                    <strong id="est-stems-val">350 premium stems</strong>
                  </div>
                  <div className="estimator-breakdown-row">
                    <span>Table Centrepieces:</span>
                    <strong id="est-tables-val">
                      13 tables (13 centrepieces)
                    </strong>
                  </div>
                  <div className="estimator-breakdown-row">
                    <span>Scope Coverage:</span>
                    <strong id="est-setups-val">
                      Ceremony Arch + Bridal Set + Reception
                    </strong>
                  </div>
                  <div
                    className="estimator-breakdown-row"
                    style={{
                      flexDirection: "column",
                      gap: ".25rem",
                      marginTop: ".4rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--brand)",
                        fontWeight: "700",
                      }}
                    >
                      Palette Recipe Preview:
                    </span>
                    <span
                      id="est-palette-note"
                      style={{
                        fontSize: "12px",
                        color: "var(--text)",
                        lineHeight: "1.5",
                      }}
                    >
                      Velvet wine roses, deep dahlias, cascading eucalyptus,
                      dark berries.
                    </span>
                  </div>
                </div>
                <Link
                  to="/contact?type=event-quote"
                  className="btn btn-primary btn-block"
                >
                  Lock In This Concept & Enquire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ADVANCED SECTION 2: CORPORATE & COMMERCIAL FLORAL RETAINERS */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Commercial Florals
              <span className="rule"></span>
            </div>
            <h2>Corporate botanical retainers & hospitality styling</h2>
            <p>
              Enhance hotels, flagship corporate offices, and luxury boutiques
              with scheduled fresh morning flower rotations and dedicated
              florist management.
            </p>
          </div>
          <div className="corporate-grid">
            <article className="corporate-card">
              <div className="corporate-icon-wrap">🏢</div>
              <h3>Weekly Lobby & Reception Rotations</h3>
              <p>
                Architectural statement arrangements designed in bespoke ceramic
                vessels, delivered and staged every Monday before business doors
                open.
              </p>
              <div className="vitality-metrics" style={{ marginTop: ".4rem" }}>
                <div>
                  <div className="vitality-metric-row">
                    <span>Air-Purifying Botanical Blend</span>
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
              <div className="corporate-sla-badge">
                <span>✓ 24-Hour Wilt Replacement Guarantee</span>
              </div>
            </article>
            <article className="corporate-card">
              <div className="corporate-icon-wrap">🎁</div>
              <h3>Executive Gifting & Client Milestones</h3>
              <p>
                Seamless concierge gifting for client celebrations, corporate
                partnerships, and employee milestones, paired with
                company-embossed velvet ribbons.
              </p>
              <div className="vitality-metrics" style={{ marginTop: ".4rem" }}>
                <div>
                  <div className="vitality-metric-row">
                    <span>On-Time Same-Day SLA</span>
                    <span>99.8%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ "--progress": "99.8%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="corporate-sla-badge">
                <span>✓ Dedicated Account Florist</span>
              </div>
            </article>
            <article className="corporate-card">
              <div className="corporate-icon-wrap">✨</div>
              <h3>Brand Activations & Media Galas</h3>
              <p>
                Complete floral photo backdrops, botanical runway staging, and
                immersive floral scent styling tailored specifically to your
                brand identity.
              </p>
              <div className="vitality-metrics" style={{ marginTop: ".4rem" }}>
                <div>
                  <div className="vitality-metric-row">
                    <span>Zero-Waste Floral Composting</span>
                    <span>100%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ "--progress": "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="corporate-sla-badge">
                <span>✓ Full On-Site Setup & Teardown</span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
