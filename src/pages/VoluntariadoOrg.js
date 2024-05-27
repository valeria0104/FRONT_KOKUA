import Link from "next/link";
import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState, useEffect } from 'react';
import { useAuth } from './contexto/AuthContext';

function App() {
  const { user } = useAuth();
  const [voluntariados, setVoluntariados] = useState([]);

  useEffect(() => {
    const fetchVoluntariados = async () => {
      try {
        const response = await fetch('/api/VoluntariadoOrga');
        const data = await response.json();
        const voluntariadosFiltrados = data.filter(v => v.idOrganizacion === user.id);
        setVoluntariados(voluntariadosFiltrados);
      } catch (error) {
        console.error('Error al obtener voluntariados:', error);
      }
    };

    if (user) {
      fetchVoluntariados();
    }
  }, [user]);

  return (
    <>
      <Layout>
        <div className="todo_volorg">
          <section className="panelproyecto"></section>
          <h1>MIS VOLUNTARIADOS</h1>
          <div className="voluntariados-grid">
            {voluntariados.map((voluntariado) => (
              <div key={voluntariado.id} className="voluntariado-card">
                <img
                  className='imagen_Voluntariadoorg'
                  src={voluntariado.imagen}
                  alt={`Imagen de ${voluntariado.nombre}`}
                />
                <div className="voluntariado-info">
                  <p>{voluntariado.nombre}</p>
                  <p><strong>Día:</strong> {voluntariado.fechaInicio}</p>
                  <p><strong>Departamento:</strong> {voluntariado.departamento}</p>
                  <p><strong>Distrito:</strong> {voluntariado.distrito}</p>
                  <Link href="/editarperfil">
                    <p className="editar-link">Editar</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
