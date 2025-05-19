import { Pedido } from "@/types/order";
import { parseCookies } from "nookies";

export async function detalhesPedido(pedido_id: number): Promise<Pedido> {
  const { "codaedorme.token": token } = parseCookies();

  const res = await fetch(
    `http://localhost:8080/api/pedido/detalhesPedido/${pedido_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  console.log(data);

  return {
    id: data.id,
    endereco: {
      id: data.endereco.id,
      logradouro: data.endereco.logradouro,
      numero: data.endereco.numero,
      complemento: data.endereco.complemento,
      bairro: data.endereco.bairro,
      cidade: data.endereco.cidade,
      estado: data.endereco.estado,
      cep: data.endereco.cep,
      padrao: data.endereco.padrao,
    },
    itens_pedido: data.itensPedido.map((item: any) => ({
      id_item_pedido: item.idItemPedido,
      qtd_produto: item.qtdProduto,
      valor_unitario: item.valorUnitario,
      valor_sub_total: item.valorSubTotal,
      produto: {
        id: item.produto.id,
        nome: item.produto.nome,
        descricao: item.produto.descricao,
        preco: item.produto.preco,
        quantidade_estoque: item.produto.quantidadeEstoque,
        status: item.produto.status,
        avaliacao: item.produto.avaliacao,
        imagens: item.produto.imagens.map((img: any) => ({
          id: img.id,
          nome: img.nome,
          diretorioDestino: img.diretorioDestino,
          imagem_principal: img.imagemPrincipal,
        })),
      },
    })),
    data_pedido: data.dataPedido,
    valor_frete: data.valorFrete,
    forma_de_pagamento: data.formaDePagamento,
    valor_total_pedido: data.valorTotalPedido,
    status_pedido: data.statusPedido,
  };
}
