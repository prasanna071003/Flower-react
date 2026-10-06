import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main-grid">
          {/* Col 1: Brand & Philosophy Quote */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="footer-brand-logo">
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span>
                Noor <strong>& Bloom</strong>
              </span>
            </Link>
            <p className="footer-quote">
              “Flowers are the foundation of lasting beauty—they endure through
              every season and offer unmatched elegance. Our studio was built on
              a commitment to simplify floral gifting and provide sound,
              transparent guidance every step. We create thoughtful that make
              every occasion feel beautifully effortless.”
            </p>
          </div>
          {/* Col 2: Featured Blooms / Categories with » */}
          <div className="footer-col footer-col-links">
            <h4 className="footer-col-title">Featured Blooms</h4>
            <ul className="footer-chevron-list">
              <li>
                <Link to="/flowers">
                  <span className="chevron-icon">»</span> Garden Residence
                </Link>
              </li>
              <li>
                <Link to="/flowers">
                  <span className="chevron-icon">»</span> Velvet Wine Roses
                </Link>
              </li>
              <li>
                <Link to="/flowers">
                  <span className="chevron-icon">»</span> Blush Tulip Bunch
                </Link>
              </li>
              {/* <li><a href="flowers.html"><span class="chevron-icon">»</span> Ivory Peony Jar</a></li> */}
              <li>
                <Link to="/flowers">
                  <span className="chevron-icon">»</span> Midnight Orchid Stem
                </Link>
              </li>
            </ul>
          </div>
          {/* Col 3: Reach Out with Circular Icon Badges */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-title">Reach Out</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-circle-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span>24 Marigold Lane, Suite 500, Chennai, TN 600001.</span>
              </li>
              <li>
                <span className="footer-circle-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <span>+91 98765 43210</span>
              </li>
              <li>
                <span className="footer-circle-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <span>inquire@noorbloom.com</span>
              </li>
            </ul>
          </div>
          {/* Col 4: Premier Lifestyle (Dual Thumbnails) */}
          <div className="footer-col footer-col-lifestyle">
            <h4 className="footer-col-title">Premier Lifestyle</h4>
            <div className="footer-lifestyle-thumbs">
              <div
                className="footer-lifestyle-thumb"
                style={{ backgroundImage: "url('/images/inside.jpg')" }}
              ></div>
              <div
                className="footer-lifestyle-thumb"
                style={{ backgroundImage: "url('/images/inside6.jpg')" }}
              ></div>
            </div>
          </div>
        </div>
        {/* Quick Links Bar */}
        <div className="footer-quicklinks-wrap">
          <div className="footer-quicklinks-title">Quick Links</div>
          <nav
            className="footer-quicklinks-nav"
            aria-label="Footer Quick Links"
          >
            <Link to="/" className="footer-quicklink-item">
              <span className="quicklink-circle-arrow">➔</span> Home
            </Link>
            <span className="quicklink-divider">|</span>
            <Link to="/about" className="footer-quicklink-item">
              <span className="quicklink-circle-arrow">➔</span> About
            </Link>
            <span className="quicklink-divider">|</span>
            <Link to="/flowers" className="footer-quicklink-item">
              <span className="quicklink-circle-arrow">➔</span> Flowers
            </Link>
            <span className="quicklink-divider">|</span>
            <Link to="/services" className="footer-quicklink-item">
              <span className="quicklink-circle-arrow">➔</span> Services
            </Link>
            <span className="quicklink-divider">|</span>
            <Link to="/gallery" className="footer-quicklink-item">
              <span className="quicklink-circle-arrow">➔</span> Gallery
            </Link>
            <span className="quicklink-divider">|</span>
            <Link to="/contact" className="footer-quicklink-item">
              <span className="quicklink-circle-arrow">➔</span> Contact
            </Link>
          </nav>
        </div>
        {/* Bottom Bar: Copyright and Social Links */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © 2026 Noor & Bloom Flower Boutique. All Rights Reserved.
          </div>
          <div className="footer-actions-right">
            <div className="footer-social-stack">
              <a href="#" className="footer-social-btn" aria-label="Facebook">
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="footer-social-btn" aria-label="Twitter">
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="currentColor"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="footer-social-btn" aria-label="Instagram">
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
