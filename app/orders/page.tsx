"use client";

import GoToHomeButton from "@/components/GoToHomeButton";
import OrderCard from "@/components/OrderCard";
import OrderResumeModal from "@/components/OrderResumeModal";
import { AuthContext } from "@/context/AuthContext";
import { getPedidos, getPedidosEstoquista } from "@/service/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type Pedido = {
  id: number; // adiciona o id aqui se ainda não tiver
  dataPedido: string;
  valorTotalPedido: number;
  statusPedido: string;
  formaDePagamento: string;
};

export default function Orders() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      if (user?.grupo) {
        getPedidosEstoquista().then((res) => setOrders(res));
      } else {
        getPedidos().then((res) => setOrders(res));
      }
    }
  }, [isAuthenticated, user, router]);

  const handleOrderClick = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-100 bg-gray-100 flex justify-center xl:items-center xl:justify-center min-h-screen overflow-hidden">
      <div className="w-full max-w-7xl px-8 md:px-10 lg:px-12 mx-auto relative z-10 rounded shadow-lg bg-white">
        <div className="grid grid-cols-8">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto max-h-[837px] overflow-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300 mb-6">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Seus pedidos
              </h2>
              <GoToHomeButton />
            </div>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} onClick={() => handleOrderClick(order.id)}>
                  <OrderCard order={order} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                Você ainda não fez nenhum pedido.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal com pedido selecionado */}
      {selectedOrderId && isModalOpen && (
        <OrderResumeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          orderId={selectedOrderId}
        />
      )}
    </div>
  );
}
