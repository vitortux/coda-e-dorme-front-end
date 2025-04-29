"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";

export default function ProfilePage() {
  const { ["codaedorme.token"]: token } = parseCookies();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  console.log(user);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const userFields = [
    { label: "Nome Completo", key: "nome_completo" },
    { label: "Email", key: "email" },
    { label: "CPF", key: "cpf" },
    { label: "Data de Nascimento", key: "data_nascimento" },
    { label: "Gênero", key: "genero" },
    // { label: "Endereço de Entrega", key: "endereco_entrega" },
    // { label: "Endereço de Faturamento", key: "endereco_faturamento" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full lg:w-3/4 xl:w-1/2 2xl:w-1/3">
        <h1 className="font-bold text-center text-2xl mb-5">
          <img src="/logo.svg" alt="Logo" className="w-32 h-auto mx-auto" />
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-8 py-10">
            {userFields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={field.key}
                  className="font-semibold text-sm pb-1 block"
                >
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    id={field.key}
                    name={field.key}
                    type="text"
                    value={user?.[field.key]}
                    readOnly
                    className="bg-gray-100 border border-gray-300 text-gray-500 rounded-lg px-4 py-3 mt-2 mb-6 text-sm w-full shadow-sm opacity-70 cursor-not-allowed focus:outline-none"
                  />
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="bg-black text-white w-full py-3 rounded-lg text-sm shadow-sm font-semibold text-center inline-block cursor-pointer transition duration-200 transform hover:scale-105"
            >
              <span className="inline-block mr-2">Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="py-7">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center sm:text-left whitespace-nowrap">
              <button
                className="transition duration-200 mx-5 px-6 py-5 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 ring-inset"
                onClick={() => router.push("/")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 inline-block align-text-top"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="inline-block ml-2">Página inicial</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
