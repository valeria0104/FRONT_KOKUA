import { promises as fs } from 'fs';
import path from 'path';

const usuariosFilePath = path.join(process.cwd(), 'src/pages/json/usuario.json');
let proximoId = 1; 
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nombre, apellidosPaterno, apellidoMaterno, correo, contrasena, repetir, ubicacion, categorias } = req.body;
     
        const nuevoUsuario = {
            id: proximoId++, 
            nombre,
            apellidosPaterno,
            apellidoMaterno,
            correo,
            contrasena,
            repetir,
            ubicacion, // Aquí almacenamos el IdUbigeo
            categorias
        };
        
console.log('Datos recibidos del formulario:', req.body);

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
