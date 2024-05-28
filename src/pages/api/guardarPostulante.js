import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Define la ruta del archivo JSON donde se guardarán los postulantes.
        const filePath = path.join(process.cwd(), 'src/pages/json/postulantes.json');
        // Lee el contenido del archivo JSON y lo convierte en un objeto JavaScript.
        const postulantes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Agrega los datos del nuevo postulante al array de postulantes.
        postulantes.push(req.body);

        // Escribe el array actualizado de postulantes de vuelta al archivo JSON.
        fs.writeFileSync(filePath, JSON.stringify(postulantes, null, 2));

        // Envía una respuesta de éxito.
        res.status(200).json({ message: 'Postulante guardado con éxito' });
    } else {
        // Si el método HTTP no es POST, envía una respuesta de error.
        res.status(405).json({ message: 'Método no permitido' });
    }
}
