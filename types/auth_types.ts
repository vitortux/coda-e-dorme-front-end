export type Address = {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export type User = {
  nome_completo: string;
  email: string;
  cpf: string;
  data_nascimento: string;
  genero: string;
  endereco_entrega: Address[];
  endereco_faturamento: Address;
};

export type SignInRequestData = {
  email: string;
  password: string;
};

export type SignUpRequestData = {
  nome_completo: string;
  email: string;
  cpf: string;
  senha: string;
  data_nascimento: string;
  genero: "masculino" | "feminino" | "outro" | "nao_informar";
  endereco_faturamento: Address;
  endereco_entrega: Address;
};
