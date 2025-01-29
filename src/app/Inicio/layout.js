"use client";
import Navbar from "@/components/navbar";


export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <Navbar /> {/* Navbar debe ser un client component si usa hooks */}
          {children}
        </body>
      </html>
    );
  }
  
