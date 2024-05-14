import Head from "next/head";
import Layout from './componentes/Layout.js';
import usuarioData from "./json/usuario.json";
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

  const [formData, setFormData] = useState({
    nombres: "",
    apellidosPaterno: "",
    apellidoMaterno: "",
    correo: "",
    contrasena: "",
    repetir: ""
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo objeto con los datos del formulario
    const nuevoUsuario = {
      nombres: formData.nombres,
      apellidosPaterno: formData.apellidosPaterno,
      apellidoMaterno: formData.apellidoMaterno,
      correo: formData.correo,
      contrasena: formData.contrasena,
      repetir: formData.repetir,
    };

    fetch('/usuario.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Usuario registrado con éxito:', data);
        // Puedes realizar otras acciones, como redireccionar a una página de éxito, aquí.
      })
      .catch(error => {
        console.error('Error al registrar usuario:', error);
      });
  };

  return (
    <Layout>
      <div className="PantallaRegistrar">
        <div className="FormularioRegistro">
          <h1 id="Registrarse">Registrarse</h1>
          <form onSubmit={handleFormSubmit}>

            <p>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
            </p>
            <p>
              <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
              <input type="text" id="apellidoPaterno" name="apellidoPaterno"
                value={formData.apellidosPaterno}
                onChange={(e) => setFormData({ ...formData, apellidosPaterno: e.target.value })} />
            </p>
            <p>
              <label htmlFor="apellidoMaterno">Apellido Materno:</label>
              <input type="text" id="apellidoMaterno" name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={(e) => setFormData({ ...formData, apellidoMaterno: e.target.value })} />
            </p>
            <p>
              <label htmlFor="correo">Correo electrónico:</label>
              <input type="text" id="correo" name="correo"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })} />
            </p>
            <p>
              <label htmlFor="contrasena">Contraseña:</label>
              <input type="password" id="contrasena" name="contrasena"
                value={formData.contrasena}
                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })} />
            </p>
            <p>
              <label htmlFor="confirmarContrasena">Confirmar contraseña:</label>
              <input type="password" id="confirmarContrasena" name="confirmarContrasena"
                value={formData.repetir}
                onChange={(e) => setFormData({ ...formData, repetir: e.target.value })} />
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
            <button
              className="Botonregistro"
              disabled={!aceptarPolitica || !aceptarTerminos}
              onClick={handleFormSubmit}
            >
              Registrarse
            </button>          </form>
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