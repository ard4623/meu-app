import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CardsSection from "./components/CardsSection";

import Dashboard from "./pages/Dashboard";
import Agenda from "./pages/Agenda";
import Reserva from "./pages/Reserva";
import Espacos from "./pages/Espacos";
import AdminLogin from "./pages/AdminLogin";        // Novo
import UserReservas from "./pages/UserReservas";    // Novo

// Componente protegido para admin
const ProtectedAdmin = () => {
  const isAuth = localStorage.getItem("adminAuthenticated") === "true";
  return isAuth ? <Dashboard isAdmin={true} /> : <Navigate to="/login-admin" />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          <Route path="/" element={<><Hero /><CardsSection /></>} />

          <Route path="/login-admin" element={<AdminLogin />} />
          <Route path="/dashboard-admin" element={<ProtectedAdmin />} />
          
          <Route path="/minhas-reservas" element={<UserReservas />} />

          <Route path="/agenda" element={<Agenda />} />
          <Route path="/espacos" element={<Espacos />} />
          <Route path="/reserva/:id" element={<Reserva />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;