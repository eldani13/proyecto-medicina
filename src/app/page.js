"use client"; // Para Next.js 13+ con App Router

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita la recarga de la página

        // Simulación de autenticación
        if (username === "admin" && password === "12345") {
            alert("Acceso concedido");
            router.push("/Inicio"); // Redirige al dashboard
        } else {
            setErrorMessage("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="login-container">
            <h2>Acceso de Administrador</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Ingrese su usuario" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                        className="text-black"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Ingrese su contraseña" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="text-black"

                    />
                </div>
                <button type="submit" className="btn">Iniciar Sesión</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
}
