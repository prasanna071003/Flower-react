import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { usePageEffects } from "../hooks/usePageEffects";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

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
      <div className="auth-container">
        <Link to="/" className="auth-logo">
          Crimson <span>Bloom</span>
        </Link>
        <div className="form-card" style={{ maxWidth: "480px", width: "100%" }}>
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
            >
              Create Account
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
        </div>
      </div>
    </>
  );
}
