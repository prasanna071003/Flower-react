import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { formatPrice } from "../utils/format";
import SEO from "../components/SEO";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  usePageEffects();

  useEffect(() => {
    if (!user) return;
    setAddress((current) => ({
      ...current,
      fullName:
        current.fullName ||
        `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      phone: current.phone || user.phone || "",
    }));
  }, [user]);

  function updateField(field) {
    return (event) =>
      setAddress((current) => ({ ...current, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const order = await createOrder({
        items: items.map((item) => ({
          flower: item.flower,
          quantity: item.quantity,
        })),
        shippingAddress: address,
        notes,
      });
      clearCart();
      setPlacedOrder(order);
    } catch (err) {
      setError(err.message || "Could not place your order. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  if (placedOrder) {
    return (
      <>
        <SEO title="Order Confirmed" noindex />
        <section className="page-header">
          <div className="container">
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              <span className="rule"></span>Order Confirmed
              <span className="rule"></span>
            </div>
            <h1>Thank you — your blooms are booked</h1>
            <p className="breadcrumb">
              <Link to="/">Home</Link> / Checkout
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container" style={{ maxWidth: "720px" }}>
            <div className="form-card">
              <h2 className="mt-2" style={{ marginBottom: "1.2rem" }}>
                Order {String(placedOrder._id).slice(-8).toUpperCase()}
              </h2>
              <ul className="info-list">
                <li>
                  <span className="dot"></span>
                  <div>
                    <strong>Total payable on delivery</strong>
                    <span>{formatPrice(placedOrder.total)}</span>
                  </div>
                </li>
                <li>
                  <span className="dot"></span>
                  <div>
                    <strong>Payment</strong>
                    <span>
                      {placedOrder.paymentMethod} — {placedOrder.paymentStatus}
                    </span>
                  </div>
                </li>
                <li>
                  <span className="dot"></span>
                  <div>
                    <strong>Delivering to</strong>
                    <span>
                      {placedOrder.shippingAddress.fullName},{" "}
                      {placedOrder.shippingAddress.addressLine},{" "}
                      {placedOrder.shippingAddress.city}{" "}
                      {placedOrder.shippingAddress.pincode}
                    </span>
                  </div>
                </li>
              </ul>
              <p
                style={{
                  color: "var(--brand)",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                We'll call you before the rider leaves the studio.
              </p>
              <div className="pd-actions mt-2">
                <Link to="/dashboard" className="btn btn-primary">
                  Track in My Account
                </Link>
                <Link to="/flowers" className="btn btn-outline">
                  Keep Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!items.length) {
    return (
      <>
        <SEO title="Checkout" noindex />
        <section className="page-header">
          <div className="container">
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              <span className="rule"></span>Checkout
              <span className="rule"></span>
            </div>
            <h1>Your cart is empty</h1>
            <p className="breadcrumb">
              <Link to="/">Home</Link> / Checkout
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container" style={{ textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)" }}>
              Add a few stems to your cart and they'll appear here, ready to be
              hand-tied.
            </p>
            <Link to="/flowers" className="btn btn-primary mt-2">
              Browse the Collections
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO title="Checkout" noindex />
      <section className="page-header">
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="rule"></span>Checkout<span className="rule"></span>
          </div>
          <h1>Delivery & payment</h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/flowers">Flowers</Link> /
            Checkout
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <form className="form-card" onSubmit={handleSubmit}>
            <h2 className="mt-2" style={{ marginBottom: "1.2rem" }}>
              Where should we deliver?
            </h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="co-name">Recipient name</label>
                <input
                  className="input"
                  type="text"
                  id="co-name"
                  value={address.fullName}
                  onChange={updateField("fullName")}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="co-phone">Phone number</label>
                <input
                  className="input"
                  type="tel"
                  id="co-phone"
                  value={address.phone}
                  onChange={updateField("phone")}
                  required
                />
              </div>
              <div className="field full">
                <label htmlFor="co-address">Delivery address</label>
                <input
                  className="input"
                  type="text"
                  id="co-address"
                  value={address.addressLine}
                  onChange={updateField("addressLine")}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="co-city">City</label>
                <input
                  className="input"
                  type="text"
                  id="co-city"
                  value={address.city}
                  onChange={updateField("city")}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="co-state">State</label>
                <input
                  className="input"
                  type="text"
                  id="co-state"
                  value={address.state}
                  onChange={updateField("state")}
                />
              </div>
              <div className="field">
                <label htmlFor="co-pincode">PIN code</label>
                <input
                  className="input"
                  type="text"
                  id="co-pincode"
                  value={address.pincode}
                  onChange={updateField("pincode")}
                  required
                />
              </div>
              <div className="field full">
                <label htmlFor="co-notes">Delivery notes</label>
                <textarea
                  id="co-notes"
                  rows="3"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Gate code, preferred time slot, message on the card..."
                ></textarea>
              </div>
              <div className="field full">
                <label>Payment method</label>
                <div className="radio-row">
                  <label>
                    <input type="radio" name="payment" checked readOnly /> Cash
                    on Delivery
                  </label>
                </div>
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  Pay the rider when your flowers arrive — no card details
                  needed.
                </span>
              </div>
            </div>
            {error ? (
              <p
                style={{
                  color: "var(--brand)",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                {error}
              </p>
            ) : null}
            <button
              className="btn btn-primary mt-2"
              type="submit"
              disabled={placing}
            >
              {placing
                ? "Placing your order…"
                : `Place Order — ${formatPrice(subtotal)}`}
            </button>
          </form>
          <div>
            <div className="form-card">
              <h2 className="mt-2" style={{ marginBottom: "1.2rem" }}>
                Your order
              </h2>
              {items.map((item) => (
                <div
                  key={item.flower}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    paddingBottom: "1rem",
                    marginBottom: "1rem",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      flex: "none",
                      borderRadius: "12px",
                      background: `url('${item.image}') center/cover`,
                    }}
                    aria-hidden="true"
                  ></div>
                  <div style={{ flex: 1 }}>
                    <strong>{item.name}</strong>
                    <div className="card-meta">
                      {formatPrice(item.price)} each
                    </div>
                    <div
                      className="qty-control"
                      style={{ marginTop: ".5rem", width: "fit-content" }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.flower, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        inputMode="numeric"
                        aria-label={`Quantity for ${item.name}`}
                        onChange={(event) =>
                          updateQuantity(
                            item.flower,
                            event.target.value.replace(/\D/g, ""),
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.flower, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="card-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.flower)}
                        className="btn btn-sm btn-ghost"
                        style={{ marginTop: ".5rem" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: ".5rem",
                }}
              >
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: ".5rem",
                }}
              >
                <span>Delivery</span>
                <strong>Free within the city</strong>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid var(--border)",
                  paddingTop: ".8rem",
                }}
              >
                <span>Total</span>
                <span className="card-price">{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
