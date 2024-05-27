const API_BASE_URL = '/api';

export const geocodeAddress = async (address) => {
  try {
    const response = await fetch(`${API_BASE_URL}/geocode?address=${encodeURIComponent(address)}`);
    
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
    throw error;
  }
};
export const calculateDistance = async (origin, destination) => {
    try {
      const originStr = `${origin.lat},${origin.lng}`;
      const destinationStr = `${destination.lat},${destination.lng}`;
      const response = await fetch(`${API_BASE_URL}/distance?origin=${originStr}&destination=${destinationStr}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener la respuesta de la API de Distance Matrix');
      }
      
      const data = await response.json();
      console.log('Data from Distance Matrix API:', data); // Añade este console.log para ver la respuesta de la API
      
      if (data.rows && data.rows.length > 0 && data.rows[0].elements.length > 0) {
        const element = data.rows[0].elements[0];
        if (element.status === 'OK') {
          return element.distance.value / 1000; // Convertir de metros a kilómetros
        } else {
          throw new Error(`Error en la respuesta de Distance Matrix: ${element.status}`);
        }
      } else {
        throw new Error('No se encontraron resultados de Distance Matrix para las ubicaciones proporcionadas');
      }
    } catch (error) {
      console.error('Error en calculateDistance:', error);
      throw error;
    }
  };
  