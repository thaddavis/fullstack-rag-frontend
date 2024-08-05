"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useState } from "react";

const AuthContext = createContext<{
  user: any;
  login: (username: string, password: string) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    try {
      debugger;

      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/token`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      localStorage.setItem("token", response.data.access_token);
      setUser(response.data);
      router.push("/dashboard");
    } catch (error) {
      console.log("Login Failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
