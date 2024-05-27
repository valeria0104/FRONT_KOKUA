import React, { useState } from 'react';
import Layout from './componentes/Layout.js';
import { useRouter } from "next/router";
import Link from "next/link";

const añadeTuVolu = () => {
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
  })};
  //const router = useRouter();
  //const [nuevoUsuario, setNuevoUsuario] = useState(null); // Definir nuevoUsuario
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar la sumisión del formulario aquí, por ejemplo, enviar los datos a una API backend
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>¡Añade tu voluntariado!</h1>
      <div>
        <label htmlFor="name">Nombre del voluntariado:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Descripción del proyecto:</label>
        <textarea
          id="description"
          name="description"
          value={formData.descrip}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="requirements">Requisitos:</label>
        <textarea
          id="requirements"
          name="requirements"
          value={formData.requisitos}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="deadline">Fecha Límite de inscripciones:</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.fechaLim}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="startDate">Duración del proyecto:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.empProy}
          onChange={handleChange}
        />
        <span>hasta</span>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.finProy}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="department">Departamento:</label>
        <select
          id="department"
          name="department"
          value={formData.departamento}
          onChange={handleChange}
        >
          <option value="">Selecciona departamento</option>
          {/* Agregar opciones de departamento aquí */}
        </select>
      </div>
      <div>
        <label htmlFor="province">Provincia:</label>
        <select
          id="province"
          name="province"
          value={formData.provincia}
          onChange={handleChange}
        >
          <option value="">Selecciona provincia</option>
          {/* Agregar opciones de provincia aquí */}
        </select>
      </div>
      <div>
        <label htmlFor="district">Distrito:</label>
        <select
          id="district"
          name="district"
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
          {/* Agregar opciones de sector aquí */}
        </select>
      </div>
      <div>
        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.direcc}
          onChange={handleChange}
        />
      </div> </form>
 );