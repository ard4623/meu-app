import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";

const PRECO_POR_HORA = {
  Coworking: 50,
  Laboratório: 80,
  "Sala de Reunião": 100,
  Auditório: 200
};

export default function Reserva() {
  const { id } = useParams();
  const navigate = useNavigate();

  const hoje = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    titulo: "",
    email: "",
    telefone: "",
    data: "",
    inicio: "",
    fim: "",
    participantes: 1
  });

  const [reservasDoDia, setReservasDoDia] = useState([]);

  const precoHora = PRECO_POR_HORA[id] || 0;

  // ===================== BUSCAR HORÁRIOS JÁ RESERVADOS =====================
  useEffect(() => {
    if (!form.data) return;

    // Buscar do backend (se existir)
    axios
      .get("http://localhost:5000/reservas", {
        params: {
          espaco: id,
          data: form.data
        }
      })
      .then(res => setReservasDoDia(res.data))
      .catch(() => setReservasDoDia([]));

    // Buscar do LocalStorage
    const reservasLocal = JSON.parse(localStorage.getItem("reservas")) || [];
    const filtradas = reservasLocal.filter(r => r.espaco === id && r.data === form.data);
    setReservasDoDia(prev => [...prev, ...filtradas]);
  }, [form.data, id]);

  // ===================== CÁLCULO DE HORAS E TOTAL =====================
  const { horas, total } = useMemo(() => {
    if (!form.inicio || !form.fim) return { horas: 0, total: 0 };

    const [hi, mi] = form.inicio.split(":").map(Number);
    const [hf, mf] = form.fim.split(":").map(Number);

    const inicioMin = hi * 60 + mi;
    const fimMin = hf * 60 + mf;

    if (fimMin <= inicioMin) return { horas: 0, total: 0 };

    const diffHoras = (fimMin - inicioMin) / 60;

    return {
      horas: diffHoras,
      total: diffHoras * precoHora
    };
  }, [form.inicio, form.fim, precoHora]);

  // ===================== VALIDAR CONFLITO DE HORÁRIO =====================
  function toMinutes(hora) {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  }

  function horarioConflita() {
    const inicio = toMinutes(form.inicio);
    const fim = toMinutes(form.fim);

    return reservasDoDia.some(r => {
      const [ri, rf] = r.hora.split(" - ");
      const rInicio = toMinutes(ri);
      const rFim = toMinutes(rf);
      return inicio < rFim && fim > rInicio;
    });
  }

  // ===================== SUBMIT =====================
  async function handleSubmit(e) {
    e.preventDefault();

    if (form.data < hoje) {
      alert("Não é permitido reservar datas passadas");
      return;
    }

    if (horas <= 0) {
      alert("Horário final deve ser maior que o inicial");
      return;
    }

    if (horarioConflita()) {
      alert("Este horário já está reservado");
      return;
    }

    const novaReserva = {
      titulo: form.titulo,
      espaco: id,
      email: form.email,
      telefone: form.telefone,
      data: form.data,
      hora: `${form.inicio} - ${form.fim}`,
      participantes: form.participantes,
      status: "Pendente"
    };

    // ======= 1. Salvar no LocalStorage =======
    const reservasLocal = JSON.parse(localStorage.getItem("reservas")) || [];
    reservasLocal.push(novaReserva);
    localStorage.setItem("reservas", JSON.stringify(reservasLocal));

    // ======= 2. Salvar no backend (opcional) =======
    try {
      await axios.post("http://localhost:5000/reservas", novaReserva);
    } catch (err) {
      console.warn("Não foi possível salvar no backend, mas LocalStorage foi salvo.");
    }

    alert("Reserva confirmada!");
    navigate("/minhas-reservas");
  }

  // ===================== UI =====================
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Reserva – {id}</h2>

        <div>
          <label className="block text-sm font-medium">Título</label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Ex: Reunião de equipe"
            value={form.titulo}
            onChange={e => setForm({ ...form, titulo: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="seu@email.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Telefone</label>
          <input
            type="tel"
            className="w-full border rounded px-3 py-2"
            placeholder="(99) 99999-9999"
            value={form.telefone}
            onChange={e => {
              let v = e.target.value.replace(/\D/g, "").slice(0, 11);
              if (v.length >= 2) v = v.replace(/^(\d{2})(\d)/, "($1) $2");
              if (v.length >= 7) v = v.replace(/(\d{5})(\d)/, "$1-$2");
              setForm({ ...form, telefone: v });
            }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Data</label>
          <input
            type="date"
            min={hoje}
            className="w-full border rounded px-3 py-2"
            value={form.data}
            onChange={e => setForm({ ...form, data: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Início</label>
            <input
              type="time"
              className="w-full border rounded px-3 py-2"
              value={form.inicio}
              onChange={e => setForm({ ...form, inicio: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Fim</label>
            <input
              type="time"
              className="w-full border rounded px-3 py-2"
              value={form.fim}
              onChange={e => setForm({ ...form, fim: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Participantes</label>
          <input
            type="number"
            min="1"
            className="w-full border rounded px-3 py-2"
            value={form.participantes}
            onChange={e => setForm({ ...form, participantes: e.target.value })}
          />
        </div>

        {/* HORÁRIOS OCUPADOS */}
        {reservasDoDia.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
            <p className="font-semibold mb-1">Horários já reservados:</p>
            {reservasDoDia.map((r, idx) => (
              <p key={idx}>• {r.hora}</p>
            ))}
          </div>
        )}

        {/* RESUMO */}
        <div className="bg-gray-50 p-4 rounded space-y-1 text-sm">
          <p><strong>Preço por hora:</strong> R$ {precoHora},00</p>
          <p><strong>Duração:</strong> {horas} h</p>
          <p className="text-lg font-bold text-green-600">Total: R$ {total.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
        >
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
}
