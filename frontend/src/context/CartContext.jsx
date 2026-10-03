import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);
const CART_KEY = "cb-cart";

function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item) =>
          item && typeof item.flower === "string" && Number(item.quantity) > 0,
      )
      .map((item) => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable — the cart simply will not persist across reloads.
    }
  }, [items]);

  const addItem = useCallback((flower, quantity = 1) => {
    const qty = Math.max(1, Math.min(99, Number(quantity) || 1));
    setItems((current) => {
      const existing = current.find((item) => item.flower === flower._id);
      if (existing) {
        return current.map((item) =>
          item.flower === flower._id
            ? { ...item, quantity: Math.min(99, item.quantity + qty) }
            : item,
        );
      }
      return [
        ...current,
        {
          flower: flower._id,
          name: flower.name,
          meta: flower.meta || "",
          price: Number(flower.price) || 0,
          image: flower.image || "",
          quantity: qty,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((flowerId) => {
    setItems((current) => current.filter((item) => item.flower !== flowerId));
  }, []);

  const updateQuantity = useCallback((flowerId, quantity) => {
    const qty = Math.max(1, Math.min(99, Number(quantity) || 1));
    setItems((current) =>
      current.map((item) =>
        item.flower === flowerId ? { ...item, quantity: qty } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, count, subtotal, addItem, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
