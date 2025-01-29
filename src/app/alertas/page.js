"use client"; // Para Next.js 13+ con App Router

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Navbar from "@/components/navbar";
import "./style.css";

export default function AlertsSystem() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [alerts, setAlerts] = useState([
        { id: 1, type: "high", title: "Renovación de Medicamento Urgente", patient: "Juan Pérez", alertType: "Medicamento", created: "27/01/2024", doctor: "Dr. García" },
    ]);

    const [activeUsers, setActiveUsers] = useState(573);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveUsers((prev) => prev + (Math.floor(Math.random() * 21) - 10));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            chartInstance.current = new Chart(chartRef.current, {
                type: "doughnut",
                data: {
                    labels: ["Alta Prioridad", "Media Prioridad", "Baja Prioridad"],
                    datasets: [{
                        data: [
                            alerts.filter((a) => a.type === "high").length,
                            alerts.filter((a) => a.type === "medium").length,
                            alerts.filter((a) => a.type === "low").length,
                        ],
                        backgroundColor: ["#dc2626", "#d97706", "#2563eb"]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            });
        }
    }, [alerts]);

    // Función para manejar la creación de nuevas alertas
    const handleCreateAlert = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const newAlert = {
            id: Date.now(), // Generar un ID único
            type: formData.get("priority"), // Obtener la prioridad
            title: formData.get("description"), // Descripción como título
            patient: formData.get("patient"), // Paciente seleccionado
            alertType: formData.get("alert-type"), // Tipo de alerta
            created: new Date().toLocaleDateString(), // Fecha actual
            doctor: "Dr. García" // Doctor asignado
        };

        // Agregar la nueva alerta al estado
        setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

        // Limpiar el formulario
        event.target.reset();
    };

    return (
        <>
            {/* Navbar agregado */}
            {/* <Navbar /> */}

            {/* Contenido de Alertas */}
            <main id="alerts" className="section">
                <header>
                    <h1>Sistema de Alertas Médicas</h1>
                </header>

                {/* Filtros de alertas */}
                <nav className="filters" aria-label="Filtrar alertas">
                    {["all", "high", "medium", "low"].map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                            onClick={() => setActiveFilter(filter)}
                            aria-pressed={activeFilter === filter}
                        >
                            {filter === "all"
                                ? "Todas"
                                : filter === "high"
                                ? "Alta Prioridad"
                                : filter === "medium"
                                ? "Media Prioridad"
                                : "Baja Prioridad"}
                        </button>
                    ))}
                </nav>

                {/* Contenedor de alertas */}
                <section className="alerts-container">
                    <div className="alerts-list">
                        {alerts.length > 0 ? (
                            alerts
                                .filter((alert) => activeFilter === "all" || alert.type === activeFilter)
                                .map((alert) => (
                                    <article key={alert.id} className="alert alert-danger" role="alert">
                                        <header>
                                            <h2 className="alert-title">
                                                {alert.title} ({alert.alertType})
                                            </h2>
                                        </header>
                                        <p>
                                            Paciente: {alert.patient} - Creada el {alert.created}
                                        </p>
                                        <footer>
                                            <small className="alert-meta">Médico: {alert.doctor}</small>
                                            <div className="alert-actions">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => console.log("Atender alerta", alert.id)}
                                                >
                                                    Atender
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => setAlerts(alerts.filter((a) => a.id !== alert.id))}
                                                >
                                                    Descartar
                                                </button>
                                            </div>
                                        </footer>
                                    </article>
                                ))
                        ) : (
                            <p>No hay alertas disponibles.</p>
                        )}
                    </div>

                    {/* Resumen de alertas */}
                    <aside className="alerts-summary card" aria-labelledby="summary-title">
                        <h3 id="summary-title">Resumen de Alertas</h3>
                        <div className="margin-1rem">
                            <canvas ref={chartRef} aria-label="Gráfico de alertas"></canvas>
                        </div>
                        <ul>
                            <li><strong>Total Alertas:</strong> {alerts.length}</li>
                            <li><strong>Alta Prioridad:</strong> {alerts.filter((a) => a.type === "high").length}</li>
                            <li><strong>Media Prioridad:</strong> {alerts.filter((a) => a.type === "medium").length}</li>
                            <li><strong>Baja Prioridad:</strong> {alerts.filter((a) => a.type === "low").length}</li>
                        </ul>

                        {/* Formulario para crear alertas */}
                        <section className="new-alert-form" aria-labelledby="new-alert-title">
                            <h4 id="new-alert-title">Crear Nueva Alerta</h4>
                            <form onSubmit={handleCreateAlert}>
                                <div className="form-group">
                                    <label htmlFor="patient">Paciente</label>
                                    <select id="patient" name="patient" required>
                                        <option value="" disabled defaultValue>
                                            Seleccionar paciente
                                        </option>
                                        <option value="Juan Pérez">Juan Pérez</option>
                                        <option value="María González">María González</option>
                                        <option value="Carlos Ruiz">Carlos Ruiz</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="alert-type">Tipo de Alerta</label>
                                    <select id="alert-type" name="alert-type" required>
                                        <option value="" disabled defaultValue>
                                            Seleccionar tipo
                                        </option>
                                        <option value="Medicamento">Medicamento</option>
                                        <option value="Cita">Cita</option>
                                        <option value="Laboratorio">Laboratorio</option>
                                        <option value="Seguimiento">Seguimiento</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priority">Prioridad</label>
                                    <select id="priority" name="priority" required>
                                        <option value="" disabled defaultValue>
                                            Seleccionar prioridad
                                        </option>
                                        <option value="high">Alta</option>
                                        <option value="medium">Media</option>
                                        <option value="low">Baja</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Descripción</label>
                                    <textarea id="description" name="description" rows="2" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Crear Alerta</button>
                            </form>
                        </section>
                    </aside>
                </section>
            </main>
        </>
    );
}
