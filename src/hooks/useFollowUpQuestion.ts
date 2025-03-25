import { useState } from "react";
import { UseFollowUpQuestionResult } from "../types/hooks";
import { SearchRequestBody } from "../types/api";
import { SearchResponse } from "../types/search";

export function useFollowUpQuestion(): UseFollowUpQuestionResult {
  const [followUpQuery, setFollowUpQuery] = useState("");
  const [followUpAnswer, setFollowUpAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowUpQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const requestBody: SearchRequestBody = {
        query: followUpQuery,
        isFollowUp: true
      };
      
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error("Failed to get answer");
      }
      
      const data = await response.json() as SearchResponse;
      setFollowUpAnswer(data.answer);
    } catch (error) {
      console.error("Error asking follow-up question:", error);
    } finally {
      setIsLoading(false);
      setFollowUpQuery("");
    }
  };

  return {
    followUpQuery,
    followUpAnswer,
    isLoading,
    setFollowUpQuery,
    handleFollowUpQuestion
  };
} 