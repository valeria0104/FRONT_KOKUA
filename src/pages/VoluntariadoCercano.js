import React, { useState, useEffect } from 'react';
import Layout from './componentes/Layout2.js';

const BusquedaVoluntarios = () => {
  const [voluntarios, setVoluntarios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/voluntariadojson');
        if (response.ok) {
          const data = await response.json();
          setVoluntarios(data);
        } else {
          console.error('Error al obtener datos de voluntarios:', await response.text());
        }
      } catch (error) {
        console.error('Error al obtener datos de voluntarios:', error);
      }
    };
    

    fetchData();
  }, []);

  useEffect(() => {
    setResultadosFiltrados(
      voluntarios.filter(voluntario =>
        voluntario.nombre_organizacion.toLowerCase().includes(filtro.toLowerCase())
      )
    );
  }, [filtro, voluntarios]);

  const handleInputChange = (e) => {
    setFiltro(e.target.value);
  };

  return (
    <Layout>
      <section className="panelproyecto"></section>
      <div>
        <div className="search-container">
          <label htmlFor="search-input">
            <img src="/voluntariadoCercano/busqueda.png" alt="Buscar" className="search-icon" />
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Buscar por nombre"
            value={filtro}
            onChange={handleInputChange}
            className="search-input"
          />
        </div>
        <div className="scrollable-container">
          <ul>
            {resultadosFiltrados.map((voluntario, index) => (
              <li key={index}>
                <img className='imagen_volunariadocerca' src={voluntario.imagen_organizacion} alt={`Imagen de ${voluntario.nombre_organizacion}`} />
              </li>
            ))}
          </ul></div>
      </div>
    </Layout>
  );
};

export default BusquedaVoluntarios;
