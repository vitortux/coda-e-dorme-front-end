type Imagem = {
  id: number;
  nome: string;
  diretorioDestino: string;
  imagemPrincipal: boolean;
};

type Status = "ATIVO" | "INATIVO";

export type Produto = {
  id: number;
  nome: string;
  avaliacao: number;
  descricao: string;
  preco: number;
  quantidadeEstoque: number;
  imagens: Imagem[];
  status: Status;
};
