import { promises as fs } from 'fs';
import path from 'path';

const usuariosFilePath = path.join(process.cwd(), 'src/pages/json/organizacion.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {  nombre_organizacion,correo_organizacion,descripcion_organizacion,
            horario_organizacion,contacto_organizacion,contrasena_organizaciob,repetir_organizacion} = req.body;

        const nuevoVoluntariado = {
            nombre_organizacion,correo_organizacion,descripcion_organizacion,
            horario_organizacion,contacto_organizacion,contrasena_organizaciob,repetir_organizacion
        };

        try {
            // Leer el archivo de usuarios
            let usuariosData = await fs.readFile(usuariosFilePath);
            let usuarios = JSON.parse(usuariosData);

            // Agregar el nuevo usuario
            usuarios.push(nuevoVoluntariado);

            // Escribir en el archivo de usuarios
            await fs.writeFile(usuariosFilePath, JSON.stringify(usuarios));

            res.status(201).json({ success: true, usuario: nuevoVoluntariado });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
