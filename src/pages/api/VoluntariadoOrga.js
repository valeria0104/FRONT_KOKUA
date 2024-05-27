import { promises as fs } from 'fs';
import path from 'path';

// Función para obtener información de ubicación por ID de Ubigeo
const getUbicacionByIdUbigeo = async (idUbigeo) => {
  const ubicacionFilePath = path.join(process.cwd(), 'src/pages/json/UbicacionRegistrar.json');
  const ubicacionData = await fs.readFile(ubicacionFilePath, 'utf-8');
  const ubicaciones = JSON.parse(ubicacionData);
  return ubicaciones.find(ubicacion => ubicacion.IdUbigeo === idUbigeo);
};

export default async (req, res) => {
  // Ruta al archivo JSON
  const filePath = path.join(process.cwd(), 'src/pages/json/voluntariado.json');

  try {
    // Leer el archivo JSON
    const jsonData = await fs.readFile(filePath, 'utf-8');
    // Convertir los datos JSON
    let voluntariados = JSON.parse(jsonData);

    // Agregar información de ubicación a cada voluntariado
    for (let voluntariado of voluntariados) {
      const ubicacion = await getUbicacionByIdUbigeo(voluntariado.idUbigeo);
      if (ubicacion) {
        voluntariado.departamento = ubicacion.Departamento;
        voluntariado.distrito = ubicacion.Distrito;
      }
    }

    // Responder con los datos JSON
    res.status(200).json(voluntariados);
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    res.status(500).json({ error: 'Error al obtener datos de voluntariados' });
  }
};
