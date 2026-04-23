import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tmdbService } from "../services/tmdb.service.js";

export const registerSearchMovie = (server: McpServer) => {
  server.registerTool(
    "search_movie",
    {
      description: "Busca filmes pelo título",
      inputSchema: {
        title: z.string().describe("Título do filme"),
      },
    },
    async ({ title }) => {
      const movies = await tmdbService.search(title);
      return {
        content: [{ type: "text", text: JSON.stringify(movies.slice(0, 3)) }],
      };
    },
  );
};
