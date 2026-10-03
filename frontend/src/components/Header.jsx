import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSiteChrome } from "../hooks/useSiteChrome";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { direction, toggleDirection } = useSiteChrome();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { count } = useCart();
  const isHome = pathname === "/";

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand">
          Crimson <span>Bloom</span>
        </Link>
        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <nav className="main-nav" id="main-nav" aria-label="Main">
          <ul>
            <li>
              <Link to="/" aria-current={isHome ? "page" : undefined}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                aria-current={pathname === "/about" ? "page" : undefined}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/flowers"
                aria-current={pathname === "/flowers" ? "page" : undefined}
              >
                Flowers
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                aria-current={pathname === "/services" ? "page" : undefined}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                aria-current={pathname === "/gallery" ? "page" : undefined}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                aria-current={pathname === "/contact" ? "page" : undefined}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button
            className="icon-btn rtl-toggle"
            id="rtl-toggle"
            type="button"
            onClick={toggleDirection}
            dir="ltr"
            aria-label={
              direction === "rtl"
                ? "Switch to left-to-right layout"
                : "Switch to right-to-left layout"
            }
            aria-pressed={direction === "rtl"}
            title={
              direction === "rtl"
                ? "Switch to left-to-right layout"
                : "Switch to right-to-left layout"
            }
          >
            {direction === "rtl" ? "LTR" : "RTL"}
          </button>
          <button
            className="icon-btn"
            id="theme-toggle"
            aria-label="Toggle dark mode"
            aria-pressed="false"
          >
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
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>
          <Link
            to="/checkout"
            className="icon-btn"
            aria-label={`View cart (${count} ${count === 1 ? "item" : "items"})`}
            style={{ position: "relative" }}
          >
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
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {count > 0 && (
              <span
                className="badge-alert"
                style={{
                  position: "absolute",
                  top: "-6px",
                  insetInlineEnd: "-6px",
                }}
              >
                {count}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="btn btn-sm btn-outline"
              >
                {user.firstName || "My Account"}
              </Link>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="nav-backdrop" id="nav-backdrop"></div>
    </header>
  );
}
