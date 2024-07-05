import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const filePath = path.join(process.cwd(), 'src/pages/json/usuarioVoluntariado.json');
                const postulantes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const { idVoluntariado, idUsuario, doc_identidad, telefono, correo, tipo_relacion } = req.body;

        if (!idVoluntariado || !idUsuario || !doc_identidad || !telefono || !correo || tipo_relacion === undefined) {
            res.status(400).json({ message: 'Faltan datos necesarios' });
            return;
        }

        const nuevoPostulante = {
            idVoluntariado,
            idUsuario,
            doc_identidad,
            telefono,
            correo,
            tipo_relacion
        };

        postulantes.push(nuevoPostulante);

        fs.writeFileSync(filePath, JSON.stringify(postulantes, null, 2));

        res.status(200).json({ message: 'Postulante guardado con éxito' });
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
