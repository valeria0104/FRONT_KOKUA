import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  // Ruta al archivo JSON
  const filePath = path.join(process.cwd(), 'src/pages/json/voluntariado.json');

  try {
    // Leer el archivo JSON
    const jsonData = await fs.readFile(filePath, 'utf-8');
    // Convertir los datos JSON
    const voluntariados = JSON.parse(jsonData);
    // Responder con los datos JSON
    res.status(200).json(voluntariados);
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    res.status(500).json({ error: 'Error al obtener datos de voluntariados' });
  }
};
