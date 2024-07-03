import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  try {
    // Realizar solicitud HTTP a la API
    const response = await fetch('http://localhost:3001/api/v1/voluntariados');
    // Verificar si la respuesta es OK
    if (!response.ok) {
      throw new Error(`Error al obtener datos de voluntariados: ${response.status}`);
    }
    // Obtener los datos JSON de la respuesta
    const jsonData = await response.json();
    // Responder con los datos JSON
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error al obtener datos de voluntariados:', error);
    res.status(500).json({ error: 'Error al obtener datos de voluntariados' });
  }
};