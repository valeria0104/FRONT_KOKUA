import { promises as fs } from 'fs'; // Importa funciones de fs (filesystem) para leer y escribir archivos.
import path from 'path'; // Importa path para trabajar con rutas de archivos.

// Función para guardar un nuevo postulante en el archivo JSON.
const guardarPostulante = async (nuevoPostulante) => {
  // Define la ruta del archivo JSON donde se guardan los postulantes.
  const filePath = path.join(process.cwd(), 'src/pages/json/postulantes.json');
  
  // Lee el contenido del archivo JSON.
  const fileContents = await fs.readFile(filePath, 'utf8');
  // Convierte el contenido del archivo JSON en un objeto JavaScript.
  // Esto permite manipular los datos como un array.
  const data = JSON.parse(fileContents);

  // Agrega los datos del nuevo postulante al array existente.
  data.push(nuevoPostulante);

  // Convierte el array actualizado de vuelta a una cadena JSON y lo guarda en el archivo.
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Función manejadora de la API para registrar un postulante.
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Obtiene los datos del nuevo postulante del cuerpo de la solicitud.
    const nuevoPostulante = req.body;

    try {
      // Guarda el nuevo postulante.
      await guardarPostulante(nuevoPostulante);
      // Envía una respuesta de éxito.
      res.status(200).json({ message: 'Postulante registrado con éxito' });
    } catch (error) {
      // Si hay un error, imprime el error en la consola y envía una respuesta de error.
      console.error('Error al guardar postulante:', error);
      res.status(500).json({ error: 'Error al guardar postulante' });
      
    }
  } else {
    // Si el método no es POST, envía una respuesta de error.
    res.status(405).json({ error: 'Método no permitido' });
  }
}