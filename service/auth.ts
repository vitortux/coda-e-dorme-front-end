type SignInRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

// Simulando requisição para o back-end, mas o ideal é realizar o fetch
export async function signInRequest(data: SignInRequestData) {
  await delay();

  return {
    token: "jwt.token",
    user: {
      name: "Bito",
      email: "bitinho@gmail.com",
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
