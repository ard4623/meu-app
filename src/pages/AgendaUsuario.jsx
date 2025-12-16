import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// preços por espaço
const PRECO_POR_HORA = {
  Coworking: 50,
  Laboratório: 80,
  "Sala de Reunião": 100,
  Auditório: 200
};

// função auxiliar para calcular valores da reserva
function calcularValores(reserva) {
  const precoHora = PRECO_POR_HORA[reserva.espaco] || 0;
  if (!reserva.hora) return { precoHora, horas: 0, total: 0 };

  const [inicio, fim] = reserva.hora.split(" - ");
  const toMin = h => {
    const [hh, mm] = h.split(":").map(Number);
    return hh * 60 + mm;
  };

  const duracaoMin = toMin(fim) - toMin(inicio);
  const horas = duracaoMin > 0 ? duracaoMin / 60 : 0;

  return { precoHora, horas, total: horas * precoHora };
}

export default function AgendaUsuario({ email }) {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  // busca reservas do backend
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await axios.get(`https://meu-app-6u9s.onrender.com/reservas?email=${email}`);
        setReservas(res.data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    };

    fetchReservas();
  }, [email]);

  // logout e redirecionamento para index
  const handleLogout = () => {
    localStorage.removeItem("userEmail"); // se estiver usando storage para o email
    navigate("/"); // redireciona para a página inicial
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* topo com título e botão sair */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Minhas Reservas</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Sair
        </button>
      </div>

      {/* tabela de reservas */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Espaço</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Data / Hora</th>
              <th className="px-4 py-2">Valores</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {reservas.map(r => {
              const { precoHora, horas, total } = calcularValores(r);
              return (
                <tr key={r._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{r.titulo}</td>
                  <td className="px-4 py-2">{r.espaco}</td>
                  <td className="px-4 py-2">{r.email}</td>
                  <td className="px-4 py-2">
                    {r.data}<br />
                    <span className="text-gray-500">{r.hora}</span>
                  </td>
                  <td className="px-4 py-2">
                    <p>Preço/hora: R$ {precoHora},00</p>
                    <p>Duração: {horas} h</p>
                    <p className="font-bold text-green-600">Total: R$ {total.toFixed(2)}</p>
                  </td>
                  <td className="px-4 py-2 font-semibold">{r.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
