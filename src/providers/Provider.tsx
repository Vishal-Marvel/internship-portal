import { useEffect, useState } from "react";
import { SessionContext } from "@/providers/context/SessionContext";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const publicRoutes = ["/student/signin", "/faculty/signin", "/"]

export function Providers({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);


  useEffect(() => {
    isTokenExpired();
    if (!token && !publicRoutes.includes(pathname)) {
      setTheme("default");
      navigate("/");
    }
    if (pathname == "/") {
      if (token) navigate("/dashboard");
    }
  }, [pathname, token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const setSession = (newToken: string, newRole: string) => {
    const exp = JSON.parse(atob(newToken.split(".")[1]));
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const clearSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    redirect("/");
  };



  const isTokenExpired = () => {
    if (token) {
      let exp;

      try {
        exp = JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
      if (exp.exp * 1000 < Date.now()) {
        clearSession();
        return true;
      }
      return false;
    }
    return true;
  };
  return (
    <SessionContext.Provider
      value={{
        token,
        role,
        isTokenExpired,
        clearSession,
        setSession,
      }}
    >
      <Toaster position="top-right" />

      <ThemeProvider defaultTheme="default">{children}</ThemeProvider>
    </SessionContext.Provider>
  );
}
