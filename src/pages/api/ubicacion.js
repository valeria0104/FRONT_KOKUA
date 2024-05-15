
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    // Construye la ruta absoluta al archivo JSON
    const jsonDirectory = path.join(process.cwd(), 'src/pages/json');
    // Lee el archivo JSON
    const fileContents = await fs.readFile(jsonDirectory + '/UbicacionRegistrar.json', 'utf8');
    // Devuelve el contenido del archivo en la respuesta
    res.status(200).json(JSON.parse(fileContents));
}