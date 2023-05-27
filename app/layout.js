import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css"

export default function RootLayout({ children }) {
    return (
        <div className="text-black bg-black flex flex-col min-h-screen">
          <Header />
            <body>{children}</body>
          <Footer />
        </div>
    );
  }
