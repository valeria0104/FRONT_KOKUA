import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../componentes/Layout2.js';

const Organizacion = () => {
  const router = useRouter();
  const { idOrganizacion } = router.query;
  const [organizacion, setOrganizacion] = useState(null);
  const [voluntariados, setVoluntariados] = useState([]);

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
            <ul>
              {voluntariados.length > 0 ? (
                voluntariados.map((voluntariado) => (
                  <li key={voluntariado.id}>
                    <img
                  className='imagen_Voluntariadoorg'
                  src={voluntariado.imagen}
                  alt={`Imagen de ${voluntariado.nombre}`}
                />
                    <p>Nombre del voluntariado: {voluntariado.nombre}</p>
                    <p>Fecha de inicio: {voluntariado.fechaInicio}</p>
                    <p>Distrito: {getDistritoByIdUbigeo(voluntariado.idUbigeo)}</p>
                    {/* Aquí puedes mostrar más detalles del voluntariado si lo necesitas */}
                  </li>
                ))
              ) : (
                <p>No hay voluntariados disponibles para esta organización.</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </Layout>
  );
};

export default Organizacion;
