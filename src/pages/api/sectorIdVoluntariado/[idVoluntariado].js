import fs from 'fs';
import path from 'path';

const apiUrl = 'http://localhost:3001/api/v1';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { idVoluntariado } = req.query; 
    console.log('RECIBI: ', idVoluntariado);// Obtener el ID de voluntariado de la query string
    if (!idVoluntariado) {
      return res.status(400).json({ error: 'ID de voluntariado es requerido' });
    }

    try {
      const response = await fetch(`http://localhost:3001/api/v1/voluntariados/${idVoluntariado}/sector`);
      const sectorName = await response.text();
      return res.status(200).json({ sectorName: sectorName });
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }
}