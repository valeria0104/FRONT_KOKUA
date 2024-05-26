import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../componentes/Layout2.js';

const VoluntariadoDetalle = () => {
  const router = useRouter();
  const { idVoluntariado } = router.query;
  const [voluntariado, setVoluntariado] = useState(null);

  useEffect(() => {
    const fetchVoluntariado = async () => {
      if (!idVoluntariado) return;

      try {
        const response = await fetch(`/api/voluntariado/${idVoluntariado}`);
        if (response.ok) {
          const data = await response.json();
          setVoluntariado(data);
        } else {
          console.error('Error al obtener datos del voluntariado:', await response.text());
        }
      } catch (error) {
        console.error('Error al obtener datos del voluntariado:', error);
      }
    };

    fetchVoluntariado();
  }, [idVoluntariado]);

  return (
    <Layout>
      {voluntariado ? (
        <div>
          {voluntariado.organizacion && (
            <div EncabezadoOrganizacion>
                          <section className='Rectangulo'> 

              <h1> {voluntariado.organizacion.nombre_organizacion.toUpperCase()}</h1>
              </section>
              <img className='imagenvoluntariados' src={voluntariado.organizacion.imagen_organizacion} alt={`Imagen de ${voluntariado.organizacion.nombre_organizacion}`} />
              <p>{voluntariado.organizacion.descripcion_organizacion}</p>
            </div>
          )}

          <div>
            <h1>{voluntariado.nombre}</h1>
            <img className='cadavoluntariado' src={voluntariado.imagen} alt={`Imagen de ${voluntariado.nombre}`} />
            <p>{voluntariado.descripcion}</p>
            <p><strong>Requisitos:</strong> {voluntariado.requisitos}</p>
            <p><strong>Frase Motivadora:</strong> {voluntariado.fraseMotivadora}</p>
            <p><strong>Fecha Límite:</strong> {voluntariado.fechaLimite}</p>
            <p><strong>Fecha de Inicio:</strong> {voluntariado.fechaInicio}</p>
            <p><strong>Fecha Final:</strong> {voluntariado.fechaFinal}</p>
            <p><strong>Dirección:</strong> {voluntariado.direccion}</p>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </Layout>
  );
};

export default VoluntariadoDetalle;
