// Search result types
export interface SearchResultItem {
  title: string;
  url: string;
  content: string;
  score: string | number;
  raw_content?: string;
}

export interface SearchResponse {
  answer: string;
  sources: SearchResultItem[];
} 