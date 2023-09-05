import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_TMDB_APIKEY;
const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASEURL;

export const getMoviesList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    return response.data.results; 
  } catch (error) {
    console.error("Error fetching movie list:", error);
    return []; 
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/upcoming?api_key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};

export const getMovieDetails = async (movieId: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}?api_key=${apiKey}`
    );
    return response.data; // Mengembalikan seluruh detail film
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null; // Mengembalikan null jika terjadi kesalahan
  }
};

export const getMovieGenres = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/genre/movie/list?api_key=${apiKey}`
    );
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    return [];
  }
};