import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from './componentes/Layout3.js';

const EditaInform = () => {
  const router = useRouter();
  const [inscripFecha, setInscripFecha] = useState('');
  const [EmpezarFecha, setEmpezarFecha] = useState('');
  const [finFecha, setFinFecha] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [provincia, setProvincia] = useState('');
  const [distrito, setDistrito] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate data here, for example:
    if (!inscripFecha || !EmpezarFecha || !finFecha || !departamento || !provincia || !distrito || !address) {
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
          EmpezarFecha,
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
    <>
      <Layout>
    <div>
      <h1>¡Edita tu información!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inscripFecha">Fecha Limite de inscripciones:</label>
          <input
            type="fecha"
            id="inscripFecha"
            value={inscripFecha}
            onChange={(e) => setInscripFecha(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="EmpFecha">Duración del proyecto:</label>
          <input
            type="fecha"
            id="empFecha"
            value={EmpezarFecha}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span> hasta </span>
          <input
            type="fecha"
            id="finFecha"
            value={finFecha}
            onChange={(e) => setFinFecha(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="departamento">Departamento:</label>
          <select id="departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
            {/* Populate with department options */}
          </select>
        </div>
        <div>
          <label htmlFor="provincia">Provincia:</label>
          <select id="provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)}>
            {/* Populate with province options */}
          </select>
        </div>
        <div>
          <label htmlFor="distrito">Distrito:</label>
          <select id="distrito" value={distrito} onChange={(e) => setDistrito(e.target.value)}>
            {/* Populate with district options */}
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
    </>
  );
}

export default EditaInform;