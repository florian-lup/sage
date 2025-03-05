# AI Search Engine

A Next.js application that uses Tavily API for searching Romanian domains and GPT-4o for generating concise answers in Romanian.

## Features

- Search for information using Tavily API
- Focus on Romanian domains (.ro)
- Generate concise answers in Romanian using GPT-4o
- Display search results with source links

## Technologies Used

- Next.js
- TypeScript
- LangChain
- Tavily API
- OpenAI GPT-4o
- TailwindCSS

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- Tavily API key
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following variables:
   ```
   TAVILY_API_KEY=your_tavily_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

### Running the Application

```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Usage

1. Enter your query in the search box
2. Click "Caută" (Search)
3. View the generated answer in Romanian
4. Browse the sources used to generate the answer

## Configuration

The search engine is configured with the following settings:

- Maximum results: 5
- Search depth: Advanced
- Include domains: .ro (Romanian websites)
- Language: Romanian

## License

MIT
