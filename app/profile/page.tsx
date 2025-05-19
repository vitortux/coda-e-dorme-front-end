"use client";

import AdressInfoForm from "@/components/AdressInfoForm";
import EditUserForm from "@/components/EditUserForm";
import EntregaAdressCard from "@/components/EntregaAdressCard";
import FaturamentoAdressCard from "@/components/FaturamentoAdressCard";
import BackToHomeButton from "@/components/GoToHomeButton";
import LogoFormHeader from "@/components/LogoFormHeader";
import SubmitButton from "@/components/SubmitButton";
import { AuthContext } from "@/context/AuthContext";
import { setEnderecoEntregaPadrao, updateUser } from "@/service/user";
import { AddressType } from "@/types/adress";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address } from "cluster";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiMapPin, FiPlus } from "react-icons/fi";
import { z } from "zod";

const addressSchema = z.object({
  cep: z.string().regex(/^(\d{8})?$/, "CEP deve conter exatamente 8 números"),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
});

export const updateUserSchema = z
  .object({
    nome_completo: z
      .string()
      .refine(
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
      )
      .optional(),
    senha: z.string().optional(),
    confirmar_senha: z.string().optional(),
    data_nascimento: z.string(),
    genero: z.enum(["masculino", "feminino", "outro", "nao_informar"]),
    endereco_entrega: addressSchema.optional(),
  })
  .refine((data) => data.senha === data.confirmar_senha, {
    path: ["confirmar_senha"],
    message: "As senhas não coincidem",
  });

export default function ProfilePage() {
  const { ["codaedorme.token"]: token } = parseCookies();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
  });

  const [enderecosNovos, setEnderecosNovos] = useState<Address[]>([]);

  const adicionarEndereco = () => {
    const novoEndereco = form.getValues("endereco_entrega");
    setEnderecosNovos((prev) => [...prev, novoEndereco]);
    form.resetField("endereco_entrega");
  };

  async function handleUpdateUser(data) {
    const payload = {
      nome_completo: data.nome_completo,
      email: data.email,
      cpf: data.cpf,
      senha: data.senha,
      confirmar_senha: data.confirmar_senha,
      data_nascimento: data.data_nascimento,
      genero: data.genero,
      novosEnderecosEntrega: [...enderecosNovos],
    };

    console.log(payload);

    await updateUser(payload, user.id);
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full lg:w-3/4 xl:w-1/2 2xl:w-1/3">
        <LogoFormHeader />
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <FormProvider {...form}>
            <form
              className="px-8 py-10"
              onSubmit={form.handleSubmit(handleUpdateUser)}
            >
              <EditUserForm user={user} />
              <div className="my-6 border-t border-gray-300" />
              <FaturamentoAdressCard endereco={user?.endereco_faturamento} />
              <div className="my-6 border-t border-gray-300" />
              <div className="flex items-center gap-2 mb-2">
                <FiMapPin className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-base text-gray-800">
                  Seus endereços de entrega:
                </h2>
              </div>
              <p className="text-sm text-gray-400 mb-5">
                Clique sobre um endereço para definir como padrão.
              </p>
              {user?.endereco_entrega &&
                [...user.endereco_entrega]
                  .sort((a, b) => (b.padrao ? 1 : 0) - (a.padrao ? 1 : 0))
                  .map((endereco, index) => (
                    <EntregaAdressCard
                      key={index}
                      endereco={endereco}
                      handleClick={async () => {
                        await setEnderecoEntregaPadrao(user.id, endereco.id);
                        window.location.reload();
                      }}
                    />
                  ))}
              {enderecosNovos.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-700">
                    Endereços pendentes para adicionar:
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {enderecosNovos.map((end, idx) => (
                      <EntregaAdressCard key={idx} endereco={end} />
                    ))}
                  </ul>
                </div>
              )}
              <div className="my-6 border-t border-gray-300" />
              <div className="flex items-center gap-2 mb-2"></div>
              <AdressInfoForm addressType={AddressType.Entrega} />
              <button
                type="button"
                onClick={adicionarEndereco}
                className="mb-5 inline-flex items-center justify-center gap-2 px-4 py-2 text-black text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-100 cursor-pointer"
              >
                <FiPlus className="w-4 h-4" />
                Adicionar endereço
              </button>
              <SubmitButton text="Salvar alterações" />
            </form>
          </FormProvider>
        </div>
        <div className="py-7">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center sm:text-left whitespace-nowrap">
              <BackToHomeButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
