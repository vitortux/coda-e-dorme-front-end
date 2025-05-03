import { useState } from "react";
import { FaCcVisa, FaCcAmex, FaCcMastercard } from "react-icons/fa";
import { RiBarcodeLine } from "react-icons/ri";
import CreditCardForm from "./CreditCardForm";

export default function PaymentMethodSelector() {
  const [selected, setSelected] = useState("card");

  return (
    <div>
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
            name="payment"
            value="card"
            checked={selected === "card"}
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
            name="payment"
            value="boleto"
            className="accent-blue-600"
            checked={selected === "boleto"}
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
  );
}
