"use client";

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white text-sm">
      <div className="flex flex-wrap justify-between gap-8 px-10 py-8 max-w-7xl mx-auto">
        <ul className="space-y-2">
          <li>
            <a href="#stores">Encontre uma Loja Mike</a>
          </li>
          <li>
            <a href="#news">Cadastre-se para receber novidades</a>
          </li>
          <li>
            <a href="#gift-card">Cartão Presente</a>
          </li>
          <li>
            <a href="#site-map">Mapa do Site</a>
          </li>
          <li>
            <a href="#mike-journal">Mike Journal</a>
          </li>
          <li>
            <a href="#corinthians">Corinthians</a>
          </li>
          <li>
            <a href="#black-friday">Black Friday</a>
          </li>
        </ul>

        <ul className="space-y-2">
          <span className="font-semibold block mb-2">Ajuda</span>
          <li>
            <a href="#general-questions">Dúvidas Gerais</a>
          </li>
          <li>
            <a href="#size-guide">Encontre seu Tamanho</a>
          </li>
          <li>
            <a href="#deliveries">Entregas</a>
          </li>
          <li>
            <a href="#orders">Pedidos</a>
          </li>
          <li>
            <a href="#returns">Devoluções</a>
          </li>
          <li>
            <a href="#payments">Pagamentos</a>
          </li>
          <li>
            <a href="#products">Produtos</a>
          </li>
          <li>
            <a href="#corporate">Corporativo</a>
          </li>
          <li>
            <a href="#contact">Fale Conosco</a>
          </li>
        </ul>

        <ul className="space-y-2">
          <span className="font-semibold block mb-2">Sobre a Mike</span>
          <li>
            <a href="#purpose">Propósito</a>
          </li>
          <li>
            <a href="#sustainability">Sustentabilidade</a>
          </li>
          <li>
            <a href="#about-mike-inc">Sobre a Mike, Inc.</a>
          </li>
          <li>
            <a href="#about-sbf-group">Sobre o Grupo SBF</a>
          </li>
        </ul>

        <div>
          <span className="font-semibold block mb-2">Redes sociais</span>
          <div className="flex items-center gap-4 mt-2">
            <button
              aria-label="Facebook"
              className="hover:scale-110 transition-transform"
            >
              <FaFacebook size={24} />
            </button>
            <button
              aria-label="Instagram"
              className="hover:scale-110 transition-transform"
            >
              <FaInstagram size={24} />
            </button>
            <button
              aria-label="Youtube"
              className="hover:scale-110 transition-transform"
            >
              <FaYoutube size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center px-10 py-6 max-w-7xl mx-auto text-sm text-gray-600">
        <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
          <a href="#brasil">Brasil</a>
          <a href="#privacy-policy">Política de Privacidade</a>
          <a href="#cookies-policy">Política de Cookies</a>
          <a href="#use-terms">Termos de Uso</a>
        </div>
        <span>© 2024 Mike. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
