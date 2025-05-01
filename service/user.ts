import { api } from "@/service/api";
import { parseCookies } from "nookies";
import { recoverUserData } from "./auth";

export async function updateUser(data, id) {
  const { "codaedorme.token": token } = parseCookies();

  const updatedUserData = {
    nomeCompleto: data.nome_completo,
    dataNascimento: data.data_nascimento,
    genero: data.genero,
    novaSenha: data.senha,
    novosEnderecosEntrega: data.novosEnderecosEntrega,
  };

  await api.put(`/api/clientes/${id}`, updatedUserData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function setEnderecoEntregaPadrao(
  userId: number,
  enderecoId: number
) {
  const { "codaedorme.token": token } = parseCookies();

  await api.put(`/api/clientes/${userId}/endereco-padrao/${enderecoId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
