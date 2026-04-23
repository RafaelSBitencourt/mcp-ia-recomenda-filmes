import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

// 1. Inicialização do Servidor
const server = new McpServer({
  name: "movie-recommender",
  version: "1.0.0",
});

const TMDB_API_KEY = "a6c7d19cc3b33fabc99cd39fc2964b7a";
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Registro da ferramenta de busca de filmes
 * Seguindo o padrão: registerTool(name, options, handler)
 */
server.registerTool(
  "search_movie",
  {
    description: "Procura filmes no The Movie Database pelo título",
    inputSchema: {
      title: z
        .string()
        .min(1)
        .describe("O título do filme para pesquisar (ex: Inception)"),
    },
  },
  async ({ title }) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          query: title,
          language: "pt-PT",
        },
      });

      const movies = response.data.results.slice(0, 3);

      if (movies.length === 0) {
        return {
          content: [
            { type: "text", text: `Nenhum filme encontrado para: ${title}` },
          ],
        };
      }

      const formattedList = movies
        .map(
          (m: any) =>
            `ID: ${m.id} | Título: ${m.title} (${m.release_date?.split("-")[0]})\nSinopse: ${m.overview}\n---`,
        )
        .join("\n\n");

      return {
        content: [
          {
            type: "text",
            text: `Resultados para "${title}":\n\n${formattedList}`,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Erro ao consultar a API: ${error.message}`,
          },
        ],
      };
    }
  },
);

// 2. Conexão via Transporte Stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Movie Server a correr via Stdio");
}

main().catch(console.error);
