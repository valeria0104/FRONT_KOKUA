import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";

function App() {
  const [aceptarPolitica, setAceptarPolitica] = useState(false);
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  const handleAceptacionPolitica = () => {
    setAceptarPolitica(!aceptarPolitica);
  };
 
  const handleAceptacionTerminos = () => {
    setAceptarTerminos(!aceptarTerminos);
  };

  return (
    <Layout>
      <div className="Registrar">
        <div className="FormularioRegistro">
          <h1 id="Registrarse">Registrarse</h1>
          <p>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" />
          </p>
          <p>
            <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
            <input type="text" id="apellidoPaterno" name="apellidoPaterno" />
          </p>
          <p>
            <label htmlFor="apellidoMaterno">Apellido Materno:</label>
            <input type="text" id="apellidoMaterno" name="apellidoMaterno" />
          </p>
          <p>
            <label htmlFor="correo">Correo electrónico:</label>
            <input type="text" id="correo" name="correo" />
          </p>
          <p>
            <label htmlFor="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" />
          </p>
          <p>
            <label htmlFor="confirmarContrasena">Confirmar contraseña:</label>
            <input type="password" id="confirmarContrasena" name="confirmarContrasena" />
          </p>
          <div className="politica-privacidad">
            <input
              type="checkbox"
              id="aceptarPolitica"
              name="aceptarPolitica"
              checked={aceptarPolitica}
              onChange={handleAceptacionPolitica}
            />
            <label1 htmlFor="aceptarPolitica">Acepto la política de privacidad y tratamiento de datos personales</label1>
          </div>
          <div className="terminos-condiciones">
            <input
              type="checkbox"
              id="aceptarTerminos"
              name="aceptarTerminos"
              checked={aceptarTerminos}
              onChange={handleAceptacionTerminos}
            />
            <label1 htmlFor="aceptarTerminos">Acepto los términos y condiciones</label1>
          </div>
          <button className="Botonregistro" disabled={!aceptarPolitica || !aceptarTerminos}>Registrarse</button>
        </div>
        <div className="Fotoregistrar">
          <img src="fotoregistrar.png" alt="Foto de registro" className="foto" />
        </div>
        
      </div>
      <div className="Dudas">
          <p>Si tienes dudas o consultas, </p>
          <p>escríbenos a infokokua@gmail.com</p>
        </div>
    </Layout>
  );
}

export default App;