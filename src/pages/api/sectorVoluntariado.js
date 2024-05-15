import fs from 'fs';
import path from 'path';

const categoriasFilePath = path.join(process.cwd(), 'src', 'pages', 'json', 'sectorVoluntariado.json');

console.log('Ruta del archivo JSON de categorías:', categoriasFilePath);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const categoriasData = JSON.parse(fs.readFileSync(categoriasFilePath, 'utf8'));
      return res.status(200).json(categoriasData);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}