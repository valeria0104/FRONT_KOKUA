import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const filePath = path.join(process.cwd(), 'src/pages/json/postulantes.json');
        const postulantes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        postulantes.push(req.body);

        fs.writeFileSync(filePath, JSON.stringify(postulantes, null, 2));

        res.status(200).json({ message: 'Postulante guardado con éxito' });
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
