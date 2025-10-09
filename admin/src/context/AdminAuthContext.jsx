import React, { createContext, useContext, useState, useEffect } from "react";
import { adminApi } from "../services/adminApi";

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      adminApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchAdmin();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAdmin = async () => {
    try {
      const response = await adminApi.get("/auth/me");
      setAdmin(response.data.user);
    } catch (error) {
      console.error("Admin auth error:", error);
      localStorage.removeItem("adminToken");
      delete adminApi.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await adminApi.post("/auth/admin/login", {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("adminToken", token);
      adminApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAdmin(user);

      return { success: true };
    } catch (error) {
      console.error("Admin login error:", error);
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    delete adminApi.defaults.headers.common["Authorization"];
    setAdmin(null);
  };

  const value = {
    admin,
    login,
    logout,
    loading,
    isAuthenticated: !!admin,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
