"use client";

import { SearchResultItem } from "../types";
import { BsQuestionCircleFill } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useMemo } from "react";

interface SearchResultsProps {
  answer: string;
  sources: SearchResultItem[];
  query?: string;
}

// Helper function to format the answer text with basic markdown-like formatting
const formatAnswerText = (text: string) => {
  if (!text) return [];

  // Split the text into paragraphs
  const paragraphs = text.split('\n').filter(p => p.trim() !== '');
  
  return paragraphs.map((paragraph, index) => {
    // Check for headings (lines starting with # or ##)
    if (paragraph.startsWith('# ')) {
      return {
        type: 'heading1',
        content: paragraph.substring(2),
        key: `h1-${index}`
      };
    } else if (paragraph.startsWith('## ')) {
      return {
        type: 'heading2',
        content: paragraph.substring(3),
        key: `h2-${index}`
      };
    } else if (paragraph.startsWith('### ')) {
      return {
        type: 'heading3',
        content: paragraph.substring(4),
        key: `h3-${index}`
      };
    }
    
    // Check for bullet points (lines starting with - or *)
    else if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
      return {
        type: 'bullet',
        content: paragraph.substring(2),
        key: `bullet-${index}`
      };
    }
    
    // Check for numbered lists (lines starting with 1., 2., etc.)
    else if (/^\d+\.\s/.test(paragraph)) {
      const number = parseInt(paragraph.match(/^(\d+)\.\s/)?.[1] || '1', 10);
      const content = paragraph.substring(paragraph.indexOf('.') + 2);
      
      return {
        type: 'numbered',
        number,
        content,
        key: `numbered-${index}`
      };
    }
    
    // Regular paragraph
    else {
      return {
        type: 'paragraph',
        content: paragraph,
        key: `p-${index}`
      };
    }
  });
};

export default function SearchResults({ answer, sources, query = "" }: SearchResultsProps) {
  // Format the answer text
  const formattedAnswer = useMemo(() => formatAnswerText(answer), [answer]);
  
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
              {formattedAnswer.map((item) => {
                switch (item.type) {
                  case 'heading1':
                    return <h1 key={item.key} className="text-2xl font-bold mb-3 text-[var(--foreground)]">{item.content}</h1>;
                  case 'heading2':
                    return <h2 key={item.key} className="text-xl font-bold mb-2 text-[var(--foreground)]">{item.content}</h2>;
                  case 'heading3':
                    return <h3 key={item.key} className="text-lg font-bold mb-2 text-[var(--foreground)]">{item.content}</h3>;
                  case 'bullet':
                    return (
                      <div key={item.key} className="flex items-start mb-2">
                        <span className="mr-2 mt-1">•</span>
                        <p className="text-[var(--foreground)] leading-relaxed">{item.content}</p>
                      </div>
                    );
                  case 'numbered':
                    return (
                      <div key={item.key} className="flex items-start mb-2">
                        <span className="mr-2 font-medium">{item.number}.</span>
                        <p className="text-[var(--foreground)] leading-relaxed">{item.content}</p>
                      </div>
                    );
                  default:
                    return <p key={item.key} className="mb-4 last:mb-0 text-[var(--foreground)] leading-relaxed">{item.content}</p>;
                }
              })}
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