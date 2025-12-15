import React from "react";
import fundo from "../assets/fundo.jpg";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-center px-4"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Conteúdo */}
      <div className="relative z-10 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Bem-vindo ao SpaceHub
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Explore o universo de possibilidades com nossos serviços de ponta.
        </p>
      
      </div>
    </section>
  );
}
