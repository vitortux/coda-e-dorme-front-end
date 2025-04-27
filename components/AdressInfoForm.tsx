import { Endereco, getAddress } from "@/service/cep";
import { AddressType } from "@/types/adress";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type AddressFormProps = {
  addressType: AddressType;
};

export default function AdressInfoForm({ addressType }: AddressFormProps) {
  const adressBase = `endereco_${addressType}`;
  const context = useFormContext();

  const [cep, setCep] = useState("");

  const handleCepChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cepValue = event.target.value;
    setCep(cepValue);
    context.setValue(`${adressBase}.cep`, cepValue);

    if (cepValue.length === 8) {
      const endereco: Endereco | null = await getAddress(cepValue);

      if (endereco) {
        context.setValue(`${adressBase}.logradouro`, endereco.logradouro);
        context.setValue(`${adressBase}.bairro`, endereco.bairro);
        context.setValue(`${adressBase}.cidade`, endereco.localidade);
        context.setValue(`${adressBase}.estado`, endereco.uf);
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
        type="text"
        required
        value={cep}
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="00000-000"
        {...context.register(`${adressBase}.cep`)}
        onChange={handleCepChange}
      />

      <label htmlFor="logradouro" className="font-semibold text-sm pb-1 block">
        Logradouro
      </label>
      <input
        id="logradouro"
        type="text"
        required
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="Rua, Avenida, etc."
        {...context.register(`${adressBase}.logradouro`)}
      />

      <div className="flex space-x-4">
        <div className="w-full">
          <label htmlFor="numero" className="font-semibold text-sm pb-1 block">
            Número
          </label>
          <input
            id="numero"
            type="text"
            required
            className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            placeholder="Número"
            {...context.register(`${adressBase}.numero`)}
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
            type="text"
            className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            placeholder="Apto, Bloco, etc."
            {...context.register(`${adressBase}.complemento`)}
          />
        </div>
      </div>

      <label htmlFor="bairro" className="font-semibold text-sm pb-1 block">
        Bairro
      </label>
      <input
        id="bairro"
        type="text"
        required
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="Bairro"
        {...context.register(`${adressBase}.bairro`)}
      />

      <label htmlFor="cidade" className="font-semibold text-sm pb-1 block">
        Cidade
      </label>
      <input
        id="cidade"
        type="text"
        required
        className="placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        placeholder="Cidade"
        {...context.register(`${adressBase}.cidade`)}
      />

      <label htmlFor="estado" className="font-semibold text-sm pb-1 block">
        Estado
      </label>
      <select
        id="estado"
        required
        className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        {...context.register(`${adressBase}.estado`)}
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
