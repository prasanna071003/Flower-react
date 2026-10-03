import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { usePageEffects } from "../hooks/usePageEffects";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  usePageEffects();

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setNote("");
    try {
      const user = await login({ email, password, rememberMe });
      setNote("Login successful! Redirecting...");
      const from = location.state && location.state.from;
      navigate(from || (user.role === "admin" ? "/admin" : "/dashboard"));
    } catch (err) {
      setNote(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <SEO title="Login" noindex />
      <div className="auth-container">
        <Link to="/" className="auth-logo">
          Crimson <span>Bloom</span>
        </Link>
        <div className="form-card" style={{ maxWidth: "480px", width: "100%" }}>
          <div className="section-head center" style={{ marginBottom: "2rem" }}>
            <div className="eyebrow">
              <span className="rule"></span>Welcome Back
              <span className="rule"></span>
            </div>
            <h1>Login to Your Account</h1>
            <p>
              Access your orders, saved favorites, and personalized
              recommendations.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="login-email">Email address</label>
              <input
                className="input"
                type="email"
                id="login-email"
                required
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input
                className="input"
                type="password"
                id="login-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div
              className="field"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "14px",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />{" "}
                Remember me
              </label>
              <a href="#" style={{ fontSize: "14px", color: "var(--brand)" }}>
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Login
            </button>
            {note && (
              <p
                style={{
                  color: "var(--brand)",
                  marginTop: "1rem",
                  fontWeight: 500,
                }}
              >
                {note}
              </p>
            )}
          </form>
          <div
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "var(--brand)" }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
