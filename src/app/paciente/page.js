"use client"; // Para Next.js 13+ con App Router

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./style.css";
import Navbar from "@/components/navbar";

export default function Pacientes() {
    const [activeSection, setActiveSection] = useState("dashboard");
    const [patients, setPatients] = useState([
        { id: 1, name: "Juan Pérez", age: 45, lastVisit: "2024-01-15" },
        { id: 2, name: "María González", age: 32, lastVisit: "2024-01-20" },
        { id: 3, name: "Carlos Ruiz", age: 28, lastVisit: "2024-01-25" }
    ]);

    const [showForm, setShowForm] = useState(false);
    const ageChartRef = useRef(null);
    const specialtyChartRef = useRef(null);
    const ageChartInstance = useRef(null);
    const specialtyChartInstance = useRef(null);

    // Función para cambiar de sección
    const showSection = (section) => {
        setActiveSection(section);
    };

    // Función para manejar el formulario de pacientes
    const handlePatientSubmit = (event) => {
        event.preventDefault();
        setShowForm(false);
        updatePatientsTable();
    };

    // Función para eliminar paciente
    const deletePatient = (id) => {
        if (confirm("¿Está seguro de eliminar este paciente?")) {
            setPatients(patients.filter(p => p.id !== id));
        }
    };

    // Función para actualizar gráficos con Chart.js
    useEffect(() => {
        if (ageChartRef.current && !ageChartInstance.current) {
            ageChartInstance.current = new Chart(ageChartRef.current, {
                type: "bar",
                data: {
                    labels: ["0-18", "19-30", "31-50", "51-70", "71+"],
                    datasets: [{
                        label: "Pacientes por Rango de Edad",
                        data: [15, 25, 45, 30, 20],
                        backgroundColor: "#3b82f6"
                    }]
                }
            });
        }

        if (specialtyChartRef.current && !specialtyChartInstance.current) {
            specialtyChartInstance.current = new Chart(specialtyChartRef.current, {
                type: "doughnut",
                data: {
                    labels: ["Medicina General", "Cardiología", "Pediatría", "Traumatología", "Otros"],
                    datasets: [{
                        data: [30, 20, 25, 15, 10],
                        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6b7280"]
                    }]
                }
            });
        }
    }, []);

    return (
        <div className="container">
            {/* Sidebar */}
            {/* <Navbar/> */}

            {/* Secciones */}
            <div className="content">
                {/* Dashboard */}
                {activeSection === "dashboard" && (
                    <div id="dashboard">
                        <h1>Pacientes</h1>
                        <div className="stats-grid">
                            <div className="card">
                                <h3 className="text-black">Total Pacientes</h3>
                                <div className="value  text-black">{patients.length}</div>
                            </div>
                            <div className="card">
                                <h3 className="text-black">Alertas Activas</h3>
                                <div className="value text-black">8</div>
                            </div>
                        </div>
                        <div className="charts-grid">
                            <div className="card">
                                <h3>Distribución por Edad</h3>
                                <canvas ref={ageChartRef}></canvas>
                            </div>
                            <div className="card">
                                <h3>Pacientes por Especialidad</h3>
                                <canvas ref={specialtyChartRef}></canvas>
                            </div>
                        </div>
                    </div>
                )}

                {/* Gestión de Pacientes */}
                {activeSection === "patients" && (
                    <div id="patients">
                        <h1>Gestión de Pacientes</h1>
                        <button type="button" className="btn btn-primary" onClick={() => setShowForm(true)}>Nuevo Paciente</button>
                        <div className="card margin-top">
                            <table id="patientsTable">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Edad</th>
                                        <th>Última Visita</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.map(patient => (
                                        <tr key={patient.id}>
                                            <td>{patient.id}</td>
                                            <td>{patient.name}</td>
                                            <td>{patient.age}</td>
                                            <td>{patient.lastVisit}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => deletePatient(patient.id)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Alertas */}
                {activeSection === "alerts" && (
                    <div id="alerts">
                        <h1>Alertas Médicas</h1>
                        <div className="alert alert-danger">
                            ⚠️ Paciente Juan Pérez necesita renovación de medicamento - Vence en 3 días
                        </div>
                        <div className="alert alert-danger">
                            ⚠️ Seguimiento pendiente para María González - Última visita hace 45 días
                        </div>
                        <div className="alert alert-success">
                            ✓ Resultados de laboratorio recibidos para Carlos Ruiz
                        </div>
                    </div>
                )}

                {/* Historiales */}
                {activeSection === "history" && (
                    <div id="history">
                        <h1>Historiales Médicos</h1>
                        <div className="card">
                            <p>Aquí irá el contenido de historiales.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Formulario de nuevo paciente */}
            {showForm && (
                <div className="overlay">
                    <div className="patient-form card">
                        <h2>Nuevo Paciente</h2>
                        <form onSubmit={handlePatientSubmit}>
                            <div className="form-group">
                                <label>Nombre Completo</label>
                                <input type="text" placeholder="Ingrese el nombre completo" required />
                            </div>
                            <div className="form-group">
                                <label>Edad</label>
                                <input type="number" placeholder="Ingrese la edad" required />
                            </div>
                            <div className="form-group">
                                <label>Género</label>
                                <select required>
                                    <option value="">Seleccionar</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                    <option value="O">Otro</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                            <button type="button" className="btn btn-danger" onClick={() => setShowForm(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
