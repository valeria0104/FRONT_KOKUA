import { promises as fs } from 'fs';
import path from 'path';

const getOrganizacionById = async (idOrganizacion) => {
  const orgFilePath = path.join(process.cwd(), 'src/pages/json/organizacion.json');
  const orgData = await fs.readFile(orgFilePath, 'utf-8');
  const organizaciones = JSON.parse(orgData);
  return organizaciones.find(org => org.id === parseInt(idOrganizacion));
};

const getVoluntariadoByOrganizacionId = async (idOrganizacion) => {
  const volFilePath = path.join(process.cwd(), 'src/pages/json/voluntariado.json');
  const volData = await fs.readFile(volFilePath, 'utf-8');
  const voluntariados = JSON.parse(volData);
  const ubicacionFilePath = path.join(process.cwd(), 'src/pages/json/UbicacionRegistrar.json');
  const ubicacionData = await fs.readFile(ubicacionFilePath, 'utf-8');
  const ubicaciones = JSON.parse(ubicacionData);

  return voluntariados.map(voluntariado => {
    const ubicacion = ubicaciones.find(ubicacion => ubicacion.IdUbigeo === voluntariado.IdUbigeo);
    return { ...voluntariado, ubicacion: ubicacion ? ubicacion.Distrito : null };
  });
};

export default async (req, res) => {
  const { idOrganizacion } = req.query;

  try {
    const organizacion = await getOrganizacionById(idOrganizacion);
    const voluntariado = await getVoluntariadoByOrganizacionId(idOrganizacion);

    if (organizacion) {
      if (voluntariado) {
        res.status(200).json({ organizacion, voluntariado });
      } else {
        res.status(404).json({ error: 'Voluntariado no encontrado' });
      }
    } else {
      res.status(404).json({ error: 'Organización no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
};