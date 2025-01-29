"use client"; // Para Next.js 13+ con App Router

import { useState } from "react";
import Navbar from "@/components/navbar";
import "./style.css";

export default function Historial() {
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const patientsHistory = [
        { id: 1, name: "Juan Pérez", age: 45, lastVisit: "2024-01-15", diagnosis: "Hipertensión", treatment: "Medicamentos diarios" },
        { id: 2, name: "María González", age: 32, lastVisit: "2024-01-20", diagnosis: "Diabetes tipo 2", treatment: "Insulina y dieta" },
        { id: 3, name: "Carlos Ruiz", age: 28, lastVisit: "2024-01-25", diagnosis: "Fractura de tobillo", treatment: "Rehabilitación y yeso" },
    ];

    const handleShowHistory = (history) => {
        setSelectedHistory(history);
        setShowModal(true);
    };

    return (
        <div className="container">
            {/* Navbar */}
            <Navbar />

            {/* Contenido de Historial */}
            <div className="content">
                <h1 style={{ color: "black" }}>Historial de Pacientes</h1>
                <div className="card">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th style={{ color: "black" }}>ID</th>
                                <th style={{ color: "black" }}>Nombre</th>
                                <th style={{ color: "black" }}>Edad</th>
                                <th style={{ color: "black" }}>Última Visita</th>
                                <th style={{ color: "black" }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientsHistory.map((patient) => (
                                <tr key={patient.id}>
                                    <td style={{ color: "black" }}>{patient.id}</td>
                                    <td style={{ color: "black" }}>{patient.name}</td>
                                    <td style={{ color: "black" }}>{patient.age}</td>
                                    <td style={{ color: "black" }}>{patient.lastVisit}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleShowHistory(patient)}>Ver Historial</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de detalles del historial */}
            {showModal && selectedHistory && (
                <div className="overlay active">
                    <div className="modal card">
                        <h2 style={{ color: "black" }}>Historial de {selectedHistory.name}</h2>
                        <p style={{ color: "black" }}><strong>Edad:</strong> {selectedHistory.age}</p>
                        <p style={{ color: "black" }}><strong>Última Visita:</strong> {selectedHistory.lastVisit}</p>
                        <p style={{ color: "black" }}><strong>Diagnóstico:</strong> {selectedHistory.diagnosis}</p>
                        <p style={{ color: "black" }}><strong>Tratamiento:</strong> {selectedHistory.treatment}</p>
                        <button className="btn btn-danger" onClick={() => setShowModal(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
