import { ChatOpenAI } from "@langchain/openai";
import { TavilyClient } from "tavily";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { SearchResultItem } from "../../types";

export class SearchEngine {
  private tavilyClient: TavilyClient;
  private llmModel: BaseChatModel;

  constructor() {
    // Initialize Tavily client
    this.tavilyClient = new TavilyClient({
      apiKey: process.env.TAVILY_API_KEY as string,
    });

    // Determine which model to use based on environment variable
    const modelType = process.env.AI_MODEL?.toLowerCase() || 'openai';
    
    // Initialize the selected LLM model
    if (modelType === 'gemini') {
      this.llmModel = new ChatGoogleGenerativeAI({
        modelName: "gemini-2.0-flash",
        temperature: 0.5,
        apiKey: process.env.GOOGLE_API_KEY as string,
      });
    } else {
      // Default to OpenAI
      this.llmModel = new ChatOpenAI({
        modelName: "gpt-4o",
        temperature: 0.5,
        openAIApiKey: process.env.OPENAI_API_KEY as string,
      });
    }
  }

  async search(query: string): Promise<{ answer: string; sources: SearchResultItem[] }> {
    try {
      // Create search parameters
      const searchParams = {
        query: query,
        max_results: 5,
        search_depth: "basic" as "basic" | "advanced",
        include_answer: true,
        include_domains: [".ro"],
      };
      
      console.log("🔍 Search query sent to Tavily:", query);
      console.log("🔍 Tavily search parameters:", searchParams);
      
      // Search with Tavily API
      const searchResults = await this.tavilyClient.search(searchParams);

      console.log("📊 Full Tavily response:", JSON.stringify(searchResults, null, 2));
      
      // Extract sources
      const sources = searchResults.results as SearchResultItem[];
      
      console.log(`📑 Number of sources extracted: ${sources.length}`);
      console.log("📑 Source titles:");
      sources.forEach((source, i) => {
        console.log(`  ${i+1}. ${source.title} (Score: ${source.score})`);
      });

      // Generate a concise answer in Romanian with basic Markdown formatting
      const prompt = `
        Bazat pe următoarele rezultate de căutare despre "${query}":
        
        ${sources.map((source, index) => 
          `[${index + 1}] ${source.title}
           URL: ${source.url}
           Conținut: ${source.content}
          `
        ).join('\n\n')}
        
        Formulează un răspuns concis și informativ în limba română. 
        Răspunsul ar trebui să sintetizeze informațiile relevante din rezultatele căutării.
        Dacă rezultatele nu oferă informații suficiente, menționează acest lucru.
        
        Folosește formatare Markdown de bază pentru a structura răspunsul:
        1. Folosește "# " pentru titluri principale
        2. Folosește "## " pentru subtitluri
        3. Folosește "### " pentru titluri de nivel 3
        4. Folosește "- " sau "* " pentru liste cu puncte
        5. Folosește "1. ", "2. " etc. pentru liste numerotate
        6. Folosește "**text**" pentru text bold
        7. Folosește "*text*" pentru text italic
        8. Folosește "> text" pentru citate
        
        Structurează răspunsul în mod clar, folosind titluri pentru secțiuni importante și liste pentru enumerări.
        Asigură-te că răspunsul este bine organizat și ușor de citit.
        
        Exemple de formatare Markdown corectă:
        
        # Titlu principal
        
        Acesta este un paragraf cu **text bold** și *text italic*.
        
        ## Subtitlu
        
        - Punct 1 în listă
        - Punct 2 în listă cu **text important**
        
        1. Primul element numerotat
        2. Al doilea element numerotat
        
        > Acesta este un citat
      `;

      const response = await this.llmModel.invoke(prompt);
      
      return {
        answer: response.content.toString(),
        sources,
      };
    } catch (error) {
      console.error("❌ Error in search:", error);
      throw new Error("A apărut o eroare în timpul căutării.");
    }
  }
}
