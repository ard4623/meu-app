import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          <Link to="/" className="text-2xl font-bold text-teal-600">
            SpaceHub
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
            <li><Link to="/espacos">Espaços</Link></li>
            <li><Link to="/agenda">Agenda</Link></li>
            <li><Link to="/minhas-reservas">Dashboard</Link></li>
            <li>
  <a
    href="https://wa.me/5583999999999?text=Olá!%20Gostaria%20de%20mais%20informações"
    target="_blank"
    rel="noopener noreferrer"
  >
    Contato
  </a>
</li>

            <li>
            
            </li>
          </ul>

          {/* Mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {isOpen && (
          <ul className="md:hidden mt-4 space-y-3">
            <li><Link to="/espacos">Espaços</Link></li>
            <li><Link to="/agenda">Agenda</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/dashboard-admin">Entrar</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}
