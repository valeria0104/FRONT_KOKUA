import React, { useState, useEffect } from 'react';
import departamentosData from './json/UbicacionRegistrar.json'; // Asegúrate de que la ruta sea correcta
import sectoresData from './json/SectorVoluntariado.json'; // Asegúrate de que la ruta sea correcta

const AñadeTuVolu = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descrip: '',
    requisitos: '',
    fechaLim: '',
    empProy: '',
    finProy: '',
    departamento: '',
    provincia: '',
    distrito: '',
    sector: '',
    direcc: '',
    ubigeo: '',
  });

  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);

  useEffect(() => {
    if (formData.departamento) {
      const provinciasFiltradas = departamentosData
        .filter(item => item.Departamento === formData.departamento && item.Provincia)
        .map(item => item.Provincia)
        .filter((value, index, self) => self.indexOf(value) === index);
      setProvincias(provinciasFiltradas);
      setFormData(prevFormData => ({ ...prevFormData, provincia: '', distrito: '', ubigeo: '' }));
      setDistritos([]);
    }
  }, [formData.departamento]);

  useEffect(() => {
    if (formData.provincia) {
      const distritosFiltrados = departamentosData
        .filter(item => item.Departamento === formData.departamento && item.Provincia === formData.provincia && item.Distrito)
        .map(item => item.Distrito);
      setDistritos(distritosFiltrados);
      setFormData(prevFormData => ({ ...prevFormData, distrito: '', ubigeo: '' }));
    }
  }, [formData.provincia]);

  const handleDepartamentoChange = (event) => {
    setFormData({ ...formData, departamento: event.target.value });
  };

  const handleProvinciaChange = (event) => {
    setFormData({ ...formData, provincia: event.target.value });
  };

  const handleDistritoChange = (event) => {
    const distrito = event.target.value;
    const selectedUbigeoData = departamentosData.find(item =>
      item.Departamento === formData.departamento &&
      item.Provincia === formData.provincia &&
      item.Distrito === distrito
    );
    const ubigeo = selectedUbigeoData ? selectedUbigeoData.IdUbigeo : '';
    setFormData({ ...formData, distrito, ubigeo });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fechaLim, empProy, finProy } = formData;
    if (fechaLim > empProy) {
      alert('La fecha límite no puede ser posterior a la fecha de inicio del proyecto.');
      return;
    }

    if (empProy > finProy) {
      alert('La fecha de inicio no puede ser posterior a la fecha de finalización del proyecto.');
      return;
    }

    // Manejar la sumisión del formulario aquí, por ejemplo, enviar los datos a una API backend
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>¡Añade tu voluntariado!</h1>
      <div>
        <label htmlFor="nombre">Nombre del voluntariado:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="descrip">Descripción del proyecto:</label>
        <textarea
          id="descrip"
          name="descrip"
          value={formData.descrip}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="requisitos">Requisitos:</label>
        <textarea
          id="requisitos"
          name="requisitos"
          value={formData.requisitos}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="fechaLim">Fecha Límite de inscripciones:</label>
        <input
          type="date"
          id="fechaLim"
          name="fechaLim"
          value={formData.fechaLim}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="empProy">Duración del proyecto:</label>
        <input
          type="date"
          id="empProy"
          name="empProy"
          value={formData.empProy}
          onChange={handleChange}
        />
        <span> hasta </span>
        <input
          type="date"
          id="finProy"
          name="finProy"
          value={formData.finProy}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="departamento">Departamento:</label>
        <select
          id="departamento"
          name="departamento"
          value={formData.departamento}
          onChange={handleDepartamentoChange}
        >
          <option value="">Selecciona departamento</option>
          {Array.from(new Set(departamentosData.map(item => item.Departamento))).map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="provincia">Provincia:</label>
        <select
          id="provincia"
          name="provincia"
          value={formData.provincia}
          onChange={handleProvinciaChange}
          disabled={!formData.departamento}
        >
          <option value="">Selecciona provincia</option>
          {provincias.map(prov => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="distrito">Distrito:</label>
        <select
          id="distrito"
          name="distrito"
          value={formData.distrito}
          onChange={handleDistritoChange}
          disabled={!formData.provincia}
        >
          <option value="">Selecciona distrito</option>
          {distritos.map(dist => (
            <option key={dist} value={dist}>{dist}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sector">Sector:</label>
        <select
          id="sector"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
        >
          <option value="">Selecciona sector</option>
          {sectoresData.map((sector) => (
            <option key={sector.id} value={sector.nombre}>{sector.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="direcc">Dirección:</label>
        <input
          type="text"
          id="direcc"
          name="direcc"
          value={formData.direcc}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default AñadeTuVolu;
