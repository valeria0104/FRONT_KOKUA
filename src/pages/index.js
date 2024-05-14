import Link from "next/link";
import Head from "next/head";
import Layout from './componentes/Layout.js';
import { cambiarImagen } from './componentes/funciones.js';
import { mostrarTestimonios } from './componentes/funciones.js';
import React, { useState, useEffect } from 'react';
import testimonios from './json/testimonios.json';
import { useRouter } from "next/router";
function App() {
  const [currentTestimonioIndex, setCurrentTestimonioIndex] = useState(0);

  const handleChangeTestimonio = (index) => {
    setCurrentTestimonioIndex(index);
  };
    return (
      <>
      <Layout>
        
          <section className="panel">
          <label>Voluntariados por el cambio </label>
                <br />
                <label>Encuentra tu oportunidad </label>
          </section>
          <section className="Enunciado">
          <div className="Parrafo">
        <h2> ¡Bienvenido a nuestra plataforma <br />
            &nbsp; &nbsp;de voluntariado KOKUA! </h2>
        <p>Descubre emocionantes oportunidades para <br />marcar
            la diferencia. Únete a nuestra red <br />comprometida
            en crear un cambio positivo, <br />ya sea localmente o
            en línea.</p>
        <p> <strong>¡Únete hoy y haz del mundo un lugar mejor a<br />
            través del voluntariado! </strong></p>
            <Link href="/IniciarSesion">
        <button> Encuentra tu voluntariado</button></Link>
        </div>
        <div className="imagenes">
        <img src="/ImagenesPaginaPrincipal/Verde1.jpg" alt="Gente plantando"/>
        <button className="flecha flecha-izquierda" onClick={() => cambiarImagen(-1)}>&#10094;</button>
        <button className="flecha flecha-derecha" onClick={() => cambiarImagen(1)}>&#10095;</button>

        </div>
   
    </section>

    <section className="panel2">
    <nav>
        <div className="seccion1">
            <Link className="secciones1" href="#">¿Quiénes somos y que hacemos?</Link>
        </div>
        <div className="seccion2">
            <Link className="secciones1" href="#">Voluntarios</Link>
        </div>
      
    </nav>
</section>

<section className="beneficios">
    <h1> ¿Qué beneficios brinda la plataforma de KOKUA?</h1>
    <div>
        <img className="simbolos1" src="/ImagenesPaginaPrincipal/informacion.png" alt="imformacion sobre Voluntariados"/>
        <p>Toda la información <br />sobre voluntariados<br />en un solo lugar</p>
    </div>
    <div>
        <img className="simbolos1" src="/ImagenesPaginaPrincipal/wifi.png" alt="disponibilidad"/>
        <p>Información <br /> disponible desde<br />cualquier lugar</p>
    </div>
    <div>
        <img className="simbolos1" src="/ImagenesPaginaPrincipal/proteccion.png" alt="seguridad de informacion"/>
        <p> Garantizamos<br />organizaciones verificadas <br />mediante un filtro preciso.</p>
    </div>
    <div className="SegundaLinea">
        <img src="/ImagenesPaginaPrincipal/voluntariados.png" alt="diversos voluntariados"/>
        <p>Diversos<br />voluntariados a elegir<br />  de acuerdo a tus <br />intereses.</p>
    </div>
    <div className="SegundaLinea">
        <img src="/ImagenesPaginaPrincipal/facil.png" alt="facil de usar" />
        <p>La plataforma es fácil<br /> de utilizar, rápida e <br />intuitiva en su diseño.</p>
    </div>
</section>
<section className="testimonios">
    <h1>Testimonios</h1>
    <div id="contenedor-testimonios" className="opinion">
          <div className="testimonio">
            <img src={testimonios[currentTestimonioIndex].foto} alt="Foto del testimonio" />
            <p>{testimonios[currentTestimonioIndex].opinion}</p>
          </div>
        </div>
        <div className="navegacion-testimonios">
          {testimonios.map((testimonio, index) => (
            <button
              key={index}
              className={index === currentTestimonioIndex ? 'circulo activo' : 'circulo'}
              onClick={() => handleChangeTestimonio(index)}
            />
          ))}
        </div>
    
</section>

      </Layout>
        
      
      </>
    );
  }
  

export default App;