import React, { useState, useEffect } from 'react';
import Layout2 from './componentes/Layout2';  // Importamos el componente de layout corregido
import { useRouter } from 'next/router';
import { useAuth} from './contexto/AuthContext'; 
// Componente principal de RegistroPostulante

const RegistroPostulante = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { idVoluntariado, idOrganizacion } = router.query;
  const [formData, setFormData] = useState({
    nombre: user ? user.nombre : "",
    apellidoPaterno:  user ? user.apellidosPaterno : "",
    apellidoMaterno: user ? user.apellidoMaterno : "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    correo: user ? user.email: ""
  });

  
  const [errorDocumento, setErrorDocumento] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

    const validateDocumento = () => {
    const { tipoDocumento, documento } = formData;
    if (tipoDocumento === "DNI" && documento.length !== 8) {
      return "El DNI debe tener 8 dígitos.";
    } else if ((tipoDocumento === "Pasaporte" || tipoDocumento === "Carnet de Extranjería") && documento.length !== 12) {
      return `El ${tipoDocumento} debe tener 12 dígitos.`;
    }
    return "";
  };

  // Manejo del envío del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPostulante),
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
    <Layout2>
      <section className="panelregistro-postulante"></section>

      <div className="registro-postulante">
        <h1>¡ÚNETE!</h1>
        <form onSubmit={handleFormSubmit}>
          <p>
            <label htmlFor="nombre">Nombres:</label>
            <input type="text" id="nombre" name="nombre"
              value={formData.nombre}  readOnly
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
