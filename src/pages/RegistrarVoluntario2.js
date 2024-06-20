import Head from "next/head";
import Layout from './componentes/Layout.js';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


function App() {
    const router = useRouter();
    const [selectedDepartamento, setSelectedDepartamento] = useState('');
    const [selectedProvincia, setSelectedProvincia] = useState('');
    const [selectedDistrito, setSelectedDistrito] = useState('');
    const [selectedUbigeo, setSelectedUbigeo] = useState('');
    const [provincias, setProvincias] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [ubicacionData, setUbicacionData] = useState([]);

    // Categorías
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
        setSelectedDistrito('');
        setSelectedUbigeo('');

        const provinciasFiltradas = ubicacionData
            .filter(item => item.Departamento === departamento && item.Provincia)
            .map(item => item.Provincia)
            .filter((value, index, self) => self.indexOf(value) === index);

        setProvincias(provinciasFiltradas);
    };

    const handleProvinciaChange = (event) => {
        const provincia = event.target.value;
        setSelectedProvincia(provincia);
        setSelectedDistrito('');
        setSelectedUbigeo('');

        const distritosFiltrados = ubicacionData
            .filter(item => item.Departamento === selectedDepartamento && item.Provincia === provincia && item.Distrito)
            .map(item => item.Distrito);

        setDistritos(distritosFiltrados);
        

    };

    const handleDistritoChange = (event) => {
        const distrito = event.target.value;
        setSelectedDistrito(distrito);

        // Obtener el IdUbigeo correspondiente
        const selectedUbigeoData = ubicacionData.find(item =>
            item.Departamento === selectedDepartamento &&
            item.Provincia === selectedProvincia &&
            item.Distrito === distrito
        );

        if (selectedUbigeoData) {
            setSelectedUbigeo(selectedUbigeoData.IdUbigeo);
        }
    };

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

    const findCategoryIdByName = (categorias, categoryName) => {
        const category = categorias.find(categoria => categoria.nombre=== categoryName);
        return category? category.id : null;
      };

    const enviarDatos = async (event) => { 
        event.preventDefault();

        // Validar selección de ubicación
        if (!selectedDepartamento || !selectedProvincia || !selectedDistrito) {
            alert('Por favor, selecciona un Departamento, Provincia y Distrito antes de continuar.');
            return;
        }

        // Agregar los datos del formulario al JSON
        const formData = {
            nombre: queryParams.nombre,
            apellidosPaterno: queryParams.apellidosPaterno,
            apellidoMaterno: queryParams.apellidoMaterno,
            correo: queryParams.correo,
            contrasena: queryParams.contrasena,
            ubicacion: selectedUbigeo, // Utilizar el IdUbigeo seleccionado
            categorias: selectedCategorias.map(categoriaName => findCategoryIdByName(categorias, categoriaName)),
            tipo_usuario: queryParams.tipo_usuario
        };
        console.log(formData);

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
                alert('Usuario registrado con éxito');
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
            <div className="page-container">
                <section className="ContinuacionRegistro">
                    <h1 className="tituloRegistro2">¡Queremos saber más de ti!</h1>
                    <div className="Form2">
                        <div>
                            <label className="labelCombo">Departamento:</label> <br />
                            <select className="combo-box-4" value={selectedDepartamento} onChange={handleDepartamentoChange}>
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
                            <label className="labelCombo">Provincia:</label> <br />
                            <select className="combo-box-4" value={selectedProvincia} onChange={handleProvinciaChange} disabled={!selectedDepartamento}>
                                <option value="">Seleccione una Provincia</option>
                                {provincias.map(provincia => (
                                    <option key={provincia} value={provincia}>{provincia}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="labelCombo">Distrito:</label> <br />
                            <select className="combo-box-4" value={selectedDistrito} disabled={!selectedProvincia} onChange={handleDistritoChange}>
                                <option value="">Seleccione un Distrito</option>
                                {distritos.map(distrito => (
                                    <option key={distrito} value={distrito}>{distrito}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="labelCombo">Temas de interés: (Máximo 3) </label> <br />
                            {categorias.map(categoria => (
                                <div key={categoria.id} className="checkbox-container">
                                    <input className="checkbox"
                                        type="checkbox"
                                        id={categoria.id}
                                        value={categoria.nombre}
                                        checked={selectedCategorias.includes(categoria.nombre)}
                                        onChange={handleCategoriaChange}
                                    />
                                    <label className="checkbox-label" >{categoria.nombre}</label>
                                </div>
                            ))}
                        </div>
                        <button className="finRegistro" type="submit" onClick={enviarDatos}>Registrar</button>
                    </div>
                </section>
                <section className="ImagenesContinuacion">
                    <img className="imgrv2" src="/registrovoluntario2/perrito.png" alt="perrito adopcion" />
                    <img className="imgrv2" src="/registrovoluntario2/perrito2.png" alt="perrito adopcion y humana" />
                </section>
            </div>
        </Layout>
    );
}

export default App;