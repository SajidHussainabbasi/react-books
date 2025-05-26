import axios from 'axios';

const BASE_URL = 'https://openlibrary.org/search.json?title=';

export const fetchBookByTitle = async (query) => {
  const response = await axios.get(`${BASE_URL}${query}`);
  return response.data;
};