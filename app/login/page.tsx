"use client";

import AccountRedirectButton from "@/components/AccountRedirect";
import BackHomeButton from "@/components/GoToHomeButton";
import LogoFormHeader from "@/components/LogoFormHeader";
import SubmitButton from "@/components/SubmitButton";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

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
        <LogoFormHeader />
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
            <SubmitButton text="Login" />
          </form>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <AccountRedirectButton
                  text="Não possui uma conta?"
                  route="/register"
                />
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
              <BackHomeButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
