import { promises as fs } from 'fs';
import path from 'path';

const guardarPostulante = async (nuevoPostulante) => {
  const filePath = path.join(process.cwd(), 'src/pages/json/postulantes.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);

  data.push(nuevoPostulante);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const nuevoPostulante = req.body;

    try {
      await guardarPostulante(nuevoPostulante);
      res.status(200).json({ message: 'Postulante registrado con éxito' });
    } catch (error) {
      console.error('Error al guardar postulante:', error);
      res.status(500).json({ error: 'Error al guardar postulante' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
