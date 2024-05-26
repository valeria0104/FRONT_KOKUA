import Link from "next/link";
import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import { useAuth} from './contexto/AuthContext'; 
function App() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState('');
    const router = useRouter(); // Obtiene el enrutador
    const { login, user } = useAuth(); 
    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch('/api/verificarUsuario');
            const data = await response.json();

            if (response.ok && data.success) {
                const combinedData = data.data;
                const usuarioRegistrado = combinedData.find(usuario => usuario.correo === correo);

                if (usuarioRegistrado) {
                    if (usuarioRegistrado.contrasena === contrasena) {
                        login(usuarioRegistrado);
                        if (usuarioRegistrado.tipo_usuario === 1) {
                            router.push('/PruebaUserNormal');
                        } else if (usuarioRegistrado.tipo_usuario === 2) {
                            router.push('/PruebaUserOrg');
                        }
                    } else {
                        alert('Contraseña incorrecta');
                    }
                } else {
                    alert('Correo electrónico no registrado');
                }
            } else {
                alert('Error al obtener los datos');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión');
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

                </div>
            </Layout>
        </>
    );
}

export default App;
