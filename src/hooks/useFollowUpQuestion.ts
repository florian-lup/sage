import { useState, useCallback, useRef } from "react";
import { UseFollowUpQuestionResult } from "../types/hooks";
import { SearchRequestBody } from "../types/api";
import { SearchResponse } from "../types/search";
import { useFetch } from "./useFetch";

export function useFollowUpQuestion(): UseFollowUpQuestionResult {
  const [followUpQuery, setFollowUpQuery] = useState("");
  const [followUpAnswer, setFollowUpAnswer] = useState("");
  const { loading: isLoading, fetchData } = useFetch<SearchResponse>();
  const activeRequestRef = useRef(false);

  const handleFollowUpQuestion = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpQuery.trim() || activeRequestRef.current) return;
    
    // Track active request to prevent duplicates
    activeRequestRef.current = true;
    
    const requestBody: SearchRequestBody = {
      query: followUpQuery,
      isFollowUp: true
    };
    
    const result = await fetchData("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    
    if (result) {
      setFollowUpAnswer(result.answer);
    }
    
    setFollowUpQuery("");
    // Reset active request tracker
    activeRequestRef.current = false;
  }, [followUpQuery, fetchData]);

  return {
    followUpQuery,
    followUpAnswer,
    isLoading,
    setFollowUpQuery,
    handleFollowUpQuestion
  };
} 