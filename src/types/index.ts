export interface SearchResultItem {
  title: string;
  url: string;
  content: string;
  score: string | number;
  raw_content?: string;
}

export interface SearchResultsProps {
  answer: string;
  sources: SearchResultItem[];
  query?: string;
} 