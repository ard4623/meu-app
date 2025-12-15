import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function Agenda() {
  const [events, setEvents] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/reservas?admin=true&password=aa7e04xrymTZW91e9fa73d7bf11@@D")
      .then(res => res.json())
      .then(data => {
        const eventos = data.map(r => {
          const [inicio, fim] = r.hora.split(" - ");
          return {
            id: r._id,
            title: r.titulo,
            start: `${r.data}T${inicio}`,
            end: `${r.data}T${fim}`,
            extendedProps: {
              espaco: r.espaco,
              participantes: r.participantes,
              status: r.status
            }
          };
        });
        setEvents(eventos);
      });
  }, []);

  return (
    <div className="agenda-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        events={events}
        locale="pt-br"
        initialView={isMobile ? "timeGridDay" : "dayGridMonth"}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: isMobile ? "" : "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        height="90vh"
        expandRows={true}
        handleWindowResize={true}
        windowResizeDelay={200}
        eventClick={handleEventClick}
        dayMaxEvents={!isMobile}
      />
    </div>
  );
}

function handleEventClick(info) {
  const { espaco, participantes, status } = info.event.extendedProps;

  alert(
    `Título: ${info.event.title}
Espaço: ${espaco}
Participantes: ${participantes}
Status: ${status}`
  );
}
