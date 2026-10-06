import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageEffects } from "../hooks/usePageEffects";
import { useAuth } from "../context/AuthContext";
import {
  createFlower,
  deleteFlower,
  fetchFlowers,
  updateFlower,
} from "../services/flowerService";
import { fetchAllOrders, updateOrderStatus } from "../services/orderService";
import {
  deleteContactMessage,
  fetchContactMessages,
  updateContactMessageStatus,
} from "../services/contactService";
import { formatDate, formatPrice } from "../utils/format";
import SEO from "../components/SEO";
import { fetchCustomers } from "../services/authService";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "flowers", label: "Flowers" },
  { id: "orders", label: "Orders" },
  { id: "users", label: "Users" },
  { id: "messages", label: "Messages" },
];
const FLOWER_CATEGORIES = [
  "roses",
  "bouquets",
  "seasonal",
  "weddings",
  "plants",
];
const ORDER_STATUSES = ["Pending", "Processing", "Delivered", "Cancelled"];
const MESSAGE_STATUSES = ["new", "read", "archived"];

const STATUS_STYLES = {
  Pending: { background: "var(--brand-soft)", color: "var(--brand)" },
  Processing: { background: "var(--wine-700)", color: "#ffffff" },
  Delivered: { background: "var(--ink-900)", color: "#ffffff" },
  Cancelled: { background: "var(--border)", color: "var(--text-muted)" },
};
const MESSAGE_STATUS_STYLES = {
  new: { background: "var(--brand-soft)", color: "var(--brand)" },
  read: { background: "var(--ink-900)", color: "#ffffff" },
  archived: { background: "var(--border)", color: "var(--text-muted)" },
};

const EMPTY_FLOWER = {
  name: "",
  category: "roses",
  price: "",
  image: "",
  meta: "",
  badge: "",
  description: "",
  featured: false,
};

