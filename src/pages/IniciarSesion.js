import Link from "next/link";
import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState } from 'react';
import usuarioData from "./json/usuario.json";

function App() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/verificarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contrasena }),
            });

            if (response.ok) {
                console.log('Usuario registrado con éxito');
            } else {
                console.error('Error al registrar usuario');
                alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <>
            <Layout>
                <div className="Contenedor">
                    <section className="formInicioSesion">
                        <h1>¡Te damos la Bienvenida!</h1>
                        <form id="formulario1" action="#" method="get" onSubmit={handleLogin}>
                            <label className="email" htmlFor="email">Correo:</label><br />
                            <input className="input-box" type="email" id="email" name="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required /><br />
                            <label className="password" htmlFor="contrasena">Contraseña:</label><br />
                            <input className="input-box" type="password" id="contrasena" name="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required /><br />
                            <div className="form-links">
                                <Link className="OlvidoContrasena" href="/RecuperarConstraseña">¿Olvidaste tu contraseña?</Link>
                            </div>
                            <input type="submit" value="Ingresar" className="login-button" />
                        </form>
                        {error && <p className="error-message">{error}</p>}
                    </section>
                    <section className="ImagenInicioSesion">
                        <img src="/InicioSesion/Manos.png" alt="Manos" />
                    </section>
                    //iniciar sesion 

                </div>
            </Layout>
        </>
    );
}

export default App;
