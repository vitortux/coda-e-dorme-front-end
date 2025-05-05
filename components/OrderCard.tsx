type Order = {
  id: number;
  dataPedido: string;
  statusPedido: string;
  valorTotalPedido: number;
};

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({ order }) {
  return (
    <div
      key={order.id}
      className="bg-white shadow-lg rounded-xl p-6 mb-6 flex justify-between items-center space-x-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900">
          Pedido #{order.id}
        </h3>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Data:</span>{" "}
          {new Date(order.dataPedido).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Status:</span>{" "}
          {order.statusPedido}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Total:</span> R$
          {order.valorTotalPedido.toFixed(2)}
        </p>
      </div>
      <div className="flex justify-end items-center">
        <a
          href="#"
          className="px-4 py-2 text-white bg-black rounded-full font-semibold hover:bg-black-700 transform hover:scale-105 transition-all duration-200"
        >
          Ver detalhes
        </a>
      </div>
    </div>
  );
}
