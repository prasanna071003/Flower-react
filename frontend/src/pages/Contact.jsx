import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import { submitContactMessage } from "../services/contactService";
import SEO from "../components/SEO";

const SUBJECTS = [
  "General enquiry",
  "Order support",
  "Wedding & event enquiry",
  "Custom bouquet",
];
const PLAN_LABELS = {
  petite: "Petite Bloom",
  signature: "Signature Bloom",
  grand: "Grand Bloom",
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General enquiry",
    message: "",
  });
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  usePageEffects();

  useEffect(() => {
    const type = searchParams.get("type");
    const plan = searchParams.get("plan");
    if (type === "event-quote") {
      setForm((current) => ({
        ...current,
        subject: "Wedding & event enquiry",
      }));
    }
    if (plan && PLAN_LABELS[plan]) {
      setForm((current) => ({
        ...current,
        message:
          current.message ||
          `I'd like to subscribe to the ${PLAN_LABELS[plan]} plan.`,
      }));
    }
  }, [searchParams]);

  function updateField(field) {
    return (event) =>
      setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setNote("");
    try {
      const payload = await submitContactMessage(form);
      setNote(
        payload.message ||
          "Message sent — we'll get back to you within a few hours.",
      );
      setForm({ name: "", email: "", subject: "General enquiry", message: "" });
    } catch (error) {
      setNote(
        error.message || "Could not send your message. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Reach the Noor & Bloom studio — send a message, call, or email for order support, wedding and event enquiries, or a custom bouquet request."
      />
      <section
        className="page-header"
        style={{ "--header-photo": "url('/images/contact_banner.png')" }}
      >
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            {/* <span className="rule"></span>Contact<span className="rule"></span> */}
          </div>
          <h1>Contact</h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / Contact
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <form className="form-card" onSubmit={handleSubmit}>
            <h2 className="mt-2" style={{ marginBottom: "1.2rem" }}>
              Send a message
            </h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="c-name">Full name</label>
                <input
                  className="input"
                  type="text"
                  id="c-name"
                  value={form.name}
                  onChange={updateField("name")}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input
                  className="input"
                  type="email"
                  id="c-email"
                  value={form.email}
                  onChange={updateField("email")}
                  required
                />
              </div>
              <div className="field full">
                <label htmlFor="c-subject">Subject</label>
                <select
                  className="select"
                  id="c-subject"
                  value={form.subject}
                  onChange={updateField("subject")}
                >
                  {SUBJECTS.map((subject) => (
                    <option key={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div className="field full">
                <label htmlFor="c-message">Message</label>
                <textarea
                  id="c-message"
                  rows="5"
                  value={form.message}
                  onChange={updateField("message")}
                  required
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
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
          <div>
            <ul className="info-list">
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Boutique Location: </strong>
                  <span>1285 Madison Avenue, New York, NY 10028, USA</span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Direct Line: </strong>
                  <span>+1 (212) 555-0186, +1 (917) 555-0248</span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>General Inquiries: </strong>
                  <span>: hello@noorbloom.com, orders@noorbloom.com</span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Business Hours: </strong>
                  <span>Mon — Sun, 8:00am — 8:00pm</span>
                </div>
              </li>
            </ul>
            <div
              className="map-frame mt-2"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #008aa6, transparent), url('/images/inside3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </section>
      <section className="section section-alt" id="faq">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>FAQ<span className="rule"></span>
            </div>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="grid grid-2">
            <div className="card">
              <div className="card-body">
                <h3>How far in advance should I book a wedding?</h3>
                <p>
                  We recommend 2—3 months ahead for full event styling, though
                  we can often accommodate shorter notice for smaller packages.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>Can I request flowers you don't currently list?</h3>
                <p>
                  Yes — use the custom bouquet request form and tell us what
                  you're picturing; we'll confirm availability and price.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>What if I need to change a delivery time?</h3>
                <p>
                  Contact us at least 3 hours before the scheduled slot and
                  we'll rearrange it free of charge.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>Do you offer subscriptions?</h3>
                <p>
                  Weekly and fortnightly flower subscriptions are available —
                  ask us about pricing when you get in touch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ADVANCED SECTION 1: CONSULTATION & BOOKING ROADMAP */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>How We Work
              <span className="rule"></span>
            </div>
            <h2>Studio consultation & event booking roadmap</h2>
            <p>
              From your initial note to wedding morning setup, here is how our
              florists bring your floral vision to life.
            </p>
          </div>
          <div className="roadmap-grid">
            <article className="roadmap-card">
              <div className="roadmap-num">
                <span>01</span>
                <span className="roadmap-step-badge">Discovery</span>
              </div>
              <h3>Concept Consultation</h3>
              <p>
                Share your date, venue location, guest count, and dream vibe. We
                check seasonal stem availability and reserve your date on our
                studio calendar.
              </p>
              <div className="vitality-tag-list" style={{ marginTop: "auto" }}>
                <span className="tag">Free 20-min Call</span>
                <span className="tag">Within 24h</span>
              </div>
            </article>
            <article className="roadmap-card">
              <div className="roadmap-num">
                <span>02</span>
                <span className="roadmap-step-badge">Design</span>
              </div>
              <h3>Moodboard & Palette Deck</h3>
              <p>
                Our floral stylists draft a custom visual moodboard featuring
                exact Pantone color tones, primary focal stems, foliage balance,
                and transparent estimates.
              </p>
              <div className="vitality-tag-list" style={{ marginTop: "auto" }}>
                <span className="tag">Digital Deck</span>
                <span className="tag">Transparent Quote</span>
              </div>
            </article>
            <article className="roadmap-card">
              <div className="roadmap-num">
                <span>03</span>
                <span className="roadmap-step-badge">Preview</span>
              </div>
              <h3>Mockup & Stem Sign-Off</h3>
              <p>
                Visit our boutique to preview physical stem pairings and
                tabletop arrangements under natural light before locking in the
                final order.
              </p>
              <div className="vitality-tag-list" style={{ marginTop: "auto" }}>
                <span className="tag">Studio Visit</span>
                <span className="tag">Stem Samples</span>
              </div>
            </article>
            <article className="roadmap-card">
              <div className="roadmap-num">
                <span>04</span>
                <span className="roadmap-step-badge">Delivery</span>
              </div>
              <h3>White-Glove Installation</h3>
              <p>
                Our experienced floral team arrives on-site early on event day
                in temperature-regulated vans to construct arches, style tables,
                and ensure zero stress.
              </p>
              <div className="vitality-tag-list" style={{ marginTop: "auto" }}>
                <span className="tag">On-Site Setup</span>
                <span className="tag">Teardown Option</span>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* ADVANCED SECTION 2: STUDIO CONCIERGE & LIVE OPERATIONAL RADAR */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Live Concierge
              <span className="rule"></span>
            </div>
            <h2>Direct concierge channels & response promise</h2>
            <p>
              Whether you need urgent same-day bouquet assistance or full
              wedding consultation, connect directly with the team.
            </p>
          </div>
          <div className="radar-grid">
            <div className="radar-channels">
              <a href="tel:+919876543210" className="radar-channel-card">
                <div className="radar-channel-left">
                  <div className="radar-channel-icon">📞</div>
                  <div className="radar-channel-info">
                    <strong>Express Telephone Desk</strong>
                    <span>
                      Instant dispatch updates & urgent custom queries
                    </span>
                  </div>
                </div>
                <span className="tag">{"<"} 1 min reply</span>
              </a>
              <a
                href="mailto:hello@noorbloom.com"
                className="radar-channel-card"
              >
                <div className="radar-channel-left">
                  <div className="radar-channel-icon">✉</div>
                  <div className="radar-channel-info">
                    <strong>Weddings & Corporate Desk</strong>
                    <span>
                      Detailed proposals, venue moodboards & retainers
                    </span>
                  </div>
                </div>
                <span className="tag">{"<"} 2 hrs reply</span>
              </a>
              <div className="radar-channel-card">
                <div className="radar-channel-left">
                  <div className="radar-channel-icon">📍</div>
                  <div className="radar-channel-info">
                    <strong>Walk-In Studio Bar</strong>
                    <span>
                      24 Marigold Lane, Chennai (Open Daily 8am – 8pm)
                    </span>
                  </div>
                </div>
                <span
                  className="tag"
                  style={{ background: "var(--brand)", color: "#ffffff" }}
                >
                  Open Now
                </span>
              </div>
            </div>
            <div className="radar-metrics-box">
              <h3 style={{ fontSize: "18px", marginBottom: ".4rem" }}>
                Live Studio Operational Radar
              </h3>
              <div className="radar-metric-item">
                <div className="radar-metric-header">
                  <span>Customer Inquiry Response Rate</span>
                  <span>98%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ "--progress": "98%" }}
                  ></div>
                </div>
              </div>
              <div className="radar-metric-item">
                <div className="radar-metric-header">
                  <span>Same-Day City Delivery Capacity</span>
                  <span>92%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ "--progress": "92%" }}
                  ></div>
                </div>
              </div>
              <div className="radar-metric-item">
                <div className="radar-metric-header">
                  <span>Seasonal Cold-Chain Freshness Rating</span>
                  <span>99%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ "--progress": "99%" }}
                  ></div>
                </div>
              </div>
              <div className="radar-metric-item">
                <div className="radar-metric-header">
                  <span>Event On-Time Setup Precision</span>
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
          </div>
        </div>
      </section>
    </>
  );
}
