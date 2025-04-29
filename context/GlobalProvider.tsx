"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "./CartContext";

export function GlobalProvider({ children }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
