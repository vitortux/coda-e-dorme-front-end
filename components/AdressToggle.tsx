import { FiChevronDown, FiPlus } from "react-icons/fi";
import { FormProvider, useForm } from "react-hook-form";
import AdressInfoForm from "@/components/AdressInfoForm";
import { AddressType } from "@/types/adress";
import { useState } from "react";
import { adicionarEnderecoCheckout } from "@/service/user";

export default function AddressFormToggle() {
  const [aberto, setAberto] = useState(false);
  const form = useForm();

  async function addEndereco(data) {
    await adicionarEnderecoCheckout(data.endereco_entrega);
    window.location.reload();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        className="flex items-center gap-2 mt-8 cursor-pointer transition-colors duration-300 ease-in-out"
      >
        <span className="text-lg font-semibold">
          Adicione um endereço de entrega
        </span>
        <FiChevronDown
          className={`transition-transform duration-300 ease-in-out ${
            aberto ? "rotate-180 -translate-y-0.5" : "translate-y-0"
          }`}
        />
      </button>

      {aberto && (
        <FormProvider {...form}>
          <form
            className="mt-8 border-gray-200"
            onSubmit={form.handleSubmit(addEndereco)}
          >
            <AdressInfoForm addressType={AddressType.Entrega} />
            <button
              type="submit"
              className="mb-4 inline-flex items-center justify-center gap-2 px-4 py-2 text-black text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-100 cursor-pointer"
            >
              <FiPlus className="w-4 h-4" />
              Adicionar endereço
            </button>
          </form>
        </FormProvider>
      )}
    </>
  );
}
