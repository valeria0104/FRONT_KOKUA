import path from 'path';
import { promises as fs } from 'fs';

const usuariosFilePath = path.join(process.cwd(), 'src/pages/json/usuario.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { correo, contrasena } = req.body;

        try {
            const usuariosData = await fs.readFile(usuariosFilePath, 'utf8');
            const usuarios = JSON.parse(usuariosData);

            const usuarioRegistrado = usuarios.find(usuario => usuario.correo === correo);

            if (usuarioRegistrado) {
                if (usuarioRegistrado.contrasena === contrasena) {
                    res.status(200).json({ success: true, mensaje: 'Inicio de sesión exitoso' });
                } else {
                    res.status(401).json({ success: false, mensaje: 'Contraseña incorrecta' });
                }
            } else {
                res.status(404).json({ success: false, mensaje: 'Correo electrónico no registrado' });
            }
        } catch (error) {
            console.error('Error al leer el archivo de usuarios:', error);
            res.status(500).json({ success: false, mensaje: 'Error al leer el archivo de usuarios' });
        }
    } else {
        res.status(405).json({ success: false, mensaje: 'Método no permitido' });
    }
}
