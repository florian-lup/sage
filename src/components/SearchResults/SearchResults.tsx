"use client";

import { SearchResultsProps } from "../../types/components";
import { BsQuestionCircleFill } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";
import { useFollowUpQuestion } from "../../hooks";

// Reusable markdown components configuration
const markdownComponents: Components = {
  h1: (props) => <h1 className="text-2xl font-bold mb-4 text-[var(--foreground)] border-b pb-2 border-[var(--border)]" {...props} />,
  h2: (props) => <h2 className="text-xl font-bold mb-3 text-[var(--foreground)] mt-6" {...props} />,
  h3: (props) => <h3 className="text-lg font-bold mb-2 text-[var(--foreground)] mt-4" {...props} />,
  h4: (props) => <h4 className="text-base font-bold mb-2 text-[var(--foreground)] mt-3" {...props} />,
  h5: (props) => <h5 className="text-sm font-bold mb-1 text-[var(--foreground)] mt-3" {...props} />, 
  h6: (props) => <h6 className="text-xs font-bold mb-1 text-[var(--foreground)] mt-2" {...props} />,
  p: (props) => <p className="mb-4 last:mb-0 text-[var(--foreground)] leading-relaxed" {...props} />,
  ul: (props) => <ul className="mb-4 pl-5 space-y-2 list-disc marker:text-[var(--primary)]" {...props} />,
  ol: (props) => <ol className="mb-4 pl-5 space-y-2 list-decimal marker:text-[var(--primary)]" {...props} />,
  li: (props) => <li className="text-[var(--foreground)] pl-1" {...props} />,
  a: (props) => <a className="text-[var(--primary)] hover:underline transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
  strong: (props) => <strong className="font-bold text-[var(--foreground)]" {...props} />,
  em: (props) => <em className="italic text-[var(--foreground)]" {...props} />,
  blockquote: (props) => <blockquote className="pl-4 border-l-4 border-[var(--primary)] opacity-90 my-4 italic" {...props} />,
  code: (props) => <code className="bg-[var(--secondary)] px-1.5 py-0.5 rounded font-mono text-sm" {...props} />,
  pre: (props) => <pre className="bg-[var(--secondary)] p-4 rounded-md font-mono text-sm overflow-x-auto my-4 border border-[var(--border)]" {...props} />
};

export default function SearchResults({ answer, sources, query = "" }: SearchResultsProps) {
  const { 
    followUpQuery, 
    followUpAnswer, 
    isLoading, 
    setFollowUpQuery,
    handleFollowUpQuestion 
  } = useFollowUpQuestion();

  if (!answer && sources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 sm:space-y-8 mt-4">
      {answer && (
        <div className="backdrop-blur-sm bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 sm:p-4 shadow-md">
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[var(--primary)] flex items-center justify-center mr-2">
                <BsQuestionCircleFill className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-medium">Answer for: <span className="text-[var(--primary)]">{query}</span></span>
            </div>
            <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
              <ReactMarkdown components={markdownComponents}>
                {answer}
              </ReactMarkdown>
            </div>
          </div>
          
          {/* Follow-up question input */}
          <div className="mt-4 sm:mt-6 pt-4 border-t border-[var(--border)]">
            <form onSubmit={handleFollowUpQuestion} className="flex items-center">
              <input
                type="text"
                value={followUpQuery}
                onChange={(e) => setFollowUpQuery(e.target.value)}
                placeholder="Ask a follow-up question..."
                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[16px] sm:text-base"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="ml-2 p-2 rounded-lg bg-[var(--primary)] text-white disabled:opacity-50"
                disabled={isLoading || !followUpQuery.trim()}
              >
                {isLoading ? (
                  <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                ) : (
                  <IoSend className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </form>
          </div>
          
          {/* Follow-up answer display */}
          {followUpAnswer && (
            <div className="mt-4 sm:mt-6 pt-4 border-t border-[var(--border)]">
              <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
                <ReactMarkdown components={markdownComponents}>
                  {followUpAnswer}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      )}

      {sources.length > 0 && (
        <div className="backdrop-blur-sm bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 sm:p-4 shadow-md">
          <div className="flex items-center mb-4">
            <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[var(--secondary)] flex items-center justify-center mr-2">
              <HiOutlineDocumentText className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--muted)]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-[var(--muted)]">Web sources ({sources.length})</span>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {sources.map((source, index) => (
              <a 
                key={index} 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:bg-[var(--secondary)] rounded-lg p-2 sm:p-3 transition-colors"
              >
                <div className="mb-1 text-[var(--primary)] text-xs sm:text-sm font-medium line-clamp-1 hover:underline">
                  {source.title || 'Untitled source'}
                </div>
                <div className="text-xs text-[var(--muted)] mb-1 sm:mb-2 line-clamp-1">
                  {source.url}
                </div>
                <div className="text-xs sm:text-sm line-clamp-2 text-[var(--foreground)]">
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