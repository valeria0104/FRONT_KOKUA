import React, { useState, useEffect } from 'react';
import Layout from './componentes/Layout2.js';
import Link from 'next/link';

const BusquedaVoluntarios = () => {
  const [voluntariados, setVoluntariados] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

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
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log('User location:', position.coords);
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
        console.log('Geocoded location:', address, location);
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
      console.log(`Calculated distance: ${distance} km between`, location1, location2);
      return distance;
    };

    const filtrarVoluntariados = async () => {
      if (!userLocation) return;

      const resultados = await Promise.all(voluntariados.map(async (voluntariado) => {
        const organizacion = organizaciones.find(org => org.id === voluntariado.idOrganizacion);
        let distance = 0;
        try {
          const coordinates = await geocodeAddress(voluntariado.direccion);
          distance = calculateDistance(userLocation, coordinates);
        } catch (error) {
          console.error('Error al geocodificar dirección:', voluntariado.direccion, error);
        }
        return {
          ...voluntariado,
          nombreOrganizacion: organizacion ? organizacion.nombre_organizacion : '',
          imagenOrganizacion: organizacion ? organizacion.imagen_organizacion : '',
          distance,
        };
      }));

      resultados.sort((a, b) => a.distance - b.distance);

      setResultadosFiltrados(
        resultados.filter(voluntariado =>
          voluntariado.nombre.toLowerCase().includes(filtro.toLowerCase())
        )
      );
    };

    filtrarVoluntariados();
  }, [filtro, voluntariados, organizaciones, userLocation]);

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
                <Link href={`/organizacion/${voluntariado.idOrganizacion}`} passHref>
                  <img className='imagen_organizacion' src={voluntariado.imagenOrganizacion} alt={`Imagen de ${voluntariado.nombreOrganizacion}`} />
                </Link>
                <p>Distancia: {voluntariado.distance.toFixed(2)} km</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default BusquedaVoluntarios;
