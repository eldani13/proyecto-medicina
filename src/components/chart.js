"use client"; // Evita el problema de SSR

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Charts() {
    const salesChartRef = useRef(null);
    const usersChartRef = useRef(null);

    useEffect(() => {
        if (!salesChartRef.current) return;
      
        // Destruir la instancia anterior si existe
        if (salesChartInstance.current) {
          salesChartInstance.current.destroy();
        }
      
        salesChartInstance.current = new Chart(salesChartRef.current, {
          type: "line",
          data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
            datasets: [
              {
                label: "Ventas ($)",
                data: [4000, 3000, 5000, 4500, 6000, 5500],
                borderColor: "#2563eb",
                tension: 0.1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          },
        });
      
        return () => {
          if (salesChartInstance.current) {
            salesChartInstance.current.destroy();
          }
        };
      }, []);
      

    return (
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
    );
}
