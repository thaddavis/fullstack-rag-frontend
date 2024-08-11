import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/auth-context";

import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryClientProvider } from "@/components/shared/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fullstack R.A.G.",
  description: "Made with ❤️ by COMMAND",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <html lang="en" className="h-full bg-white">
          <body className="h-full">
            {children}
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}
