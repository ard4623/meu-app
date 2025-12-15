import React from "react";
import Card from "./Card";
import coworking from "../assets/coworking.jpg";
import laboratorio from "../assets/laboratorio.jpg";
import sala from "../assets/sala-reuniao.jpg";
import auditorio from "../assets/auditorio.jpg";

export default function CardsSection() {
  const cards = [
    { title: "Coworking", price: 50, description: "Espaço colaborativo moderno", image: coworking },
    { title: "Laboratório", price: 80, description: "Equipamentos de ponta", image: laboratorio },
    { title: "Sala de Reunião", price: 100, description: "Ambiente reservado e confortável", image: sala },
    { title: "Auditório", price: 200, description: "Para palestras e eventos", image: auditorio },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
