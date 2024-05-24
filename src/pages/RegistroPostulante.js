import React, { useState, useEffect } from 'react';
import Layout2 from './componentes/Layout2';  
import { useRouter } from 'next/router';

const RegistroPostulante = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    correo: ""
  });

  const [errorDocumento, setErrorDocumento] = useState("");

  const router = useRouter();

  const validateDocumento = () => {
    const { tipoDocumento, documento } = formData;
    if (tipoDocumento === "DNI" && documento.length !== 8) {
      return "El DNI debe tener 8 dígitos.";
    } else if ((tipoDocumento === "Pasaporte" || tipoDocumento === "Carnet de Extranjería") && documento.length !== 12) {
      return `El ${tipoDocumento} debe tener 12 dígitos.`;
    }
    return "";
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateDocumento();
    if (errorMessage) {
      setErrorDocumento(errorMessage);
      return;
    } else {
      setErrorDocumento("");
    }

    const nuevoPostulante = {
      nombre: formData.nombre,
      apellidoPaterno: formData.apellidoPaterno,
      apellidoMaterno: formData.apellidoMaterno,
      tipoDocumento: formData.tipoDocumento,
      documento: formData.documento,
      telefono: formData.telefono,
      correo: formData.correo
    };

    try {
      const response = await fetch('/api/guardarPostulante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPostulante),
      });
      if (response.ok) {
        console.log('Postulante registrado con éxito');
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
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
          </p>
          <p>
            <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
            <input type="text" id="apellidoPaterno" name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={(e) => setFormData({ ...formData, apellidoPaterno: e.target.value })} />
          </p>
          <p>
            <label htmlFor="apellidoMaterno">Apellido Materno:</label>
            <input type="text" id="apellidoMaterno" name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={(e) => setFormData({ ...formData, apellidoMaterno: e.target.value })} />
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
                setErrorDocumento("");
              }} />
            {errorDocumento && <span className="error">{errorDocumento}</span>}
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
      </div>
    </Layout2>
  );
};

export default RegistroPostulante;