export default function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState("overview");
  const [flowers, setFlowers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");
  const [messageFilter, setMessageFilter] = useState("all");
  const [flowerForm, setFlowerForm] = useState(EMPTY_FLOWER);
  const [editingId, setEditingId] = useState(null);
  const [flowerNote, setFlowerNote] = useState("");
  const [savingFlower, setSavingFlower] = useState(false);
  const [statusDrafts, setStatusDrafts] = useState({});
  const [busyId, setBusyId] = useState("");
  const [actionNote, setActionNote] = useState("");

  usePageEffects();

  useEffect(() => {
    let active = true;
    Promise.allSettled([
      fetchFlowers(),
      fetchAllOrders(),
      fetchCustomers(),
      fetchContactMessages(),
    ]).then(([flowersResult, ordersResult, customersResult, messagesResult]) => {
      if (!active) return;
      const failures = [];
      if (flowersResult.status === "fulfilled")
        setFlowers(flowersResult.value.flowers || []);
      else failures.push(flowersResult.reason.message);
      if (ordersResult.status === "fulfilled")
        setOrders(ordersResult.value.orders || []);
      else failures.push(ordersResult.reason.message);
      if (customersResult.status === "fulfilled")
        setCustomers(customersResult.value.users || []);
      else failures.push(customersResult.reason.message);
      if (messagesResult.status === "fulfilled")
        setMessages(messagesResult.value.messages || []);
      else failures.push(messagesResult.reason.message);
      setError(failures.join(" "));
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending",
  ).length;
  const newMessages = messages.filter(
    (message) => message.status === "new",
  ).length;
  const activeOrders = orders.filter(
    (order) => order.orderStatus !== "Cancelled",
  );
  const totalRevenue = activeOrders.reduce(
    (sum, order) => sum + (Number(order.total) || 0),
    0,
  );
  const avgOrderValue = activeOrders.length
    ? Math.round(totalRevenue / activeOrders.length)
    : 0;
  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered",
  ).length;
  const processingOrders = orders.filter(
    (order) => order.orderStatus === "Processing",
  ).length;
  const bouquetRequests = messages.filter(
    (message) => (message.subject || "").trim() === "Custom Bouquet Request",
  );
  const categoryCounts = FLOWER_CATEGORIES.map((category) => ({
    category,
    count: flowers.filter((flower) => flower.category === category).length,
  }));
  const otherCategoryCount = flowers.filter(
    (flower) => !FLOWER_CATEGORIES.includes(flower.category),
  ).length;
  const filteredOrders =
    orderFilter === "all"
      ? orders
      : orders.filter((order) => order.orderStatus === orderFilter);
  const filteredMessages =
    messageFilter === "all"
      ? messages
      : messages.filter((message) => message.status === messageFilter);

  function updateFlowerField(field) {
    return (event) => {
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
      setFlowerForm((current) => ({ ...current, [field]: value }));
    };
  }

  function startEditFlower(flower) {
    setEditingId(flower._id);
    setFlowerForm({
      name: flower.name || "",
      category: flower.category || "roses",
      price:
        flower.price === undefined || flower.price === null
          ? ""
          : String(flower.price),
      image: flower.image || "",
      meta: flower.meta || "",
      badge: flower.badge || "",
      description: flower.description || "",
      featured: Boolean(flower.featured),
    });
    setFlowerNote("");
  }

  function cancelEditFlower() {
    setEditingId(null);
    setFlowerForm(EMPTY_FLOWER);
    setFlowerNote("");
  }

  async function handleFlowerSubmit(event) {
    event.preventDefault();
    if (savingFlower) return;
    setSavingFlower(true);
    setFlowerNote("");
    try {
      const payload = {
        ...flowerForm,
        price: flowerForm.price === "" ? undefined : Number(flowerForm.price),
      };
      if (editingId) {
        const updated = await updateFlower(editingId, payload);
        setFlowers((current) =>
          current.map((flower) =>
            flower._id === updated._id ? updated : flower,
          ),
        );
        setFlowerNote("Flower updated successfully.");
      } else {
        const created = await createFlower(payload);
        setFlowers((current) => [created, ...current]);
        setFlowerNote("Flower added successfully.");
      }
      setFlowerForm(EMPTY_FLOWER);
      setEditingId(null);
    } catch (err) {
      setFlowerNote(err.message);
    } finally {
      setSavingFlower(false);
    }
  }

  async function handleDeleteFlower(flower) {
    if (!window.confirm(`Delete “${flower.name}”? This cannot be undone.`))
      return;
    setBusyId(flower._id);
    setActionNote("");
    try {
      await deleteFlower(flower._id);
      setFlowers((current) =>
        current.filter((item) => item._id !== flower._id),
      );
      if (editingId === flower._id) cancelEditFlower();
      setActionNote(`${flower.name} deleted.`);
    } catch (err) {
      setActionNote(err.message);
    } finally {
      setBusyId("");
    }
  }

  async function handleOrderStatus(order) {
    const next = statusDrafts[order._id];
    if (!next || next === order.orderStatus) return;
    setBusyId(order._id);
    setActionNote("");
    try {
      const updated = await updateOrderStatus(order._id, next);
      setOrders((current) =>
        current.map((item) => (item._id === updated._id ? updated : item)),
      );
      setStatusDrafts((current) => {
        const nextDrafts = { ...current };
        delete nextDrafts[order._id];
        return nextDrafts;
      });
      setActionNote(
        `Order ${String(order._id).slice(-8).toUpperCase()} marked ${next}.`,
      );
    } catch (err) {
      setActionNote(err.message);
    } finally {
      setBusyId("");
    }
  }

  async function handleMessageStatus(message, status) {
    setBusyId(message._id);
    setActionNote("");
    try {
      const updated = await updateContactMessageStatus(message._id, status);
      setMessages((current) =>
        current.map((item) => (item._id === updated._id ? updated : item)),
      );
      setActionNote(`Message from ${message.name} marked ${status}.`);
    } catch (err) {
      setActionNote(err.message);
    } finally {
      setBusyId("");
    }
  }

  async function handleDeleteMessage(message) {
    if (!window.confirm(`Delete the message from ${message.name}?`)) return;
    setBusyId(message._id);
    setActionNote("");
    try {
      await deleteContactMessage(message._id);
      setMessages((current) =>
        current.filter((item) => item._id !== message._id),
      );
      setActionNote("Message deleted.");
    } catch (err) {
      setActionNote(err.message);
    } finally {
      setBusyId("");
    }
  }

  function openOrdersTab(status) {
    setOrderFilter(status);
    setTab("orders");
  }

  return (
    <>
      <SEO title="Admin" noindex />
      <section className="page-header">
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="rule"></span>Admin<span className="rule"></span>
          </div>
          <h1>Store Management</h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / Admin{user ? ` · ${user.email}` : ""}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="filter-bar">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`chip${tab === item.id ? " is-active" : ""}`}
                onClick={() => setTab(item.id)}
              >
                {item.label}
                {item.id === "orders" && pendingOrders
                  ? ` (${pendingOrders})`
                  : ""}
                {item.id === "users" ? ` (${customers.length})` : ""}
                {item.id === "messages" && newMessages
                  ? ` (${newMessages})`
                  : ""}
              </button>
            ))}
          </div>
          {error && (
            <p
              style={{
                color: "var(--brand)",
                fontWeight: "500",
                marginBottom: "1.2rem",
              }}
            >
              {error}
            </p>
          )}

          {!loading && tab === "users" && (
            <section aria-labelledby="admin-users-heading">
              <div className="section-head">
                <div className="eyebrow">
                  <span className="rule"></span>Customer accounts
                </div>
                <h2 id="admin-users-heading">Recent customers</h2>
                <p>Showing up to the 100 most recently created customer accounts.</p>
              </div>
              {customers.length === 0 ? (
                <p>No customer accounts to show yet.</p>
              ) : (
                <div className="admin-users-list">
                  {customers.map((customer) => (
                    <article className="admin-users-row" key={customer._id}>
                      <div className="admin-user-avatar" aria-hidden="true">
                        {(customer.firstName || customer.email || "?").slice(0, 1).toUpperCase()}
                      </div>
                      <div className="admin-user-identity">
                        <strong>
                          {[customer.firstName, customer.lastName].filter(Boolean).join(" ") || "Customer"}
                        </strong>
                        <span>{customer.email}</span>
                      </div>
                      <div className="admin-user-contact">
                        <span>{customer.phone || "No phone added"}</span>
                        <span>Joined {formatDate(customer.createdAt)}</span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
          {actionNote && (
            <p
              style={{
                color: "var(--brand)",
                fontWeight: "500",
                marginBottom: "1.2rem",
              }}
            >
              {actionNote}
            </p>
          )}
          {loading ? (
            <p style={{ color: "var(--text-muted)" }}>Loading store data…</p>
          ) : null}

          {!loading && tab === "overview" && (
            <>
              <div className="stat-strip admin-overview-stats">
                <div>
                  <strong>{flowers.length}</strong>
                  <span>Flowers in catalogue</span>
                </div>
                <div>
                  <strong>{orders.length}</strong>
                  <span>Orders placed</span>
                </div>
                <div>
                  <strong>{customers.length}</strong>
                  <span>Recent customers</span>
                </div>
                <div>
                  <strong>{pendingOrders}</strong>
                  <span>Orders pending</span>
                </div>
                <div>
                  <strong>{newMessages}</strong>
                  <span>New messages</span>
                </div>
              </div>
              <div className="split mt-2">
                <div className="form-card">
                  <div className="eyebrow">
                    <span className="rule"></span>Sales Snapshot
                  </div>
                  <h2 className="mt-2" style={{ marginBottom: "1rem" }}>
                    Sales at a glance
                  </h2>
                  <ul className="info-list">
                    <li>
                      <span className="dot"></span>
                      <div>
                        <strong>Total revenue</strong>
                        <span>
                          {formatPrice(totalRevenue)} across {activeOrders.length}{" "}
                          {activeOrders.length === 1 ? "order" : "orders"}
                          {orders.length !== activeOrders.length
                            ? ` (${orders.length - activeOrders.length} cancelled)`
                            : ""}
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="dot"></span>
                      <div>
                        <strong>Average order value</strong>
                        <span>{formatPrice(avgOrderValue)}</span>
                      </div>
                    </li>
                    <li>
                      <span className="dot"></span>
                      <div>
                        <strong>Fulfilment</strong>
                        <span>
                          {processingOrders} processing · {deliveredOrders}{" "}
                          delivered
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="form-card">
                  <div className="eyebrow">
                    <span className="rule"></span>Catalogue Mix
                  </div>
                  <h2 className="mt-2" style={{ marginBottom: "1rem" }}>
                    Blooms by category
                  </h2>
                  {flowers.length === 0 ? (
                    <p style={{ color: "var(--text-muted)" }}>
                      No flowers in the catalogue yet.
                    </p>
                  ) : (
                    <div className="tag-row">
                      {categoryCounts
                        .filter((item) => item.count > 0)
                        .map((item) => (
                          <span key={item.category} className="tag">
                            {item.category} · {item.count}
                          </span>
                        ))}
                      {otherCategoryCount > 0 && (
                        <span className="tag">
                          other · {otherCategoryCount}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="pd-actions mt-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => setTab("flowers")}
                    >
                      Manage Catalogue
                    </button>
                  </div>
                </div>
              </div>
              <div className="split mt-2">
                <div className="form-card">
                  <div className="eyebrow">
                    <span className="rule"></span>Latest Orders
                  </div>
                  <h2 className="mt-2" style={{ marginBottom: "1rem" }}>
                    Recent activity
                  </h2>
                  {orders.length === 0 ? (
                    <p style={{ color: "var(--text-muted)" }}>No orders yet.</p>
                  ) : (
                    <ul className="info-list">
                      {orders.slice(0, 5).map((order) => (
                        <li key={order._id}>
                          <span className="dot"></span>
                          <div>
                            <strong>
                              Order {String(order._id).slice(-8).toUpperCase()}{" "}
                              · {formatPrice(order.total)}
                            </strong>
                            <span>
                              {formatDate(order.createdAt)} ·{" "}
                              {order.orderStatus}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="pd-actions mt-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => setTab("orders")}
                    >
                      Manage Orders
                    </button>
                  </div>
                </div>
                <div className="form-card">
                  <div className="eyebrow">
                    <span className="rule"></span>Latest Messages
                  </div>
                  <h2 className="mt-2" style={{ marginBottom: "1rem" }}>
                    From your customers
                  </h2>
                  {messages.length === 0 ? (
                    <p style={{ color: "var(--text-muted)" }}>
                      No messages yet.
                    </p>
                  ) : (
                    <ul className="info-list">
                      {messages.slice(0, 5).map((message) => (
                        <li key={message._id}>
                          <span className="dot"></span>
                          <div>
                            <strong>{message.subject}</strong>
                            <span>
                              {message.name} · {formatDate(message.createdAt)} ·{" "}
                              {message.status}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="pd-actions mt-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => setTab("messages")}
                    >
                      View Messages
                    </button>
                  </div>
                </div>
              </div>
              <div className="split mt-2">
                <div className="form-card">
                  <div className="eyebrow">
                    <span className="rule"></span>Order Pipeline
                  </div>
                  <h2 className="mt-2" style={{ marginBottom: "1rem" }}>
                    Orders by status
                  </h2>
                  <div
                    className="filter-bar"
                    role="group"
                    aria-label="Open orders by status"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <button
                        key={status}
                        type="button"
                        className="chip"
                        onClick={() => openOrdersTab(status)}
                      >
                        {status} (
                        {orders.filter((o) => o.orderStatus === status).length})
                      </button>
                    ))}
                  </div>
                  <p className="card-meta mt-2">
                    Select a status to open it in the Orders tab.
                  </p>
                </div>
                <div className="form-card">
                  <div className="eyebrow">
                    <span className="rule"></span>Custom Bouquets
                  </div>
                  <h2 className="mt-2" style={{ marginBottom: "1rem" }}>
                    Bespoke requests
                  </h2>
                  {bouquetRequests.length === 0 ? (
                    <p style={{ color: "var(--text-muted)" }}>
                      No custom bouquet requests yet.
                    </p>
                  ) : (
                    <ul className="info-list">
                      {bouquetRequests.slice(0, 3).map((message) => (
                        <li key={message._id}>
                          <span className="dot"></span>
                          <div>
                            <strong>{message.name}</strong>
                            <span>
                              {formatDate(message.createdAt)} ·{" "}
                              {message.status}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="pd-actions mt-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => setTab("messages")}
                    >
                      View Messages
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {!loading && tab === "flowers" && (
            <div className="split">
              <div className="form-card">
                <div className="eyebrow">
                  <span className="rule"></span>
                  {editingId ? "Edit Flower" : "Add Flower"}
                </div>
                <h2 className="mt-2" style={{ marginBottom: "1.2rem" }}>
                  {editingId ? "Update this bloom" : "New bloom"}
                </h2>
                <form onSubmit={handleFlowerSubmit}>
                  <div className="form-grid">
                    <div className="field full">
                      <label htmlFor="admin-flower-name">Name</label>
                      <input
                        className="input"
                        id="admin-flower-name"
                        required
                        value={flowerForm.name}
                        onChange={updateFlowerField("name")}
                        placeholder="Blush Romance Bouquet"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="admin-flower-category">Category</label>
                      <select
                        className="select"
                        id="admin-flower-category"
                        value={flowerForm.category}
                        onChange={updateFlowerField("category")}
                      >
                        {FLOWER_CATEGORIES.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="admin-flower-price">Price (₹)</label>
                      <input
                        className="input"
                        id="admin-flower-price"
                        type="number"
                        min="0"
                        required
                        value={flowerForm.price}
                        onChange={updateFlowerField("price")}
                        placeholder="2499"
                      />
                    </div>
                    <div className="field full">
                      <label htmlFor="admin-flower-image">Image path</label>
                      <input
                        className="input"
                        id="admin-flower-image"
                        required
                        value={flowerForm.image}
                        onChange={updateFlowerField("image")}
                        placeholder="/images/inside.jpg"
                      />
                    </div>
                    <div className="field full">
                      <label htmlFor="admin-flower-meta">Meta line</label>
                      <input
                        className="input"
                        id="admin-flower-meta"
                        value={flowerForm.meta}
                        onChange={updateFlowerField("meta")}
                        placeholder="Roses · Peonies · Eucalyptus"
                      />
                    </div>
                    <div className="field full">
                      <label htmlFor="admin-flower-badge">Badge</label>
                      <input
                        className="input"
                        id="admin-flower-badge"
                        value={flowerForm.badge}
                        onChange={updateFlowerField("badge")}
                        placeholder="Bestseller"
                      />
                    </div>
                    <div className="field full">
                      <label htmlFor="admin-flower-description">
                        Description
                      </label>
                      <textarea
                        className="input"
                        id="admin-flower-description"
                        rows="3"
                        value={flowerForm.description}
                        onChange={updateFlowerField("description")}
                      ></textarea>
                    </div>
                    <div className="field full radio-row">
                      <label style={{ fontSize: "14px" }}>
                        <input
                          type="checkbox"
                          checked={flowerForm.featured}
                          onChange={updateFlowerField("featured")}
                        />{" "}
                        Feature on homepage
                      </label>
                    </div>
                  </div>
                  <div className="pd-actions mt-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={savingFlower}
                    >
                      {savingFlower
                        ? "Saving…"
                        : editingId
                          ? "Update Flower"
                          : "Add Flower"}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={cancelEditFlower}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                  {flowerNote && (
                    <p
                      style={{
                        color: "var(--brand)",
                        marginTop: "1rem",
                        fontWeight: "500",
                      }}
                    >
                      {flowerNote}
                    </p>
                  )}
                </form>
              </div>
              <div>
                <div className="section-head">
                  <div className="eyebrow">
                    <span className="rule"></span>Catalogue
                  </div>
                  <h2>
                    {flowers.length} {flowers.length === 1 ? "bloom" : "blooms"}
                  </h2>
                </div>
                <div className="grid" style={{ gap: "1rem" }}>
                  {flowers.map((flower) => (
                    <article className="card" key={flower._id}>
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
                          <h3 style={{ margin: 0 }}>{flower.name}</h3>
                          <span className="tag">{flower.category}</span>
                        </div>
                        <p className="card-meta">
                          {flower.meta || "—"}
                          {flower.featured ? " · Featured" : ""}
                        </p>
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
                            {flower.reviews
                              ? `${flower.reviews} reviews`
                              : "No reviews"}
                          </span>
                          <span className="card-price">
                            {formatPrice(flower.price)}
                          </span>
                        </div>
                      </div>
                      <div className="card-foot">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                          onClick={() => startEditFlower(flower)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-ghost"
                          disabled={busyId === flower._id}
                          onClick={() => handleDeleteFlower(flower)}
                        >
                          {busyId === flower._id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!loading && tab === "orders" && (
            <>
              <div className="filter-bar">
                {["all", ...ORDER_STATUSES].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`chip${orderFilter === status ? " is-active" : ""}`}
                    onClick={() => setOrderFilter(status)}
                  >
                    {status === "all" ? "All" : status}
                  </button>
                ))}
              </div>
              {filteredOrders.length === 0 ? (
                <p style={{ color: "var(--text-muted)" }}>
                  No orders match this filter.
                </p>
              ) : (
                <div className="grid" style={{ gap: "1rem" }}>
                  {filteredOrders.map((order) => {
                    const customer =
                      order.user && typeof order.user === "object"
                        ? order.user
                        : null;
                    const draft = statusDrafts[order._id] || order.orderStatus;
                    return (
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
                            {formatDate(order.createdAt)} ·{" "}
                            {customer
                              ? `${customer.firstName || ""} ${customer.lastName || ""}`.trim()
                              : ""}
                            {customer && customer.email
                              ? ` · ${customer.email}`
                              : ""}
                          </p>
                          <ul className="dashboard-list">
                            {order.items.map((item) => (
                              <li
                                key={`${order._id}-${item.flower || item.name}`}
                              >
                                {item.quantity} × {item.name} —{" "}
                                {formatPrice(item.price * item.quantity)}
                              </li>
                            ))}
                          </ul>
                          <p
                            className="card-meta"
                            style={{ marginTop: ".8rem" }}
                          >
                            Ship to: {order.shippingAddress.fullName},{" "}
                            {order.shippingAddress.addressLine},{" "}
                            {order.shippingAddress.city}{" "}
                            {order.shippingAddress.pincode} ·{" "}
                            {order.shippingAddress.phone}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: ".8rem",
                              flexWrap: "wrap",
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
                          <div className="pd-actions mt-2">
                            <select
                              className="select"
                              style={{ width: "auto" }}
                              aria-label={`Status for order ${String(order._id).slice(-8).toUpperCase()}`}
                              value={draft}
                              onChange={(event) =>
                                setStatusDrafts((current) => ({
                                  ...current,
                                  [order._id]: event.target.value,
                                }))
                              }
                            >
                              {ORDER_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              className="btn btn-sm btn-primary"
                              disabled={
                                busyId === order._id ||
                                draft === order.orderStatus
                              }
                              onClick={() => handleOrderStatus(order)}
                            >
                              {busyId === order._id
                                ? "Updating…"
                                : "Update Status"}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {!loading && tab === "messages" && (
            <>
              <div className="filter-bar">
                {["all", ...MESSAGE_STATUSES].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`chip${messageFilter === status ? " is-active" : ""}`}
                    onClick={() => setMessageFilter(status)}
                  >
                    {status === "all"
                      ? "All"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
              {filteredMessages.length === 0 ? (
                <p style={{ color: "var(--text-muted)" }}>
                  No messages match this filter.
                </p>
              ) : (
                <div className="grid" style={{ gap: "1rem" }}>
                  {filteredMessages.map((message) => (
                    <article className="card" key={message._id}>
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
                          <h3 style={{ margin: 0 }}>{message.subject}</h3>
                          <span
                            className="tag"
                            style={
                              MESSAGE_STATUS_STYLES[message.status] ||
                              MESSAGE_STATUS_STYLES.new
                            }
                          >
                            {message.status}
                          </span>
                        </div>
                        <p className="card-meta">
                          {message.name}
                          {message.email ? ` · ${message.email}` : ""}
                          {message.phone ? ` · ${message.phone}` : ""} ·{" "}
                          {formatDate(message.createdAt)}
                        </p>
                        <p style={{ marginTop: ".8rem" }}>{message.message}</p>
                        <div className="pd-actions mt-2">
                          {MESSAGE_STATUSES.filter(
                            (status) => status !== message.status,
                          ).map((status) => (
                            <button
                              key={status}
                              type="button"
                              className="btn btn-sm btn-outline"
                              disabled={busyId === message._id}
                              onClick={() =>
                                handleMessageStatus(message, status)
                              }
                            >
                              Mark {status}
                            </button>
                          ))}
                          <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            disabled={busyId === message._id}
                            onClick={() => handleDeleteMessage(message)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
