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
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate-token`)
      .then((response) => {
        console.log("response", response);
        setUser(response.data);
      })
      .catch((error) => {
        setUser(undefined);
      });
    // }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true, // Add this line
        }
      );

      setUser(response.data);

      router.push("/dashboard");
    } catch (error) {
      setUser(undefined);

      toast.error("Login Failed");

      console.error("Login Failed:", error);
    }
  };

  const logout = async () => {
    // setUser(undefined);
    // localStorage.removeItem("token");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
