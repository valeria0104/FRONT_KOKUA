import Link from "next/link";
import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState } from 'react';

function App() {

    return (
        <>
            <Layout>
                <section className="panelnosotros">  </section>
                <section className="Enunciado_nosotros">
                    <div className="Nosotros-primera">
                        <h2>NUESTRA HISTORIA</h2>
                        <p>Nacimos del deseo compartido de facilitar el voluntariado. Los fundadores, basados en sus
                            propias experiencias, se unieron para crear una plataforma única que centraliza oportunidades
                            de voluntariado. Inspirados por la dificultad de encontrar opciones que se ajustaran a horarios
                            y preferencias, establecimos un espacio donde cada individuo puede descubrir causas que resuenan con ellos.  </p>
                        <img src="/nosotros/kokuanosotros.png" alt="" className="kokua" />
                        <h2>¿QUE HAREMOS?</h2>
                        <p>En KOKUA, conectamos personas comprometidas con causas significativas a través del voluntariado
                            . Uniendo fuerzas desde proyectos locales hasta contribuciones en línea, reflejamos la creencia hawaiana
                            en la asistencia desinteresada. KOKUA, que significa "ayuda" en hawaiano, nos inspira a brindar apoyo por
                            el simple deseo de cuidar, sin esperar recompensas. Únete a esta misión de corazón y sé parte del cambio positivo</p>
                    </div>
                    <div className="FRANJA">
                        <div className="Nosotros-franja">
                            <h2>Cuando brindas tu "kokua" a alguien, lo haces porque te preocupas por él, no porque esperas una recompensa</h2>
                        </div></div>
                    <div className="ojomano_nosotros">
                        <div className="ojo_nosotros">
                            <img src="/nosotros/ojonosotros.png" alt="" className="ojito_nosotros" />
                            <div className="vision_nosotros"><h2>Visión</h2></div>
                            <div className="visiontexto-nosotros">
                                <p>
                                    Un mundo unido por el voluntariado, donde cada acción contribuye a un futuro más brillante y solidario.
                                </p></div>
                        </div>
                        <div className="mano_nosotros">
                            <img src="/nosotros/manosnosotros.png" alt="" className="manos_nosotros" />
                            <div className="mision_nosotros"><h2>Misión</h2></div>
                            <div className="misiontexto-nosotros">
                                <p>
                                    Conectar personas y causas a través del voluntariado, promoviendo el cambio positivo y el desarrollo sostenible.                            </p></div>
                        </div>
                    </div>
                    <div className="resto-nosotros">
                        <p>¡Únete hoy y haz del mundo un lugar mejor a través del voluntariado!</p>

                    </div>
                    <div className="parrafoboton-nosotros">
                    <Link href="/IniciarSesion">
                        <button> Encuentra tu voluntariado</button></Link></div>
                </section>
            </Layout>
        </>
    );
}



export default App;