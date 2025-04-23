"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, signOut } = useContext(AuthContext);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="w-full px-8 md:px-32 py-5 flex items-center justify-between bg-white shadow-sm border-b border-gray-300">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="https://static.nike.com.br/v11-9-0/images/brands/logo.svg"
          alt="Logo da Nike"
          className="cursor-pointer"
        />
      </div>

      {/* Navegação */}
      <nav className="hidden lg:flex gap-6 text-gray-700 text-sm font-medium">
        {[
          { label: "Home", href: "/" },
          { label: "Coleções", href: "#collections" },
          { label: "Lançamentos", href: "#releases" },
          { label: "Marcas", href: "#brands" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="relative pb-1 transition-colors duration-200 hover:text-black"
          >
            {item.label}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 ease-in-out group-hover:w-full" />
          </a>
        ))}
      </nav>

      {/* Ações */}
      <nav className="flex items-center gap-4">
        {/* Barra de pesquisa */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors hover:bg-gray-200"
          />
          <div className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer">
            <FiSearch />
          </div>
        </div>

        {/* Login ou Usuário */}
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:scale-110 transition-transform cursor-pointer text-2xl text-gray-800 hover:text-black"
              aria-label="Perfil do usuário"
            >
              <FiUser />
            </button>

            {/* Botão de Logout */}
            <button
              onClick={handleLogout}
              className="p-2 hover:scale-110 transition-transform cursor-pointer text-2xl text-gray-800 hover:text-black"
              aria-label="Sair"
            >
              <FiLogOut />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="text-sm font-medium text-gray-700 border border-gray-300 px-4 py-1 rounded-full transition-all transform hover:scale-105 cursor-pointer"
          >
            Entrar
          </button>
        )}

        {/* Carrinho */}
        <button
          className="p-2 hover:scale-110 transition-transform cursor-pointer text-2xl text-gray-800"
          aria-label="Carrinho"
        >
          <FiShoppingCart />
        </button>
      </nav>
    </header>
  );
}
