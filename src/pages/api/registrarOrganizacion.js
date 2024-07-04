import { promises as fs } from 'fs';
import path from 'path';
import axios from 'axios';
const usuariosFilePath = path.join(process.cwd(), 'src/pages/json/organizacion.json');
/*import axios from 'axios';

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
} */
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            nombre_org,
            correo,
            descripcion,
            hora_atencion,
            contacto,
            contrasena,
            imagen_url,
            tipo_usuario
        } = req.body;

        try {
             // Make a POST request to your backend server
      const response = await axios.post('http://localhost:3001/api/v1/organizacions', {
          
                nombre_org,
            correo,
            descripcion,
            imagen_url,
            hora_atencion,
            contacto,
           
          
            tipo_usuario: Number(tipo_usuario),
            contrasena
              
            });

            // Handle the response from the backend server
      if (response.status === 201) {
        res.status(201).json({ success: true, usuario: response.data });
      } else {
        res.status(500).json({ error: 'Error al registrar organizacion' });
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ error: 'Error al registrar organizacion' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}