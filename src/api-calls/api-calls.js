import axios from 'axios';

const BASE_URL = 'https://openlibrary.org/search.json?title=';

export const fetchBookByTitle = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error; // rethrow if you want the caller to handle it
  } finally {
    console.log('Fetch attempt completed.');
  }
};