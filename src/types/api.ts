// API request body types
export interface SearchRequestBody {
  query: string;
  isFollowUp?: boolean;
}

// API response types
export interface ApiErrorResponse {
  error: string;
}

// Search parameters
export interface SearchParams {
  q?: string;
}

export interface TavilySearchParams {
  query: string;
  max_results: number;
  search_depth: "basic" | "advanced";
  include_answer?: boolean;
} 