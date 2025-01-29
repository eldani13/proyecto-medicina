"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation"; // Cambiado de useRouter a usePathname

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // Usamos usePathname en lugar de useRouter

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLoginPage = pathname === "/"; // Usamos pathname directamente
  return (
    <html lang="en">
      <body>
        {!isLoginPage && <Navbar />}
        {children}
      </body>
    </html>
  );
}
