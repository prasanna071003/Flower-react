import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { fetchMyOrders } from "../services/orderService";
import { fetchFlowers } from "../services/flowerService";
import { formatPrice, formatDate } from "../utils/format";
import SEO from "../components/SEO";

const STATUS_STYLES = {
  Pending: { background: "var(--brand-soft)", color: "var(--brand)" },
  Processing: { background: "var(--wine-700)", color: "#ffffff" },
  Delivered: { background: "var(--ink-900)", color: "#ffffff" },
  Cancelled: { background: "var(--border)", color: "var(--text-muted)" },
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { count, addItem } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [blooms, setBlooms] = useState([]);
  const [bloomsLoading, setBloomsLoading] = useState(true);

  usePageEffects();

  useEffect(() => {
    let active = true;
    fetchMyOrders()
      .then((data) => {
        if (active) setOrders(data.orders || []);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    fetchFlowers({ sort: "featured" })
      .then((data) => {
        if (!active) return;
        const list = data.flowers || [];
        const featured = list.filter((flower) => flower.featured);
        setBlooms([...featured, ...list.filter((f) => !f.featured)].slice(0, 4));
      })
      .catch(() => {})
      .finally(() => {
        if (active) setBloomsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const delivered = orders.filter(
    (order) => order.orderStatus === "Delivered",
  ).length;
  const inProgress = orders.filter(
    (order) =>
      order.orderStatus === "Pending" || order.orderStatus === "Processing",
  ).length;

  return (
    <>
      <SEO title="My Account" noindex />
      <section className="page-header">
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="rule"></span>My Account
            <span className="rule"></span>
          </div>
          <h1>
            Hello{user.firstName ? `, ${user.firstName}` : ""} — welcome back
          </h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / My Account
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="stat-strip">
            <div>
              <strong>{orders.length}</strong>
              <span>Orders placed</span>
            </div>
            <div>
              <strong>{inProgress}</strong>
              <span>On the way</span>
            </div>
            <div>
              <strong>{delivered}</strong>
              <span>Delivered</span>
            </div>
            <div>
              <strong>{count}</strong>
              <span>Items in cart</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container split">
          <div className="form-card">
            <div className="eyebrow">
              <span className="rule"></span>Profile
            </div>
            <h2 className="mt-2" style={{ marginBottom: "1.2rem" }}>
              Your details
            </h2>
            <ul className="info-list">
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Name</strong>
                  <span>
                    {`${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                      "—"}
                  </span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Email</strong>
                  <span>{user.email}</span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div>
                  <strong>Phone</strong>
                  <span>{user.phone || "Not added yet"}</span>
                </div>
              </li>
            </ul>
            <div className="pd-actions mt-2">
              <Link to="/flowers" className="btn btn-primary">
                Shop Flowers
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Request Custom Bouquet
              </Link>
              <Link to="/checkout" className="btn btn-outline">
                View Cart{count ? ` (${count})` : ""}
              </Link>
              <button type="button" className="btn btn-ghost" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
          <div>
            <div className="section-head">
              <div className="eyebrow">
                <span className="rule"></span>Order History
              </div>
              <h2>Your recent blooms</h2>
            </div>
            {loading ? (
              <p style={{ color: "var(--text-muted)" }}>Loading your orders…</p>
            ) : error ? (
              <p style={{ color: "var(--brand)", fontWeight: "500" }}>
                {error}
              </p>
            ) : orders.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>
                You haven't placed an order yet. When you do, it will show up
                here with its live status.
              </p>
            ) : (
              <div className="grid" style={{ gap: "1rem" }}>
                {orders.map((order) => (
                  <article className="card" key={order._id}>
                    <div className="card-body">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: ".8rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <h3 style={{ margin: 0 }}>
                          Order {String(order._id).slice(-8).toUpperCase()}
                        </h3>
                        <span
                          className="tag"
                          style={
                            STATUS_STYLES[order.orderStatus] ||
                            STATUS_STYLES.Pending
                          }
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                      <p className="card-meta">
                        {formatDate(order.createdAt)} · {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </p>
                      <ul className="dashboard-list">
                        {order.items.map((item) => (
                          <li key={`${order._id}-${item.flower || item.name}`}>
                            {item.quantity} × {item.name} —{" "}
                            {formatPrice(item.price * item.quantity)}
                          </li>
                        ))}
                      </ul>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "1rem",
                          borderTop: "1px solid var(--border)",
                          paddingTop: ".8rem",
                        }}
                      >
                        <span className="card-meta">
                          {order.paymentMethod} · {order.paymentStatus}
                        </span>
                        <span className="card-price">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="rule"></span>From the Boutique
            </div>
            <h2>Fresh in the boutique</h2>
          </div>
          {bloomsLoading ? (
            <p style={{ color: "var(--text-muted)" }}>Loading blooms…</p>
          ) : blooms.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>
              The catalogue is being refreshed — check back shortly.
            </p>
          ) : (
            <div className="grid grid-4">
              {blooms.map((flower) => (
                <article className="card" key={flower._id}>
                  <Link to={`/flower-details/${flower._id}`}>
                    <div
                      className="bloom-tile"
                      style={{ "--card-photo": `url('${flower.image}')` }}
                    >
                      {flower.badge ? (
                        <span className="tile-badge">{flower.badge}</span>
                      ) : null}
                    </div>
                  </Link>
                  <div className="card-body">
                    <h3>
                      <Link to={`/flower-details/${flower._id}`}>
                        {flower.name}
                      </Link>
                    </h3>
                    {flower.meta ? (
                      <p className="card-meta">{flower.meta}</p>
                    ) : null}
                    <span className="card-price">
                      {flower.priceFrom
                        ? `From ${formatPrice(flower.price)}`
                        : formatPrice(flower.price)}
                    </span>
                    <div className="card-foot">
                      <Link
                        to={`/flower-details/${flower._id}`}
                        className="btn btn-sm btn-outline"
                      >
                        Details
                      </Link>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => addItem(flower)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="pd-actions mt-2">
            <Link to="/flowers" className="btn btn-outline">
              Browse All Flowers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
