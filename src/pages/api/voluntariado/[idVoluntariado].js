import { promises as fs } from 'fs';
import path from 'path';

const getOrganizacionById = async (idOrganizacion) => {
  const orgFilePath = path.join(process.cwd(), 'src/pages/json/organizacion.json');
  const orgData = await fs.readFile(orgFilePath, 'utf-8');
  const organizaciones = JSON.parse(orgData);
  return organizaciones.find(org => org.id === parseInt(idOrganizacion));
};

export default async (req, res) => {
  const { idVoluntariado } = req.query;
  const volFilePath = path.join(process.cwd(), 'src/pages/json/voluntariado.json');

  try {
    const volData = await fs.readFile(volFilePath, 'utf-8');
    const voluntariados = JSON.parse(volData);
    const voluntariado = voluntariados.find(vol => vol.id === parseInt(idVoluntariado));

    if (voluntariado) {
      const organizacion = await getOrganizacionById(voluntariado.idOrganizacion);
      if (organizacion) {
        res.status(200).json({ ...voluntariado, organizacion });
      } else {
        res.status(404).json({ error: 'Organización no encontrada' });
      }
    } else {
      res.status(404).json({ error: 'Voluntariado no encontrado' });
    }
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    res.status(500).json({ error: 'Error al obtener datos de voluntariado' });
  }
};
