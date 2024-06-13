import React, { useState,  useEffect } from 'react';

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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar la sumisión del formulario aquí, por ejemplo, enviar los datos a una API backend
    console.log(formData);
  };
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    // Fetch data from the API
    fetch('/api/ubicacion')
        .then(response => response.json())
        .then(data => {
            console.log('Data fetched from API:', data);
            setUbicacionData(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Fetch sector from the API
    fetch('/api/sectorVoluntariado')
        .then(response => response.json())
        .then(data => {
            console.log('Categorias fetched from API:', data);
            setCategorias(data);
        })
        .catch(error => console.error('Error fetching categorias:', error));
}, []);


 

  return (
    <>
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
          <span>hasta</span>
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
            onChange={handleChange}
          >
            <option value="">Selecciona departamento</option>
            {/* Agregar opciones de departamento aquí */}
          </select>
        </div>
        <div>
          <label htmlFor="provincia">Provincia:</label>
          <select
            id="provincia"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
          >
            <option value="">Selecciona provincia</option>
            {/* Agregar opciones de provincia aquí */}
          </select>
        </div>
        <div>
          <label htmlFor="distrito">Distrito:</label>
          <select
            id="distrito"
            name="distrito"
            value={formData.distrito}
            onChange={handleChange}
          >
            <option value="">Selecciona distrito</option>
            {/* Agregar opciones de distrito aquí */}
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
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.categoria}>{cat.categoria}</option>
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
    </>
  );
};

export default AñadeTuVolu;
