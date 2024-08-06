"use client";

import AuthContext from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useContext<{
    user: any;
    login: (username: string, password: string) => void;
    logout: () => void;
  }>(AuthContext);
  const router = useRouter();

  // debugger;

  useEffect(() => {
    async function asyncFunction() {
      if (!user) {
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

  return user ? children : null;
};

export default ProtectedRoute;
