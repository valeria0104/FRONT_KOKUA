import Link from "next/link";
import Head from "next/head";
import Layout from './componentes/Layout3.js';
import React, { useState, useEffect } from 'react';
import { useAuth } from './contexto/AuthContext';
import { formatDate } from './componentes/funciones.js';
function App() {
  const { user } = useAuth();
  const [voluntariados, setVoluntariados] = useState([]);

  useEffect(() => {
    const fetchVoluntariados = async () => {
      try {
        console.log('Fetching voluntariados...');
        const response = await fetch('/api/VoluntariadoOrga');
        const data = await response.json();
        console.log('Data:', data);
        const voluntariadosFiltrados = data.filter(v => v.idOrganizacion === user.idOrganizacion);
        console.log( user.idOrganizacion)
        console.log('Filtered voluntariados:', voluntariadosFiltrados);
        setVoluntariados(voluntariadosFiltrados);
      } catch (error) {
        console.error('Error al obtener voluntariados:', error);
      }
    };
  
    if (user) {
      console.log('User is authenticated:', user);
      fetchVoluntariados();
    } else {
      console.log('User is not authenticated');
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
                  src={voluntariado.imagen_url}
                  alt={`Imagen de ${voluntariado.nombre}`}
                />
                <div className="voluntariado-info">
                  <p>{voluntariado.nombre}</p>
                  <p><strong>Día:</strong> {formatDate(voluntariado.fecha_inicio)}</p>
                  <p><strong>Departamento:</strong> {voluntariado.departamento}</p>
                  <p><strong>Distrito:</strong> {voluntariado.distrito}</p>
                  <Link href="/editarInformacion">
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
