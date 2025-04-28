"use client";

import CartItem from "@/components/CartItem";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Cart() {
  const { cart } = useContext(CartContext);
  const router = useRouter();

  return (
    <div className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-100 bg-gray-100 flex justify-center xl:items-center xl:justify-center min-h-screen">
      <div className="w-full max-w-7xl px-8 md:px-10 lg:px-12 mx-auto relative z-10 rounded shadow-lg bg-white">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Carrinho de compras
              </h2>
              <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                3 Items
              </h2>
            </div>
            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
              <div className="col-span-12 md:col-span-7">
                <p className="font-normal text-lg leading-8 text-gray-400">
                  Detalhes do produto
                </p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Quantidade
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Total
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {[...Array(3)].map((_, index) => (
              <CartItem key={index} />
            ))}
          </div>
          <div className="col-span-12 xl:col-span-4 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24 xl:border-l border-gray-200">
            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Resumo do pedido
            </h2>
            <div className="mt-8">
              <div className="flex items-center justify-between pb-6">
                <p className="font-normal text-lg leading-8 text-black">
                  3 Items
                </p>
                <p className="font-medium text-lg leading-8 text-black">
                  $480.00
                </p>
              </div>
              <form>
                <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                  Frete
                </label>
                <div className="flex pb-6">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                      placeholder="Digite seu CEP"
                    />
                  </div>
                </div>
                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                  Cupom Promocional
                </label>
                <div className="flex pb-4 w-full">
                  <div className="relative w-full ">
                    <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                    <input
                      type="text"
                      className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                      placeholder="xxxx xxxx xxxx"
                    />
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-200">
                  <button className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                    Aplicar
                  </button>
                </div>
                <div className="flex items-center justify-between py-8">
                  <p className="font-medium text-xl leading-8 text-black">
                    3 Items
                  </p>
                  <p className="font-semibold text-xl leading-8 text-indigo-600">
                    $485.00
                  </p>
                </div>
                <button className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">
                  Checkout
                </button>
                <button
                  className="transition duration-200 mx-5 px-5 py-4 my-5 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 ring-inset"
                  onClick={() => router.push("/")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="inline-block ml-1">Página inicial</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
