import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../componentes/Layout2.js';

const Organizacion = () => {
  const router = useRouter();
  const { idOrganizacion } = router.query;
  const [organizacion, setOrganizacion] = useState(null);

  useEffect(() => {
    const fetchOrganizacion = async () => {
      if (!idOrganizacion) return;
      
      try {
        const response = await fetch(`/api/organizacion/${idOrganizacion}`);
        if (response.ok) {
          const data = await response.json();
          setOrganizacion(data);
        } else {
          console.error('Error al obtener datos de la organización:', await response.text());
        }
      } catch (error) {
        console.error('Error al obtener datos de la organización:', error);
      }
    };

    fetchOrganizacion();
  }, [idOrganizacion]);

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
              <p>{organizacion.descripcion_organizacion}</p>   </section>
              <section className='LineaSepararion' ></section>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
      <div className='Seccion2Orga'>
        <h1>Voluntariados</h1>
   
      </div>
    </Layout>
  );
};

export default Organizacion;
