import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R.A.G. with Pinecone",
  description: "Made with ❤️ by COMMAND",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className="h-full bg-white">
        <body className="h-full">{children}</body>
      </html>
    </AuthProvider>
  );
}
