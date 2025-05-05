import { api } from "@/service/api";
import { Address } from "@/types/auth_types";
import { parseCookies } from "nookies";

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

export async function adicionarEnderecoCheckout(endereco: Address) {
  const { "codaedorme.token": token } = parseCookies();

  await api.post(`/api/clientes/add-endereco`, endereco, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function criarPedido(pedido: any) {
  const { "codaedorme.token": token } = parseCookies();

  const response = await api.post("/api/pedido/addPedido", pedido, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getPedidos() {
  const { "codaedorme.token": token } = parseCookies();

  const response = await api.get("/api/pedido/buscarPedidos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
