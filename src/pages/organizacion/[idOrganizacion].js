import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../componentes/Layout2.js';
import { useAuth} from '../contexto/AuthContext'; 
import { formatDate } from '../componentes/funciones.js';
const Organizacion = () => {
  const router = useRouter();
  const { idOrganizacion } = router.query;
  const [organizacion, setOrganizacion] = useState(null);
  const [voluntariados, setVoluntariados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const { user } = useAuth(); // Asumiendo que tienes un AuthContext para manejar la autenticación

  const voluntariadosPerPage = 6;

  useEffect(() => {
    const fetchOrganizacion = async () => {
      if (!idOrganizacion) return;

      try {
    
        const response = await fetch(`/api/organizacion/${idOrganizacion}`);
        if (response.ok) {
          const data = await response.json();
          setOrganizacion(data.organizacion);
           console.log(data);
          // Ordenar voluntariados por fecha de inicio más cercana a la actual y luego por nombre
          const sortedVoluntariados = data.voluntariado.sort((a, b) => {
            const dateA = new Date(formatDate(a.fecha_inicio));
            const dateB = new Date(formatDate(b.fecha_inicio));

            if (Math.abs(dateA - new Date()) < Math.abs(dateB - new Date())) {
              return 1;
            }
            if (Math.abs(dateA - new Date()) > Math.abs(dateB - new Date())) {
              return -1;
            }
            return a.nombre.localeCompare(b.nombre);
          });

          setVoluntariados(sortedVoluntariados);
        } else {
          console.error('Error al obtener datos de la organización:', await response.text());
        }
      } catch (error) {
        console.error('Error al obtener datos de la organización:', error);
      }
    };

    fetchOrganizacion();
  }, [idOrganizacion]);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/favoritos?idUsuario=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          const userFavorites = data.filter(fav => fav.idUsuario === user.id).map(fav => fav.idVoluntariado);
          setFavoritos(userFavorites);

          // Ordenar los voluntariados colocando los favoritos primero
          const sortedVoluntariados = voluntariados.sort((a, b) => {
            const isAFavorito = userFavorites.includes(a.id);
            const isBFavorito = userFavorites.includes(b.id);

            if (isAFavorito && !isBFavorito) {
              return -1;
            }
            if (!isAFavorito && isBFavorito) {
              return 1;
            }
            // Ordenar por fecha de inicio más cercana a la actual y luego por nombre
            const dateA = new Date(formatDate(a.fecha_inicio));
            const dateB = new Date(formatDate(b.fecha_inicio));

            if (Math.abs(dateA - new Date()) < Math.abs(dateB - new Date())) {
              return 1;
            }
            if (Math.abs(dateA - new Date()) > Math.abs(dateB - new Date())) {
              return -1;
            }
            return a.nombre.localeCompare(b.nombre);
          });

          setVoluntariados(sortedVoluntariados);
        } else {
          console.error('Error al obtener favoritos:', await response.text());
        }
      } catch (error) {
        console.error('Error al obtener favoritos:', error);
      }
    };

    if (user && voluntariados.length > 0) {
      fetchFavoritos();
    }
  }, [user, voluntariados]);

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
  const handletoggleFavorito = async (idVoluntariado) =>{
    const method = favoritos.includes(idVoluntariado) ? 'DELETE' : 'POST';
    const updatedFavoritos = favoritos.includes(idVoluntariado)
      ? favoritos.filter((fav) => fav !== idVoluntariado)
      : [...favoritos, idVoluntariado];
  
    try {
      // Crear el contenido del cuerpo de la solicitud
      const bodyContent = {
        idUsuario: user.idUsuario,
        idVoluntariado
      };
  
      // Solo agregar tipo_relacion cuando el método es POST
      if (method === 'POST') {
        bodyContent.doc_identidad = null;
        bodyContent.telefono = null;
        bodyContent.tipo_relacion = 2;

      }
  
      // Enviar la solicitud al servidor
      const response = await fetch('/api/favoritos', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyContent),
      });
      console.log(bodyContent);
      if (response.ok) {
        setFavoritos(updatedFavoritos);
  
        // Reordenar los voluntariados después de marcar/desmarcar como favorito
        const sortedVoluntariados = voluntariados.sort((a, b) => {
          const isAFavorito = updatedFavoritos.includes(a.id);
          const isBFavorito = updatedFavoritos.includes(b.id);
  
          if (isAFavorito && !isBFavorito) {
            return -1;
          }
          if (!isAFavorito && isBFavorito) {
            return 1;
          }
  
          // Ordenar por fecha de inicio más cercana a la actual y luego por nombre
          const dateA = new Date(a.fecha_inicio);
          const dateB = new Date(b.fecha_inicio);
  
          if (Math.abs(dateA - new Date()) < Math.abs(dateB - new Date())) {
            return -1;
          }
          if (Math.abs(dateA - new Date()) > Math.abs(dateB - new Date())) {
            return 1;
          }
          return a.nombre.localeCompare(b.nombre);
        });
  
        setVoluntariados([...sortedVoluntariados]);
      } else {
        console.error('Error al actualizar favorito:', await response.text());
      }
    } catch (error) {
      console.error('Error al actualizar favorito:', error);
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
              <h1>{organizacion.nombre_org.toUpperCase()}</h1>
            </section>
            <section className='DescripcionOrganizacion'>
              <section className='ImagenOrga'>
                <img className='imagenvoluntariados' src={organizacion.imagen_url} alt={`Imagen de ${organizacion.nombre_org}`} />
              </section>
              <p>{organizacion.descripcion}</p>
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
                  <li key={voluntariado.idVoluntariado} className='VoluntariadoItem'>
                    <img
                      className='imagen_Voluntariadoorg'
                      src={voluntariado.imagen_url}
                      alt={`Imagen de ${voluntariado.nombre}`}
                    />
                    <p>Nombre del voluntariado: {voluntariado.nombre}</p>
                    <p>Fecha de inicio: {formatDate(voluntariado.fecha_inicio)}</p>
                    <p>Distrito: {getDistritoByIdUbigeo(voluntariado.idUbigeo)}</p>
                    <span
                      className={`corazon ${favoritos.includes(voluntariado.idVoluntariado) ? 'favorito' : ''}`}
                      onClick={() => handletoggleFavorito (voluntariado.idVoluntariado)}
                    ></span>
                    <Link href={`/voluntariado/${voluntariado.idVoluntariado}`} passHref>
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