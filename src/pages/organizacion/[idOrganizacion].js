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
  const voluntariadosPerPage = 6;

  useEffect(() => {
    const fetchOrganizacion = async () => {
      if (!idOrganizacion) return;
      
      try {
        const response = await fetch(`/api/organizacion/${idOrganizacion}`);
        if (response.ok) {
          const data = await response.json();
          setOrganizacion(data.organizacion);
          setVoluntariados(data.voluntariado);
        } else {
          console.error('Error al obtener datos de la organización:', await response.text());
        }
      } catch (error) {
        console.error('Error al obtener datos de la organización:', error);
      }
    };

    fetchOrganizacion();
  }, [idOrganizacion]);

  // Función para obtener el nombre del distrito a partir del ID de ubigeo
  const getDistritoByIdUbigeo = (idUbigeo) => {
    const ubicacionData = require('../json/UbicacionRegistrar.json'); // Ruta al JSON de ubicación
    const ubicacion = ubicacionData.find((ubic) => ubic.IdUbigeo === idUbigeo);
    return ubicacion ? ubicacion.Distrito : 'Desconocido';
  };

  // Calcular los índices de los voluntariados para la paginación
  const indexOfLastVoluntariado = currentPage * voluntariadosPerPage;
  const indexOfFirstVoluntariado = indexOfLastVoluntariado - voluntariadosPerPage;
  const currentVoluntariados = voluntariados.slice(indexOfFirstVoluntariado, indexOfLastVoluntariado);

  const totalPages = Math.ceil(voluntariados.length / voluntariadosPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  };

  // Filtrar voluntariados por nombre
  const voluntariadosFiltrados = currentVoluntariados.filter(voluntariado =>
    voluntariado.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
  );

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
                className="search-input1"
              />
            </div>
            <ul className='VoluntariadosGrid'>
              {voluntariadosFiltrados.length > 0 ? (
                voluntariadosFiltrados.map((voluntariado) => (
                  <li key={voluntariado.id} className='VoluntariadoItem'>
                    <img
                      className='imagen_Voluntariadoorg'
                      src={voluntariado.imagen}
                      alt={`Imagen de ${voluntariado.nombre}`}
                    />
                    <p>Nombre del voluntariado: {voluntariado.nombre}</p>
                    <p>Fecha de inicio: {voluntariado.fechaInicio}</p>
                    <p>Distrito: {getDistritoByIdUbigeo(voluntariado.idUbigeo)}</p>
                    <Link href={`/voluntariado/${voluntariado.id}`} passHref>
                      <button className='btnUnirse'>Unirse</button>
                    </Link>
                    {/* Aquí puedes mostrar más detalles del voluntariado si lo necesitas */}
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
