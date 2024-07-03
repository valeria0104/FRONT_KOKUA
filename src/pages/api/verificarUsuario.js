import fs from 'fs/promises';
import path from 'path';


export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        // Lee los datos de ambos archivos JSON
        const usuarioResponse = await fetch('http://localhost:3001/api/v1/usuarios');
        const organizacionResponse = await fetch('http://localhost:3001/api/v1/organizacions');
  
        // Espera a que se resuelvan las promesas y obtiene los datos en formato JSON
        const usuarioData = await usuarioResponse.json();
        const organizacionData = await organizacionResponse.json();
  
        // Combina los datos de ambos archivos en un solo array
        const combinedData = [...usuarioData, ...organizacionData];
  
        res.status(200).json({ success: true, data: combinedData });
      } catch (error) {
        console.error('Error al leer el archivo:', error);
        res.status(500).json({ success: false, mensaje: 'Error al leer el archivo' });
      }
    } else {
      res.status(405).json({ success: false, mensaje: 'Método no permitido' });
    }
  }