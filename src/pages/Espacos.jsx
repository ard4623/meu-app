import React from "react";
import { Link } from "react-router-dom";
import coworking from "../assets/coworking.jpg";
import laboratorio from "../assets/laboratorio.jpg";
import sala from "../assets/sala-reuniao.jpg";
import auditorio from "../assets/auditorio.jpg";

export default function Espacos() {
  const espacos = [
    {
      title: "Coworking",
      description: "Espaço colaborativo moderno",
      price: "R$ 25,00 / hora",
      image: coworking,
      link: "/reserva/Coworking"
    },
    {
      title: "Laboratório",
      description: "Equipamentos de ponta",
      price: "R$ 50,00 / hora",
      image: laboratorio,
      link: "/reserva/Laboratório"
    },
    {
      title: "Sala de Reunião",
      description: "Ambiente reservado e confortável",
      price: "R$ 40,00 / hora",
      image: sala,
      link: "/reserva/Sala de Reunião"
    },
    {
      title: "Auditório",
      description: "Ideal para palestras e eventos",
      price: "R$ 80,00 / hora",
      image: auditorio,
      link: "/reserva/Auditório"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Nossos Espaços
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {espacos.map((espaco, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
          >
            <img
              src={espaco.image}
              alt={espaco.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-1">
                {espaco.title}
              </h2>

              <p className="text-gray-600 mb-2">
                {espaco.description}
              </p>

              <p className="text-lg font-bold text-teal-600 mb-4">
                {espaco.price}
              </p>

              <Link
                to={espaco.link}
                className="mt-auto text-center bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
              >
                Reservar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
