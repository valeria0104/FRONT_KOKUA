import React, { useState } from 'react';  
import Layout2 from './componentes/Layout2';  
import { useRouter } from 'next/router';
import { useAuth } from './contexto/AuthContext';
const RegistroPostulante = () => {
  const { user } = useAuth();  
  const router = useRouter();
  const { idVoluntariado, idOrganizacion } = router.query;
  const [formData, setFormData] = useState({
    nombre: user ? user.nombre : "",  // Guarda el nombre del usuario.
    apellidoPaterno: user ? user.apellido_paterno : "",  // Guarda el apellido paterno del usuario.
    apellidoMaterno: user ? user.apellido_materno : "",  // Guarda el apellido materno del usuario.
    tipoDocumento: "",  // Guarda el tipo de documento seleccionado (DNI, Pasaporte, etc.).
    doc_identidad: "",  // Guarda el número de documento.
    telefono: "",  // Guarda el número de teléfono.
    correo: user ? user.email : "" , // Guarda el correo electrónico del usuario.
    idUsuario : user ? user.idUsuario : ""
  });

  
  const [errorDocumento, setErrorDocumento] = useState("");

  
  const [mensajeExito, setMensajeExito] = useState("");

  // Función para validar el documento según su tipo.
  const validateDocumento = () => {
    const { tipoDocumento, doc_identidad } = formData;
    if (tipoDocumento === "DNI" && doc_identidad.length !== 8) {
      return "El DNI debe tener 8 dígitos."; // Verifica que el DNI tenga 8 dígitos.
    } else if ((tipoDocumento === "Pasaporte" || tipoDocumento === "Carnet de Extranjería") && doc_identidad.length !== 12) {
      return `El ${tipoDocumento} debe tener 12 dígitos.`; // Verifica que el Pasaporte o Carnet de Extranjería tenga 12 dígitos.
    }
    return "";
  };

  
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Previene que la página se recargue al enviar el formulario.
    const errorMessage = validateDocumento(); // Validamos el documento
    if (errorMessage) {
      setErrorDocumento(errorMessage); // Si hay error, lo mostramos
      return;
    } else {
      setErrorDocumento(""); // Si no hay error, lo limpiamos
    }

    const nuevoPostulante = {
      nombre: formData.nombre,
      apellidoPaterno: formData.apellidoPaterno,
      apellidoMaterno: formData.apellidoMaterno,
      tipoDocumento: formData.tipoDocumento,
      doc_identidad: formData.doc_identidad,
      telefono: formData.telefono,
      correo: formData.correo,
      idVoluntariado: idVoluntariado,
      idOrganizacion: idOrganizacion,
      idUsuario: formData.idUsuario,
      tipo_relacion: 1
    };

    try {
      const response = await fetch('/api/guardarPostulante', {
        method: 'POST', // Método POST para enviar datos.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPostulante), // Convierte el objeto a JSON para enviarlo.
      });
      
      if (response.ok) {
        setMensajeExito("Postulante registrado con éxito"); // Mostramos mensaje de éxito
        // Limpiamos el formulario
        setFormData({
          nombre: user ? user.nombre : "",
          apellidoPaterno: user ? user.apellidosPaterno : "",
          apellidoMaterno: user ? user.apellidoMaterno : "",
          tipoDocumento: "",
          doc_identidad: "",
          telefono: "",
          correo: user ? user.email : "",
          tipo_relacion: 1
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
    // Layout2 proporciona la estructura y estilo de la página.
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
              value={formData.nombre} readOnly // Campo de texto para el nombre, solo lectura si el usuario está autenticado
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
              {/* menu desplegable */}
            </select> 
          </p>
          <p>
            <label htmlFor="doc_identidad">Documento de identificación:</label>
            <input type="text" id="doc_identidad" name="doc_identidad"
              value={formData.doc_identidad}
              onChange={(e) => {
                setFormData({ ...formData, doc_identidad: e.target.value });
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
