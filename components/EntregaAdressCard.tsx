import { Address } from "@/types/auth_types";
import { FaStar } from "react-icons/fa";

export default function EntregaAdressCard({
  endereco,
  handleClick,
}: {
  endereco: Address;
  handleClick?: () => void;
}) {
  return (
    <div className="pb-6">
      <div
        onClick={handleClick}
        className={`bg-white border rounded-xl p-4 shadow-sm text-sm text-gray-700 space-y-3 cursor-pointer ${
          endereco?.padrao ? "border-gray-400 bg-gray-100" : "border-gray-200"
        }`}
      >
        {endereco?.padrao && (
          <div className="flex items-center text-xs text-black mb-3">
            <FaStar className="mr-1 text-black" />
            Endereço Padrão
          </div>
        )}
        <div className="space-y-1">
          <p>
            <span className="font-medium">{endereco?.logradouro}</span>,{" "}
            {endereco?.numero}
            {endereco?.complemento && `, ${endereco?.complemento}`}
          </p>
          <p>
            <span className="font-medium">{endereco?.bairro}</span> -{" "}
            <span className="font-medium">{endereco?.cidade}</span>,{" "}
            {endereco?.estado} - {endereco?.cep}
          </p>
        </div>
      </div>
    </div>
  );
}
