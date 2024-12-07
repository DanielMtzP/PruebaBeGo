import axios from 'axios';

const BASE_URL = 'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io';

export const getUpcomingOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/upcoming`);
    return response.data;
  } catch (error) {
    console.error('Error en getUpcomingOrders:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error en getOrders:', error);
    throw error;
  }
};
