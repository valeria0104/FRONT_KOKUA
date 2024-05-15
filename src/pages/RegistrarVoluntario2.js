import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
function App() {
    const router = useRouter();
    const [selectedDepartamento, setSelectedDepartamento] = useState('');
    const [selectedProvincia, setSelectedProvincia] = useState('');
    const [selectedDistrito, setSelectedDistrito] = useState('');
    const [provincias, setProvincias] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [ubicacionData, setUbicacionData] = useState([]);


    /////////////////
    const [categorias, setCategorias] = useState([]);
    const [selectedCategorias, setSelectedCategorias] = useState([]);
    const nuevoUsuario = router.query.nuevoUsuario || '';
    const query = router.asPath ? router.asPath.split('?')[1] || '' : '';

    // Parsear la cadena de consulta en un objeto de JavaScript
    const queryParams = {};
    query.split('&').forEach(part => {
        const item = part.split('=');
        queryParams[item[0]] = decodeURIComponent(item[1]);
    });

    // Convertir los datos del formulario a JSON
    const jsonData = JSON.stringify(queryParams);

    // Ahora jsonData contiene los datos del formulario en formato JSON
    console.log("Datos del formulario:", jsonData);
    useEffect(() => {
        // Fetch data from the API
        fetch('/api/ubicacion')
            .then(response => response.json())
            .then(data => {
                console.log('Data fetched from API:', data);
                setUbicacionData(data);
            })
            .catch(error => console.error('Error fetching data:', error));

        // Fetch sector from the API
        fetch('/api/sectorVoluntariado')
            .then(response => response.json())
            .then(data => {
                console.log('Categorias fetched from API:', data);
                setCategorias(data);
            })
            .catch(error => console.error('Error fetching categorias:', error));
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

    const handleDistritoChange = (event) => {
        const distrito = event.target.value;
        setSelectedDistrito(distrito);
    };

    /////////////////////7

    const handleCategoriaChange = (event) => {
        const categoria = event.target.value;
        // Verifica si la categoría está actualmente seleccionada
        const isSelected = selectedCategorias.includes(categoria);

        if (!isSelected && selectedCategorias.length >= 3) {
            // Si se está intentando seleccionar una nueva categoría cuando ya hay tres seleccionadas, ignora la acción
            return;
        }

        // Actualiza el estado de las categorías seleccionadas
        if (event.target.checked) {
            setSelectedCategorias([...selectedCategorias, categoria]);
        } else {
            setSelectedCategorias(selectedCategorias.filter(cat => cat !== categoria));
        }
    };
    const enviarDatos = async (event) => {
        event.preventDefault();
        // Agregar los datos del formulario al JSON
        const formData = {
            nombre: queryParams.nombre,
            apellidosPaterno: queryParams.apellidosPaterno,
            apellidoMaterno: queryParams.apellidoMaterno,
            correo: queryParams.correo,
            contrasena: queryParams.contrasena,
            repetir: queryParams.repetir,
            departamento: selectedDepartamento,
            provincia: selectedProvincia,
            distrito: selectedDistrito, // Aquí deberías poner el valor seleccionado para distrito
            categorias: selectedCategorias
        };

        // Convertir el objeto a JSON
        const formDataJson = JSON.stringify(formData);
        try {
            // Simulación de envío de datos a un archivo JSON
            const response = await fetch('/api/registrarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Aquí se envía el objeto directamente
            });

            if (response.ok) {
                console.log('Usuario registrado con éxito');
                // Redirigir a una página de éxito
            } else {
                console.error('Error al registrar usuario');
                alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
        }
        // Aquí puedes enviar formDataJson a donde desees
        console.log("Datos del formulario con datos adicionales:", formData);
    };


    return (

        <Layout>

            <section className="ContinuacionRegistro">
                <h1>¡Queremos saber más de ti!</h1>
                <form htmlFor="Registro2">
                    <div>
                        <label>Departamento:</label> <br />
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
                        <label>Provincia:</label> <br />
                        <select value={selectedProvincia} onChange={handleProvinciaChange} disabled={!selectedDepartamento}>
                            <option value="">Seleccione una Provincia</option>
                            {provincias.map(provincia => (
                                <option key={provincia} value={provincia}>{provincia}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Distrito:</label> <br />
                        <select disabled={!selectedProvincia} onChange={handleDistritoChange}>
                            <option value="">Seleccione un Distrito</option>
                            {distritos.map(distrito => (
                                <option key={distrito} value={distrito}>{distrito}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Temas de interés: (Máximo 3) </label> <br />
                        {categorias.map(categoria => (
                            <div key={categoria.id}>
                                <input
                                    type="checkbox"
                                    id={categoria.id}
                                    value={categoria.categoria}
                                    checked={selectedCategorias.includes(categoria.categoria)}
                                    onChange={handleCategoriaChange}
                                />
                                <label htmlFor={categoria.id}>{categoria.categoria}</label>
                            </div>
                        ))}
                    </div>
                    <button type="submit" onClick={enviarDatos} >Registrar</button>


                </form>



            </section>
            <section className="ImagenesContinuacion">




            </section>



        </Layout>





    );


}
export default App;