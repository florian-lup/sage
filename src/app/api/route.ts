import { NextRequest, NextResponse } from "next/server";
import { SearchEngine } from "./SearchEngine";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    console.log("🌐 API Request received with query:", query);

    if (!query || typeof query !== "string") {
      console.log("⚠️ Invalid query received:", query);
      return NextResponse.json(
        { error: "Vă rugăm să furnizați o interogare validă." },
        { status: 400 }
      );
    }

    console.log("🔄 Initializing search engine...");
    const searchEngine = new SearchEngine();
    
    console.log("🚀 Executing search for:", query);
    const startTime = Date.now();
    const result = await searchEngine.search(query);
    const endTime = Date.now();
    
    console.log(`✅ Search completed in ${endTime - startTime}ms`);
    console.log(`📝 Answer length: ${result.answer.length} characters`);
    console.log(`📚 Number of sources: ${result.sources.length}`);

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Error in search API:", error);
    return NextResponse.json(
      { error: "A apărut o eroare în timpul procesării cererii." },
      { status: 500 }
    );
  }
}
