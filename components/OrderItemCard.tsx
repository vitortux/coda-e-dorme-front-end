"use client";

import { Produto } from "@/types/product";

type OrderItemProps = {
  product: Produto;
  quantity: number;
};

export default function OrderItem({ product, quantity }: OrderItemProps) {
  return (
    <div className="flex gap-4 items-start">
      <img
        src={`http://localhost:8080${product.imagens[0].diretorioDestino}`}
        alt={product.nome}
        className="w-16 h-16 relative flex-shrink-0 object-cover rounded-md"
      />

      <div className="flex-1">
        <div className="font-medium">{product.nome}</div>
        <div className="text-sm text-gray-500">
          {product.descricao.slice(0, 20)}...
        </div>
        <div className="text-sm text-gray-500 mt-1">Quantidade: {quantity}</div>
        <div className="text-sm text-gray-500 mt-1">
          Preço Unitário: R$ {product.preco.toFixed(2)}
        </div>
      </div>

      <div className="font-medium">
        R$ {(product.preco * quantity).toFixed(2)}
      </div>
    </div>
  );
}
