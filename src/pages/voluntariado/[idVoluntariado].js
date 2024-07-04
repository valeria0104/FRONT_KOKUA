import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../componentes/Layout2.js';
import sectorData from '../json/SectorVoluntariado.json'; // Importar datos del archivo sector.json
import Link from 'next/link';
import { formatDate } from '../componentes/funciones.js';
const VoluntariadoDetalle = () => {
    const router = useRouter();
    const { idVoluntariado } = router.query;
    const [voluntariado, setVoluntariado] = useState(null);
    const [sector, setSector] = useState(null);
    console.log(router.query);
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
        fetch(`/api/sectorIdVoluntariado/${idVoluntariado}`)
            .then(response => response.json())
            .then(data => {
                console.log('Sectores fetched from API:', data);
                setSector(data);
                console.log(sector);

            })
            .catch(error => console.error('Error fetching categorias:', error));

        if (voluntariado && Array.isArray(sector)) {
            const sectorEncontrado = sector.find(sector => sector.idSector === voluntariado.idSector);
            setSector(sectorEncontrado);
            console.log(sectorEncontrado);
        }
    }, [voluntariado]);

    if (!voluntariado || !sector) {
        return <Layout><p>Cargando...</p></Layout>;
    }

    return (
        <Layout>
            <div className='todo-cadavolun'>
                {voluntariado.organizacion && (
                    <div className='EncabezadoOrganizacion'>
                        <section className='Rectangulo'>
                            <h1>{voluntariado.organizacion.nombre_org.toUpperCase()}</h1>
                        </section>
                        <div className="ImagenDescripcionContainer">
                            <img className='imagenvoluntariados' src={voluntariado.organizacion.imagen_url} alt={`Imagen de ${voluntariado.organizacion.nombre_organizacion}`} />
                            <p>{voluntariado.organizacion.descripcion}</p>
                        </div>
                    </div>
                )}
                <section className='LineaSepararion' ></section>
                <h1>{voluntariado.nombre}</h1>

                <div className='cuerpo_cadavolun'>
                    <div className='primera-cadavolun'>
                        <img className='cadavoluntariado' src={voluntariado.imagen_url} alt={`Imagen de ${voluntariado.nombre}`} />
                        <p><strong>Fecha Final:</strong> {formatDate(voluntariado.fecha_final)}</p>
                        <p><strong>Fecha de Inicio:</strong> {formatDate(voluntariado.fecha_inicio)}</p>
                        <p className='direccion-volun'><strong>Dirección:</strong> {voluntariado.direccion}</p>
                        <p><strong>Horario de atención: </strong>{voluntariado.organizacion.hora_atencion}</p>
                        <p><strong>Sector:</strong> {sector.sectorName}</p>
                    </div>
                    <div className='segunda-cadavolun'>
                        <h2>¿En qué consiste el proyecto?</h2>
                        <p>{voluntariado.descripcion}</p>
                        <p><strong>Requisitos:</strong></p>
                        <ul className='requisitos-list'>
                            {voluntariado.requisitos.split('.').filter(requisito => requisito.trim() !== '' && !/^\d+$/.test(requisito.trim())).map((requisito, index) => (
                                <li key={index}>{index + 1}. {requisito.trim()}</li>
                            ))}
                        </ul>
                        <p className='mootivadora'><strong>""</strong> {voluntariado.frase_motivadora} <strong>""</strong></p>
                        <p><strong>Fecha Límite de postulación:</strong> {formatDate(voluntariado.fecha_limite)}</p>
                        <Link href={`/RegistroPostulante?idVoluntariado=${idVoluntariado}&idOrganizacion=${voluntariado.idOrganizacion}`}>
                            <p>Postular</p>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default VoluntariadoDetalle;