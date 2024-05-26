import React, { useState, useEffect } from 'react';
import Layout from './componentes/Layout2.js';

const BusquedaVoluntarios = () => {
  const [voluntariados, setVoluntariados] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const voluntariadosResponse = await fetch('/api/voluntariado');
        if (voluntariadosResponse.ok) {
          const voluntariadosData = await voluntariadosResponse.json();
          console.log('Datos de voluntariados obtenidos:', voluntariadosData);
          setVoluntariados(voluntariadosData);
        } else {
          console.error('Error al obtener datos de voluntariados:', await voluntariadosResponse.text());
        }

        const organizacionesResponse = await fetch('/api/organizacion');
        if (organizacionesResponse.ok) {
          const organizacionesData = await organizacionesResponse.json();
          console.log('Datos de organizaciones obtenidos:', organizacionesData);
          setOrganizaciones(organizacionesData);
        } else {
          console.error('Error al obtener datos de organizaciones:', await organizacionesResponse.text());
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtrarVoluntariados = () => {
      const resultados = voluntariados.map(voluntariado => {
        const organizacion = organizaciones.find(org => org.id === voluntariado.idOrganizacion);
        return {
          ...voluntariado,
          nombreOrganizacion: organizacion ? organizacion.nombre_organizacion : '',
          imagenOrganizacion: organizacion ? organizacion.imagen_organizacion : ''
        };
      });

      setResultadosFiltrados(
        resultados.filter(voluntariado =>
          voluntariado.nombre.toLowerCase().includes(filtro.toLowerCase())
        )
      );
    };

    filtrarVoluntariados();
  }, [filtro, voluntariados, organizaciones]);

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
            {resultadosFiltrados.map((voluntariado, index) => (
              <li key={index}>
                <p>{voluntariado.nombre}</p>
                <img className='imagen_organizacion' src={voluntariado.imagenOrganizacion} alt={`Imagen de ${voluntariado.nombreOrganizacion}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default BusquedaVoluntarios;
