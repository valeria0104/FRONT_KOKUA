import React, { useState, useEffect } from 'react';
import Layout from './componentes/Layout2.js';
import Link from 'next/link';

const BusquedaVoluntarios = () => {
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
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        }
      );
    } else {
      console.error('La geolocalización no está soportada por este navegador.');
    }
  }, []);

  useEffect(() => {
    const geocodeAddress = async (address) => {
      const apiKey = 'ba1f067cdddc4252a54362118fd617b8'; // Reemplaza con tu clave de API de OpenCage
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const location = {
          lat: data.results[0].geometry.lat,
          lng: data.results[0].geometry.lng,
        };
        return location;
      }
      throw new Error('Geocodificación falló');
    };

    const calculateDistance = (location1, location2) => {
      const lat1 = location1.lat;
      const lng1 = location1.lng;
      const lat2 = location2.lat;
      const lng2 = location2.lng;
      const R = 6371; // Radio de la Tierra en km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLng = (lng2 - lng1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distancia en km
      return distance;
    };

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

      const resultados = await Promise.all(voluntariados.map(async (voluntariado) => {
        let distance = 0;
        try {
          const coordinates = await geocodeAddress(voluntariado.direccion);
          distance = calculateDistance(userLocation, coordinates);
        } catch (error) {
          console.error('Error al geocodificar dirección:', voluntariado.direccion, error);
        }
        return {
          ...obtenerDatosOrganizacion(voluntariado),
          ...voluntariado,
          distance,
        };
      }));

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
    };

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
                  <label htmlFor={`sector-${sector.id}`}>{sector.categoria}</label>
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
                  <label htmlFor={`sector-${sector.id}`}>{sector.categoria}</label>
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
    <a>{voluntariado.nombre}</a>
  </h3>
</Link>
                    <p>{voluntariado.descripcion}</p>
                    {voluntariado.distance && <p>Distancia: {voluntariado.distance.toFixed(2)} km</p>}
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

export default BusquedaVoluntarios;