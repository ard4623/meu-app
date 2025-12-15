import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ title, description, price, image }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>

        {/* 👉 UMA ÚNICA TAG DE PREÇO */}
        <p className="text-lg font-bold text-green-600">
          R$ {price},00 / hora
        </p>

        <button
          onClick={() => navigate(`/reserva/${encodeURIComponent(title)}`)}
          className="mt-2 bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
        >
          Reservar
        </button>
      </div>
    </div>
  );
}
