import { promises as fs } from 'fs';
import path from 'path';
import IdOrganizacion from './organizacion/[idOrganizacion]';
import IdVoluntariado from './voluntariado/[idVoluntariado]';
/*
// Función para obtener información de ubicación por ID de Ubigeo
const getUbicacionByIdUbigeo = async (idUbigeo) => {
  const ubicacionFilePath = path.join(process.cwd(), 'src/pages/json/UbicacionRegistrar.json');
  const ubicacionData = await fs.readFile(ubicacionFilePath, 'utf-8');
  const ubicaciones = JSON.parse(ubicacionData);
  return ubicaciones.find(ubicacion => ubicacion.IdUbigeo === idUbigeo);
};
*/
const getUbicacionByIdUbigeo = async (idUbigeo) => {
const response = await fetch(`http://localhost:3001/api/v1/ubigeos/${idUbigeo}`);
const ubicaciones = await response.json();
  console.log('Organización:', ubicaciones); 
  return ubicaciones;
}


export default async (req, res) => {
  // Ruta al archivo JSON

  try {
    const response = await fetch(`http://localhost:3001/api/v1/voluntariados`);
    const voluntariados = await response.json();


    // Agregar información de ubicación a cada voluntariado
    for (let voluntariado of voluntariados) {
      const ubicacion = await getUbicacionByIdUbigeo(voluntariado.idUbigeo);
      if (ubicacion) {
        voluntariado.departamento = ubicacion.departamento;
        voluntariado.distrito = ubicacion.distrito;
      }
    }

    // Responder con los datos JSON
    res.status(200).json(voluntariados);
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    res.status(500).json({ error: 'Error al obtener datos de voluntariados' });
  }
};
