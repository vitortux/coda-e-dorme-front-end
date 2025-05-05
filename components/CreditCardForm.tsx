"use client";

export default function CreditCardForm() {
  return (
    <div className="mt-6 grid gap-4">
      <input
        type="text"
        placeholder="Nome completo"
        className="text-black border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Número do cartão"
          className="text-black border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
          required
        />
        <input
          type="text"
          placeholder="CVV"
          className="text-black border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Validade (MM/AA)"
          className="text-black border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
          required
        />
        <select
          className="text-black border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
          required
        >
          <option value="">Parcelas</option>
          {[...Array(6)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}x sem juros
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
