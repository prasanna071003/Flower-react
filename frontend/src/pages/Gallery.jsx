import { Link } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import SEO from "../components/SEO";

export default function Gallery() {
  usePageEffects();

  return (
    <>
      <SEO
        title="Gallery"
        description="Recent work from Noor & Bloom — hand-tied bouquets, ceremony arches, bridal flowers, table centrepieces, and behind-the-scenes moments from our floral studio."
        image="/images/gallery_banner.png"
      />
      <section
        className="page-header"
        style={{ "--header-photo": "url('/images/gallery_banner.png')" }}
      >
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            {/* <span className="rule"></span>Gallery<span className="rule"></span> */}
          </div>
          <h1>Gallery</h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / Gallery
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            <div
              className="gallery-item"
              data-gallery-item
              data-title="Velvet Wine Roses"
              data-desc="A dozen deep-wine roses, hand-tied with eucalyptus."
              style={{ "--gallery-photo": "url('/images/inside2.png')" }}
            ></div>
            <div
              className="gallery-item"
              data-gallery-item
              data-title="Blush Tulip Bunch"
              data-desc="Fifteen seasonal tulips wrapped in soft kraft."
              style={{ "--gallery-photo": "url('/images/inside9.png')" }}
            ></div>
            <div
              className="gallery-item"
              data-gallery-item
              data-title="Ivory Peony Jar"
              data-desc="Layered ivory peonies arranged in a glass jar."
              style={{ "--gallery-photo": "url('/images/inside5.jpg')" }}
            ></div>
            <div
              className="gallery-item"
              data-gallery-item
              data-title="Ceremony Arch"
              data-desc="A full floral arch built on-site for a spring wedding."
              style={{ "--gallery-photo": "url('/images/inside6.jpg')" }}
            ></div>
            <div
              className="gallery-item"
              data-gallery-item
              data-title="Bridal Bouquet"
              data-desc="Cascading lilies and garden roses for the bride."
              style={{ "--gallery-photo": "url('/images/inside7.jpg')" }}
            ></div>
            <div
              className="gallery-item"
              data-gallery-item
              data-title="Table Centrepieces"
              data-desc="Low, wide arrangements for a reception dinner."
              style={{ "--gallery-photo": "url('/images/inside8.jpg')" }}
            ></div>
            <div
              className="gallery-item"
              data-gallery-item
              data-title="Midnight Orchid Stem"
              data-desc="A single statement orchid, wrapped minimally."
              style={{ "--gallery-photo": "url('/images/inside10.jpg')" }}
            ></div>
            <div
              className="gallery-item"
              data-gallery-item
              data-title="Studio Workbench"
              data-desc="Fresh stems being sorted before the morning's orders."
              style={{ "--gallery-photo": "url('/images/inside11.jpg')" }}
            ></div>
          </div>
        </div>
      </section>
      {/* ADVANCED SECTION 1: PROJECT SPOTLIGHT & INSTALLATION SLIDER */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">
              <span className="rule"></span>Project Spotlight
              <span className="rule"></span>
            </div>
            <h2>Floral artistry in motion — curated event showcases</h2>
            <p>
              A closer look behind the scenes of our signature installations,
              custom palette briefs, and bespoke wedding staging.
            </p>
          </div>
          <div className="story-slider" data-slider>
            <div className="story-slides">
              {/* Slide 1 */}
              <article className="story-slide spotlight-slide">
                <div className="spotlight-card" style={{ width: "100%" }}>
                  <div
                    className="spotlight-media"
                    style={{ backgroundImage: "url('/images/inside6.jpg')" }}
                  >
                    <div className="spotlight-media-overlay"></div>
                    <span className="spotlight-badge">
                      Heritage Wedding • 450 Guests
                    </span>
                    <div className="spotlight-venue">
                      {/* <strong>The Royal Courtyard Wedding</strong> */}
                      {/* <span>Leela Palace Waterfront, Chennai</span> */}
                    </div>
                  </div>
                  <div className="spotlight-body">
                    <h3>Grand Floral Arch & Suspended Canopy</h3>
                    <p>
                      Designed with over 600 stems of velvet roses, deep
                      burgundy hydrangeas, and 40 feet of cascading eucalyptus
                      table runners framing the mandap aisle.
                    </p>
                    <div className="spotlight-recipe">
                      <span className="spotlight-recipe-tag">
                        #VelvetWineRoses
                      </span>
                      <span className="spotlight-recipe-tag">
                        #JasmineAccents
                      </span>
                      <span className="spotlight-recipe-tag">
                        #ItalianRuscus
                      </span>
                      <span className="spotlight-recipe-tag">
                        #EucalyptusRunners
                      </span>
                    </div>
                    <blockquote className="spotlight-quote">
                      "The suspended floral ceiling took our breath away. Guests
                      are still talking about the enchanting scent."
                      <footer>— Priya & Arjun, Bride & Groom</footer>
                    </blockquote>
                  </div>
                </div>
              </article>
              {/* Slide 2 */}
              <article className="story-slide spotlight-slide">
                <div className="spotlight-card" style={{ width: "100%" }}>
                  <div
                    className="spotlight-media"
                    style={{ backgroundImage: "url('/images/inside10.jpg')" }}
                  >
                    <div className="spotlight-media-overlay"></div>
                    <span className="spotlight-badge">
                      Art Gala • 200 Guests
                    </span>
                    <div className="spotlight-venue">
                      {/* <strong>Minimalist Zen Gallery Gala</strong> */}
                      {/* <span>DakshinaChitra Heritage Center</span> */}
                    </div>
                  </div>
                  <div className="spotlight-body">
                    <h3>Architectural Ikebana & Single-Stem Drama</h3>
                    <p>
                      Sculptural arrangements focusing on negative space,
                      featuring imported midnight orchids in handcrafted
                      charcoal stoneware vessels.
                    </p>
                    <div className="spotlight-recipe">
                      <span className="spotlight-recipe-tag">
                        #MidnightOrchids
                      </span>
                      <span className="spotlight-recipe-tag">
                        #MonsteraLeaves
                      </span>
                      <span className="spotlight-recipe-tag">
                        #SlateStoneware
                      </span>
                      <span className="spotlight-recipe-tag">
                        #IkebanaLines
                      </span>
                    </div>
                    <blockquote className="spotlight-quote">
                      "Sculptural, elegant, and uncompromisingly modern. Noor &
                      Bloom elevated our brand experience."
                      <footer>— Maya R., Creative Director</footer>
                    </blockquote>
                  </div>
                </div>
              </article>
              {/* Slide 3 */}
              <article className="story-slide spotlight-slide">
                <div className="spotlight-card" style={{ width: "100%" }}>
                  <div
                    className="spotlight-media"
                    style={{ backgroundImage: "url('/images/inside5.jpg')" }}
                  >
                    <div className="spotlight-media-overlay"></div>
                    <span className="spotlight-badge">
                      Intimate Soirée • 60 Guests
                    </span>
                    <div className="spotlight-venue">
                      {/* <strong>Sunlit Vineyard Anniversary</strong> */}
                      {/* <span>Coastal Palms Estate, ECR</span> */}
                    </div>
                  </div>
                  <div className="spotlight-body">
                    <h3>Romantic Wild-Meadow Tabletop Styling</h3>
                    <p>
                      Abundant low compotes filled with layered ivory peonies,
                      honey ranunculus, chamomile, and olive branch garlands
                      illuminated by candlelight.
                    </p>
                    <div className="spotlight-recipe">
                      <span className="spotlight-recipe-tag">
                        #IvoryPeonies
                      </span>
                      <span className="spotlight-recipe-tag">
                        #HoneyRanunculus
                      </span>
                      <span className="spotlight-recipe-tag">#OliveBranch</span>
                      <span className="spotlight-recipe-tag">
                        #WildChamomile
                      </span>
                    </div>
                    <blockquote className="spotlight-quote">
                      "It felt like an unhurried Mediterranean garden dinner
                      right here by the coast."
                      <footer>— Rohan & Sneha</footer>
                    </blockquote>
                  </div>
                </div>
              </article>
            </div>
            <div
              className="story-controls"
              style={{ justifyContent: "center", marginTop: "2rem" }}
            >
              <button
                className="story-control"
                type="button"
                data-slider-prev
                aria-label="Previous showcase"
              >
                ←
              </button>
              <div className="story-dots" aria-label="Choose showcase">
                <button
                  className="story-dot is-active"
                  type="button"
                  data-slider-dot="0"
                  aria-label="Show project 1"
                ></button>
                <button
                  className="story-dot"
                  type="button"
                  data-slider-dot="1"
                  aria-label="Show project 2"
                ></button>
                <button
                  className="story-dot"
                  type="button"
                  data-slider-dot="2"
                  aria-label="Show project 3"
                ></button>
              </div>
              <button
                className="story-control"
                type="button"
                data-slider-next
                aria-label="Next showcase"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* ADVANCED SECTION 2: ANATOMY OF A COMPOSITION & COLOR THEORY */}
      <section className="section">
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
          <div className="anatomy-layout">
            <div className="anatomy-visualizer">
              <h3>Golden Ratio Floral Balance</h3>
              <p>
                Every arrangement is built on our 3-tier proportion framework,
                ensuring no single stem overwhelms the natural balance.
              </p>
              <div className="ratio-bar-wrap">
                <div className="ratio-segment-1" title="45% Focal Blooms"></div>
                <div
                  className="ratio-segment-2"
                  title="30% Foliage & Texture"
                ></div>
                <div
                  className="ratio-segment-3"
                  title="25% Airy Accent Sprays"
                ></div>
              </div>
              <div className="ratio-legend">
                <div className="ratio-legend-item">
                  <div>
                    <span
                      className="ratio-dot"
                      style={{ background: "#008aa6" }}
                    ></span>
                    45% Focal Blooms (Garden roses, peonies, lilies)
                  </div>
                  <span>45%</span>
                </div>
                <div className="ratio-legend-item">
                  <div>
                    <span
                      className="ratio-dot"
                      style={{ background: "#4db5cc" }}
                    ></span>
                    30% Foliage & Textures (Ruscus, eucalyptus, berries)
                  </div>
                  <span>30%</span>
                </div>
                <div className="ratio-legend-item">
                  <div>
                    <span
                      className="ratio-dot"
                      style={{ background: "#a0e0ee" }}
                    ></span>
                    25% Airy Accent Sprays (Sweet peas, waxflower, astilbe)
                  </div>
                  <span>25%</span>
                </div>
              </div>
              <div className="vitality-tag-list">
                <span className="tag">Asymmetrical Rhythm</span>
                <span className="tag">Airy Negative Space</span>
                <span className="tag">Graduated Heights</span>
              </div>
            </div>
            <div className="harmony-grid">
              <article className="harmony-card">
                <div className="harmony-swatches">
                  <span
                    className="harmony-swatch"
                    style={{ background: "#4a0e17" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#8b263e" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#d98296" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#fcebed" }}
                  ></span>
                </div>
                <h4>Monochromatic Romance</h4>
                <p>
                  Layered shades from deep velvet burgundy down to soft blush,
                  creating profound depth and quiet luxury.
                </p>
              </article>
              <article className="harmony-card">
                <div className="harmony-swatches">
                  <span
                    className="harmony-swatch"
                    style={{ background: "#ffffff", border: "1px solid #ddd" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#eaf8fb" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#008aa6" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#1b4332" }}
                  ></span>
                </div>
                <h4>Botanical & Ivory</h4>
                <p>
                  Crisp white peonies and cascading greens paired with deep teal
                  accents for a tranquil, modern aesthetic.
                </p>
              </article>
              <article className="harmony-card">
                <div className="harmony-swatches">
                  <span
                    className="harmony-swatch"
                    style={{ background: "#1a1118" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#4a154b" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#e07a5f" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#f4a261" }}
                  ></span>
                </div>
                <h4>Moody Midnight Contrast</h4>
                <p>
                  Inky midnight orchids grounded with rich terracotta and dusty
                  peach highlights for dramatic evening galas.
                </p>
              </article>
              <article className="harmony-card">
                <div className="harmony-swatches">
                  <span
                    className="harmony-swatch"
                    style={{ background: "#e9c46a" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#f4a261" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#e76f51" }}
                  ></span>
                  <span
                    className="harmony-swatch"
                    style={{ background: "#2a9d8f" }}
                  ></span>
                </div>
                <h4>Sunlit Coastal Gold</h4>
                <p>
                  Warm honey ranunculus, golden cymbidiums, and dried grasses
                  reminiscent of coastal twilight.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
