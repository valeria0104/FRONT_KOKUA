import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState, useEffect} from 'react';

function App() {
    const [selectedDepartamento, setSelectedDepartamento] = useState('');
    const [selectedProvincia, setSelectedProvincia] = useState('');
    const [provincias, setProvincias] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [ubicacionData, setUbicacionData] = useState([]);
    useEffect(() => {
        // Fetch data from the API
        fetch('/api/ubicacion')
            .then(response => response.json())
            .then(data => {
                console.log('Data fetched from API:', data);
                setUbicacionData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDepartamentoChange = (event) => {
        const departamento = event.target.value;
        setSelectedDepartamento(departamento);
        setSelectedProvincia('');
        setDistritos([]);

        const provinciasFiltradas = ubicacionData
            .filter(item => item.Departamento === departamento && item.Provincia)
            .map(item => item.Provincia)
            .filter((value, index, self) => self.indexOf(value) === index);

        setProvincias(provinciasFiltradas);
    };

    const handleProvinciaChange = (event) => {
        const provincia = event.target.value;
        setSelectedProvincia(provincia);

        const distritosFiltrados = ubicacionData
            .filter(item => item.Departamento === selectedDepartamento && item.Provincia === provincia && item.Distrito)
            .map(item => item.Distrito);

        setDistritos(distritosFiltrados);
    };


    return(

        <Layout>
            <section className="ContinuacionRegistro"> 
            <h1>¡Queremos saber más de ti!</h1>
            <form htmlFor = "Registro2">
            <div>
                        <label>Departamento:</label>
                        <select value={selectedDepartamento} onChange={handleDepartamentoChange}>
                            <option value="">Seleccione un Departamento</option>
                            {ubicacionData.length > 0 ? (
                                [...new Set(ubicacionData.map(item => item.Departamento))].map(departamento => (
                                    <option key={departamento} value={departamento}>{departamento}</option>
                                ))
                            ) : (
                                <option value="" disabled>Cargando...</option>
                            )}
                        </select>
                    </div>

                    <div>
                        <label>Provincia:</label>
                        <select value={selectedProvincia} onChange={handleProvinciaChange} disabled={!selectedDepartamento}>
                            <option value="">Seleccione una Provincia</option>
                            {provincias.map(provincia => (
                                <option key={provincia} value={provincia}>{provincia}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Distrito:</label>
                        <select disabled={!selectedProvincia}>
                            <option value="">Seleccione un Distrito</option>
                            {distritos.map(distrito => (
                                <option key={distrito} value={distrito}>{distrito}</option>
                            ))}
                        </select>
                    </div>
           
            </form>
            
            
            
            </section>
            <section className="ImagenesContinuacion">




            </section>



        </Layout>





    );


}
export default App;