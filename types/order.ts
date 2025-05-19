import { Address } from "./auth_types";
import { Produto } from "./product";

export type ItemPedido = {
  id_item_pedido: number;
  produto: Produto;
  qtd_produto: number;
  valor_unitario: number;
  valor_sub_total: number;
};

export type Pedido = {
  id: number;
  endereco: Address;
  itens_pedido: ItemPedido[];
  data_pedido: string;
  valor_frete: number;
  forma_de_pagamento: string;
  valor_total_pedido: number;
  status_pedido: string;
};
