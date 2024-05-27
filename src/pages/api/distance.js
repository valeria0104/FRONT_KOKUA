// pages/api/distance.js
export default async function handler(req, res) {
    const { origin, destination } = req.query;
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  
    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required' });
    }
  
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching distance data' });
    }
  }
  