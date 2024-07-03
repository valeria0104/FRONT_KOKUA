/*import { promises as fs } from 'fs';
import path from 'path';

const usuariosFilePath = path.join(process.cwd(), 'src/pages/json/usuario.json');
const usuariosSectorFilePath = path.join(process.cwd(), 'src/pages/json/usuarioSector.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { 
            nombre,
            apellido_paterno,
            apellido_materno,
            correo,
            contrasena,
            ubicacion,
            sectors,
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
                apellido_paterno,
                apellido_materno,
                correo,
                contrasena,
                tipo_usuario: Number(tipo_usuario),
                ubicacion
            };

            // Agregar el nuevo usuario
            usuarios.push(nuevoUsuario);

            // Escribir en el archivo de usuarios
            await fs.writeFile(usuariosFilePath, JSON.stringify(usuarios, null, 2));

            // Agregar las categorías del usuario a usuariosSector
            const nuevassectors = sectors.map(categoria => ({
                idUsuario: nuevoUsuario.id,
                idSector: categoria
            }));
            
            usuariosSector.push(...nuevassectors);

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
*/
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      contrasena,
      idUbigeo,
      sectors,
      tipo_usuario
    } = req.body;

    try {
      // Make a POST request to your backend server
      const response = await axios.post('http://localhost:3001/api/v1/usuarios', {
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        contrasena,
        idUbigeo,
        sectors,
        tipo_usuario :Number(tipo_usuario)
      });

      // Handle the response from the backend server
      if (response.status === 201) {
        res.status(201).json({ success: true, usuario: response.data });
      } else {
        res.status(500).json({ error: 'Error al registrar usuario' });
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}