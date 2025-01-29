"use client"; // Para Next.js 13+ con App Router

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./style.css";



export default function Inicio() {
    const salesChartRef = useRef(null);
    const usersChartRef = useRef(null);
    
    const salesChartInstance = useRef(null);
    const usersChartInstance = useRef(null);

    const [activeUsers, setActiveUsers] = useState(573);

    // Simulación de actualización en tiempo real
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveUsers((prev) => prev + (Math.floor(Math.random() * 21) - 10));
        }, 5000);

        return () => clearInterval(interval); // Limpieza del intervalo
    }, []);

    // Inicializar gráficos con Chart.js asegurando la destrucción de instancias previas
    useEffect(() => {
        if (salesChartRef.current) {
            if (salesChartInstance.current) {
                salesChartInstance.current.destroy();
            }
            salesChartInstance.current = new Chart(salesChartRef.current, {
                type: "line",
                data: {
                    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
                    datasets: [{
                        label: "Ventas ($)",
                        data: [4000, 3000, 5000, 4500, 6000, 5500],
                        borderColor: "#2563eb",
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                        }
                    }
                }
            });
        }

        if (usersChartRef.current) {
            if (usersChartInstance.current) {
                usersChartInstance.current.destroy();
            }
            usersChartInstance.current = new Chart(usersChartRef.current, {
                type: "doughnut",
                data: {
                    labels: ["Nuevos", "Activos", "Inactivos"],
                    datasets: [{
                        data: [300, 500, 200],
                        backgroundColor: ["#3b82f6", "#10b981", "#ef4444"]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                        }
                    }
                }
            });
        }

        // Cleanup: Destruir gráficos al desmontar el componente
        return () => {
            if (salesChartInstance.current) {
                salesChartInstance.current.destroy();
            }
            if (usersChartInstance.current) {
                usersChartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="container">
            {/* Navbar agregado */}
            
            

            {/* Contenido de Inicio */}
            <div className="content">
                <div className="header">
                    <h1>Panel de Control</h1>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Ingresos Totales</h3>
                        <div className="value">$45,231.89</div>
                        <div className="trend up">↑ 20.1% vs mes anterior</div>
                    </div>
                    <div className="stat-card">
                        <h3>Usuarios Activos</h3>
                        <div className="value">2,350</div>
                        <div className="trend up">↑ 15.2% vs mes anterior</div>
                    </div>
                    <div className="stat-card">
                        <h3>Ventas</h3>
                        <div className="value">12,234</div>
                        <div className="trend down">↓ 5.4% vs mes anterior</div>
                    </div>
                    <div className="stat-card">
                        <h3>Activos Ahora</h3>
                        <div className="value">{activeUsers}</div>
                        <div className="trend up">↑ 201 nuevos hoy</div>
                    </div>
                </div>

                <div className="charts-grid">
                    <div className="chart-card">
                        <h3>Ventas Mensuales</h3>
                        <canvas ref={salesChartRef}></canvas>
                    </div>
                    <div className="chart-card">
                        <h3>Distribución de Usuarios</h3>
                        <canvas ref={usersChartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}
