import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdbService = {
  async search(title: string) {
    const { data } = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query: title, language: "pt-BR" },
    });
    return data.results;
  },

  async getRecommendations(movieId: number) {
    const { data } = await axios.get(
      `${BASE_URL}/movie/${movieId}/recommendations`,
      {
        params: { api_key: API_KEY, language: "pt-BR" },
      },
    );
    return data.results;
  },
};
