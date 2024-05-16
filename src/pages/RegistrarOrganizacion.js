import React, { useState } from 'react';
import Layout from './componentes/Layout.js';
import { useRouter } from "next/router";
import Link from "next/link";

const RegisterPage = () => {
    const [formData, setFormData] = useState(
        {
        nombre_organizacion: "",
        correo_organizacion: "",
        descripcion_organizacion: "",
        horario_organizacion: "",
        contacto_organizacion: "",
        contrasena_organizaciob: "",
        repetir_organizacion: ""
    }
    );
    const router = useRouter();
    const [nuevoVoluntariado, setNuevoVoluntariado] = useState(null);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const nuevoVoluntariado = {
            nombre_organizacion: formData.nombre_organizacion,
            correo_organizacion: formData.correo_organizacion,
            descripcion_organizacion: formData.descripcion_organizacion,
            horario_organizacion: formData.horario_organizacion,
            contacto_organizacion: formData.contacto_organizacion,
            contrasena_organizaciob: formData.contrasena_organizaciob,
            repetir_organizacion: formData.repetir_organizacion,
        };
    
    try {
        const response = await fetch('/api/registraVoluntariado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            console.log('voluntario registrado con éxito');
        } else {
            console.error('Error al registrar voluntario');
            alert('Error al registrar voluntario. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al registrar voluntario:', error);
        alert('Error al registrar voluntario. Por favor, inténtalo de nuevo.');
    }
}



return (
    <Layout>
        <section className="panelregistro-voluntario">  </section>
        <div className='registro-voluntariado'>
            <h1>¡Registrate para ayudar!</h1>
            <p>
                <label htmlFor="nombre_organizacion">Nombre de la Organización:</label>
                <input type="text" id="nombre_organizacion" name="nombre_organizacion"
                    value={formData.nombre_organizacion}
                    onChange={(e) => setFormData({ ...formData, nombre_organizacion: e.target.value })} />
            </p>
            <p>
                <label htmlFor="correo_organizacion">Correo electrónico:</label>
                <input type="text" id="correo_organizacion" name="correo_organizacion"
                    value={formData.correo_organizacion}
                    onChange={(e) => setFormData({ ...formData, correo_organizacion: e.target.value })} />
            </p>
            <p>
                <label htmlFor="descripcion_organizacion">Descripción de la organización:</label>
                <input type="text" id="descripcion_organizacion" name="descripcion_organizacion"
                    value={formData.descripcion_organizacion}
                    onChange={(e) => setFormData({ ...formData, descripcion_organizacion: e.target.value })} />
            </p>
            <p>
                <label htmlFor="horario_organizacion">Horario de atención de la organización:</label>
                <input type="text" id="horario_organizacion" name="horario_organizacion"
                    value={formData.horario_organizacion}
                    onChange={(e) => setFormData({ ...formData, horario_organizacion: e.target.value })} />
            </p>
            <p>
                <label htmlFor="contacto_organizacion">Contacto  de la organización:</label>
                <input type="text" id="contacto_organizacion" name="contacto_organizacion"
                    value={formData.contacto_organizacion}
                    onChange={(e) => setFormData({ ...formData, contacto_organizacion: e.target.value })} />
            </p>
            <p>
                <label htmlFor="contrasena_organizaciob">Contraseña:</label>
                <input type="password" id="contrasena_organizaciob" name="contrasena_organizaciob"
                    value={formData.contrasena_organizaciob}
                    onChange={(e) => setFormData({ ...formData, contrasena_organizaciob: e.target.value })} />
            </p>
            <p>
                <label htmlFor="confirmarContrasena">Confirmar contraseña:</label>
                <input type="password" id="confirmarContrasena" name="confirmarContrasena"
                    value={formData.repetir_organizacion}
                    onChange={(e) => setFormData({ ...formData, repetir_organizacion: e.target.value })} />
            </p>
            <button onClick={handleFormSubmit}>Registrar</button>
        </div>
    </Layout>
);

}
export default RegisterPage;