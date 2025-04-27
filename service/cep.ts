import { api } from "@/service/api";

export interface Endereco {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export const getAddress = async (cep: string): Promise<Endereco | null> => {
  try {
    const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;

    if (data.erro) {
      return null;
    }

    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    };
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
    return null;
  }
};
