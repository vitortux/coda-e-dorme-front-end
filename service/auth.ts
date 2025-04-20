import { api } from "@/service/api";

type SignInRequestData = {
  email: string;
  password: string;
};

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

export async function recoverUserData() {
  await delay();

  return {
    user: {
      name: "Bito",
      email: "bitinho@gmail.com",
    },
  };
}
