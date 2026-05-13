import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tmdbService } from "../services/tmdb.service.js";

export const registerSearchMovie = (server: McpServer) => {
  server.registerTool(
    "search_movie_by_title",
    {
      description: "Busca filmes pelo título",
      inputSchema: {
        title: z.string().describe("Título do filme"),
      },
    },
    async ({ title }) => {
      const movies = await tmdbService.search(title);
      return {
        content: [{ type: "text", text: JSON.stringify(movies) }],
      };
    },
  );

  server.registerTool(
    "get_recommendations_by_id",
    {
      description: "Obtém recomendações de filmes baseado em um ID de filme",
      inputSchema: {
        movieId: z.number().describe("ID do filme para obter recomendações"),
      },
    },
    async ({ movieId }) => {
      const recommendations = await tmdbService.getRecommendations(movieId);
      return {
        content: [{ type: "text", text: JSON.stringify(recommendations) }],
      };
    },
  );
};
