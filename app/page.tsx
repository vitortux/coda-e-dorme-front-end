"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { getProdutos } from "@/service/product";
import { useEffect, useState } from "react";

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
    <>
      <Header />
      <div className="bg-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8 md:px-32">
        {produtos.map((produto) => (
          <ProductCard key={produto.id} product={produto} />
        ))}
      </div>
      <Footer />
    </>
  );
}
