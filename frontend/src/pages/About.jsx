import { Link } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import SEO from "../components/SEO";

export default function About() {
  usePageEffects();

  return (
    <>
      <SEO
        title="About Us"
        description="Our story: Noor & Bloom began in 2016 as a single flower bucket at a weekend market stall, and is now a small studio of florists building every order by hand."
        image="/images/about_banner.png"
      />
      <section
        className="page-header"
        style={{ "--header-photo": "url('/images/about_banner.png')" }}
      >
        <div className="container">
          {/* <div class="eyebrow" style="justify-content:center;"><span class="rule"></span><span class="rule"></span></div> */}
          <h1>About Us</h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / About
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <div className="eyebrow">
              <span className="rule"></span>Our Story
            </div>
            <h2>Started at a kitchen table, still run that way</h2>
            <p>
              Noor & Bloom began in 2016 as a single flower bucket at a weekend
              market stall. What people kept coming back for wasn't a catalogue
              of set bouquets — it was arrangements built around what looked
              good together that morning, and around what the moment actually
              needed.
            </p>
            <p className="mt-2">
              Today we're a small studio of florists, but the approach hasn't
              changed: we buy in small batches, work with what's in season, and
              build every order by hand — from a single stem to a full wedding.
              Every arrangement still leaves the studio checked over by hand
              before it's delivered. In an era increasingly dominated by
              automated assembly lines and rapid fulfillment centers,
              maintaining a hands-on review process ensures that craftsmanship
              remains at the heart of our work.
            </p>
          </div>
          <div
            className="split-media"
            aria-hidden="true"
            style={{ "--split-photo": "url('/images/inside9.png')" }}
          ></div>
        </div>
      </section>

      <section className="section section-alt about-composition">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Design Theory
              <span className="rule"></span>
            </div>
            <h2>The anatomy of a Noor & Bloom composition</h2>
            <p>
              We balance natural geometry, organic flow, and precise color
              harmonies so every bouquet feels sculptural, breathing, and
              cohesive.
            </p>
          </div>
          <div className="about-composition-layout">
            <article className="about-balance-panel">
              <h3>Golden Ratio Floral Balance</h3>
              <p>
                Every arrangement is built on our three-tier proportion
                framework, ensuring no single stem overwhelms the natural
                balance.
              </p>
              <div
                className="about-balance-bar"
                role="img"
                aria-label="45 percent focal blooms, 30 percent foliage and textures, 25 percent airy accents"
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <ul className="about-balance-list">
                <li><span>45% Focal blooms (garden roses, peonies, lilies)</span><strong>45%</strong></li>
                <li><span>30% Foliage and textures (ruscus, eucalyptus, berries)</span><strong>30%</strong></li>
                <li><span>25% Airy accents (sweet peas, waxflower, astilbe)</span><strong>25%</strong></li>
              </ul>
              <div className="about-design-tags">
                <span>Asymmetrical rhythm</span>
                <span>Airy negative space</span>
                <span>Graduated heights</span>
              </div>
            </article>
            <div className="about-palette-grid">
              <article className="about-palette-card">
                <div className="about-palette-swatch palette-romance" aria-hidden="true"></div>
                <h3>Monochromatic Romance</h3>
                <p>Deep velvet burgundy softens into blush for quiet, layered depth.</p>
              </article>
              <article className="about-palette-card">
                <div className="about-palette-swatch palette-botanical" aria-hidden="true"></div>
                <h3>Botanical & Ivory</h3>
                <p>Crisp ivory blooms meet deep teal foliage for a fresh, modern finish.</p>
              </article>
              <article className="about-palette-card">
                <div className="about-palette-swatch palette-midnight" aria-hidden="true"></div>
                <h3>Moody Midnight Contrast</h3>
                <p>Inky plum, terracotta, and peach bring warmth to evening gatherings.</p>
              </article>
              <article className="about-palette-card">
                <div className="about-palette-swatch palette-coastal" aria-hidden="true"></div>
                <h3>Sunlit Coastal Gold</h3>
                <p>Honey tones and coral pair with sea-glass teal for a bright, easy mood.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-seasonal-section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>In Season
              <span className="rule"></span>
            </div>
            <h2>Let the season lead the design</h2>
            <p>Our palette shifts with the market, keeping each arrangement rooted in what is thriving now.</p>
          </div>
          <div className="about-seasonal-grid">
            <article><span>01 / Spring</span><h3>Soft beginnings</h3><p>Ranunculus, tulips, and flowering branches bring a light, unrushed rhythm.</p></article>
            <article><span>02 / Summer</span><h3>Open color</h3><p>Garden roses and airy greens make room for warmth, movement, and long evenings.</p></article>
            <article><span>03 / Autumn</span><h3>Gathered tones</h3><p>Dahlias, berries, and textured foliage add depth without losing their natural ease.</p></article>
            <article><span>04 / Winter</span><h3>Quiet structure</h3><p>Amaryllis, evergreen accents, and sculptural stems create a composed seasonal feel.</p></article>
          </div>
        </div>
      </section>

      <section className="section section-ink about-studio-note">
        <div className="container about-studio-note-layout">
          <div>
            <div className="eyebrow"><span className="rule"></span>Made for the moment</div>
            <h2>A thoughtful arrangement starts with your story.</h2>
            <p>Share the occasion, the feeling, or even a favorite color. Our florists will shape a one-of-a-kind design around it.</p>
          </div>
          <Link to="/services#custom" className="btn btn-primary">Explore custom flowers</Link>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>What We Value
              <span className="rule"></span>
            </div>
            <h2>The principles behind every bouquet</h2>
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
                ></span>
                <h3 className="mt-2">Made with intent</h3>
                <p>
                  No filler stems added just to bulk an order out — every piece
                  earns its place. This principle defines true craftsmanship in
                  floral design: prioritizing visual impact, harmony, and
                  structural integrity over raw volume. When every stem is
                  selected with clear intent, the finished arrangement feels
                  curated and refined rather than cluttered.
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
                ></span>
                <h3 className="mt-2">Honest sourcing</h3>
                <p>
                  We can tell you which farm a stem came from, and when it was
                  cut. This principle defines true craftsmanship in floral
                  design: prioritizing visual impact, harmony, and structural
                  integrity over raw volume. When every stem is selected with
                  clear intent, the finished arrangement feels curated and
                  refined rather than cluttered.
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
                ></span>
                <h3 className="mt-2">Built around your date</h3>
                <p>
                  Weddings and events are planned around your timeline, not
                  ours. This principle defines true craftsmanship in floral
                  design: prioritizing visual impact, harmony, and structural
                  integrity over raw volume. When every stem is selected with
                  clear intent, the finished arrangement feels curated and
                  refined rather than cluttered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-journal-section">
        <div className="container about-journal">
          <div
            className="about-journal-image"
            role="img"
            aria-label="Florist arranging flowers in the studio"
          ></div>
          <div className="about-journal-copy">
            <div className="eyebrow">
              <span className="rule"></span>A studio in motion
            </div>
            <h2>Quiet hands. Clear choices Flowers with somewhere to go.</h2>
            <p>
              Our best work happens between the obvious moments: the first
              bucket opened at sunrise, the stem moved one inch to the left, the
              final ribbon tied just before the delivery leaves. Our best work happens between the obvious moments: the first bucket opened at sunrise, the stem moved one inch to the left, the final ribbon tied just before the delivery leaves. Every detail is carefully considered, from the freshest blooms to the smallest finishing touch. We take time to create arrangements that feel natural, elegant, and beautifully balanced. Each order receives the same thoughtful attention, ensuring every bouquet leaves our studio with care.
            </p>
            <div className="about-journal-points">
              <div>
                <strong>05:30</strong>
                <span>Market selection begins</span>
              </div>
              <div>
                <strong>12–14</strong>
                <span>Average vase life</span>
              </div>
              <div>
                <strong>01:1</strong>
                <span>Florist-to-order care</span>
              </div>
            </div>
            <Link to="/contact" className="btn btn-primary mt-2">
              Visit the studio
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Meet the Studio
              <span className="rule"></span>
            </div>
            <h2>The hands behind your arrangements</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <div
                className="bloom-tile"
                style={{
                  "--card-photo": "url('/images/inside2.png')",
                  aspectRatio: "1/1",
                }}
              ></div>
              <div className="card-body">
                <h3>Meera Iyer</h3>
                <p className="card-meta">Founder & Lead Florist</p>
              </div>
            </div>
            <div className="card">
              <div
                className="bloom-tile"
                style={{
                  "--card-photo": "url('/images/inside10.jpg')",
                  aspectRatio: "1/1",
                }}
              ></div>
              <div className="card-body">
                <h3>Devansh Rao</h3>
                <p className="card-meta">Wedding & Events Lead</p>
              </div>
            </div>
            <div className="card">
              <div
                className="bloom-tile"
                style={{
                  "--card-photo": "url('/images/inside11.jpg')",
                  aspectRatio: "1/1",
                }}
              ></div>
              <div className="card-body">
                <h3>Farida Sheikh</h3>
                <p className="card-meta">Delivery & Studio Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="promo-banner">
            <div>
              <h2>Come see the studio</h2>
              <p>
                Visitors are welcome during opening hours — no appointment
                needed to browse.
              </p>
            </div>
            <Link
              to="/contact"
              className="btn"
              style={{ background: "var(--on-brand)", color: "var(--brand)" }}
            >
              Get Directions
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Our Process
              <span className="rule"></span>
            </div>
            <h2>From market morning to doorstep delivery</h2>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <div className="card-body">
                <h3>01 — Source</h3>
                <p>
                  We select stems early each morning based on freshness,
                  texture, and colour balance. Our day begins before dawn when
                  the blooms are at their peak vitality. Inspecting each plant
                  individually ensures that only stems with optimal petal
                  density and crisp foliage are cut.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>02 — Design</h3>
                <p>
                  Each bouquet is arranged by hand to match the feeling you want
                  — soft, dramatic, or classic. Our day begins before dawn when
                  the blooms are at their peak vitality. Inspecting each plant
                  individually ensures that only stems with optimal petal
                  density and crisp foliage are cut.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>03 — Deliver</h3>
                <p>
                  We hand-carry each piece and time the drop so it feels
                  effortless and beautiful when it arrives. Our day begins
                  before dawn when the blooms are at their peak vitality.
                  Inspecting each plant individually ensures that only stems
                  with optimal petal density and crisp foliage are cut.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div
            className="split-media"
            aria-hidden="true"
            style={{ "--split-photo": "url('/images/inside9.png')" }}
          ></div>
          <div>
            <div className="eyebrow">
              <span className="rule"></span>Seasonal Sourcing
            </div>
            <h2>We buy what is freshest, not what is easiest to stock.</h2>
            <p>
              Our growers change with the season, which means you get blooms at
              their best — richer colour, cleaner stems, and more natural
              movement in each arrangement. By working with local and
              international growers who follow natural blooming cycles, every
              stem reflects peak seasonal health.
            </p>
            <ul className="feature-list">
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Curated growers</strong>
                  <span>
                    Selected for freshness and stewardship. Choosing produce and
                    materials with care begins at the source.
                  </span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Short market cycles</strong>
                  <span>
                    Prioritizing items harvested at peak freshness ensures
                    optimal quality while reducing the unnecessary waste
                    associated with spoiling.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* SERVICES TEASER */}

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>What We Do
              <span className="rule"></span>
            </div>
            <h2>Floral services, start to finish</h2>
          </div>
          <div className="grid grid-3">
            <article className="card">
              <div className="card-body">
                {/* <span class="dot" style="width:44px;height:44px;border-radius:14px;background:var(--brand-soft);color:var(--brand);display:flex;align-items:center;justify-content:center;"> */}
                <h3 className="mt-2">Weddings & Events</h3>
                <p>
                  Our ceremony arches create a striking, memorable backdrop for
                  your vows, perfectly framed with fresh, vibrant florals and
                  elegant draping. Paired with custom-designed bridal bouquets,
                  each arrangement brings texture, color, and personal style
                  right into your hands. these cohesive floral details tie every
                  moment of aesthetic together.
                </p>
                <Link to="/services" className="btn btn-sm btn-outline mt-2">
                  Learn more
                </Link>
              </div>
            </article>
            <article className="card">
              <div className="card-body">
                {/* <span class="dot" style="width:44px;height:44px;border-radius:14px;background:var(--brand-soft);color:var(--brand);display:flex;align-items:center;justify-content:center;"> */}
                <h3 className="mt-2">Custom Bouquets</h3>
                <p>
                  Every space tells a story, and ours begins with your vision.
                  We take your chosen colors, your defined budget, and the
                  unique lifestyle you lead to craft thoughtful, tailored
                  interiors. From initial concept to final touches, every detail
                  is engineered to turn your personal narrative into a
                  beautifully functional reality.
                </p>
                <Link
                  to="/services#custom"
                  className="btn btn-sm btn-outline mt-2"
                >
                  Request one
                </Link>
              </div>
            </article>
            <article className="card">
              <div className="card-body">
                {/* <span class="dot" style="width:44px;height:44px;border-radius:14px;background:var(--brand-soft);color:var(--brand);display:flex;align-items:center;justify-content:center;"> */}
                <h3 className="mt-2">Same-Day Delivery</h3>
                <p>
                  Every custom order comes paired with a premium glass vase,
                  ensuring your gift arrives beautifully displayed and ready to
                  enjoy immediately without any setup required. Whether you are
                  celebrating a birthday, expressing gratitude, or sending a
                  spontaneous pick-me-up, we make thoughtful gifting completely
                  effortless.
                </p>
                <Link
                  to="/services#delivery"
                  className="btn btn-sm btn-outline mt-2"
                >
                  Delivery info
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Timeline
              <span className="rule"></span>
            </div>
            <h2>Built slowly, with care and consistency</h2>
          </div>
          <div className="grid grid-2">
            <div className="card">
              <div className="card-body">
                <h3>2016</h3>
                <p>
                  Started with a weekend market table and a few favorite stems.
                  From those early weekend markets, every detail was a small
                  step toward understanding what flowers could do. Picking
                  individual stems meant looking closer at textures, color
                  pairings, and how long each bloom held up once brought
                  indoors. That quiet experimentation built an eye for design
                  before any formal plans took shape.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>2020</h3>
                <p>
                  Expanded into event florals and custom orders for weddings and
                  celebrations. From those early weekend markets, every detail
                  was a small step toward understanding what flowers could do.
                  Picking individual stems meant looking closer at textures,
                  color pairings, and how long each bloom held up once brought
                  indoors.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>2023</h3>
                <p>
                  Opened full-day studio hours and same-day delivery scheduling.
                  From those early weekend markets, every detail was a small
                  step toward understanding what flowers could do. Picking
                  individual stems meant looking closer at textures, color
                  pairings, and how long each bloom held up once brought
                  indoors. That quiet experimentation built an eye for design
                  before any formal plans took shape.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3>Today</h3>
                <p>
                  Still small, still hand-built, and still focused on natural
                  beauty over volume. From those early weekend markets, every
                  detail was a small step toward understanding what flowers
                  could do. Picking individual stems meant looking closer at
                  textures, color pairings, and how long each bloom held up once
                  brought indoors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="promo-banner">
            <div>
              <h2>Visit the studio</h2>
              <p>
                See the flowers in person and speak with our team about the next
                event or arrangement.
              </p>
            </div>
            <Link
              to="/contact"
              className="btn"
              style={{ background: "var(--on-brand)", color: "var(--brand)" }}
            >
              Plan a Visit
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="rule"></span>Inside the Studio
            </div>
            <h2>The people and practices behind each bouquet.</h2>
          </div>
          <div className="story-slider" data-slider>
            <div className="story-slides">
              <article className="story-slide">
                <div
                  className="story-slide-media"
                  style={{ "--slide-photo": "url('/images/inside6.jpg')" }}
                ></div>
                <div>
                  <h3>Start with the stems</h3>
                  <p>
                    Every morning begins with a careful market run, choosing
                    flowers for freshness, movement, and balance. Inspired by
                    this minimalist philosophy, each composition begins with a
                    deliberate selection of stems that complement rather than
                    compete with one another. By honoring the individual
                    silhouette and organic curve of every blossom, the overall
                    design evokes the unstudied elegance of nature brought
                    indoors. Airy spacing allows soft light to pass between the
                    petals, highlighting subtle variations in texture and
                    delicate tonal shifts. Instead of overwhelming the senses
                    with dense clusters, the arrangement creates a soothing
                    visual rhythm that invites quiet reflection and
                    appreciation.
                  </p>
                </div>
              </article>
              <article className="story-slide">
                <div
                  className="story-slide-media"
                  style={{ "--slide-photo": "url('/images/inside10.jpg')" }}
                ></div>
                <div>
                  <h3>Design with restraint</h3>
                  <p>
                    We leave room for each flower to speak, building
                    arrangements that feel natural rather than crowded. Inspired
                    by this minimalist philosophy, each composition begins with
                    a deliberate selection of stems that complement rather than
                    compete with one another. By honoring the individual
                    silhouette and organic curve of every blossom, the overall
                    design evokes the unstudied elegance of nature brought
                    indoors. Airy spacing allows soft light to pass between the
                    petals, highlighting subtle variations in texture and
                    delicate tonal shifts. Instead of overwhelming the senses
                    with dense clusters, the arrangement creates a soothing
                    visual rhythm that invites quiet reflection and
                    appreciation.
                  </p>
                </div>
              </article>
              <article className="story-slide">
                <div
                  className="story-slide-media"
                  style={{ "--slide-photo": "url('/images/inside11.jpg')" }}
                ></div>
                <div>
                  <h3>Finish by hand</h3>
                  <p>
                    Before delivery, every order is checked, watered, wrapped,
                    and made ready for its new home.Inspired by this minimalist
                    philosophy, each composition begins with a deliberate
                    selection of stems that complement rather than compete with
                    one another. By honoring the individual silhouette and
                    organic curve of every blossom, the overall design evokes
                    the unstudied elegance of nature brought indoors. Airy
                    spacing allows soft light to pass between the petals,
                    highlighting subtle variations in texture and delicate tonal
                    shifts. Instead of overwhelming the senses with dense
                    clusters, the arrangement creates a soothing visual rhythm
                    that invites quiet reflection and appreciation.
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
