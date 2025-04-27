import { api } from "@/service/api";
import { SignInRequestData, SignUpRequestData } from "@/types/auth_types"; // Importando os tipos

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: SignInRequestData) {
  const response = await api.post("/auth/login", {
    email: data.email,
    senha: data.password,
  });

  return {
    token: response.data.token,
    user: {
      name: "Bito",
      email: data.email,
    },
  };
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
  await delay();

  return {
    user: {
      name: "Bito",
      email: "bitinho@gmail.com",
    },
  };
}
