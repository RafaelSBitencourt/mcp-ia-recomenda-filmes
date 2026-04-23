import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSearchMovie } from "./tools/searchMovie.js";

const server = new McpServer({
  name: "movie-recommender",
  version: "1.0.0",
});

// Registro centralizado das ferramentas
registerSearchMovie(server);

export async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server modularizado e rodando!");
}

main().catch((error) => {
  console.error("Erro ao iniciar o servidor:", error);
  process.exit(1);
});
