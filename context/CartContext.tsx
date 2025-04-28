"use client";

import { CartItem, Produto } from "@/types/product";
import { createContext, useState, useEffect } from "react";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Produto) => void;
  removeFromCart: (id: number) => void;
};

export const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  function addToCart(product: Produto) {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(id: number) {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.product.id !== id);
    });
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
