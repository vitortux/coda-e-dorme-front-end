"use client";

import AdressInfoForm from "@/components/AdressInfoForm";
import UserInfoForm from "@/components/UserInfoForm";
import { AuthContext } from "@/context/AuthContext";
import { AddressType } from "@/types/adress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const addressSchema = z.object({
  cep: z.string().regex(/^\d{8}$/, "CPF deve conter exatamente 8 números"),
  logradouro: z.string(),
  numero: z.string(),
  complemento: z.string().optional(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
});

export const registerSchema = z
  .object({
    nome_completo: z.string().refine(
      (val) => {
        const palavras = val.split(" ");
        return (
          palavras.length === 2 &&
          palavras.every((palavra) => palavra.length >= 3)
        );
      },
      {
        message:
          "O nome completo deve conter 2 palavras, e cada uma deve ter pelo menos 3 letras",
      }
    ),
    email: z.string().email("E-mail inválido"),
    cpf: z.string().regex(/^\d{11}$/, "CPF deve conter exatamente 11 números"),
    senha: z.string(),
    confirmar_senha: z.string(),
    data_nascimento: z.string(),
    genero: z.enum(["masculino", "feminino", "outro", "nao_informar"]),
    endereco_faturamento: addressSchema,
    endereco_entrega: addressSchema.optional(),
  })
  .refine((data) => data.senha === data.confirmar_senha, {
    path: ["confirmar_senha"],
    message: "As senhas não coincidem",
  });

export default function Register() {
  const [sameAdress, setSameAdress] = useState(true);
  const { signUp } = useContext(AuthContext);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function handleSignUp(data) {
    const payload = {
      ...data,
      endereco_entrega: data.endereco_entrega ?? data.endereco_faturamento,
    };

    await signUp(payload);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          <img src="/logo.svg" alt="Logo" className="w-32 h-auto mx-auto" />
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="px-5 py-7"
            >
              <UserInfoForm />
              <div className="my-6 border-t border-gray-300"></div>
              <AdressInfoForm addressType={AddressType.Faturamento} />
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="sameAdress"
                  checked={sameAdress}
                  onChange={(e) => setSameAdress(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="sameAdress" className="text-sm text-gray-700">
                  Usar o mesmo endereço para entrega
                </label>
              </div>
              {!sameAdress && (
                <>
                  <div className="my-6 border-t border-gray-300"></div>
                  <AdressInfoForm addressType={AddressType.Entrega} />
                </>
              )}
              <button
                type="submit"
                className="bg-black text-white w-full py-2.5 rounded-lg text-sm shadow-sm font-semibold text-center inline-block cursor-pointer transition duration-200 transform hover:scale-102"
              >
                <span className="inline-block mr-2">Cadastrar-se</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </FormProvider>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 ring-inset"
                  onClick={() => router.push("/login")}
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
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="inline-block ml-1">
                    Já possui uma conta?
                  </span>
                </button>
              </div>
              <div className="text-center sm:text-right  whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-bottom	"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Ajuda</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <button
                className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 ring-inset"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
