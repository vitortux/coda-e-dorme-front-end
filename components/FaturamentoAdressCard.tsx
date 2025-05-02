import { Address } from "@/types/auth_types";
import { FiMapPin } from "react-icons/fi";

export default function FaturamentoAdressCard({
  endereco,
}: {
  endereco: Address;
}) {
  return (
    <div className="pb-6">
      <div className="flex items-center gap-2 mb-2">
        <FiMapPin className="w-5 h-5 text-gray-600" />
        <h2 className="font-semibold text-base text-gray-800">
          Endereço de faturamento:
        </h2>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">{endereco?.logradouro}</span>,{" "}
          {endereco?.numero}
          {endereco?.complemento && `, ${endereco?.complemento}`}
        </p>
        <p>
          {endereco?.bairro} - {endereco?.cidade}, {endereco?.estado} -{" "}
          {endereco?.cep}
        </p>
      </div>
    </div>
  );
}
