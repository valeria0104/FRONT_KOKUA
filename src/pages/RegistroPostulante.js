// Importa React y el hook useState.
// useState permite manejar el estado (datos) dentro de un componente.
// En este código, useState se usa para manejar los datos del formulario (formData),
// mensajes de error del documento (errorDocumento) y mensajes de éxito del registro (mensajeExito).
import React, { useState } from 'react';  

// Importa el componente de diseño (layout) llamado Layout2, que se usa para darle
// una estructura y estilo consistente a la página.
import Layout2 from './componentes/Layout2';  

// Importa el hook useRouter de Next.js para manejar la navegación entre páginas.
// useRouter se usa para obtener los parámetros de la URL y manejar la navegación.
import { useRouter } from 'next/router';

// Importa el contexto de autenticación que provee la información del usuario autenticado.
// Esto permite acceder a los datos del usuario autenticado en cualquier parte del componente.
import { useAuth } from './contexto/AuthContext';

// Define el componente RegistroPostulante.
// Un componente es una parte reutilizable de la interfaz de usuario.
const RegistroPostulante = () => {
  // Obtiene la información del usuario autenticado usando el hook useAuth.
  // Si el usuario está autenticado, tendrá información como nombre, apellidos y correo.
  const { user } = useAuth();  

  // Inicializa el router para manejar la navegación entre páginas.
  // useRouter permite acceder a los parámetros de la URL.
  const router = useRouter();

  // Obtiene los parámetros de la URL (idVoluntariado e idOrganizacion).
  // Estos parámetros se usan para identificar a qué voluntariado y organización se está registrando el usuario.
  const { idVoluntariado, idOrganizacion } = router.query;
  
  // useState para manejar los datos del formulario del postulante.
  // formData guarda los datos que el usuario ingresa en el formulario.
  // setFormData es la función que actualiza esos datos.
  // Datos manejados: nombre, apellidoPaterno, apellidoMaterno, tipoDocumento, documento, telefono, correo.
  const [formData, setFormData] = useState({
    nombre: user ? user.nombre : "",  // Guarda el nombre del usuario.
    apellidoPaterno: user ? user.apellidosPaterno : "",  // Guarda el apellido paterno del usuario.
    apellidoMaterno: user ? user.apellidoMaterno : "",  // Guarda el apellido materno del usuario.
    tipoDocumento: "",  // Guarda el tipo de documento seleccionado (DNI, Pasaporte, etc.).
    documento: "",  // Guarda el número de documento.
    telefono: "",  // Guarda el número de teléfono.
    correo: user ? user.email : ""  // Guarda el correo electrónico del usuario.
  });

  // useState para manejar el mensaje de error del documento.
  // errorDocumento guarda un mensaje de error si el documento no es válido.
  // Datos manejados: mensaje de error relacionado con el documento.
  const [errorDocumento, setErrorDocumento] = useState("");

  // useState para manejar el mensaje de éxito del registro.
  // mensajeExito guarda un mensaje cuando el registro es exitoso.
  // Datos manejados: mensaje de éxito.
  const [mensajeExito, setMensajeExito] = useState("");

  // Función para validar el documento según su tipo.
  const validateDocumento = () => {
    const { tipoDocumento, documento } = formData;
    if (tipoDocumento === "DNI" && documento.length !== 8) {
      return "El DNI debe tener 8 dígitos.";/// Verifica que el DNI tenga 8 dígitos.
    } else if ((tipoDocumento === "Pasaporte" || tipoDocumento === "Carnet de Extranjería") && documento.length !== 12) {
      return `El ${tipoDocumento} debe tener 12 dígitos.`; // Verifica que el Pasaporte o Carnet de Extranjería tenga 12 dígitos.
    }
    return "";
  };

  // Manejo del envío del formulario
  // Esta función se ejecuta cuando el usuario envía el formulario.
  const handleFormSubmit = async (e) => {
    e.preventDefault();// Previene que la página se recargue al enviar el formulario.
    const errorMessage = validateDocumento(); // Validamos el documento
    if (errorMessage) {
      setErrorDocumento(errorMessage); // Si hay error, lo mostramos
      return;
    } else {
      setErrorDocumento(""); // Si no hay error, lo limpiamos
    }

    // Creamos el objeto con los datos del nuevo postulante
    const nuevoPostulante = {
      nombre: formData.nombre,
      apellidoPaterno: formData.apellidoPaterno,
      apellidoMaterno: formData.apellidoMaterno,
      tipoDocumento: formData.tipoDocumento,
      documento: formData.documento,
      telefono: formData.telefono,
      correo: formData.correo,
      idVoluntariado: idVoluntariado,
      idOrganizacion: idOrganizacion
    };

    
    try {
      // Enviamos los datos a la API
      const response = await fetch('/api/guardarPostulante', {
        method: 'POST',//Método POST para enviar datos.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPostulante),//Convierte el objeto a JSON para enviarlo.
      });
      if (response.ok) {
        setMensajeExito("Postulante registrado con éxito"); // Mostramos mensaje de éxito
        // Limpiamos el formulario
        setFormData({
          nombre: user ? user.nombre : "",
          apellidoPaterno: user ? user.apellidosPaterno : "",
          apellidoMaterno: user ? user.apellidoMaterno : "",
          tipoDocumento: "",
          documento: "",
          telefono: "",
          correo: user ? user.email : ""
        });
      } else {
        console.error('Error al registrar postulante');
        alert('Error al registrar postulante. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al registrar postulante:', error);
      alert('Error al registrar postulante. Por favor, inténtalo de nuevo.');
    }
  };
 
  return (
    //Layout2 proporciona la estructura y estilo de la página.
    <Layout2> 
       {/* Panel de registro de postulantes */}
      <section className="panelregistro-postulante"></section>
{/* Contenedor principal del formulario de registro */}
      <div className="registro-postulante">
        <h1>¡ÚNETE!</h1>
         {/* Formulario de registro */}
        <form onSubmit={handleFormSubmit}>
          <p>
            <label htmlFor="nombre">Nombres:</label>
            <input type="text" id="nombre" name="nombre"
              value={formData.nombre}  readOnly // Campo de texto para el nombre, solo lectura si el usuario está autenticado
              />
          </p>
          <p>
            <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
            <input type="text" id="apellidoPaterno" name="apellidoPaterno"
              value={formData.apellidoPaterno} readOnly
              />
          </p>
          <p>
            <label htmlFor="apellidoMaterno">Apellido Materno:</label>
            <input type="text" id="apellidoMaterno" name="apellidoMaterno"
              value={formData.apellidoMaterno} readOnly
              />
          </p>
          <p>
            <label htmlFor="tipoDocumento">Tipo de documento:</label>
            <select id="tipoDocumento" name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={(e) => setFormData({ ...formData, tipoDocumento: e.target.value })}>
              <option value="">Seleccione un tipo de documento</option>
              <option value="DNI">DNI</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="Carnet de Extranjería">Carnet de Extranjería</option>
             {/*menu desplegable*/}
            </select> 
          </p>
          <p>
            <label htmlFor="documento">Documento de identificación:</label>
            <input type="text" id="documento" name="documento"
              value={formData.documento}
              onChange={(e) => {
                setFormData({ ...formData, documento: e.target.value });
                setErrorDocumento(""); // Limpiamos el error cuando el usuario empieza a escribir
              }} />
            {errorDocumento && <span className="error">{errorDocumento}</span>} {/* Mostramos mensaje de error si hay */}
          </p>
          <p>
            <label htmlFor="telefono">Número de teléfono:</label>
            <input type="text" id="telefono" name="telefono"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
              
          </p>
          <p>
            <label htmlFor="correo">Correo electrónico:</label>
            <input type="email" id="correo" name="correo"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })} />
              
          </p>
          <button type="submit">Enviar</button>
        </form>
        {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>} {/* Mostramos mensaje de éxito si hay */}
      </div>
    </Layout2>
  );
};

export default RegistroPostulante;
