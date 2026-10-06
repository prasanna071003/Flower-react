import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { formatPrice } from "../utils/format";
import SEO from "../components/SEO";

export default function Checkout() {
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
  }, [user]); // <--- Ingu semicolon (;) proper-ah add panniyachu

  function updateField(field) {
    return (event) => {
      setAddress((current) => ({
        ...current,
        [field]: event.target.value,
      }));

      if (error) {
        setError("");
      }
    };
  }

  function validateAddress() {
    const fullName = address.fullName.trim();
    const phone = address.phone.trim();
    const addressLine = address.addressLine.trim();
    const city = address.city.trim();
    const state = address.state.trim();
    const pincode = address.pincode.trim();

    // Name validation
    if (!fullName) {
      return "Please enter the recipient name.";
    }

    if (fullName.length < 3) {
      return "Please enter a valid recipient name.";
    }

    // Phone validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return "Please enter a valid 10-digit phone number.";
    }

    // Address validation
    if (!addressLine) {
      return "Please enter your delivery address.";
    }

    if (addressLine.length < 10) {
      return "Please enter a complete delivery address.";
    }

    // Address should contain at least one letter
    if (!/[A-Za-z]/.test(addressLine)) {
      return "Please enter a valid delivery address.";
    }

    // Address should contain at least two words
    const addressWords = addressLine
      .split(/\s+/)
      .filter(Boolean);

    if (addressWords.length < 2) {
      return "Please enter a complete delivery address.";
    }

    // City validation
    if (!city) {
      return "Please enter your city.";
    }

    if (!/^[A-Za-z\s.-]+$/.test(city)) {
      return "Please enter a valid city name.";
    }

    // State validation
    if (!state) {
      return "Please enter your state.";
    }

    if (!/^[A-Za-z\s.-]+$/.test(state)) {
      return "Please enter a valid state name.";
    }

    // PIN code validation
    if (!/^\d{6}$/.test(pincode)) {
      return "Please enter a valid 6-digit PIN code.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const validationError = validateAddress();

    if (validationError) {
      setError(validationError);
      return;
    }

    setPlacing(true);

    try {
      const order = await createOrder({
        items: items.map((item) => ({
          flower: item.flower,
          quantity: item.quantity,
        })),

        shippingAddress: {
          fullName: address.fullName.trim(),
          phone: address.phone.trim(),
          addressLine: address.addressLine.trim(),
          city: address.city.trim(),
          state: address.state.trim(),
          pincode: address.pincode.trim(),
        },

        notes: notes.trim(),
      });

      clearCart();
      setPlacedOrder(order);
    } catch (err) {
      setError(
        err.message || "Could not place your order. Please try again."
      );
    } finally {
      setPlacing(false);
    }
  }

  // ORDER CONFIRMED
  if (placedOrder) {
    return (
      <>
        <SEO title="Order Confirmed" noindex />

        <section className="page-header">
          <div className="container">
            <div
              className="eyebrow"
              style={{ justifyContent: "center" }}
            >
              <span className="rule"></span>
              Order Confirmed
              <span className="rule"></span>
            </div>

            <h1>Thank you — your blooms are booked</h1>

            <p className="breadcrumb">
              <Link to="/">Home</Link> / Checkout
            </p>
          </div>
        </section>

        <section className="section">
          <div
            className="container"
            style={{ maxWidth: "720px" }}
          >
            <div className="form-card">
              <h2
                className="mt-2"
                style={{ marginBottom: "1.2rem" }}
              >
                Order {String(placedOrder._id).slice(-8).toUpperCase()}
              </h2>

              <ul className="info-list">
                <li>
                  <span className="dot"></span>

                  <div>
                    <strong>Total payable on delivery</strong>
                    <span>
                      {formatPrice(placedOrder.total)}
                    </span>
                  </div>
                </li>

                <li>
                  <span className="dot"></span>

                  <div>
                    <strong>Payment</strong>

                    <span>
                      {placedOrder.paymentMethod} —{" "}
                      {placedOrder.paymentStatus}
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
                <Link
                  to="/dashboard"
                  className="btn btn-primary"
                >
                  Track in My Account
                </Link>

                <Link
                  to="/flowers"
                  className="btn btn-outline"
                >
                  Keep Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // EMPTY CART
  if (!items.length) {
    return (
      <>
        <SEO title="Checkout" noindex />

        <section className="page-header">
          <div className="container">
            <div
              className="eyebrow"
              style={{ justifyContent: "center" }}
            >
              <span className="rule"></span>
              Checkout
              <span className="rule"></span>
            </div>

            <h1>Your cart is empty</h1>

            <p className="breadcrumb">
              <Link to="/">Home</Link> / Checkout
            </p>
          </div>
        </section>

        <section className="section">
          <div
            className="container"
            style={{ textAlign: "center" }}
          >
            <p style={{ color: "var(--text-muted)" }}>
              Add a few stems to your cart and they'll appear here,
              ready to be hand-tied.
            </p>

            <Link
              to="/flowers"
              className="btn btn-primary mt-2"
            >
              Browse the Collections
            </Link>
          </div>
        </section>
      </>
    );
  }

  // CHECKOUT PAGE
  return (
    <>
      <SEO title="Checkout" noindex />

      <section className="page-header">
        <div className="container">
          <div
            className="eyebrow"
            style={{ justifyContent: "center" }}
          >
            <span className="rule"></span>
            Checkout
            <span className="rule"></span>
          </div>

          <h1>Delivery & payment</h1>

          <p className="breadcrumb">
            <Link to="/">Home</Link> /{" "}
            <Link to="/flowers">Flowers</Link> / Checkout
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <form
            className="form-card"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2
              className="mt-2"
              style={{ marginBottom: "1.2rem" }}
            >
              Where should we deliver?
            </h2>

            <div className="form-grid">
              {/* Recipient Name */}
              <div className="field">
                <label htmlFor="co-name">
                  Recipient name
                </label>

                <input
                  className="input"
                  type="text"
                  id="co-name"
                  value={address.fullName}
                  onChange={updateField("fullName")}
                  autoComplete="name"
                  placeholder="Enter recipient name"
                  required
                />
              </div>

              {/* Phone */}
              <div className="field">
                <label htmlFor="co-phone">
                  Phone number
                </label>

                <input
                  className="input"
                  type="tel"
                  id="co-phone"
                  value={address.phone}
                  onChange={updateField("phone")}
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>

              {/* Delivery Address */}
              <div className="field full">
                <label htmlFor="co-address">
                  Delivery address
                </label>

                <input
                  className="input"
                  type="text"
                  id="co-address"
                  value={address.addressLine}
                  onChange={updateField("addressLine")}
                  autoComplete="off"
                  placeholder="House No, Street, Area"
                  minLength={10}
                  required
                />
              </div>

              {/* City */}
              <div className="field">
                <label htmlFor="co-city">
                  City
                </label>

                <input
                  className="input"
                  type="text"
                  id="co-city"
                  value={address.city}
                  onChange={updateField("city")}
                  autoComplete="off"
                  placeholder="Enter city"
                  required
                />
              </div>

              {/* State */}
              <div className="field">
                <label htmlFor="co-state">
                  State
                </label>

                <input
                  className="input"
                  type="text"
                  id="co-state"
                  value={address.state}
                  onChange={updateField("state")}
                  autoComplete="off"
                  placeholder="Enter state"
                  required
                />
              </div>

              {/* PIN Code */}
              <div className="field">
                <label htmlFor="co-pincode">
                  PIN code
                </label>

                <input
                  className="input"
                  type="text"
                  id="co-pincode"
                  value={address.pincode}
                  onChange={updateField("pincode")}
                  autoComplete="off"
                  inputMode="numeric"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  placeholder="6-digit PIN"
                  required
                />
              </div>

              {/* Delivery Notes */}
              <div className="field full">
                <label htmlFor="co-notes">
                  Delivery notes
                </label>

                <textarea
                  id="co-notes"
                  rows="3"
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                  placeholder="Gate code, preferred time slot, message on the card..."
                ></textarea>
              </div>

              {/* Payment */}
              <div className="field full">
                <label>Payment method</label>

                <div className="radio-row">
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      checked
                      readOnly
                    />{" "}
                    Cash on Delivery
                  </label>
                </div>

                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                  }}
                >
                  Pay the rider when your flowers arrive — no
                  card details needed.
                </span>
              </div>
            </div>

            {/* Error */}
            {error ? (
              <p
                style={{
                  color: "#d32f2f",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                {error}
              </p>
            ) : null}

            {/* Submit */}
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

          {/* Order Summary */}
          <div>
            <div className="form-card">
              <h2
                className="mt-2"
                style={{ marginBottom: "1.2rem" }}
              >
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
                      style={{
                        marginTop: ".5rem",
                        width: "fit-content",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.flower,
                            item.quantity - 1
                          )
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
                            event.target.value.replace(/\D/g, "")
                          )
                        }
                      />

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.flower,
                            item.quantity + 1
                          )
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
                        onClick={() =>
                          removeItem(item.flower)
                        }
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

                <span className="card-price">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}