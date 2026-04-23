# 🎬 MCP Movie Recommender

Este projeto é um ecossistema Model Context Protocol (MCP) desenvolvido com Node.js e TypeScript. Ele atua como um "agente de cinema", conectando Modelos de Linguagem (como o Claude) à API do The Movie Database (TMDb) para buscar informações e recomendar filmes de forma inteligente.

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura modular baseada no padrão do protocolo MCP:

- MCP Server: O "cérebro" que detém as ferramentas (tools) e se comunica com a API do TMDb.

- MCP Client: A interface (Terminal ou Web) que consome as ferramentas do servidor.

- Transporte: Comunicação via Stdio para integração local e processos filhos.

## 📂 Estrutura de Pastas

src/
├── services/ # Lógica de comunicação com APIs externas (TMDb)
├── tools/ # Definição e schemas (Zod) das ferramentas MCP
├── public/ # Interface Web (HTML/CSS)
├── server.ts # Inicialização do Servidor MCP
└── client.ts # Cliente Express (Web) e interface de usuário

## 🛠️ Pré-requisitos

- Node.js (v18 ou superior)

- NPM

- Chave de API do TMDb: Obtenha em themoviedb.org

## 🚀 Como Instalar

1. Clone o repositório:
   ˋˋˋ
   git clone <url-do-repositorio>
   cd mcp-movie-recommender
   ˋˋˋ
2. Instale as dependências:
   ˋˋˋ
   npm install
   ˋˋˋ
3. Configure as variáveis de ambiente:
   Crie um arquivo .env na raiz e adicione sua chave
   ```
   TMDB_API_KEY=seu_token_aqui
   ```

## 💻 Como Executar

1. Interface Web (Recomendado)
   Para rodar o cliente web com interface gráfica:

```
npx tsx src/client.ts
```

Acesse: http://localhost:3000

2. MCP Inspector (Para Debug)Para testar as ferramentas visualmente sem o cliente:

```
npx @modelcontextprotocol/inspector npx tsx src/server.ts
```

3. Integração com Claude CodePara usar o servidor diretamente no terminal com a IA da Anthropic:Bash

```
claude --mcp "npx tsx src/server.ts"
```
