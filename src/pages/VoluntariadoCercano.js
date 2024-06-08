import React, { useState, useEffect } from 'react';
import Layout from './componentes/Layout2.js';
import Link from 'next/link';
import { geocodeAddress, calculateDistance } from '../utils/googleMaps'; // Importamos la función calculateDistance

const VoluntariadoCercano = () => {
  const [voluntariados, setVoluntariados] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [sectoresSeleccionados, setSectoresSeleccionados] = useState([]);
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const voluntariadosResponse = await fetch('/api/voluntariado');
        if (voluntariadosResponse.ok) {
          const voluntariadosData = await voluntariadosResponse.json();
          setVoluntariados(voluntariadosData);
        } else {
          console.error('Error al obtener datos de voluntariados:', await voluntariadosResponse.text());
        }

        const organizacionesResponse = await fetch('/api/organizacion');
        if (organizacionesResponse.ok) {
          const organizacionesData = await organizacionesResponse.json();
          setOrganizaciones(organizacionesData);
        } else {
          console.error('Error al obtener datos de organizaciones:', await organizacionesResponse.text());
        }

        const sectoresResponse = await fetch('/api/sectorVoluntariado');
        if (sectoresResponse.ok) {
          const sectoresData = await sectoresResponse.json();
          setSectores(sectoresData);
        } else {
          console.error('Error al obtener datos de sectores:', await sectoresResponse.text());
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log('Ubicación detectada del usuario:', position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        }
      );
    } else {
      console.error('La geolocalización no está soportada por este navegador.');
    }
  }, []);

  const obtenerDatosOrganizacion = (voluntariado) => {
    const organizacion = organizaciones.find(org => org.id === voluntariado.idOrganizacion);
    return {
      ...voluntariado,
      nombreOrganizacion: organizacion ? organizacion.nombre_organizacion : '',
      imagenOrganizacion: organizacion ? organizacion.imagen_organizacion : '',
    };
  };

  const filtrarVoluntariados = async () => {
    if (!userLocation) return;

    const resultadosPromesas = voluntariados.map(async (voluntariado) => {
      let distance = 0;
      try {
        const coordinates = await geocodeAddress(voluntariado.direccion);
        console.log('Ubicación geocodificada de', voluntariado.nombre, ':', coordinates);

        if (coordinates) {
          distance = await calculateDistance(userLocation, coordinates);
          console.log('Distancia entre usuario y', voluntariado.nombre, ':', distance);
        }
      } catch (error) {
        console.error('Error al geocodificar dirección:', voluntariado.direccion, error);
      }
      return {
        ...obtenerDatosOrganizacion(voluntariado),
        ...voluntariado,
        distance,
      };
    });

    try {
      const resultados = await Promise.all(resultadosPromesas);

      resultados.sort((a, b) => a.distance - b.distance);

      let resultadosFiltradosTemp = resultados.filter(voluntariado =>
        voluntariado.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
      );

      if (resultadosFiltradosTemp.length === 0 && filtroNombre.trim() !== '') {
        resultadosFiltradosTemp = resultados;
      }

      const resultadosFiltradosPorSector = resultadosFiltradosTemp.filter(voluntariado =>
        sectoresSeleccionados.length === 0 || sectoresSeleccionados.includes(voluntariado.idSector)
      );

      setResultadosFiltrados(resultadosFiltradosPorSector);
    } catch (error) {
      console.error('Error al filtrar voluntariados:', error);
    }
  };

  useEffect(() => {
    filtrarVoluntariados();
  }, [filtroNombre, voluntariados, organizaciones, userLocation, sectoresSeleccionados]);

  const handleInputChange = (e) => {
    setFiltroNombre(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const sectorId = parseInt(e.target.value);
    setSectoresSeleccionados(prevState =>
      e.target.checked ? [...prevState, sectorId] : prevState.filter(id => id !== sectorId)
    );
  };

  return (
    <Layout>
      <section className="panelproyecto"></section>
      <div className="container2">
        <div className="left-column">
          <h3>¡SECTOR!</h3>
          <div className="checkbox-container">
            <div className="column">
              {sectores.slice(0, Math.ceil(sectores.length / 2)).map(sector => (
                <div key={sector.id}>
                  <input
                    type="checkbox"
                    id={`sector-${sector.id}`}
                    value={sector.id}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`sector-${sector.id}`}>{sector.nombre}</label>
                </div>
              ))}
            </div>
            <div className="column">
              {sectores.slice(Math.ceil(sectores.length / 2)).map(sector => (
                <div key={sector.id}>
                  <input
                    type="checkbox"
                    id={`sector-${sector.id}`}
                    value={sector.id}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`sector-${sector.id}`}>{sector.nombre}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-column">
          <div className="search-container">
            <label htmlFor="search-input">
              <img src="/voluntariadoCercano/busqueda.png" alt="Buscar" className="search-icon" />
            </label>
            <input
              id="search-input"
              type="text"
              placeholder="Buscar por nombre"
              value={filtroNombre}
              onChange={handleInputChange}
              className="search-input"
            />
          </div>
          <div className="scrollable-container">
            <ul>
              {resultadosFiltrados.map((voluntariado, index) => (
                <li key={index} className="voluntariado-item">
                  <Link href={`/organizacion/${voluntariado.idOrganizacion}`} passHref>
                    <img className='imagen_organizacion' src={voluntariado.imagenOrganizacion} alt={`Imagen de ${voluntariado.nombreOrganizacion}`} />
                  </Link>
                  <div className="voluntariado-info">
                    <Link href={`/voluntariado/${voluntariado.id}`} passHref>
                      <h3 className='nombre-cadavolun'>
                        <p>{voluntariado.nombre}</p>
                      </h3>
                    </Link>
                    <p>{voluntariado.descripcion}</p>
                    {typeof voluntariado.distance === 'number' && // Verifica si distance es un número
                      <p>Distancia: {voluntariado.distance.toFixed(2)} km</p>
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VoluntariadoCercano;
