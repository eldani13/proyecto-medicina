"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Importa los íconos correctamente
 // Asegúrate de que la ruta sea correcta


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Navbar Principal */}
            <nav className="navbar">
                <div className="navbar-container">
                    <h2 className="navbar-title">Sistema Médico</h2>
                    <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Sidebar - Se adapta a la vista de escritorio y móvil */}
                <div className={`sidebar ${isOpen ? "open" : ""}`}>
                    <ul className="nav-links">
                        <li><Link href="/Inicio">Inicio</Link></li>
                        <li><Link href="/alertas">Alertas</Link></li>
                        <li><Link href="/paciente">Pacientes</Link></li>
                        <li><Link href="/historial">historial</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Espacio de contenido para evitar que se superponga con el navbar */}
            <div className="content-padding"></div>
        </>
    );
}
