import { promises as fs } from 'fs';
import path from 'path';

const usuariosFilePath = path.join(process.cwd(), 'src/pages/json/usuario.json');
const usuariosSectorFilePath = path.join(process.cwd(), 'src/pages/json/usuarioSector.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { 
            nombre,
            apellidosPaterno,
            apellidoMaterno,
            correo,
            contrasena,
            repetir,
            ubicacion,
            categorias,
            tipo_usuario
        } = req.body;
     
        try {
            // Leer el archivo de usuarios
            let usuariosData = await fs.readFile(usuariosFilePath, 'utf-8');
            let usuarios = JSON.parse(usuariosData);

            // Leer el archivo de usuarios-sector
            let usuariosSectorData = await fs.readFile(usuariosSectorFilePath, 'utf-8');
            let usuariosSector = JSON.parse(usuariosSectorData);

            // Obtener el último ID registrado
            let ultimoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id : 0;

            const nuevoUsuario = {
                id: ultimoId + 1, 
                nombre,
                apellidosPaterno,
                apellidoMaterno,
                correo,
                contrasena,
                repetir,
                ubicacion,
                tipo_usuario: Number(tipo_usuario) 
            };

            // Agregar el nuevo usuario
            usuarios.push(nuevoUsuario);

            // Escribir en el archivo de usuarios
            await fs.writeFile(usuariosFilePath, JSON.stringify(usuarios, null, 2));

            // Agregar las categorías del usuario a usuariosSector
            const nuevasCategorias = categorias.map(categoria => ({
                idUsuario: nuevoUsuario.id,
                idSector: categoria
            }));
            
            usuariosSector.push(...nuevasCategorias);

            // Escribir en el archivo de usuarios-sector
            await fs.writeFile(usuariosSectorFilePath, JSON.stringify(usuariosSector, null, 2));

            res.status(201).json({ success: true, usuario: nuevoUsuario });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
