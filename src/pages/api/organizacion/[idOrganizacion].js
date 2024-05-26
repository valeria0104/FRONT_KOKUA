import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  // Obtenemos el idOrganizacion de los parámetros de la solicitud
  const { idOrganizacion } = req.query;

  // Ruta al archivo JSON
  const filePath = path.join(process.cwd(), 'src/pages/json/organizacion.json');

  try {
    // Leer el archivo JSON
    const jsonData = await fs.readFile(filePath, 'utf-8');
    // Convertir los datos JSON
    const organizaciones = JSON.parse(jsonData);
    
    // Buscar la organización por su ID
    const organizacion = organizaciones.find(org => org.id === parseInt(idOrganizacion));

    if (organizacion) {
      // Si se encuentra la organización, responder con sus datos
      res.status(200).json(organizacion);
    } else {
      // Si no se encuentra la organización, responder con un mensaje de error
      res.status(404).json({ error: 'Organización no encontrada' });
    }
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    res.status(500).json({ error: 'Error al obtener datos de organizaciones' });
  }
};
