import React, { useState } from 'react';
import Layout from './componentes/Layout.js';
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth} from './contexto/AuthContext'; 

const RegisterPage = () => {
  const { user } = useAuth();
  const [aceptarPolitica, setAceptarPolitica] = useState(false);
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidosPaterno: "",
    apellidoMaterno: "",
    correo: "",
    contrasena: "",
    repetir: "",
    tipo_usuario: 1
  });

  const router = useRouter();
  const [nuevoUsuario, setNuevoUsuario] = useState(null); // Definir nuevoUsuario

  const handleAceptacionPolitica = () => {
    setAceptarPolitica(!aceptarPolitica);
  };

  const handleAceptacionTerminos = () => {
    setAceptarTerminos(!aceptarTerminos);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    

  
 
  
  if (formData.contrasena !== formData.repetir) {
    alert('Las contraseñas no coinciden');
    return;
  }
    // Crear un nuevo objeto con los datos del formulario
    const nuevoUsuario = {
      nombre: formData.nombre,
      apellidosPaterno: formData.apellidosPaterno,
      apellidoMaterno: formData.apellidoMaterno,
      correo: formData.correo,
      contrasena: formData.contrasena,
      repetir: formData.repetir,
      tipo_usuario : 1
    };

    
    const queryString = Object.keys(nuevoUsuario)
    .map(key => key + '=' + encodeURIComponent(nuevoUsuario[key]))
    .join('&');

  router.push({
    pathname: '/RegistrarVoluntario2',
    search: `?${queryString}`
  });
 
    
  };

  return (
    <Layout>
  <p>{user.correo}</p>
      <div className="PantallaRegistrar">
        <div className="FormularioRegistro">
          <h1 id="Registrarse">Registrarse</h1>
          <form onSubmit={handleFormSubmit}>
            <p>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}required/>
            </p>
            <p>
              <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
              <input type="text" id="apellidoPaterno" name="apellidoPaterno"
                value={formData.apellidosPaterno}
                onChange={(e) => setFormData({ ...formData, apellidosPaterno: e.target.value })} required/>
            </p>
            <p>
              <label htmlFor="apellidoMaterno">Apellido Materno:</label>
              <input type="text" id="apellidoMaterno" name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={(e) => setFormData({ ...formData, apellidoMaterno: e.target.value })} required/>
            </p>
            <p>
              <label htmlFor="correo">Correo electrónico:</label>
              <input type="email" id="correo" name="correo"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })} required />
            </p>
            <p>
              <label htmlFor="contrasena">Contraseña:</label>
              <input type="password" id="contrasena" name="contrasena"
                value={formData.contrasena}
                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })} required/>
            </p>
            <p>
              <label htmlFor="confirmarContrasena">Confirmar contraseña:</label>
              <input type="password" id="confirmarContrasena" name="confirmarContrasena"
                value={formData.repetir}
                onChange={(e) => setFormData({ ...formData, repetir: e.target.value })} required/>
            </p>
            <div className="politica-privacidad">
              <input
                type="checkbox"
                id="aceptarPolitica"
                name="aceptarPolitica"
                checked={aceptarPolitica}
                onChange={handleAceptacionPolitica}
                required/>
              <label htmlFor="aceptarPolitica">Acepto la política de privacidad y tratamiento de datos personales</label>
            </div>
            <div className="terminos-condiciones">
              <input
                type="checkbox"
                id="aceptarTerminos"
                name="aceptarTerminos"
                checked={aceptarTerminos}
                onChange={handleAceptacionTerminos}
             requerid/>
              <label htmlFor="aceptarTerminos">Acepto los términos y condiciones</label>
            </div>
            <button
              className="Botonregistro"
              disabled={!aceptarPolitica || !aceptarTerminos}
              type="submit"
            >
              Registrarse
            </button>
          </form>
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
};

export default RegisterPage;
