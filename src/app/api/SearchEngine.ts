import { ChatOpenAI } from "@langchain/openai";
import { TavilyClient } from "tavily";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { SearchResultItem } from "../../types";

export class SearchEngine {
  private tavilyClient: TavilyClient;
  private llmModel: BaseChatModel;
  private memory: BufferMemory;
  private chain: ConversationChain;

  constructor() {
    // Initialize Tavily client
    this.tavilyClient = new TavilyClient({
      apiKey: process.env.TAVILY_API_KEY as string,
    });

    // Initialize memory
    this.memory = new BufferMemory();

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

    // Initialize conversation chain with memory
    this.chain = new ConversationChain({
      llm: this.llmModel,
      memory: this.memory,
    });
  }

  async search(query: string, includeDomains?: string[], isFollowUp: boolean = false): Promise<{ answer: string; sources: SearchResultItem[] }> {
    try {
      // Skip search for follow-up questions
      let sources: SearchResultItem[] = [];
      
      if (!isFollowUp) {
        // Create search parameters
        const searchParams: {
          query: string;
          max_results: number;
          search_depth: "basic" | "advanced";
          include_answer: boolean;
          include_domains?: string[];
        } = {
          query: query,
          max_results: 10,
          search_depth: "basic" as "basic" | "advanced",
          include_answer: false,
        };
        
        // Only add include_domains if it exists and has values
        if (includeDomains && includeDomains.length > 0) {
          searchParams.include_domains = includeDomains;
        }
        
        console.log("🔍 Search query sent to Tavily:", query);
        
        // Search with Tavily API
        const searchResults = await this.tavilyClient.search(searchParams);
        
        // Extract sources
        sources = searchResults.results as SearchResultItem[];
      }
      
      let answerText = "";

      if (isFollowUp) {
        // For follow-up questions, use the conversation chain directly
        const chainResponse = await this.chain.call({ input: query });
        answerText = chainResponse.response;
      } else {
        // For initial questions, use the search results to generate an answer
        const prompt = `
          Based on the following search results about "${query}":
          
          ${sources.map((source, index) => 
            `[${index + 1}] ${source.title}
             URL: ${source.url}
             Content: ${source.content}
            `
          ).join('\n\n')}
          
          Formulate a concise and informative answer in the same language as the search results.
          The answer should synthesize relevant information from the search results.
          If the results don't provide sufficient information, mention this.
          Do not include any inline citations, references, or source numbers in your answer.
          
          Use Markdown formatting to structure the answer clearly:
          1. Use "# " for main titles (use only one main title at the beginning)
          2. Use "## " for subtitles to organize major sections
          3. Use "### " for level 3 titles within sections
          4. Use "#### ", "##### ", "###### " for deeper heading levels if needed
          5. Use "- " or "* " for bullet lists
          6. Use "1. ", "2. " etc. for numbered lists
          7. Use "**text**" for bold text to emphasize important information
          8. Use "*text*" for italic text
          9. Use "> text" for quotes or important notes
          10. For code snippets or technical terms, use \`code\` for inline code
          11. For longer code blocks, use triple backticks:
              \`\`\`
              code block here
              \`\`\`
          
          Structure your answer with:
          - A clear main title (use # only once at the top)
          - Logical sections with subtitles (##, ###)
          - Short paragraphs with clear transitions
          - Lists for enumerated points or steps
          - Bold text to highlight key terms and concepts
        `;

        // Store initial question and answer in memory
        const initialResponse = await this.llmModel.invoke(prompt);
        answerText = initialResponse.content.toString();
        
        // Save to memory
        await this.memory.saveContext(
          { input: query },
          { output: answerText }
        );
      }
      
      return {
        answer: answerText,
        sources,
      };
    } catch (error) {
      console.error("❌ Error in search:", error);
      throw new Error("An error occurred during the search.");
    }
  }
}
