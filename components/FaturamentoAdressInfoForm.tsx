import { useState } from "react";
import { getAddress, Endereco } from "@/service/cep";

export default function FaturamentoAddressInfoForm() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const handleCepChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cepValue = event.target.value;
    setCep(cepValue);

    if (cepValue.length === 8) {
      const endereco: Endereco | null = await getAddress(cepValue);

      if (endereco) {
        setLogradouro(endereco.logradouro);
        setBairro(endereco.bairro);
        setCidade(endereco.localidade);
        setEstado(endereco.uf);
      } else {
        alert("CEP não encontrado.");
      }
    }
  };

  return (
    <>
      <label htmlFor="cep" className="font-semibold text-sm pb-1 block">
        CEP
      </label>
      <input
        id="cep"
        name="cep"
        type="text"
        required
        value={cep}
        onChange={handleCepChange}
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="00000-000"
      />

      <label htmlFor="logradouro" className="font-semibold text-sm pb-1 block">
        Logradouro
      </label>
      <input
        id="logradouro"
        name="logradouro"
        type="text"
        required
        value={logradouro}
        onChange={(e) => setLogradouro(e.target.value)}
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="Rua, Avenida, etc."
      />

      <div className="flex space-x-4">
        <div className="w-full">
          <label htmlFor="numero" className="font-semibold text-sm pb-1 block">
            Número
          </label>
          <input
            id="numero"
            name="numero"
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
            className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            placeholder="Número"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="complemento"
            className="font-semibold text-sm pb-1 block"
          >
            Complemento
          </label>
          <input
            id="complemento"
            name="complemento"
            type="text"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            placeholder="Apto, Bloco, etc."
          />
        </div>
      </div>

      <label htmlFor="bairro" className="font-semibold text-sm pb-1 block">
        Bairro
      </label>
      <input
        id="bairro"
        name="bairro"
        type="text"
        required
        value={bairro}
        onChange={(e) => setBairro(e.target.value)}
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="Bairro"
      />

      <label htmlFor="cidade" className="font-semibold text-sm pb-1 block">
        Cidade
      </label>
      <input
        id="cidade"
        name="cidade"
        type="text"
        required
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="Cidade"
      />

      <label htmlFor="estado" className="font-semibold text-sm pb-1 block">
        Estado
      </label>
      <select
        id="estado"
        name="estado"
        required
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
      >
        <option value="">Selecione...</option>
        <option value="AC">Acre</option>
        <option value="AL">Alagoas</option>
        <option value="AP">Amapá</option>
        <option value="AM">Amazonas</option>
        <option value="BA">Bahia</option>
        <option value="CE">Ceará</option>
        <option value="DF">Distrito Federal</option>
        <option value="ES">Espírito Santo</option>
        <option value="GO">Goiás</option>
        <option value="MA">Maranhão</option>
        <option value="MT">Mato Grosso</option>
        <option value="MS">Mato Grosso do Sul</option>
        <option value="MG">Minas Gerais</option>
        <option value="PA">Pará</option>
        <option value="PB">Paraíba</option>
        <option value="PR">Paraná</option>
        <option value="PE">Pernambuco</option>
        <option value="PI">Piauí</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="RN">Rio Grande do Norte</option>
        <option value="RS">Rio Grande do Sul</option>
        <option value="RO">Rondônia</option>
        <option value="RR">Roraima</option>
        <option value="SC">Santa Catarina</option>
        <option value="SP">São Paulo</option>
        <option value="SE">Sergipe</option>
        <option value="TO">Tocantins</option>
      </select>
    </>
  );
}
