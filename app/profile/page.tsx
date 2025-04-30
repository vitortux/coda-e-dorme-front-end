"use client";

import EditUserForm from "@/components/EditUserForm";
import EntregaAdressCard from "@/components/EntregaAdressCard";
import FaturamentoAdressCard from "@/components/FaturamentoAdressCard";
import BackToHomeButton from "@/components/GoToHomeButton";
import LogoFormHeader from "@/components/LogoFormHeader";
import SubmitButton from "@/components/SubmitButton";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiMapPin } from "react-icons/fi";

export default function ProfilePage() {
  const { ["codaedorme.token"]: token } = parseCookies();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const form = useForm();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full lg:w-3/4 xl:w-1/2 2xl:w-1/3">
        <LogoFormHeader />
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <FormProvider {...form}>
            <form className="px-8 py-10">
              <EditUserForm user={user} />
              <div className="my-6 border-t border-gray-300" />
              <FaturamentoAdressCard endereco={user?.endereco_faturamento} />
              <div className="my-6 border-t border-gray-300" />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiMapPin className="w-5 h-5 text-gray-600" />
                  <h2 className="font-semibold text-base text-gray-800">
                    Seus endereços de entrega:
                  </h2>
                </div>
                {user?.endereco_entrega
                  .sort((a, b) => (b.padrao ? 1 : 0) - (a.padrao ? 1 : 0))
                  .map((endereco, index) => (
                    <EntregaAdressCard key={index} endereco={endereco} />
                  ))}
              </div>
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
