import React, { useState } from 'react';
import Layout from './componentes/Layout.js';
import { useRouter } from "next/router";
import Link from "next/link";

const RegisterPage = () => {
    const [formData, setFormData] = useState(
        {
            nombre_organizacion: "",
            correo: "",
            descripcion_organizacion: "",
            horario_organizacion: "",
            contacto_organizacion: "",
            contrasena: "",
            repetir_organizacion: ""
        }
    );
    const router = useRouter();
    const [nuevoVoluntariado, setNuevoVoluntariado] = useState(null);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        // Validación de campos obligatorios
        for (const key in formData) {
            if (formData[key].trim() === '') {
                alert(`El campo ${key.replace('_', ' ')} es obligatorio`);
                return;
            }
        }

        // Validación de contraseña
        if (formData.contrasena !== formData.repetir_organizacion) {
            alert('Las contraseñas no coinciden');
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.correo)) {
            alert('Por favor, ingrese un correo electrónico válido');
            return;
        }
        try {
            const response = await fetch('/api/validarCorreo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo: formData.correo })
            });

            const result = await response.json();

            if (!result.success) {
                alert(result.mensaje);
                return;
            }

            const nuevoVoluntariado = {
                nombre_organizacion: formData.nombre_organizacion,
                correo: formData.correo,
                descripcion_organizacion: formData.descripcion_organizacion,
                horario_organizacion: formData.horario_organizacion,
                contacto_organizacion: formData.contacto_organizacion,
                contrasena: formData.contrasena,
                repetir_organizacion: formData.repetir_organizacion,
            };

            const responseRegistro = await fetch('/api/registraVoluntariado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoVoluntariado),
            });

            if (responseRegistro.ok) {
                console.log('Organización registrada con éxito');
                alert('Organización registrada con éxito');
            } else {
                console.error('Error al registrar organización');
                alert('Error al registrar organización. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al registrar organización:', error);
            alert('Error al registrar organización. Por favor, inténtalo de nuevo.');
        }
    };


    return (
        <Layout>
            <section className="panelregistro-voluntario">  </section>
            <div className='registro-voluntariado'>
                <h1>¡Registrate para ayudar!</h1>
                <div className='registro-organizacion'>
                    <p>
                        <label htmlFor="nombre_organizacion">Nombre de la Organización:</label>
                        <input className='input-registrar' type="text" id="nombre_organizacion" name="nombre_organizacion"
                            value={formData.nombre_organizacion}
                            onChange={(e) => setFormData({ ...formData, nombre_organizacion: e.target.value })} />
                    </p>
                    <p>
                        <label htmlFor="correo_organizacion">Correo electrónico:</label>
                        <input className='input-registrar' type="email" id="correo" name="correo_organizacion"
                            value={formData.correo}
                            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}/>
                    </p>
                    <p>
                        <label htmlFor="descripcion_organizacion">Descripción de la organización:</label>
                        <input className='input-registrar' type="text" id="descripcion_organizacion" name="descripcion_organizacion"
                            value={formData.descripcion_organizacion}
                            onChange={(e) => setFormData({ ...formData, descripcion_organizacion: e.target.value })} />
                    </p>
                    <p>
                        <label htmlFor="horario_organizacion">Horario de atención de la organización:</label>
                        <input className='input-registrar' type="text" id="horario_organizacion" name="horario_organizacion"
                            value={formData.horario_organizacion}
                            onChange={(e) => setFormData({ ...formData, horario_organizacion: e.target.value })} />
                    </p>
                    <p>
                        <label htmlFor="contacto_organizacion">Contacto  de la organización:</label>
                        <input className='input-registrar' type="text" id="contacto_organizacion" name="contacto_organizacion"
                            value={formData.contacto_organizacion}
                            onChange={(e) => setFormData({ ...formData, contacto_organizacion: e.target.value })} />
                    </p>
                    <p>
                        <label htmlFor="contrasena_organizaciob">Contraseña:</label>
                        <input className='input-registrar' type="password" id="contrasena" name="contrasena_organizacion"
                            value={formData.contrasena}
                            onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })} />
                    </p>
                    <p>
                        <label htmlFor="confirmarContrasena">Confirmar contraseña:</label>
                        <input className='input-registrar' type="password" id="confirmarContrasena" name="confirmarContrasena"
                            value={formData.repetir_organizacion}
                            onChange={(e) => setFormData({ ...formData, repetir_organizacion: e.target.value })} />
                   </p></div>
                    
                <button onClick={handleFormSubmit}>Registrar</button>

            </div>
        </Layout>
    );

}
export default RegisterPage;