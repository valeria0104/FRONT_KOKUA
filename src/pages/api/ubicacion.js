import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await fetch('http://localhost:3001/api/v1/ubigeos');
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}