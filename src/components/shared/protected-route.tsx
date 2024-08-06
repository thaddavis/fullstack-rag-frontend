"use client";

import AuthContext from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  const { user, logout } = useContext<{
    user: any;
    setUser: any;
    login: (username: string, password: string) => void;
    logout: () => void;
  }>(AuthContext);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    async function asyncFunction() {
      if (!loading && !user) {
        router.push("/");
      }

      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-token`,
          {
            method: "GET",
            // Add the following line to make fetch throw an error
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (resp.status === 401) logout();
      } catch (e) {
        console.error("ProtectedRoute: fetch error:", e);
      }
    }

    asyncFunction();
  }, [user, router]);

  if (loading) {
    return <div>...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  return user ? children : null;
};

export default ProtectedRoute;
