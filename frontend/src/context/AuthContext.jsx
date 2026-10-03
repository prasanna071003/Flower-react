import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getToken } from "../services/api";
import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(getToken()));

  useEffect(() => {
    let active = true;
    if (!getToken()) {
      setLoading(false);
      return () => {
        active = false;
      };
    }
    fetchCurrentUser()
      .then((me) => {
        if (active) setUser(me);
      })
      .catch(() => {
        if (active) {
          logoutUser();
          setUser(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async ({ email, password, rememberMe }) => {
    const data = await loginUser({ email, password, rememberMe });
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (form) => {
    const data = await registerUser(form);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
