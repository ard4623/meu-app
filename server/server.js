const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(
  process.env.MONGO_URI ||
    "mongodb+srv://loorde3lost_db_user:pQdXHyo04xrymTZW@cluster0.inhao8z.mongodb.net/reservasDB"
)
.then(() => console.log("MongoDB conectado!"))
.catch(err => console.error("Erro MongoDB:", err));

// ================= SCHEMA =================
const reservaSchema = new mongoose.Schema({
  titulo: String,
  espaco: String,
  email: String,
  telefone: String,          // <-- novo campo
  data: String,
  hora: String,
  participantes: Number,
  status: { type: String, default: "Pendente" }
});

const Reserva = mongoose.model("Reserva", reservaSchema);

// ================= ADMIN =================
const ADMIN_PASSWORD = "aa7e04xrymTZW91e9fa73d7bf11@@D";

// ================= UTIL =================
function horaParaMinutos(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

// ================= LISTAR RESERVAS =================
app.get("/reservas", async (req, res) => {
  try {
    // ===== ADMIN =====
    if (req.query.admin === "true") {
      if (req.query.password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Senha admin incorreta" });
      }
      const reservas = await Reserva.find();
      return res.json(reservas);
    }

    // ===== FILTRO POR ESPAÇO + DATA (USADO NO FORMULÁRIO) =====
    if (req.query.espaco && req.query.data) {
      const reservas = await Reserva.find({
        espaco: req.query.espaco,
        data: req.query.data
      });
      return res.json(reservas);
    }

    // ===== USUÁRIO POR EMAIL =====
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email obrigatório" });
    }

    const reservas = await Reserva.find({ email });
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar reservas" });
  }
});

// ================= CRIAR RESERVA =================
app.post("/reservas", async (req, res) => {
  try {
    const { data, hora, espaco, telefone } = req.body;

    // ❌ BLOQUEAR DATA PASSADA
    const hoje = new Date().toISOString().split("T")[0];
    if (data < hoje) return res.status(400).json({ error: "Data inválida" });

    // ❌ BLOQUEAR CONFLITO DE HORÁRIO
    const [inicio, fim] = hora.split(" - ");
    const inicioMin = horaParaMinutos(inicio);
    const fimMin = horaParaMinutos(fim);

    const reservasExistentes = await Reserva.find({ data, espaco });

    const conflito = reservasExistentes.some(r => {
      const [ri, rf] = r.hora.split(" - ");
      return inicioMin < horaParaMinutos(rf) && fimMin > horaParaMinutos(ri);
    });

    if (conflito) {
      return res.status(400).json({ error: "Horário já reservado" });
    }

    // ✅ CRIAR
    const reserva = new Reserva(req.body); // já inclui telefone
    await reserva.save();

    res.status(201).json(reserva);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar reserva" });
  }
});

// ================= ATUALIZAR STATUS (ADMIN) =================
app.put("/reservas/:id", async (req, res) => {
  if (req.query.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Acesso negado" });
  }

  const reserva = await Reserva.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(reserva);
});

// ================= EXCLUIR (ADMIN) =================
app.delete("/reservas/:id", async (req, res) => {
  if (req.query.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Acesso negado" });
  }

  await Reserva.findByIdAndDelete(req.params.id);
  res.json({ message: "Excluída" });
});

// ================= START =================
app.listen(process.env.PORT || 5000, () =>
  console.log("Servidor rodando na porta 5000")
);
