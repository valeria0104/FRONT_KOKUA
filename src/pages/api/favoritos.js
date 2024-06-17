// pages/api/favoritos.js
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(),'src/pages/json/usuarioVoluntariado.json');

const getFavoritos = () => {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

const saveFavoritos = (favoritos) => {
  fs.writeFileSync(filePath, JSON.stringify(favoritos, null, 2));
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    const favoritos = getFavoritos();
    res.status(200).json(favoritos);
  } else if (req.method === 'POST') {
    const { idUsuario, idVoluntariado, doc_identidad, telefono, tipo_relacion } = req.body;
    const favoritos = getFavoritos();

    if (!favoritos.find(fav => fav.idUsuario === idUsuario && fav.idVoluntariado === idVoluntariado)) {
      favoritos.push({ idUsuario, idVoluntariado, doc_identidad, telefono,  tipo_relacion });
      saveFavoritos(favoritos);
      res.status(201).json({ message: 'Favorito añadido' });
    } else {
      res.status(400).json({ message: 'Ya existe este favorito' });
    }
  } else if (req.method === 'DELETE') {
    const { idUsuario, idVoluntariado } = req.body;
    let favoritos = getFavoritos();
    favoritos = favoritos.filter(fav => !(fav.idUsuario === idUsuario && fav.idVoluntariado === idVoluntariado));
    saveFavoritos(favoritos);
    res.status(200).json({ message: 'Favorito eliminado' });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
