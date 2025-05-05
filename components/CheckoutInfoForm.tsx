import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { RiBarcodeLine } from "react-icons/ri";
import CreditCardForm from "./CreditCardForm";
import SubmitButton from "./SubmitButton";
import CheckoutModal from "./CheckoutResumeModal";

export default function CheckoutInfoForm({ user }: { user: User | null }) {
  const { register, handleSubmit } = useForm();
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selected, setSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddressId(e.target.value);
  };

  const canSubmit = selectedAddressId !== "" && selected !== "";

  function doCheckout(data) {
    const selectedAddress = user?.endereco_entrega.find(
      (endereco) => endereco.id == selectedAddressId
    );

    const newOrderData = {
      endereco_entrega: selectedAddress,
      payment: selected,
    };

    setOrderData(newOrderData);
    setIsModalOpen(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit(doCheckout)}>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Escolha um endereço de entrega
          </h3>
          <select
            id="endereco_entrega"
            required
            value={selectedAddressId}
            {...register("endereco_entrega", { required: true })}
            className="text-black border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
            onChange={handleAddressChange}
          >
            <option value="">Selecione...</option>
            {user?.endereco_entrega.map((endereco) => (
              <option key={endereco.id} value={endereco.id}>
                {endereco.logradouro}, {endereco.numero} - {endereco.bairro},{" "}
                {endereco.cidade}, {endereco.estado}
              </option>
            ))}
          </select>
        </div>

        {selectedAddressId && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Pagamento</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <label
                className={`flex-1 border rounded-md p-4 cursor-pointer flex items-center gap-4 ${
                  selected === "card"
                    ? "border-blue-500 bg-gray-100"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  value="card"
                  checked={selected === "card"}
                  {...register("payment", { required: true })}
                  onChange={() => setSelected("card")}
                />
                <div className="flex items-center gap-2">
                  <FaCcVisa size={32} />
                  <FaCcAmex size={32} />
                  <FaCcMastercard size={32} />
                </div>
                <span className="ml-auto text-sm text-gray-600">
                  Pagar com cartão de crédito ou débito
                </span>
              </label>

              <label
                className={`flex-1 border rounded-md p-4 cursor-pointer flex items-center gap-4 ${
                  selected === "boleto"
                    ? "border-blue-500 bg-gray-100"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  value="boleto"
                  className="accent-blue-600"
                  checked={selected === "boleto"}
                  {...register("payment", { required: true })}
                  onChange={() => setSelected("boleto")}
                />
                <div className="flex items-center gap-2">
                  <RiBarcodeLine size={32} />
                  <span className="text-lg font-medium">Boleto</span>
                </div>
                <span className="ml-auto text-sm text-gray-600">
                  Pagar com boleto bancário
                </span>
              </label>
            </div>

            {selected === "card" && <CreditCardForm />}
          </div>
        )}

        <div className="mt-8">
          <SubmitButton text="Concluir pedido" disabled={!canSubmit} />
        </div>
      </form>

      {/* Exibindo o Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderData={orderData}
      />
    </>
  );
}
