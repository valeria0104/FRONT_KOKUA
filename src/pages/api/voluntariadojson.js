import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  const filePath = path.join(process.cwd(), 'src/pages/json/organizacion.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const voluntarios = JSON.parse(jsonData);
    res.status(200).json(voluntarios);
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    res.status(500).json({ error: 'Error al obtener datos de voluntarios' });
  }
};