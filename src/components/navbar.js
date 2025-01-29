"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { RiCloseLine } from "react-icons/ri";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Evita problemas de hidratación asegurando que el componente se renderice en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Evita errores de hidratación

  return (
    <>
      {/* Sidebar Vertical */}
      <nav className="bg-blue-600 text-white w-64 h-screen fixed left-0 top-0 p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-white">Sistema Médico</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/Inicio" className="hover:text-gray-300">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/alertas" className="hover:text-gray-300">
              Alertas
            </Link>
          </li>
          <li>
            <Link href="/paciente" className="hover:text-gray-300">
              Pacientes
            </Link>
          </li>
          <li>
            <Link href="/historial" className="hover:text-gray-300">
              Historial
            </Link>
          </li>
        </ul>
      </nav>

      {/* Botón de menú para móviles */}
      <button
        className="md:hidden fixed top-4 left-4 text-3xl text-blue-600 z-50"
        onClick={() => setIsOpen(true)}
      >
        <CiMenuBurger />
      </button>

      {/* Sidebar Móvil */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-screen bg-blue-600 text-white p-6 flex flex-col transform transition-transform md:hidden z-50">
          <button
            className="absolute top-4 right-4 text-3xl"
            onClick={() => setIsOpen(false)}
          >
            <RiCloseLine />
          </button>
          <h2 className="text-2xl font-bold mb-6">Sistema Médico</h2>
          <ul className="space-y-4">
            <li>
              <Link
                href="/Inicio"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-300"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/alertas"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-300"
              >
                Alertas
              </Link>
            </li>
            <li>
              <Link
                href="/paciente"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-300"
              >
                Pacientes
              </Link>
            </li>
            <li>
              <Link
                href="/historial"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-300"
              >
                Historial
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
