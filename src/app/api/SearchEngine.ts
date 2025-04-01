import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import { TavilyClient } from "tavily";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { SearchResultItem, SearchResponse } from "../../types/search";
import { TavilySearchParams } from "../../types/api";

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

    // Initialize Fireworks model
    this.llmModel = new ChatFireworks({
      modelName: "accounts/fireworks/models/llama-v3p3-70b-instruct", // Default model
      temperature: 0.5,
      fireworksApiKey: process.env.FIREWORKS_API_KEY as string,
    });

    // Initialize conversation chain with memory
    this.chain = new ConversationChain({
      llm: this.llmModel,
      memory: this.memory,
    });
  }

  async search(query: string, isFollowUp: boolean = false): Promise<SearchResponse> {
    try {
      // Skip search for follow-up questions
      let sources: SearchResultItem[] = [];
      
      if (!isFollowUp) {
        // Create search parameters
        const searchParams: TavilySearchParams = {
          query: query,
          max_results: 10,
          search_depth: "basic" as "basic" | "advanced",
        };
        
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
          
          Formulate a comprehensive and informative answer following these guidelines:

          1. Content and Structure:
          - Start with a clear, concise main title that captures the essence of the query
          - Organize information logically with appropriate section headings
          - Present information in a clear, hierarchical structure
          - Use short paragraphs with clear transitions between ideas
          
          2. Information Handling:
          - Synthesize information from multiple sources to provide a complete picture
          - If sources contain conflicting information, acknowledge the discrepancies
          - For technical queries, include relevant technical details while maintaining readability
          - For general knowledge queries, focus on key concepts and practical applications
          
          Remember to:
          - Keep the answer focused and relevant to the query
          - Use appropriate formatting to improve readability
          - Maintain consistency in style and tone throughout
          - Provide clear explanations for complex concepts
          - Respond in the same language as the results
          - Don't include citations or links in the answer
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
    } catch {
      throw new Error("An error occurred during the search.");
    }
  }
}
