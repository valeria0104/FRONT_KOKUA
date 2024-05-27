// pages/api/geocode.js
export default async function handler(req, res) {
    const { address } = req.query;
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }
  
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching geocode data' });
    }
  }
  