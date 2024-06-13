// Importa los módulos necesarios
import fs from 'fs';
import path from 'path';

// Define la ruta al archivo JSON de favoritos
const favoritosFilePath = path.join(process.cwd(), 'src/pages/json/favoritos.json');

// Función para leer los favoritos según el userId
export default function handler(req, res) {
  // Lee los datos del archivo JSON
  const favoritosData = JSON.parse(fs.readFileSync(favoritosFilePath, 'utf-8'));

  // Obtiene el userId de la query
  const { userId } = req.query;

  // Busca los favoritos del usuario especificado
  const usuarioFavoritos = favoritosData.find((usuario) => usuario.userId === parseInt(userId, 10));

  // Si no se encuentra el usuario o no tiene favoritos, devuelve un array vacío
  if (!usuarioFavoritos || !usuarioFavoritos.favoritos) {
    res.status(404).json([]);
    return;
  }

  // Devuelve los favoritos del usuario
  res.status(200).json(usuarioFavoritos.favoritos);
}
