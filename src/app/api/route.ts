import { NextRequest, NextResponse } from "next/server";
import { SearchEngine } from "./SearchEngine";
import { SearchRequestBody } from "../../types/api";
import { SearchResponse } from "../../types/search";

// Create a global instance of the search engine to maintain memory across requests
let globalSearchEngine: SearchEngine | null = null;

export async function POST(request: NextRequest) {
  try {
    const { query, includeDomains, isFollowUp = false } = await request.json() as SearchRequestBody;
    console.log("🌐 API Request received with query:", query);

    if (!query || typeof query !== "string") {
      console.log("⚠️ Invalid query received:", query);
      return NextResponse.json(
        { error: "Please provide a valid query." },
        { status: 400 }
      );
    }

    // Use singleton pattern to maintain memory across requests
    if (!globalSearchEngine) {
      globalSearchEngine = new SearchEngine();
    }
    
    const startTime = Date.now();
    const result: SearchResponse = await globalSearchEngine.search(query, includeDomains, isFollowUp);
    const endTime = Date.now();
    
    console.log(`✅ Search completed in ${endTime - startTime}ms`);

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Error in search API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
