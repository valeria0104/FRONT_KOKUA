// utils/googleMaps.js

const API_KEY = 'AIzaSyBTGULGSs8bfmNybMQJKGu-DhdBMfpHl38'; // Aquí debes colocar tu API key de Google Maps


// Función para geocodificar una dirección y obtener coordenadas
export const geocodeAddress = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener la respuesta de la API de geocodificación');
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error('No se encontraron resultados de geocodificación para la dirección proporcionada');
    }
  } catch (error) {
    console.error('Error en geocodeAddress:', error);
    throw error; // Lanza el error para que se maneje en el componente que llama a esta función
  }
};
// Función para calcular la distancia en kilómetros entre dos ubicaciones usando fórmula de Haversine
export const calculateDistance = (origin, destination) => {
  try {
    const { lat: lat1, lng: lng1 } = origin;
    const { lat: lat2, lng: lng2 } = destination;

    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia en kilómetros

    return distance;
  } catch (error) {
    console.error('Error en calculateDistance:', error);
    throw error;
  }
};

// Función auxiliar para convertir grados a radianes
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};