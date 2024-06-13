import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../componentes/Layout2.js';

const Organizacion = () => {
  const router = useRouter();
  const { idOrganizacion } = router.query;
  const [organizacion, setOrganizacion] = useState(null);
  const [voluntariados, setVoluntariados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [favoritos, setFavoritos] = useState([]);

  const voluntariadosPerPage = 6;

  useEffect(() => {
    const fetchOrganizacion = async () => {
      if (!idOrganizacion) return;

      try {
        const response = await fetch(`/api/organizacion/${idOrganizacion}`);
        if (response.ok) {
          const data = await response.json();
          setOrganizacion(data.organizacion);

          // Ordenar voluntariados por fecha de inicio más cercana a la actual y luego por nombre
          const sortedVoluntariados = data.voluntariado.sort((a, b) => {
            const dateA = new Date(formatDate(a.fechaInicio));
            const dateB = new Date(formatDate(b.fechaInicio));

            if (Math.abs(dateA - new Date()) < Math.abs(dateB - new Date())) {
              return 1;
            }
            if (Math.abs(dateA - new Date()) > Math.abs(dateB - new Date())) {
              return -1;
            }
            return a.nombre.localeCompare(b.nombre);
          });

          setVoluntariados(sortedVoluntariados);
          console.log(sortedVoluntariados);
        } else {
          console.error('Error al obtener datos de la organización:', await response.text());
        }
      } catch (error) {
        console.error('Error al obtener datos de la organización:', error);
      }
    };

    fetchOrganizacion();
  }, [idOrganizacion]);

  // Función para formatear la fecha al formato "yyyy/mm/dd" para compatibilidad con Date
  const formatDate = (fecha) => {
    const partes = fecha.split('/');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  // Función para obtener el nombre del distrito a partir del ID de ubigeo
  const getDistritoByIdUbigeo = (idUbigeo) => {
    const ubicacionData = require('../json/UbicacionRegistrar.json'); // Ruta al JSON de ubicación
    const ubicacion = ubicacionData.find((ubic) => ubic.IdUbigeo === idUbigeo);
    return ubicacion ? ubicacion.Distrito : 'Desconocido';
  };

  // Función para manejar la marcación de favoritos
  const toggleFavorito = (idVoluntariado) => {
    if (favoritos.includes(idVoluntariado)) {
      setFavoritos(favoritos.filter((fav) => fav !== idVoluntariado));
    } else {
      setFavoritos([...favoritos, idVoluntariado]);
    }
  };

  // Manejar cambios en el input de filtro por nombre
  const handleNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  };

  // Filtrar voluntariados por nombre
  const voluntariadosFiltrados = voluntariados.filter((voluntariado) =>
    voluntariado.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  // Calcular índices de los voluntariados para la paginación
  const indexOfLastVoluntariado = currentPage * voluntariadosPerPage;
  const indexOfFirstVoluntariado = indexOfLastVoluntariado - voluntariadosPerPage;
  const currentVoluntariados = voluntariadosFiltrados.slice(indexOfFirstVoluntariado, indexOfLastVoluntariado);
  const totalPages = Math.ceil(voluntariadosFiltrados.length / voluntariadosPerPage);

  // Manejar la paginación
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Layout>
      {organizacion ? (
        <>
          <div className='EncabezadoOrganizacion'>
            <section className='Rectangulo'>
              <h1>{organizacion.nombre_organizacion.toUpperCase()}</h1>
            </section>
            <section className='DescripcionOrganizacion'>
              <section className='ImagenOrga'>
                <img src={organizacion.imagen_organizacion} alt={`Imagen de ${organizacion.nombre_organizacion}`} />
              </section>
              <p>{organizacion.descripcion_organizacion}</p>
            </section>
            <section className='LineaSepararion'></section>
          </div>
          <div className='Seccion2Orga'>
            <h1>Voluntariados</h1>
            <div className='BuscarVoluntariado'>
              <input
                id='nombreVoluntariado'
                type='text'
                value={filtroNombre}
                onChange={handleNombreChange}
                placeholder='Ingrese el nombre del voluntariado...'
                className='search-input1'
              />
            </div>
            <ul className='VoluntariadosGrid'>
              {currentVoluntariados.length > 0 ? (
                currentVoluntariados.map((voluntariado) => (
                  <li key={voluntariado.id} className='VoluntariadoItem'>
                    <img
                      className='imagen_Voluntariadoorg'
                      src={voluntariado.imagen}
                      alt={`Imagen de ${voluntariado.nombre}`}
                    />
                    <p>Nombre del voluntariado: {voluntariado.nombre}</p>
                    <p>Fecha de inicio: {voluntariado.fechaInicio}</p>
                    <p>Distrito: {getDistritoByIdUbigeo(voluntariado.idUbigeo)}</p>
                    <span
                      className={`corazon ${favoritos.includes(voluntariado.id) ? 'favorito' : ''}`}
                      onClick={() => toggleFavorito(voluntariado.id)}
                    ></span>
                    <Link href={`/voluntariado/${voluntariado.id}`} passHref>
                      <button className='btnUnirse'>Unirse</button>
                    </Link>
                  </li>
                ))
              ) : (
                <p>No hay voluntariados disponibles para esta organización.</p>
              )}
            </ul>
            <div className='Paginacion'>
              <button onClick={handlePrevious} disabled={currentPage === 1}>
                Anterior
              </button>
              <button onClick={handleNext} disabled={currentPage === totalPages}>
                Siguiente
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </Layout>
  );
};

export default Organizacion;