import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from './componentes/Layout3.js';
import departamentosData from './json/UbicacionRegistrar.json';

const EditaInform = () => {
  const router = useRouter();
  const [inscripFecha, setInscripFecha] = useState('');
  const [empezarFecha, setEmpezarFecha] = useState('');
  const [finFecha, setFinFecha] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [provincia, setProvincia] = useState('');
  const [distrito, setDistrito] = useState('');
  const [address, setAddress] = useState('');
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);

  useEffect(() => {
    if (departamento) {
      const provinciasFiltradas = departamentosData
        .filter(item => item.Departamento === departamento && item.Provincia)
        .map(item => item.Provincia)
        .filter((value, index, self) => self.indexOf(value) === index);
      setProvincias(provinciasFiltradas);
      setProvincia('');
      setDistrito('');
      setDistritos([]);
    }
  }, [departamento]);

  useEffect(() => {
    if (provincia) {
      const distritosFiltrados = departamentosData
        .filter(item => item.Departamento === departamento && item.Provincia === provincia && item.Distrito)
        .map(item => item.Distrito);
      setDistritos(distritosFiltrados);
      setDistrito('');
    }
  }, [provincia]);

  const handleDepartamentoChange = (event) => {
    setDepartamento(event.target.value);
  };

  const handleProvinciaChange = (event) => {
    setProvincia(event.target.value);
  };

  const handleDistritoChange = (event) => {
    setDistrito(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inscripFecha || !empezarFecha || !finFecha || !departamento || !provincia || !distrito || !address) {
      alert('Por Favor Rellena todos los campos');
      return;
    }

    try {
      const response = await fetch('/api/edit-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inscripFecha,
          empezarFecha,
          finFecha,
          departamento,
          provincia,
          distrito,
          address,
        }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Error al actualizar la información:', response.status);
      }
    } catch (error) {
      console.error('Error al actualizar la información:', error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>¡Edita tu información!</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="inscripFecha">Fecha Límite de Inscripciones:</label>
            <input 
              type="date" 
              id="inscripFecha" 
              name="inscripFecha" 
              value={inscripFecha} 
              onChange={(e) => setInscripFecha(e.target.value)} 
              min="2018-01-01" 
              max="2099-12-31" 
            />
          </div>
          <div>
            <label htmlFor="empezarFecha">Duración del Proyecto:</label>
            <input
              type="date"
              id="empezarFecha"
              value={empezarFecha}
              onChange={(e) => setEmpezarFecha(e.target.value)}
            />
            <span> hasta </span>
            <input
              type="date"
              id="finFecha"
              value={finFecha}
              onChange={(e) => setFinFecha(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="departamento">Departamento:</label>
            <select id="departamento" value={departamento} onChange={handleDepartamentoChange}>
              <option value="">Selecciona departamento</option>
              {Array.from(new Set(departamentosData.map(item => item.Departamento))).map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="provincia">Provincia:</label>
            <select id="provincia" value={provincia} onChange={handleProvinciaChange} disabled={!departamento}>
              <option value="">Selecciona provincia</option>
              {provincias.map(prov => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="distrito">Distrito:</label>
            <select id="distrito" value={distrito} onChange={handleDistritoChange} disabled={!provincia}>
              <option value="">Selecciona distrito</option>
              {distritos.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="address">Dirección:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </Layout>
  );
}

export default EditaInform;
