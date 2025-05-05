import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import OrderSummary from "./OrderSummary";
import FaturamentoAdressCard from "./FaturamentoAdressCard";
import { FiCreditCard } from "react-icons/fi";
import { Address } from "@/types/auth_types";
import { AuthContext } from "@/context/AuthContext";
import { criarPedido } from "@/service/user";
import { useRouter } from "next/navigation";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    endereco_entrega: Address;
    payment: string;
  };
}

export default function CheckoutModal({
  isOpen,
  onClose,
  orderData,
}: CheckoutModalProps) {
  const { cart, frete, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (!isOpen) return null;

  const calcularTotalProdutos = () =>
    cart.reduce((total, item) => total + item.product.preco * item.quantity, 0);

  const subtotal = calcularTotalProdutos();
  const total = subtotal + frete;

  async function handleCheckout() {
    const itemsPedido = cart.map((item) => ({
      idProduto: item.product.id,
      qtdProduto: item.quantity,
      valorUnitario: item.product.preco,
      valorSubTotal: item.product.preco * item.quantity,
    }));

    const pedido = {
      idCliente: user?.id,
      idEndereco: orderData.endereco_entrega.id,
      valorFrete: frete,
      formaDePagamento: orderData.payment,
      valorTotalPedido: total,
      statusPedido: "AGUARDANDO_PAGAMENTO",
      itensPedido: itemsPedido,
    };

    try {
      const response = await criarPedido(pedido);

      alert(
        `✅ ${response.mensagem}\nNúmero do pedido: ${
          response.idPedido
        }\nValor total: R$ ${response.valorTotal.toFixed(2)}`
      );

      clearCart();
      router.push("/orders");
    } catch (e) {
      alert("❌ Não foi possível criar seu pedido: " + e.message);
    }
  }

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 px-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      onClick={onClose}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Resumo do Pedido</h2>

        {/* Lista de Produtos */}
        <div className="mb-6">
          <OrderSummary />
        </div>

        {/* Totais - estilizado */}
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm mb-6 text-sm text-gray-800 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-base">Subtotal</span>
            <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base">Frete</span>
            <span className="font-medium">R$ {frete.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold">R$ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Forma de Pagamento - com react-icons */}
        <div className="mb-6 border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FiCreditCard className="text-gray-600 w-5 h-5" />
            Forma de pagamento:
          </h3>
          <p className="text-sm text-gray-700 capitalize pl-1">
            {orderData.payment}
          </p>
        </div>

        {/* Endereço de Entrega */}
        <FaturamentoAdressCard
          endereco={orderData.endereco_entrega}
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
          <button
            onClick={handleCheckout}
            className="px-5 py-2.5 rounded-xl bg-black text-white font-semibold shadow-md transition-transform duration-200 hover:scale-102 cursor-pointer"
          >
            Concluir Compra
          </button>
        </div>
      </div>
    </div>
  );
}
