import { api } from "@/service/api";
import { SignInRequestData, SignUpRequestData } from "@/types/auth_types";
import { parseCookies } from "nookies";

export async function signInRequest(data: SignInRequestData) {
  const response = await api.post("/auth/login", {
    email: data.email,
    senha: data.password,
  });

  const cliente = response.data.cliente;

  if ("grupo" in cliente) {
    // Admin
    return {
      token: response.data.token,
      user: {
        id: cliente.id,
        nome_completo: cliente.nome,
        email: cliente.email,
        cpf: cliente.cpf,
        grupo: cliente.grupo,
        status: cliente.status,
        telefone: cliente.telefone,
      },
    };
  } else {
    // Usuário normal
    return {
      token: response.data.token,
      user: {
        id: cliente.id,
        nome_completo: cliente.nomeCompleto,
        email: cliente.email,
        telefone: cliente.telefone,
        cpf: cliente.cpf,
        data_nascimento: cliente.dataNascimento,
        genero: cliente.genero,
        endereco_faturamento: cliente.enderecoFaturamento,
        endereco_entrega: cliente.enderecoEntrega,
      },
    };
  }
}

export async function signUpRequest(data: SignUpRequestData): Promise<void> {
  await api.post("/auth/register", {
    nomeCompleto: data.nome_completo,
    email: data.email,
    cpf: data.cpf,
    senha: data.senha,
    dataNascimento: data.data_nascimento,
    genero: data.genero,
    enderecoFaturamento: {
      ...data.endereco_faturamento,
    },
    enderecoEntrega: [
      {
        ...data.endereco_entrega,
      },
    ],
  });
}

export async function recoverUserData() {
  const { "codaedorme.token": token } = parseCookies();

  const response = await api.get("/api/clientes/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const cliente = response.data;

  if ("grupo" in cliente) {
    // Admin
    return {
      token: response.data.token,
      user: {
        id: cliente.id,
        nome_completo: cliente.nome,
        email: cliente.email,
        cpf: cliente.cpf,
        grupo: cliente.grupo,
        status: cliente.status,
        telefone: cliente.telefone,
      },
    };
  } else {
    // Usuário normal
    return {
      token: response.data.token,
      user: {
        id: cliente.id,
        nome_completo: cliente.nomeCompleto,
        email: cliente.email,
        telefone: cliente.telefone,
        cpf: cliente.cpf,
        data_nascimento: cliente.dataNascimento,
        genero: cliente.genero,
        endereco_faturamento: cliente.enderecoFaturamento,
        endereco_entrega: cliente.enderecoEntrega,
      },
    };
  }
}
