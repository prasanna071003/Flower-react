import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { usePageEffects } from "../hooks/usePageEffects";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";
import AuthThemeToggle from "../components/AuthThemeToggle";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  usePageEffects();

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    if (form.password !== form.confirm) {
      setNote("Passwords do not match");
      return;
    }
    setBusy(true);
    setNote("");
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      setNote("Account created successfully! Redirecting to your dashboard...");
      navigate("/dashboard");
    } catch (err) {
      setNote(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <SEO title="Sign Up" noindex />
      <main className="auth-screen">
        <AuthThemeToggle />
        <Link to="/" className="auth-logo">
          Noor <span>& Bloom</span>
        </Link>
        <section className="form-card auth-card">
          <div className="section-head center" style={{ marginBottom: "2rem" }}>
            <div className="eyebrow">
              <span className="rule"></span>Join Us
              <span className="rule"></span>
            </div>
            <h1>Create Your Account</h1>
            <p>
              Sign up to track orders, save your favorite arrangements, and get
              personalized flower recommendations.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="social-login-grid" aria-label="Social sign-in options">
              <button type="button" className="social-login-button" disabled title="Social sign-in is not configured">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.2c0-.7-.06-1.37-.18-2H12v3.8h5.24a4.48 4.48 0 0 1-1.95 2.94v2.4h3.16c1.85-1.7 2.9-4.2 2.9-7.14Z"/><path fill="#34A853" d="M12 21.7c2.65 0 4.87-.88 6.5-2.37l-3.17-2.4c-.88.6-2 .97-3.33.97-2.55 0-4.71-1.72-5.49-4.03H3.23v2.48A9.8 9.8 0 0 0 12 21.7Z"/><path fill="#FBBC05" d="M6.51 13.87a5.9 5.9 0 0 1 0-3.75V7.64H3.23a9.8 9.8 0 0 0 0 8.71l3.28-2.48Z"/><path fill="#EA4335" d="M12 6.1c1.45 0 2.75.5 3.77 1.5l2.82-2.82A9.43 9.43 0 0 0 12 2.1a9.8 9.8 0 0 0-8.77 5.54l3.28 2.48C7.29 7.82 9.45 6.1 12 6.1Z"/></svg>
                Google
              </button>
              <button type="button" className="social-login-button" disabled title="Social sign-in is not configured">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.75-1.32-3.75-1.32-.5-1.3-1.24-1.64-1.24-1.64-1.01-.7.08-.69.08-.69 1.12.08 1.72 1.14 1.72 1.14 1 1.72 2.62 1.23 3.26.94.1-.73.39-1.23.71-1.52-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.04-1.15 3.04-1.15.61 1.55.23 2.7.12 2.98.71.78 1.14 1.78 1.14 3 0 4.3-2.6 5.24-5.09 5.51.4.35.76 1.03.76 2.08v3.12c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>
                GitHub
              </button>
              <button type="button" className="social-login-button" disabled title="Social sign-in is not configured">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#f25022" d="M2 2h9v9H2z"/><path fill="#7fba00" d="M13 2h9v9h-9z"/><path fill="#00a4ef" d="M2 13h9v9H2z"/><path fill="#ffb900" d="M13 13h9v9h-9z"/></svg>
                Microsoft
              </button>
              <button type="button" className="social-login-button" disabled title="Social sign-in is not configured">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.42L5.56 22H2.43l7.25-8.28L1.8 2h6.4l4.43 6.77L18.9 2Zm-1.1 17.86h1.73L7.27 4.03H5.41L17.8 19.86Z"/></svg>
                X / Twitter
              </button>
            </div>
            <p className="auth-social-note">
              Social sign-in is not configured yet. You can create an account with your email below.
            </p>
            <div className="auth-divider"><span>OR</span></div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="register-firstname">First name</label>
                <input
                  className="input"
                  type="text"
                  id="register-firstname"
                  required
                  placeholder="Your first name"
                  value={form.firstName}
                  onChange={update("firstName")}
                />
              </div>
              <div className="field">
                <label htmlFor="register-lastname">Last name</label>
                <input
                  className="input"
                  type="text"
                  id="register-lastname"
                  required
                  placeholder="Your last name"
                  value={form.lastName}
                  onChange={update("lastName")}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="register-email">Email address</label>
              <input
                className="input"
                type="email"
                id="register-email"
                required
                placeholder="hello@example.com"
                value={form.email}
                onChange={update("email")}
              />
            </div>
            <div className="field">
              <label htmlFor="register-phone">Phone number</label>
              <input
                className="input"
                type="tel"
                id="register-phone"
                required
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={update("phone")}
              />
            </div>
            <div className="field">
              <label htmlFor="register-password">Password</label>
              <input
                className="input"
                type="password"
                id="register-password"
                required
                minLength={6}
                placeholder="••••••••"
                value={form.password}
                onChange={update("password")}
              />
            </div>
            <div className="field">
              <label htmlFor="register-confirm">Confirm password</label>
              <input
                className="input"
                type="password"
                id="register-confirm"
                required
                minLength={6}
                placeholder="••••••••"
                value={form.confirm}
                onChange={update("confirm")}
              />
            </div>
            <div className="field">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "14px",
                }}
              >
                <input type="checkbox" required /> I agree to the{" "}
                <a href="#" style={{ color: "var(--brand)" }}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" style={{ color: "var(--brand)" }}>
                  Privacy Policy
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={busy}
            >
              {busy ? "Creating account…" : "Create Account"}
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
              Already have an account?{" "}
              <Link to="/login" style={{ color: "var(--brand)" }}>
                Login
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
