"use client";

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  async function handleSignIn(data) {
    await signIn(data);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          <img src="/logo.svg" alt="Logo" className="w-32 h-auto mx-auto" />
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form className="px-5 py-7" onSubmit={handleSubmit(handleSignIn)}>
            <label htmlFor="email" className="font-semibold text-sm pb-1 block">
              E-mail
            </label>
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              placeholder="example@example.com"
            />
            <label
              htmlFor="password"
              className="font-semibold text-sm pb-1 block"
            >
              Senha
            </label>
            <input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              type="submit"
              className="bg-black text-white w-full py-2.5 rounded-lg text-sm shadow-sm font-semibold text-center inline-block cursor-pointer transition duration-200 transform hover:scale-102"
            >
              <span className="inline-block mr-2">Login</span>
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
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 ring-inset"
                  onClick={() => router.push("/register")}
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
                    Não possui uma conta?
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
