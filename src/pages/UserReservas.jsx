import React, { useState } from "react";
import AgendaUsuario from "./AgendaUsuario";

export default function UserReservas() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <AgendaUsuario email={email} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Minhas Reservas
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Seu e-mail</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
            required
          />

          <button className="w-full bg-green-600 text-white py-2 rounded">
            Ver minhas reservas
          </button>
        </form>
      </div>
    </div>
  );
}
