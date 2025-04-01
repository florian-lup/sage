# AI Search Engine

A Next.js application that uses Tavily API for searching and Fireworks AI (Llama v3.3) for generating concise answers in English.

## Features

- Search for information using Tavily API
- Generate concise answers in English using Fireworks AI's Llama v3.3 model
- Display search results with source links
- Filter results by domain extensions

## Technologies Used

- Next.js
- TypeScript
- LangChain
- Tavily API
- Fireworks AI
- TailwindCSS

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- Tavily API key
- Fireworks API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following variables:
   ```
   TAVILY_API_KEY=your_tavily_api_key
   FIREWORKS_API_KEY=your_fireworks_api_key
   AI_MODEL=fireworks
   ```

### Running the Application

```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Usage

1. Enter your query in the search box
2. Click "Search"
3. View the generated answer in English
4. Browse the sources used to generate the answer

## Configuration

The search engine is configured with the following settings:

- Maximum results: 10
- Search depth: Basic
- Optional domain filtering
- Language: English
- AI Model: Fireworks AI's Llama v3.3 70B

## License

MIT
