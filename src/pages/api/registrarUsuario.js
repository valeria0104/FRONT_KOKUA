import { promises as fs } from 'fs';
import path from 'path';

const usuariosFilePath = path.join(process.cwd(), 'src/pages/json/usuario.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nombre, apellidosPaterno, apellidoMaterno, correo, contrasena, repetir,departamento, provincia,distrito, categorias } = req.body;

        const nuevoUsuario = {
            nombre,
            apellidosPaterno,
            apellidoMaterno,
            correo,
            contrasena,
            repetir,
            departamento,
        provincia,
        distrito, 
        categorias
        };

        try {
            // Leer el archivo de usuarios
            let usuariosData = await fs.readFile(usuariosFilePath);
            let usuarios = JSON.parse(usuariosData);

            // Agregar el nuevo usuario
            usuarios.push(nuevoUsuario);

            // Escribir en el archivo de usuarios
            await fs.writeFile(usuariosFilePath, JSON.stringify(usuarios));

            res.status(201).json({ success: true, usuario: nuevoUsuario });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
