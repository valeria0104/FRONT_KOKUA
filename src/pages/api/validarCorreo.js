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
    if (req.method === 'POST') {
        const { correo } = req.body;

        if (!correo) {
            return res.status(400).json({ success: false, mensaje: 'Correo electrónico es requerido' });
        }

        try {
            // Lee los datos de ambos archivos JSON
            const usuarioData = await readJsonFile(getFilePath('usuario1'));
            const organizacionData = await readJsonFile(getFilePath('usuario2'));

            // Combina los datos de ambos archivos en un solo array
            const combinedData = [...usuarioData, ...organizacionData];

            // Verifica si el correo ya está registrado
            const correoExistente = combinedData.some(usuario => usuario.correo === correo);

            if (correoExistente) {
                res.status(409).json({ success: false, mensaje: 'El correo electrónico ya está registrado' });
            } else {
                res.status(200).json({ success: true, mensaje: 'El correo electrónico no está registrado' });
            }
        } catch (error) {
            console.error('Error al leer los archivos JSON:', error);
            res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
        }
    } else {
        res.status(405).json({ success: false, mensaje: 'Método no permitido' });
    }
}
