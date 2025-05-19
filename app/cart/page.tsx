"use client";

import CartItem from "@/components/CartItemCard";
import GoToHomeButton from "@/components/GoToHomeButton";
import { CartContext } from "@/context/CartContext";
import { getAddress } from "@/service/cep";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Cart() {
  const { cart, setFrete } = useContext(CartContext); // Adicionando setFrete do contexto
  const router = useRouter();

  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [fretesDisponiveis, setFretesDisponiveis] = useState([]);
  const [freteSelecionado, setFreteSelecionado] = useState(null);

  const fretes = [
    { nome: "Econômico", prazo: "5 a 7 dias úteis", valor: 9.9 },
    { nome: "Normal", prazo: "3 a 5 dias úteis", valor: 19.9 },
    { nome: "Expresso", prazo: "1 a 2 dias úteis", valor: 29.9 },
  ];

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputCep = e.target.value;
    setCep(inputCep);

    if (inputCep.length === 8) {
      const validAddress = await getAddress(inputCep);
      if (validAddress) {
        setEndereco(validAddress);
        setFretesDisponiveis(fretes);
      } else {
        setEndereco(null);
        setFretesDisponiveis([]);
      }
    }
  };

  const calcularTotal = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.product.preco * item.quantity,
      0
    );
    return freteSelecionado ? subtotal + freteSelecionado.valor : subtotal;
  };

  const handleFreteChange = (e) => {
    const frete = fretes.find((f) => f.nome === e.target.value);
    setFreteSelecionado(frete || null);
    setFrete(frete ? frete.valor : 0);
  };

  return (
    <div className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-100 bg-gray-100 flex justify-center xl:items-center xl:justify-center min-h-screen">
      <div className="w-full max-w-7xl px-8 md:px-10 lg:px-12 mx-auto relative z-10 rounded shadow-lg bg-white">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Carrinho de compras
              </h2>
              <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                {cart.length} {cart.length === 1 ? "Item" : "Items"}
              </h2>
            </div>
            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
              <div className="col-span-12 md:col-span-7">
                <p className="font-normal text-lg leading-8 text-gray-400">
                  Detalhes do produto
                </p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Quantidade
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Total
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {cart.map((item, index) => (
              <CartItem key={`${item.product.id}-${index}`} item={item} />
            ))}
          </div>
          <div className="col-span-12 xl:col-span-4 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24 xl:border-l border-gray-200">
            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Detalhes do pedido
            </h2>
            <div className="mt-8">
              <div className="flex items-center justify-between pb-6">
                <p className="font-normal text-lg leading-8 text-black">
                  {cart.length} {cart.length === 1 ? "Item" : "Items"}
                </p>
                <p className="font-medium text-lg leading-8 text-black">
                  R${" "}
                  {cart
                    .reduce(
                      (acc, item) => acc + item.product.preco * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <form>
                <label className="flex items-center mb-1.5 text-gray-600 text-sm font-medium">
                  Frete
                </label>
                <div className="flex pb-6">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                      placeholder="Digite seu CEP"
                      value={cep}
                      onChange={handleCepChange}
                    />
                  </div>
                </div>

                {endereco && (
                  <div className="pb-6">
                    <p className="text-sm text-gray-600">
                      {endereco.logradouro}, {endereco.bairro},{" "}
                      {endereco.localidade} - {endereco.uf}
                    </p>
                  </div>
                )}

                {fretesDisponiveis.length > 0 && (
                  <div className="pb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Escolha o frete
                    </label>
                    <select
                      className="w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                      onChange={handleFreteChange}
                    >
                      <option value="">Selecione uma opção</option>
                      {fretesDisponiveis.map((frete, index) => (
                        <option key={index} value={frete.nome}>
                          {frete.nome}: {frete.prazo} - R${" "}
                          {frete.valor.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center justify-between py-8">
                  <p className="font-medium text-xl leading-8 text-black">
                    {cart.length} {cart.length === 1 ? "Item" : "Items"}
                  </p>
                  <p className="font-semibold text-xl leading-8">
                    R$ {calcularTotal().toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => router.push("/checkout")}
                  type="button"
                  disabled={cart.length === 0}
                  className={`mb-5 w-full text-center bg-black rounded-xl py-3 px-6 font-semibold text-lg text-white ${
                    cart.length === 0 || !freteSelecionado
                      ? "cursor-not-allowed"
                      : "cursor-pointer transition duration-200 transform hover:scale-102"
                  }`}
                >
                  Checkout
                </button>
              </form>
              <GoToHomeButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
