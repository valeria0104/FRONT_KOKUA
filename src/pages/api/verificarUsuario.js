import fs from 'fs/promises';
import path from 'path';

const getFilePath = (tipoUsuario) => {
    if (tipoUsuario === 'usuario1') {
        return path.join(process.cwd(), 'src/pages/json/usuario.json');
    } else if (tipoUsuario === 'usuario2') {
        return path.join(process.cwd(), 'src/pages/json/organizacion.json');
    } else {
        throw new Error('Tipo de usuario no válido');
    }
};

const readJsonFile = async (filePath) => {
    const fileData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileData);
};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Lee los datos de ambos archivos JSON
            const usuarioData = await readJsonFile(getFilePath('usuario1'));
            const organizacionData = await readJsonFile(getFilePath('usuario2'));

            // Combina los datos de ambos archivos en un solo array
            const combinedData = [...usuarioData, ...organizacionData];

            res.status(200).json({ success: true, data: combinedData });
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            res.status(500).json({ success: false, mensaje: 'Error al leer el archivo' });
        }
    } else {
        res.status(405).json({ success: false, mensaje: 'Método no permitido' });
    }
}
