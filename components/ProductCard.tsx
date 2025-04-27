"use client";

import { useRouter } from "next/navigation";
import { Produto } from "@/types/product";

export default function ProductCard({ product }: { product: Produto }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="cursor-pointer flex flex-col shadow-md hover:shadow-lg transition-shadow rounded-lg"
      aria-hidden="true"
    >
      {product.imagens.length > 0 && (
        <img
          src={`http://localhost:8080${product.imagens?.[0]?.diretorioDestino}`}
          alt={product.nome}
          className="w-full object-contain rounded-t-lg"
        />
      )}

      <div className="flex flex-col justify-around flex-grow p-6 rounded-b-lg">
        {" "}
        <h3 className="mb-2 font-semibold text-lg">{product.nome}</h3>
        <span className="mb-2 text-gray-600">{product.descricao}</span>
        <h3 className="font-semibold text-lg">R$ {product.preco},99</h3>
      </div>
    </div>
  );
}
