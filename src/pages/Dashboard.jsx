import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Preços por espaço
const PRECO_POR_HORA = {
  Coworking: 50,
  Laboratório: 80,
  "Sala de Reunião": 100,
  Auditório: 200
};

// Função auxiliar de cálculo de valores
function calcularValores(reserva) {
  const precoHora = PRECO_POR_HORA[reserva.espaco] || 0;
  if (!reserva.hora)
    return { precoHora, horas: 0, total: 0, duracaoTexto: "0h" };

  const [inicio, fim] = reserva.hora.split(" - ");

  const toMin = h => {
    const [hh, mm] = h.split(":").map(Number);
    return hh * 60 + mm;
  };

  const duracaoMin = toMin(fim) - toMin(inicio);
  const horasFloat = duracaoMin > 0 ? duracaoMin / 60 : 0;

  const horas = Math.floor(duracaoMin / 60);
  const minutos = duracaoMin % 60;

  const duracaoTexto =
    minutos > 0 ? `${horas}h ${minutos}min` : `${horas}h`;

  return {
    precoHora,
    horas: horasFloat,
    total: horasFloat * precoHora,
    duracaoTexto
  };
}

export default function DashboardAdmin() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  // Busca reservas do backend
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(
          "https://meu-app-6u9s.onrender.com/reservas?admin=true&password=aa7e04xrymTZW91e9fa73d7bf11@@D"
        );
        setReservas(response.data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    };
    fetchReservas();
  }, []);

  // Ações de atualizar status
  const confirmarReserva = async id => {
    await axios.put(
      `https://meu-app-6u9s.onrender.com/reservas/${id}?password=aa7e04xrymTZW91e9fa73d7bf11@@D`,
      { status: "Confirmada" }
    );
    setReservas(prev =>
      prev.map(r => (r._id === id ? { ...r, status: "Confirmada" } : r))
    );
  };

  const cancelarReserva = async id => {
    await axios.put(
      `https://meu-app-6u9s.onrender.com/reservas/${id}?password=aa7e04xrymTZW91e9fa73d7bf11@@D`,
      { status: "Cancelada" }
    );
    setReservas(prev =>
      prev.map(r => (r._id === id ? { ...r, status: "Cancelada" } : r))
    );
  };

  const excluirReserva = async id => {
    await axios.delete(
      `https://meu-app-6u9s.onrender.com/reservas/${id}?password=aa7e04xrymTZW91e9fa73d7bf11@@D`
    );
    setReservas(prev => prev.filter(r => r._id !== id));
  };

  // Logout admin
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminPassword");
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Topo do painel */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Painel Administrativo</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Sair
        </button>
      </div>

      {/* Tabela de reservas */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Espaço</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Telefone</th>
              <th className="px-4 py-3">Data / Hora</th>
              <th className="px-4 py-3">Valores</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>

          <tbody>
            {reservas.map(r => {
              const { precoHora, total, duracaoTexto } =
                calcularValores(r);

              return (
                <tr key={r._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{r.titulo}</td>
                  <td className="px-4 py-3">{r.espaco}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.telefone}</td>
                  <td className="px-4 py-3">
                    {r.data}
                    <br />
                    <span className="text-gray-500">{r.hora}</span>
                  </td>
                  <td className="px-4 py-3 space-y-1">
                    <p>Preço/hora: R$ {precoHora},00</p>
                    <p>Duração: {duracaoTexto}</p>
                    <p className="font-bold text-green-600">
                      Total: R$ {total.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {r.status}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {r.status === "Pendente" && (
                      <button
                        onClick={() => confirmarReserva(r._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Confirmar
                      </button>
                    )}
                    <button
                      onClick={() => cancelarReserva(r._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => excluirReserva(r._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
