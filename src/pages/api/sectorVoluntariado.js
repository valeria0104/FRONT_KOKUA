import fs from 'fs';
import path from 'path';

const apiUrl = 'http://localhost:3001/api/v1/sectors';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await fetch(apiUrl);
      const categoriasData = await response.json();
      return res.status(200).json(categoriasData);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}