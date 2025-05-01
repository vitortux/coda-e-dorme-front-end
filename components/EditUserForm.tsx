import { User } from "@/types/auth_types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function EditUserForm({ user }: { user: User }) {
  const context = useFormContext();

  useEffect(() => {
    if (user) {
      context.setValue("nome_completo", user.nome_completo);
      context.setValue("email", user.email);
      context.setValue("cpf", user.cpf);
      context.setValue("data_nascimento", user.data_nascimento);
      context.setValue("genero", user.genero?.toLowerCase());
    }
  }, [user]);

  return (
    <>
      <label
        htmlFor="nome_completo"
        className="font-semibold text-sm pb-1 block"
      >
        Nome completo
      </label>
      <input
        id="nome_completo"
        type="text"
        required
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="Seu nome completo"
        {...context.register("nome_completo")}
      />
      {context.formState.errors.nome_completo && (
        <p className="text-red-500 text-sm mb-5">
          {`${context.formState.errors.nome_completo.message}`}
        </p>
      )}

      <label htmlFor="email" className="font-semibold text-sm pb-1 block">
        E-mail
      </label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        readOnly
        className="text-gray-500 placeholder-gray-400 border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full cursor-not-allowed focus:border-gray-400 focus:bg-gray-200 focus:ring-0"
        placeholder="example@example.com"
        {...context.register("email")}
      />

      <label htmlFor="cpf" className="font-semibold text-sm pb-1 block">
        CPF
      </label>
      <input
        id="cpf"
        type="text"
        readOnly
        className="text-gray-500 placeholder-gray-400 border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full cursor-not-allowed focus:border-gray-400 focus:bg-gray-200 focus:ring-0"
        placeholder="000.000.000-00"
        {...context.register("cpf")}
      />
      {context.formState.errors.cpf && (
        <p className="text-red-500 text-sm mb-5">
          {`${context.formState.errors.cpf.message}`}
        </p>
      )}

      <label htmlFor="senha" className="font-semibold text-sm pb-1 block">
        Nova senha
      </label>
      <input
        id="senha"
        type="password"
        autoComplete="new-password"
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
        {...context.register("senha")}
      />

      <label
        htmlFor="confirmar_senha"
        className="font-semibold text-sm pb-1 block"
      >
        Confirmar nova senha
      </label>
      <input
        id="confirmar_senha"
        type="password"
        autoComplete="new-password"
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        {...context.register("confirmar_senha")}
      />
      {context.formState.errors.confirmar_senha && (
        <p className="text-red-500 text-sm mb-5">
          {`${context.formState.errors.confirmar_senha.message}`}
        </p>
      )}

      <label
        htmlFor="data_nascimento"
        className="font-semibold text-sm pb-1 block"
      >
        Data de nascimento
      </label>
      <input
        id="data_nascimento"
        type="date"
        required
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        {...context.register("data_nascimento")}
      />

      <label htmlFor="genero" className="font-semibold text-sm pb-1 block">
        Gênero
      </label>
      <select
        id="genero"
        required
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-1 mb-5 text-sm w-full"
        {...context.register("genero")}
      >
        <option value="">Selecione...</option>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
        <option value="outro">Outro</option>
        <option value="nao_informar">Prefiro não informar</option>
      </select>
    </>
  );
}
