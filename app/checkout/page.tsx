"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import OrderSummary from "@/components/OrderSummary";
import PaymentMethodSelector from "@/components/PaymentMethodSelector";
import AdressInfoForm from "@/components/AdressInfoForm";
import { AddressType } from "@/types/adress";
import { FormProvider, useForm } from "react-hook-form";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import SubmitButton from "@/components/SubmitButton";

export default function Cart() {
  const [aberto, setAberto] = useState(false);
  const { user } = useContext(AuthContext);
  const form = useForm();

  return (
    <div className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-100 bg-gray-100 flex justify-center xl:items-center xl:justify-center min-h-screen">
      <div className="w-full max-w-7xl px-8 md:px-10 lg:px-12 mx-auto relative z-10 rounded shadow-lg bg-white">
        <div className="grid grid-cols-12">
          {/* Coluna esquerda */}
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Checkout
              </h2>
            </div>

            {/* Select de endereço */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">
                Escolha um endereço de entrega
              </h3>
              <select
                id="endereco_entrega"
                required
                className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
              >
                <option value="">Selecione...</option>
                {user?.endereco_entrega.map((endereco) => (
                  <option key={endereco.id} value={endereco.id}>
                    {endereco.logradouro}, {endereco.numero} - {endereco.bairro}
                    , {endereco.cidade}, {endereco.estado}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setAberto((prev) => !prev)}
              className="flex items-center gap-2 mt-8 cursor-pointer transition-colors duration-300 ease-in-out"
            >
              <span className="text-lg font-semibold">
                ...ou adicione um endereço de entrega
              </span>
              <FiChevronDown
                className={`transition-transform duration-300 ease-in-out ${
                  aberto ? "rotate-180 -translate-y-0.5" : "translate-y-0"
                }`}
              />
            </button>

            {aberto && (
              <FormProvider {...form}>
                <form className="mt-8 border-b border-gray-200">
                  <AdressInfoForm addressType={AddressType.Entrega} />
                  <button
                    type="button"
                    className="mb-4 inline-flex items-center justify-center gap-2 px-4 py-2 text-black text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-100 cursor-pointer"
                  >
                    <FiPlus className="w-4 h-4" />
                    Adicionar endereço
                  </button>
                </form>
              </FormProvider>
            )}

            {/* Pagamento */}
            <div className="mt-8">
              <PaymentMethodSelector />
            </div>

            <div className="mt-8">
              <SubmitButton text="Concluir pedido" />
            </div>
          </div>

          {/* Coluna direita */}
          <div className="col-span-12 xl:col-span-4 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24 xl:border-l border-gray-200">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
