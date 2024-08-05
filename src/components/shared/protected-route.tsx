"use client";

import AuthContext from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext<{
    user: any;
    login: (username: string, password: string) => void;
    logout: () => void;
  }>(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return user ? children : null;
};

export default ProtectedRoute;
