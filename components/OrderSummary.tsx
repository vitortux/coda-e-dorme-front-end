"use client";

import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import OrderItem from "./OrderItemCard";

export default function OrderSummary() {
  const { cart } = useContext(CartContext);

  return (
    <div className="mt-8">
      <div className="border-b border-gray-300">
        {cart.map((item) => (
          <OrderItem
            key={item.product.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
}
