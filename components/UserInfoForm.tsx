export default function UserInfoForm() {
  return (
    <>
      <label
        htmlFor="nomeCompleto"
        className="font-semibold text-sm pb-1 block"
      >
        Nome completo
      </label>
      <input
        id="nomeCompleto"
        name="nomeCompleto"
        type="text"
        required
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="Seu nome completo"
      />

      <label htmlFor="email" className="font-semibold text-sm pb-1 block">
        E-mail
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="example@example.com"
      />

      <label htmlFor="cpf" className="font-semibold text-sm pb-1 block">
        CPF
      </label>
      <input
        id="cpf"
        name="cpf"
        type="text"
        required
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="000.000.000-00"
      />

      <label htmlFor="senha" className="font-semibold text-sm pb-1 block">
        Senha
      </label>
      <input
        id="senha"
        name="senha"
        type="password"
        autoComplete="new-password"
        required
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
      />

      <label
        htmlFor="confirmarSenha"
        className="font-semibold text-sm pb-1 block"
      >
        Confirmar senha
      </label>
      <input
        id="confirmarSenha"
        name="confirmarSenha"
        type="password"
        autoComplete="new-password"
        required
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
      />

      <label
        htmlFor="dataNascimento"
        className="font-semibold text-sm pb-1 block"
      >
        Data de nascimento
      </label>
      <input
        id="dataNascimento"
        name="dataNascimento"
        type="date"
        required
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
      />

      <label htmlFor="genero" className="font-semibold text-sm pb-1 block">
        Gênero
      </label>
      <select
        id="genero"
        name="genero"
        required
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
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
