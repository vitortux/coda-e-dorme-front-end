"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FiCreditCard } from "react-icons/fi";
import FaturamentoAdressCard from "./FaturamentoAdressCard";
import OrderItem from "./OrderItemCard";
import { Pedido } from "@/types/order";
import { detalhesPedido } from "@/service/order";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
}

export default function OrderResumeModal({
  isOpen,
  onClose,
  orderId,
}: CheckoutModalProps) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [order, setOrder] = useState<Pedido | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    detalhesPedido(orderId)
      .then(setOrder)
      .catch((err) => console.error("Erro ao buscar pedido:", err));
  }, [isOpen, orderId]);

  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 px-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Resumo do Pedido</h2>

        {/* Lista de Produtos */}
        <div className="mb-6 border-b border-gray-300">
          {order.itens_pedido.map((item) => (
            <OrderItem
              key={item.id_item_pedido}
              product={item.produto}
              quantity={item.qtd_produto}
            />
          ))}
        </div>

        {/* Totais */}
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm mb-6 text-sm text-gray-800 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-base">Subtotal</span>
            <span className="font-medium">
              R$
              {order.itens_pedido
                .reduce((acc, item) => acc + item.valor_sub_total, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base">Frete</span>
            <span className="font-medium">
              R$ {order.valor_frete.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold">
              R$ {order.valor_total_pedido.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Forma de Pagamento */}
        <div className="mb-6 border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FiCreditCard className="text-gray-600 w-5 h-5" />
            Forma de pagamento:
          </h3>
          <p className="text-sm text-gray-700 capitalize pl-1">
            {order.forma_de_pagamento.toLowerCase()}
          </p>
        </div>

        {/* Endereço de Entrega */}
        <FaturamentoAdressCard
          endereco={order.endereco}
          title="Endereço de entrega:"
        />

        {/* Ações */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition cursor-pointer"
            onClick={onClose}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
