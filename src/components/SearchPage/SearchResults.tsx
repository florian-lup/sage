"use client";

import { SearchResultItem } from "../../types";
import { BsQuestionCircleFill } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import ReactMarkdown from "react-markdown";

interface SearchResultsProps {
  answer: string;
  sources: SearchResultItem[];
  query?: string;
}

export default function SearchResults({ answer, sources, query = "" }: SearchResultsProps) {
  if (!answer && sources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8 mt-4">
      {answer && (
        <div className="bg-[var(--background)] rounded-xl">
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <div className="h-6 w-6 rounded-full bg-[var(--primary)] flex items-center justify-center mr-2">
                <BsQuestionCircleFill className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium">Răspuns pentru: <span className="text-[var(--primary)]">{query}</span></span>
            </div>
            <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
              <ReactMarkdown 
                components={{
                  h1: (props) => <h1 className="text-2xl font-bold mb-3 text-[var(--foreground)]" {...props} />,
                  h2: (props) => <h2 className="text-xl font-bold mb-2 text-[var(--foreground)]" {...props} />,
                  h3: (props) => <h3 className="text-lg font-bold mb-2 text-[var(--foreground)]" {...props} />,
                  p: (props) => <p className="mb-4 last:mb-0 text-[var(--foreground)] leading-relaxed" {...props} />,
                  ul: (props) => <ul className="mb-4 pl-5 space-y-2" {...props} />,
                  ol: (props) => <ol className="mb-4 pl-5 space-y-2 list-decimal" {...props} />,
                  li: (props) => <li className="text-[var(--foreground)]" {...props} />,
                  a: (props) => <a className="text-[var(--primary)] hover:underline" {...props} />,
                  strong: (props) => <strong className="font-bold" {...props} />,
                  em: (props) => <em className="italic" {...props} />,
                  blockquote: (props) => <blockquote className="pl-4 border-l-4 border-[var(--muted)] italic my-4" {...props} />,
                  code: (props) => <code className="bg-[var(--secondary)] px-1 py-0.5 rounded text-sm" {...props} />,
                  pre: (props) => <pre className="bg-[var(--secondary)] p-3 rounded-md text-sm overflow-x-auto my-4" {...props} />
                }}
              >
                {answer}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {sources.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <div className="h-6 w-6 rounded-full bg-[var(--secondary)] flex items-center justify-center mr-2">
              <HiOutlineDocumentText className="h-4 w-4 text-[var(--muted)]" />
            </div>
            <span className="text-sm font-medium text-[var(--muted)]">Surse web ({sources.length})</span>
          </div>
          
          <div className="space-y-4">
            {sources.map((source, index) => (
              <a 
                key={index} 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:bg-[var(--secondary)] rounded-lg p-3 transition-colors"
              >
                <div className="mb-1 text-[var(--primary)] text-sm font-medium line-clamp-1 hover:underline">
                  {source.title || 'Sursă fără titlu'}
                </div>
                <div className="text-xs text-[var(--muted)] mb-2 line-clamp-1">
                  {source.url}
                </div>
                <div className="text-sm line-clamp-2 text-[var(--foreground)]">
                  {source.content.substring(0, 200)}
                  {source.content.length > 200 && '...'}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 