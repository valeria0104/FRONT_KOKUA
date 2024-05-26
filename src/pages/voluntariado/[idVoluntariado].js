import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../componentes/Layout2.js';
import sectorData from '../json/SectorVoluntariado.json'; // Importar datos del archivo sector.json
import Link from 'next/link';

const VoluntariadoDetalle = () => {
    const router = useRouter();
    const { idVoluntariado } = router.query;
    const [voluntariado, setVoluntariado] = useState(null);
    const [sector, setSector] = useState(null);

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

    useEffect(() => {
        // Buscar el sector del voluntariado en los datos del sector
        if (voluntariado && sectorData) {
            const sectorEncontrado = sectorData.find(sector => sector.id === voluntariado.idSector);
            setSector(sectorEncontrado);
        }
    }, [voluntariado]);

    return (
        <Layout>
            {voluntariado && sector ? (
                <div className='todo-cadavolun'>
                    {voluntariado.organizacion && (
                        <div className='EncabezadoOrganizacion'>
                            <section className='Rectangulo'>
                                <h1>{voluntariado.organizacion.nombre_organizacion.toUpperCase()}</h1>
                            </section>
                            <div className="ImagenDescripcionContainer">
                                <img className='imagenvoluntariados' src={voluntariado.organizacion.imagen_organizacion} alt={`Imagen de ${voluntariado.organizacion.nombre_organizacion}`} />
                                <p>{voluntariado.organizacion.descripcion_organizacion}</p>
                            </div>
                        </div>
                    )}
                    <section className='LineaSepararion' ></section>
                    <h1>{voluntariado.nombre}</h1>

                    <div className='cuerpo_cadavolun'>
                        <div className='primera-cadavolun'>
                            <img className='cadavoluntariado' src={voluntariado.imagen} alt={`Imagen de ${voluntariado.nombre}`} />
                            <p><strong>Fecha Final:</strong> {voluntariado.fechaFinal}</p>
                            <p><strong>Fecha de Inicio:</strong> {voluntariado.fechaInicio}</p>
                            <p className='direccion-volun'><strong>Dirección:</strong> {voluntariado.direccion}</p>
                            <p><strong>Horario de atención: </strong>{voluntariado.organizacion.horario_organizacion}</p>
                            <p><strong>Sector:</strong> {sector.categoria}</p> </div>
                        <div className='segunda-cadavolun'>
                            <h2>¿En qué consiste el proyecto?</h2>
                            <p>{voluntariado.descripcion}</p>
                            <p><strong>Requisitos:</strong></p>
                            <ul className='requisitos-list'>
                                {voluntariado.requisitos.split('. ').map((requisito, index) => (
                                    requisito.trim() && <li key={index}>{requisito.trim()}</li>
                                ))}
                            </ul>
                            <p className='mootivadora' ><strong>""</strong> {voluntariado.fraseMotivadora} <strong>""</strong></p>
                            <p><strong>Fecha Límite de postulación:</strong> {voluntariado.fechaLimite}</p>
                        </div>
                    </div>
                </div>
                
            ) : (
                <p>Cargando...</p>
            )}
            
        </Layout>
    );
};

export default VoluntariadoDetalle;
