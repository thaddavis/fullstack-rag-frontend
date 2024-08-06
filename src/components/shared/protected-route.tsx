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

  // debugger;

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return user ? children : null;
};

export default ProtectedRoute;
