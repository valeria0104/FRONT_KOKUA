import React, { useState } from 'react';
import Layout from './componentes/Layout.js';
import { useRouter } from "next/router";
import Link from "next/link";

const RegisterPage = () => {
    const [formData, setFormData] = useState(
        {
            nombre_org: "",
            correo: "",
            descripcion: "",
            hora_atencion: "",
            contacto: "",
            contrasena: "",
            repetir_organizacion: "",
            imagen_url: "",
            tipo_usuario: 2
        }
    );
    const router = useRouter();
    const [nuevoVoluntariado, setNuevoVoluntariado] = useState(null);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        // Validación de campos obligatorios
    for (const key in formData) {
        const value = formData[key];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
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
                nombre_org: formData.nombre_org,
                correo: formData.correo,
                descripcion: formData.descripcion,
                hora_atencion: formData.hora_atencion,
                contacto: formData.contacto,
                contrasena: formData.contrasena,
                imagen_url: formData.imagen_url,
                tipo_usuario: 2
            };
          
            const responseRegistro = await fetch('/api/registrarOrganizacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoVoluntariado),
            });
            console.log(nuevoVoluntariado)
            if (responseRegistro.ok) {
                console.log('Organización registrada con éxito');
                console.log(nuevoVoluntariado)
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
                        <label htmlFor="nombre_org">Nombre de la Organización:</label>
                        <input className='input-registrar' type="text" id="nombre_org" name="nombre_org"
                            value={formData.nombre_org}
                            onChange={(e) => setFormData({ ...formData, nombre_org: e.target.value })} />
                    </p>
                    <p>
                        <label htmlFor="correo_organizacion">Correo electrónico:</label>
                        <input className='input-registrar' type="email" id="correo" name="correo_organizacion"
                            value={formData.correo}
                            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}/>
                    </p>
                    <p>
                        <label htmlFor="descripcion">Descripción de la organización:</label>
                        <input className='input-registrar' type="text" id="descripcion" name="descripcion"
                            value={formData.descripcion}
                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} />
                    </p>
                    <p>
                        <label htmlFor="hora_atencion">Horario de atención de la organización:</label>
                        <input className='input-registrar' type="text" id="hora_atencion" name="hora_atencion"
                            value={formData.hora_atencion}
                            onChange={(e) => setFormData({ ...formData, hora_atencion: e.target.value })} />
                    </p>
                    <p>
                        <label htmlFor="contacto">Contacto  de la organización:</label>
                        <input className='input-registrar' type="text" id="contacto" name="contacto"
                            value={formData.contacto}
                            onChange={(e) => setFormData({ ...formData, contacto: e.target.value })} />
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
                   </p>
                   <p>
    <label htmlFor="imagen_url">URL de la imagen de la organización:</label>
    <input type="text" id="imagen_url" name="imagen_url"
        placeholder="Ingrese la URL de la imagen"
        value={formData.imagen_url}
        onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })} />
</p>
                   
                   </div>
                    
                <button onClick={handleFormSubmit}>Registrar</button>

            </div>
        </Layout>
    );

}
export default RegisterPage;