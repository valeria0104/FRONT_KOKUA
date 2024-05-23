import { promises as fs } from 'fs';
import path from 'path';

const usuariosFilePath = path.join(process.cwd(), 'src/pages/json/organizacion.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            nombre_organizacion,
            correo,
            descripcion_organizacion,
            horario_organizacion,
            contacto_organizacion,
            contrasena,
            repetir_organizacion,
            imagen_organizacion
        } = req.body;

        try {
            // Leer el archivo de usuarios
            let usuariosData = await fs.readFile(usuariosFilePath, 'utf-8');
            let usuarios = JSON.parse(usuariosData);

            // Obtener el último ID registrado
            let ultimoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id : 0;

            const nuevoVoluntariado = {
                id: ultimoId + 1,
                nombre_organizacion,
                correo,
                descripcion_organizacion,
                horario_organizacion,
                contacto_organizacion,
                contrasena,
                repetir_organizacion,
                imagen_organizacion
            };

            // Agregar el nuevo usuario
            usuarios.push(nuevoVoluntariado);

            // Escribir en el archivo de usuarios
            await fs.writeFile(usuariosFilePath, JSON.stringify(usuarios, null, 2));

            res.status(201).json({ success: true, usuario: nuevoVoluntariado });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
