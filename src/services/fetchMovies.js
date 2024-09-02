// src/services/fetchMovies.js
import axios from 'axios';

const API_KEY = 'b23a898ea9de73476c7518cd168c3f12';
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

export const fetchMovies = async (year, genreIds = []) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        api_key: API_KEY,
        sort_by: 'popularity.desc',
        primary_release_year: year,
        vote_count_gte: 100,
        with_genres: genreIds.join(','), // Join genre IDs for multiple selections
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error.response?.data || error.message);
    return [];
  }
};
