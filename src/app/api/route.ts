import { NextRequest, NextResponse } from "next/server";
import { SearchEngine } from "./SearchEngine";
import { SearchRequestBody } from "../../types/api";
import { SearchResponse } from "../../types/search";

// Create a global instance of the search engine to maintain memory across requests
let globalSearchEngine: SearchEngine | null = null;

export async function POST(request: NextRequest) {
  try {
    const { query, includeDomains, isFollowUp = false } = await request.json() as SearchRequestBody;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid query." },
        { status: 400 }
      );
    }

    // Use singleton pattern to maintain memory across requests
    if (!globalSearchEngine) {
      globalSearchEngine = new SearchEngine();
    }
    
    const result: SearchResponse = await globalSearchEngine.search(query, includeDomains, isFollowUp);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
