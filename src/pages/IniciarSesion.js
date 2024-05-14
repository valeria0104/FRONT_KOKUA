import Link from "next/link";
import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState, useEffect } from 'react';
function App() {
    return (
        <>
         <Layout>
            <div className="Contenedor">
            <section className="formInicioSesion">
                <h1>¡Te damos la Bienvenida!</h1>
            <form id= "formulario1" action="#" method="get">
            <label className= "email" htmlFor="email">Correo:</label><br />
            <input className="input-box" type="email" id="e1" name="email" required></input><br />
            <label className= "password" htmlFor="password">Contraseña:</label><br />
            <input className="input-box" type="password" id="c1" name="password" required></input><br />
            
            <div className="form-links">
  <Link className="OlvidoContrasena" href="/RecuperarConstraseña">¿Olvidaste tu contraseña?</Link>
</div>     
<input type="submit" value="Ingresar" className="login-button" />       
</form>
            </section>
            <section className="ImagenInicioSesion">
            <img src="/InicioSesion/Manos.png" alt="Manos"/>
            </section>

            </div>
         </Layout >
        </>
    
    )

}

export default App;