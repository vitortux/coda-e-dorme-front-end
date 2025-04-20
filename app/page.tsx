"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { getProdutos } from "@/service/product";

export default function Home() {
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProdutos() {
      const data = await getProdutos();
      setProdutos(data.content);
    }

    fetchProdutos();
  }, []);

  return (
    <div className="text-black">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="relative flex flex-col my-6 bg-white shadow-sm border border-gray-200 rounded-lg w-full overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
          >
            <div className="relative p-2.5 h-96 overflow-hidden rounded-xl">
              {/* Verifique se a imagem existe antes de exibi-la */}
              <img
                src={`http://localhost:8080${produto.imagens?.[0]?.diretorioDestino}`}
                alt={produto.nome}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-black text-xl font-semibold">
                  {produto.nome}
                </p>
                <p className="text-gray-800 text-xl font-semibold">
                  R$ {produto.preco.toFixed(2)}
                </p>
              </div>
              <p className="text-gray-600 leading-normal font-light">
                {produto.descricao}
              </p>
              <button className="rounded-md w-full mt-6 bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all transform hover:scale-105 focus:bg-gray-800 focus:shadow-none active:bg-gray-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
