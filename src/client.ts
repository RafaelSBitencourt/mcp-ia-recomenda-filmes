import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.json());
// Serve arquivos estáticos (como o nosso HTML) da pasta 'public'
app.use(express.static("public"));

async function startMcpAndServer() {
  // 1. Inicia o transporte do MCP
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["tsx", "src/server.ts"],
  });

  const mcpClient = new Client(
    {
      name: "movie-web-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    },
  );

  await mcpClient.connect(transport);
  console.log("✅ Conectado ao Servidor MCP");

  // 2. Rota para processar a busca do navegador
  app.post("/api/buscar", async (req, res) => {
    const { titulo } = req.body;

    if (typeof titulo !== "string") {
      return res.status(400).json({ error: "Título inválido" });
    }

    try {
      const response = await mcpClient.callTool({
        name: "search_movie",
        arguments: { title: titulo },
      });
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Erro ao chamar ferramenta MCP" });
      console.error(error);
    }
  });

  app.listen(port, () => {
    console.log(`🚀 Cliente Web rodando em http://localhost:${port}`);
  });
}

startMcpAndServer().catch(console.error);
