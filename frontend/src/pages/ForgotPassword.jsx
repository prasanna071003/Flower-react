import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import { requestPasswordReset } from "../services/authService";
import SEO from "../components/SEO";
import AuthThemeToggle from "../components/AuthThemeToggle";
import "../styles/Login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  usePageEffects();

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setNote("");
    setError("");
    try {
      const response = await requestPasswordReset(email);
      setNote(response.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <SEO title="Forgot Password" noindex />
      <main className="auth-screen">
        <AuthThemeToggle />
        <Link to="/" className="auth-logo">Noor <span>& Bloom</span></Link>
        <section className="form-card auth-card">
          <div className="section-head center">
            <div className="eyebrow"><span className="rule"></span>Account recovery<span className="rule"></span></div>
            <h1>Forgot your password?</h1>
            <p>Enter the email address on your account and we’ll send you a secure reset link.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="forgot-email">Email address</label>
              <input
                className="input"
                type="email"
                id="forgot-email"
                autoComplete="email"
                required
                placeholder="hello@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <button className="btn btn-primary auth-submit" type="submit" disabled={busy}>
              {busy ? "Sending link…" : "Send reset link"}
            </button>
            {note && <p className="auth-message" role="status">{note}</p>}
            {error && <p className="auth-message is-error" role="alert">{error}</p>}
          </form>
          <p className="auth-foot"><Link to="/login">Back to login</Link></p>
        </section>
      </main>
    </>
  );
}
