// API types
export interface SearchRequestBody {
  query: string;
  includeDomains?: string[];
  isFollowUp?: boolean;
}

export interface TavilySearchParams {
  query: string;
  max_results: number;
  search_depth: "basic" | "advanced";
  include_answer: boolean;
  include_domains?: string[];
} 