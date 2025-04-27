import { useFormContext } from "react-hook-form";

export default function UserInfoForm() {
  const context = useFormContext();

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
        required
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="example@example.com"
        {...context.register("email")}
      />

      {context.formState.errors.email && (
        <p className="text-red-500 text-sm mb-5">
          {`${context.formState.errors.email.message}`}
        </p>
      )}

      <label htmlFor="cpf" className="font-semibold text-sm pb-1 block">
        CPF
      </label>
      <input
        id="cpf"
        type="text"
        required
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="000.000.000-00"
        {...context.register("cpf")}
      />

      {context.formState.errors.cpf && (
        <p className="text-red-500 text-sm mb-5">
          {`${context.formState.errors.cpf.message}`}
        </p>
      )}

      <label htmlFor="senha" className="font-semibold text-sm pb-1 block">
        Senha
      </label>
      <input
        id="senha"
        type="password"
        autoComplete="new-password"
        required
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
        {...context.register("senha")}
      />

      <label
        htmlFor="confirmar_senha"
        className="font-semibold text-sm pb-1 block"
      >
        Confirmar senha
      </label>
      <input
        id="confirmar_senha"
        type="password"
        autoComplete="new-password"
        required
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
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
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
