import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function runClient() {
  // 1. Configurar o transporte para ligar ao processo do servidor
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["tsx", "src/server.ts"],
  });

  const client = new Client(
    {
      name: "MovieClient",
      version: "1.0.0",
    },
    {
      capabilities: {},
    },
  );

  // 2. Conectar ao servidor
  await client.connect(transport);

  // 3. Chamar a ferramenta que criámos no servidor
  const result = await client.callTool({
    name: "search_movie",
    arguments: { title: "Inception" },
  });

  console.log("Resultado da Recomendação:");
  console.log(result.content);
}

runClient().catch(console.error);
