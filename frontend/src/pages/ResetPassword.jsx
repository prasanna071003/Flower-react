import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import { resetPassword } from "../services/authService";
import SEO from "../components/SEO";
import AuthThemeToggle from "../components/AuthThemeToggle";
import "../styles/Login.css";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  usePageEffects();

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await resetPassword({ token, password });
      navigate("/login", {
        replace: true,
        state: { passwordReset: true },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <SEO title="Reset Password" noindex />
      <main className="auth-screen">
        <AuthThemeToggle />
        <Link to="/" className="auth-logo">Noor <span>& Bloom</span></Link>
        <section className="form-card auth-card">
          <div className="section-head center">
            <div className="eyebrow"><span className="rule"></span>Account recovery<span className="rule"></span></div>
            <h1>Choose a new password</h1>
            <p>Your reset link is valid for 30 minutes and can only be used once.</p>
          </div>
          {!token ? (
            <p className="auth-message is-error" role="alert">
              This reset link is missing its token. <Link to="/forgot-password">Request a new link</Link>.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="reset-password">New password</label>
                <input
                  className="input"
                  type="password"
                  id="reset-password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="reset-confirm">Confirm new password</label>
                <input
                  className="input"
                  type="password"
                  id="reset-confirm"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                />
              </div>
              <button className="btn btn-primary auth-submit" type="submit" disabled={busy}>
                {busy ? "Updating password…" : "Update password"}
              </button>
              {error && <p className="auth-message is-error" role="alert">{error}</p>}
            </form>
          )}
          <p className="auth-foot"><Link to="/login">Back to login</Link></p>
        </section>
      </main>
    </>
  );
}
