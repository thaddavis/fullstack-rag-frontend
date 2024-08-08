"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext<{
  user: any;
  setUser: (arg: any) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    // Rehydrate user from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Assuming you have an endpoint to validate the token and get user info
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate-token`)
        .then((response) => {
          console.log("response", response);
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Rehydration Failed:", error);
          // Optionally, remove the token if invalid
          localStorage.removeItem("token");
          setUser(undefined);
        });
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
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
      setUser(undefined);

      toast.error("Login Failed");

      console.error("Login Failed:", error);
    }
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
