"use client";

import { CartItem, Produto } from "@/types/product";
import { createContext, useState, useEffect } from "react";

type CartContextType = {
  cart: CartItem[];
  frete: number;
  addToCart: (product: Produto) => void;
  clearCart: () => void;
  decreaseQuantity: (id: number) => void;
  setFrete: (valor: number) => void;
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

  const [frete, setFrete] = useState<number>(0);

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

  function decreaseQuantity(id: number) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        clearCart,
        frete,
        setFrete,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
