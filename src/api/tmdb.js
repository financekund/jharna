import axios from 'axios';

const API_KEY = '1ea3ef491cb862f7564dbd0b19323bbc';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMoviesByCategory(language, page = 1) {
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_original_language: language,
        sort_by: 'popularity.desc',
        page
      }
    });
    return res.data;
  } catch (err) {
    console.error('Error fetching movies:', err);
    return { results: [], total_pages: 1 };
  }
}
