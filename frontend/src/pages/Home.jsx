import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import { fetchFlowers } from "../services/flowerService";
import { formatPrice } from "../utils/format";
import SEO, { getSiteUrl, absoluteUrl } from "../components/SEO";

const floristJsonLd = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: "Noor & Bloom",
  alternateName: "Noor & Bloom Flower Boutique",
  url: getSiteUrl(),
  description:
    "Flower boutique and floral studio offering fresh hand-tied bouquets, seasonal flower collections, wedding and event florals, and custom arrangements, with same-day delivery across Chennai.",
  image: absoluteUrl("/images/banner-1.png"),
  areaServed: "Chennai, Tamil Nadu, India",
};

export default function Home() {
  const [picks, setPicks] = useState([]);
  const [picksNote, setPicksNote] = useState("Loading this week's picks…");

  usePageEffects();

  useEffect(() => {
    let active = true;
    fetchFlowers({ featured: true, limit: 4 })
      .then((data) => {
        if (active) setPicks(data.flowers || []);
      })
      .catch((err) => {
        if (active) setPicksNote(err.message);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="Noor & Bloom — Flower Boutique & Floral Studio"
        description="Fresh, hand-tied blooms from Noor & Bloom — seasonal flower collections, wedding and event florals, and custom bouquets, delivered the same day across Chennai."
        image="/images/banner-1.png"
        jsonLd={floristJsonLd}
      />
      {/* HERO */}
      <section className="luxury-hero home-one-banner">
        <div className="luxury-hero-backdrop" aria-hidden="true"></div>
        <div className="container luxury-hero-layout">
          <div className="hero-copy">
            <div className="eyebrow luxury-hero-tag">
              <span className="rule"></span>Flower Boutique & Floral Studio
            </div>
            <h1>
              Fresh blooms, hand-tied
              <br />
              for your softest moments.
            </h1>
            <p className="lede">
              Crimson Bloom grows every arrangement around the season's best
              stems — from everyday bunches to wedding-scale florals — cut,
              tied, and delivered the same day.
            </p>
            <div className="hero-actions">
              <Link to="/flowers" className="btn btn-primary">
                Shop the Collections
              </Link>
              <Link to="/services#custom" className="btn btn-outline">
                Request a Custom Bouquet
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>120+</strong>
                <span>Seasonal varieties</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>From 2,300 orders</span>
              </div>
              <div>
                <strong>Same-day</strong>
                <span>City delivery</span>
              </div>
            </div>
          </div>
          <aside className="luxury-hero-panel" aria-label="Customer highlights">
            <div className="luxury-hero-card">
              <div className="luxury-hero-value">2,250+</div>
              <div className="luxury-hero-title">Happy Clients</div>
              <div className="luxury-hero-avatars" aria-hidden="true">
                <span className="avatar avatar-one">A</span>
                <span className="avatar avatar-two">S</span>
                <span className="avatar avatar-three">R</span>
              </div>
              <p className="luxury-hero-quote">
                "Trust us with every floral story."
              </p>
            </div>
            <div className="luxury-social-stack" aria-label="Follow us">
              <a href="#" aria-label="Facebook">
                f
              </a>
              <a href="#" aria-label="LinkedIn">
                in
              </a>
              <a href="#" aria-label="Twitter">
                x
              </a>
              <a href="#" aria-label="Pinterest">
                p
              </a>
              <a href="#" aria-label="Instagram">
                in
              </a>
            </div>
          </aside>
        </div>
      </section>
      {/* SEASONAL STRIP */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="rule"></span>This Week's Picks
            </div>
            <h2>Flower collections & seasonal arrangements</h2>
            <p>
              A rotating edit of what's freshest at the market this week —
              swapped out as soon as a better bloom comes in. Every week brings
              a new favorite to our tables, captured at the exact moment of
              perfect bloom.
            </p>
          </div>
          <div className="grid grid-4">
            {picks.map((flower) => (
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
                </div>
              </article>
            ))}
          </div>
          {picks.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                marginTop: "2rem",
                color: "var(--text-muted)",
              }}
            >
              {picksNote}
            </p>
          ) : null}
          <div className="text-center mt-3">
            <Link to="/flowers" className="btn btn-outline">
              View All Collections
            </Link>
          </div>
        </div>
      </section>
      {/* ABOUT / SIGNATURE SPLIT */}
      <section className="section">
        <div className="container split">
          <div
            className="split-media"
            aria-hidden="true"
            style={{ "--split-photo": "url('/images/inside9.png')" }}
          ></div>
          <div>
            <div className="eyebrow">
              <span className="rule"></span>Why Crimson Bloom
            </div>
            <h2>Every stem is chosen your way.</h2>
            <p>
              We work directly with growers, cut early, and build each order by
              hand in our wine-toned studio — no set forms, just arrangements
              shaped around colour, scent, and occasion. We partner with
              regional farms to source seasonal stems at peak freshness,
              ensuring long-lasting vibrancy in every stem.
            </p>
            <ul className="feature-list">
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Market-fresh sourcing</strong>
                  <span>
                    Freshly selected blooms arrive daily from trusted local
                    growers, ensuring every arrangement feels vibrant, natural,
                    and beautifully fresh.
                  </span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Made for the occasion</strong>
                  <span>
                    Every arrangement is thoughtfully crafted to match the
                    moment, the mood, and the people you're celebrating.{" "}
                  </span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Careful delivery</strong>
                  <span>
                    Each arrangement is prepared with care and hand-carried to
                    preserve its natural beauty, freshness, and delicate form
                    from our boutique to your doorstep.
                  </span>
                </div>
              </li>
            </ul>
            <Link to="/about" className="btn btn-primary mt-2">
              Our Story
            </Link>
          </div>
        </div>
      </section>
      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Kind Words
              <span className="rule"></span>
            </div>
            <h2>From recent orders</h2>
          </div>
          <div className="grid grid-3">
            <div className="testimonial">
              <div className="stars">★★★★★</div>
              <p>
                "The recipient was absolutely thrilled with the vibrant colors
                and fresh quality of the flowers. Every detail was handled with
                impressive care and professionalism. I will definitely be
                ordering from here again for future special occasions."
              </p>
              <footer>
                <span className="avatar-mark">A</span>
                <div>
                  <strong>Aarav Mehta</strong>
                  <span>Anniversary order</span>
                </div>
              </footer>
            </div>
            <div className="testimonial">
              <div className="stars">★★★★★</div>
              <p>
                "Our wedding arch was exactly the moody, romantic look we asked
                for. The team handled every last detail, from the deep burgundy
                blooms to the subtle candle lighting. They turned our vision
                into absolute magic, stress-free."
              </p>
              <footer>
                <span className="avatar-mark">S</span>
                <div>
                  <strong>Sana Kapoor</strong>
                  <span>Wedding client</span>
                </div>
              </footer>
            </div>
            <div className="testimonial">
              <div className="stars">★★★★★</div>
              <p>
                "I asked for something 'not too sweet' and they nailed it — deep
                tones, no filler flowers, beautifully wrapped." Finding a
                florist who truly listens to subtle preferences can be rare, but
                this arrangement hit every mark with sophistication."
              </p>
              <footer>
                <span className="avatar-mark">R</span>
                <div>
                  <strong>Rhea Nair</strong>
                  <span>Custom bouquet</span>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </section>
      {/* ADVANCED SECTION 1: INTERACTIVE OCCASION & MOOD FINDER */}
      <section className="section section-alt" id="mood-finder">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Occasion Matcher
              <span className="rule"></span>
            </div>
            <h2>Curated moments & bespoke floral mood finder</h2>
            <p>
              Select your celebration mood to explore tailored floral
              compositions — with fragrance profiles, stem longevity, and
              botanical recipes.
            </p>
          </div>
          <div className="mood-filter-bar">
            <button
              type="button"
              className="mood-chip is-active"
              data-mood-chip="all"
            >
              All Moods
            </button>
            <button
              type="button"
              className="mood-chip"
              data-mood-chip="romance"
            >
              🥂 Romance & Anniversary
            </button>
            <button
              type="button"
              className="mood-chip"
              data-mood-chip="celebration"
            >
              🎂 Joyous Celebration
            </button>
            <button type="button" className="mood-chip" data-mood-chip="zen">
              🌿 Architectural & Zen
            </button>
          </div>
          <div className="mood-grid">
            <article className="mood-card" data-mood-card="romance">
              <div
                className="mood-media"
                style={{ backgroundImage: "url('/images/inside.jpg')" }}
              >
                <span className="mood-badge">Bestseller</span>
                <span className="mood-icon">🍷</span>
              </div>
              <div className="mood-body">
                <h3>Velvet Wine & Deep Rose</h3>
                <p>
                  Layered Dutch garden roses, dark seasonal berries, and
                  cascading eucalyptus for intense, moody romance.
                </p>
                <div className="mood-metrics">
                  <div>
                    <div className="mood-metric-row">
                      <span>Fragrance Intensity</span>
                      <span>92%</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ "--progress": "92%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="mood-metric-row">
                      <span>Vase Longevity (12–14 Days)</span>
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
                <div
                  className="vitality-tag-list"
                  style={{ marginTop: ".6rem" }}
                >
                  <span className="tag">#GardenRoses</span>
                  <span className="tag">#DeepVelvet</span>
                </div>
                <Link
                  to="/flowers"
                  className="btn btn-sm btn-outline mt-2"
                  style={{ width: "100%" }}
                >
                  View Romance Stems
                </Link>
              </div>
            </article>
            <article className="mood-card" data-mood-card="celebration">
              <div
                className="mood-media"
                style={{ backgroundImage: "url('/images/inside3.jpg')" }}
              >
                <span className="mood-badge">Vibrant</span>
                <span className="mood-icon">✨</span>
              </div>
              <div className="mood-body">
                <h3>Sunlit Peach & Honey Ranunculus</h3>
                <p>
                  A cheerful symphony of soft blush tulips, honey ranunculus,
                  and wild chamomile to light up birthdays and milestones.
                </p>
                <div className="mood-metrics">
                  <div>
                    <div className="mood-metric-row">
                      <span>Fragrance Intensity</span>
                      <span>78%</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ "--progress": "78%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="mood-metric-row">
                      <span>Vase Longevity (10–12 Days)</span>
                      <span>88%</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ "--progress": "88%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  className="vitality-tag-list"
                  style={{ marginTop: ".6rem" }}
                >
                  <span className="tag">#PastelCharm</span>
                  <span className="tag">#FreshTulips</span>
                </div>
                <Link
                  to="/flowers"
                  className="btn btn-sm btn-outline mt-2"
                  style={{ width: "100%" }}
                >
                  View Celebration Stems
                </Link>
              </div>
            </article>
            <article className="mood-card" data-mood-card="zen">
              <div
                className="mood-media"
                style={{ backgroundImage: "url('/images/inside6.jpg')" }}
              >
                <span className="mood-badge">Sculptural</span>
                <span className="mood-icon">🌿</span>
              </div>
              <div className="mood-body">
                <h3>Midnight Orchid & Ikebana Calm</h3>
                <p>
                  Architectural single-stem orchid in handmade stoneware,
                  focusing on serene negative space and enduring beauty.
                </p>
                <div className="mood-metrics">
                  <div>
                    <div className="mood-metric-row">
                      <span>Fragrance Intensity</span>
                      <span>65%</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ "--progress": "65%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="mood-metric-row">
                      <span>Vase Longevity (18–21 Days)</span>
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
                <div
                  className="vitality-tag-list"
                  style={{ marginTop: ".6rem" }}
                >
                  <span className="tag">#ModernIkebana</span>
                  <span className="tag">#RareOrchids</span>
                </div>
                <Link
                  to="/flowers"
                  className="btn btn-sm btn-outline mt-2"
                  style={{ width: "100%" }}
                >
                  View Zen Stems
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* ADVANCED SECTION 2: FARM-TO-VASE QUALITY JOURNEY */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Our Standard
              <span className="rule"></span>
            </div>
            <h2>From dawn harvest to living display — the quality journey</h2>
            <p>
              Every single stem passes through four strict conditioning
              milestones before reaching your doorstep in pristine condition.
            </p>
          </div>
          <div className="journey-grid">
            <article className="journey-card">
              <div className="journey-top">
                <span className="journey-time">5:00 AM</span>
                <span className="journey-step-icon">🌅</span>
              </div>
              <h3>01. Dawn Cold-Harvest</h3>
              <p>
                Cut at first light directly from regional partner growers when
                cell hydration pressure is at its peak.
              </p>
              <div className="journey-progress-wrap">
                <div className="journey-metric-label">
                  <span>Harvest Freshness</span>
                  <span>99%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ "--progress": "99%" }}
                  ></div>
                </div>
              </div>
            </article>
            <article className="journey-card">
              <div className="journey-top">
                <span className="journey-time">8:00 AM</span>
                <span className="journey-step-icon">🧪</span>
              </div>
              <h3>02. Chilled Conditioning</h3>
              <p>
                Stems rest in 4°C temperature-controlled electrolyte water to
                cleanse vascular pathways and extend life.
              </p>
              <div className="journey-progress-wrap">
                <div className="journey-metric-label">
                  <span>Longevity Boost</span>
                  <span>+5 Days</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ "--progress": "95%" }}
                  ></div>
                </div>
              </div>
            </article>
            <article className="journey-card">
              <div className="journey-top">
                <span className="journey-time">11:00 AM</span>
                <span className="journey-step-icon">✂️</span>
              </div>
              <h3>03. Foam-Free Artistry</h3>
              <p>
                Hand-tied using dynamic spiral techniques with natural raffia,
                completely eliminating toxic floral foam.
              </p>
              <div className="journey-progress-wrap">
                <div className="journey-metric-label">
                  <span>Eco Purity Rating</span>
                  <span>100%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ "--progress": "100%" }}
                  ></div>
                </div>
              </div>
            </article>
            <article className="journey-card">
              <div className="journey-top">
                <span className="journey-time">2:00 PM</span>
                <span className="journey-step-icon">🚚</span>
              </div>
              <h3>04. Living Water Dispatch</h3>
              <p>
                Transported upright in living water reservoirs across Chennai,
                ensuring zero wilting or flat packaging.
              </p>
              <div className="journey-progress-wrap">
                <div className="journey-metric-label">
                  <span>On-Time SLA</span>
                  <span>98.6%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ "--progress": "98.6%" }}
                  ></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Our Difference
              <span className="rule"></span>
            </div>
            <h2>
              Small details, felt from the first message to the final stem.
            </h2>
          </div>
          <div className="stat-strip">
            <div>
              <strong>8am</strong>
              <span>Market sourcing starts</span>
            </div>
            <div>
              <strong>3pm</strong>
              <span>Same-day order cut-off</span>
            </div>
            <div>
              <strong>30 min</strong>
              <span>Rider arrival heads-up</span>
            </div>
            <div>
              <strong>7 days</strong>
              <span>Support after delivery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Flower Care
              <span className="rule"></span>
            </div>
            <h2>How to keep every arrangement looking fresh</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <div className="card-body">
                <span
                  className="dot"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    background: "var(--brand-soft)",
                    color: "var(--brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✦
                </span>
                <h3 className="mt-2">Trim stems</h3>
                <p>
                  Regular flower care prevents bacteria from clogging the cut
                  ends and blocking hydration. Removing an inch of the stem
                  opens fresh tissue, allowing the flowers to drink efficiently
                  and maintain optimal bloom pressure.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <span
                  className="dot"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    background: "var(--brand-soft)",
                    color: "var(--brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✦
                </span>
                <h3 className="mt-2">Skip sunlight</h3>
                <p>
                  Ethylene gas naturally emitted by ripening fruit acts as an
                  aging hormone for flowers, causing petals to wilt, drop, and
                  fade prematurely. Likewise, direct heat sources like
                  radiators, bright sunny windows causeflower decay.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <span
                  className="dot"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    background: "var(--brand-soft)",
                    color: "var(--brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✦
                </span>
                <h3 className="mt-2">Hydrate gently</h3>
                <p>
                  Fresh water and targeted nutrients form the foundation of
                  long-lasting flower arrangements. By suppressing bacterial
                  growth and feeding the cut stems, this essential routine
                  ensures your floral display stays fresh for days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container studio-pulse" data-pulse>
          <div
            className="pulse-image"
            style={{ "--pulse-photo": "url('/images/inside9.png')" }}
            role="img"
            aria-label="Blue and white hand-tied flower arrangement"
          ></div>
          <div className="pulse-content">
            <div className="eyebrow">
              <span className="rule"></span>Studio Pulse
            </div>
            <h2>A closer look at the care behind the counter.</h2>
            <p className="pulse-intro">
              Every order moves through a small, deliberate rhythm: fresh stems
              arrive, florists shape the composition, and our delivery team
              protects the finished arrangement on its way to you.
            </p>
            <div className="pulse-counters">
              <div className="pulse-counter">
                <strong data-counter="120">0</strong>
                <span>Seasonal varieties</span>
              </div>
              <div className="pulse-counter">
                <strong data-counter="2300">0</strong>
                <span>Orders delivered</span>
              </div>
              <div className="pulse-counter">
                <strong data-counter="98">0</strong>
                <span>On-time deliveries %</span>
              </div>
              <div className="pulse-counter">
                <strong data-counter="7">0</strong>
                <span>Days of care support</span>
              </div>
            </div>
            <div className="pulse-tools">
              <div className="pulse-tool">
                <span className="pulse-tool-icon">✦</span>
                <strong>Freshly sourced</strong>
                <span>Market-picked every morning.</span>
              </div>
              <div className="pulse-tool">
                <span className="pulse-tool-icon">✓</span>
                <strong>Hand checked</strong>
                <span>Every stem earns its place.</span>
              </div>
              <div className="pulse-tool">
                <span className="pulse-tool-icon">→</span>
                <strong>Carefully carried</strong>
                <span>Protected until it arrives.</span>
              </div>
            </div>
            <div className="pulse-progress">
              <div className="pulse-progress-row">
                <strong>Order readiness</strong>
                <span>92%</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ "--progress": "92%" }}
                ></div>
              </div>
            </div>
            <div className="pulse-progress">
              <div className="pulse-progress-row">
                <strong>Seasonal freshness</strong>
                <span>86%</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ "--progress": "86%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="promo-banner">
            <div>
              <h2>Book your next bloom with us</h2>
              <p>
                From daily bouquets to wedding styling, we design around what
                feels right for you.
              </p>
            </div>
            <Link
              to="/contact"
              className="btn"
              style={{ background: "var(--on-brand)", color: "var(--brand)" }}
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="rule"></span>Seasonal Journal
            </div>
            <h2>Fresh ideas for every kind of moment.</h2>
          </div>
          <div className="story-slider" data-slider>
            <div className="story-slides">
              <article className="story-slide">
                <div
                  className="story-slide-media"
                  style={{ "--slide-photo": "url('/images/inside.jpg')" }}
                ></div>
                <div>
                  <h3>Make the everyday feel special</h3>
                  <p>
                    There is an inherent poetry in giving something that will
                    inevitably fade. Unlike object gifts that gather dust on a
                    shelf, cut flowers force us to slow down and anchor
                    ourselves in the now. Taking the time to trim the stems,
                    change the water, and place them where the morning light
                    hits just right transforms an ordinary countertop into a
                    moment of intentional pause, turning routine home
                    maintenance into a quiet ritual of appreciation.
                  </p>
                </div>
              </article>
              <article className="story-slide">
                <div
                  className="story-slide-media"
                  style={{ "--slide-photo": "url('/images/inside3.jpg')" }}
                ></div>
                <div>
                  <h3>Follow the season</h3>
                  <p>
                    Golden light stretches across the afternoon, warming rich
                    earth that now hums with quiet abundance. Heavy blooms of
                    garden roses, majestic delphinium, and deep indigo irises
                    take center stage, boasting saturated hues forged by long
                    sun-drenched days. Lush foliage and full, unraveling petals
                    fill the air with a honeyed sweetness, capturing the
                    intoxicating, unhurried peak of display of warmth before the
                    landscape settles into rest midsummer.
                  </p>
                </div>
              </article>
              <article className="story-slide">
                <div
                  className="story-slide-media"
                  style={{ "--slide-photo": "url('/images/inside5.jpg')" }}
                ></div>
                <div>
                  <h3>Give something personal</h3>
                  <p>
                    Long after the ribbon has frayed and the wrapping has been
                    discarded, these objects settle into the background of daily
                    life, quietly holding their ground. They sit on a cluttered
                    desk or a bedside table, acting as silent sentinels of a
                    shared history. They remind us that we do not have to
                    navigate this loud, hurried life entirely alone, because
                    somewhere along the way, someone took the time to map our
                    inner world and hand a piece of it right back to us.
                  </p>
                </div>
              </article>
            </div>
            <div className="story-controls">
              <button
                className="story-control"
                type="button"
                data-slider-prev
                aria-label="Previous slide"
              >
                ←
              </button>
              <div className="story-dots" aria-label="Choose slide">
                <button
                  className="story-dot is-active"
                  type="button"
                  data-slider-dot="0"
                  aria-label="Show slide 1"
                ></button>
                <button
                  className="story-dot"
                  type="button"
                  data-slider-dot="1"
                  aria-label="Show slide 2"
                ></button>
                <button
                  className="story-dot"
                  type="button"
                  data-slider-dot="2"
                  aria-label="Show slide 3"
                ></button>
              </div>
              <button
                className="story-control"
                type="button"
                data-slider-next
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
