import { useState, useMemo } from "react";
import { DomainOption, UseDomainFilterResult } from "../types/hooks";

export function useDomainFilter(): UseDomainFilterResult {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  
  const domainOptions = useMemo<DomainOption[]>(() => [
    { value: null, label: "All" },
    // Popular TLDs
    { value: ".com", label: ".com" },
    { value: ".org", label: ".org" },
    { value: ".net", label: ".net" },
    { value: ".io", label: ".io" },
    { value: ".info", label: ".info" },
    { value: ".edu", label: ".edu" },
    { value: ".gov", label: ".gov" },
    { value: ".ai", label: ".ai" },
    { value: ".app", label: ".app" },
    { value: ".dev", label: ".dev" },
    { value: ".co", label: ".co" },
    { value: ".tech", label: ".tech" },
    { value: ".me", label: ".me" },
    { value: ".biz", label: ".biz" },
    { value: ".shop", label: ".shop" },
    { value: ".blog", label: ".blog" },
    { value: ".cloud", label: ".cloud" },
    { value: ".online", label: ".online" },
    { value: ".site", label: ".site" },
    // Country-specific domains
    { value: ".ro", label: ".ro" },
    { value: ".co.uk", label: ".co.uk" },
    { value: ".eu", label: ".eu" },
    { value: ".de", label: ".de" },
    { value: ".fr", label: ".fr" },
    { value: ".es", label: ".es" },
    { value: ".it", label: ".it" },
    { value: ".us", label: ".us" },
    { value: ".ca", label: ".ca" },
    { value: ".au", label: ".au" },
    { value: ".nz", label: ".nz" },
    { value: ".jp", label: ".jp" },
    { value: ".cn", label: ".cn" },
    { value: ".in", label: ".in" },
    { value: ".br", label: ".br" },
    { value: ".mx", label: ".mx" },
    { value: ".za", label: ".za" },
    { value: ".ru", label: ".ru" },
    { value: ".nl", label: ".nl" },
    { value: ".se", label: ".se" },
    { value: ".ch", label: ".ch" },
    { value: ".at", label: ".at" },
    { value: ".pl", label: ".pl" },
    { value: ".be", label: ".be" },
    { value: ".dk", label: ".dk" },
    { value: ".fi", label: ".fi" },
    { value: ".gr", label: ".gr" },
    { value: ".hu", label: ".hu" },
    { value: ".ie", label: ".ie" },
    { value: ".no", label: ".no" },
    { value: ".pt", label: ".pt" },
    { value: ".cz", label: ".cz" },
    { value: ".ua", label: ".ua" },
    { value: ".hr", label: ".hr" },
    { value: ".bg", label: ".bg" },
    { value: ".sk", label: ".sk" },
    { value: ".si", label: ".si" },
    { value: ".lt", label: ".lt" },
    { value: ".lv", label: ".lv" },
    { value: ".ee", label: ".ee" },
    { value: ".lu", label: ".lu" },
    { value: ".cy", label: ".cy" },
    { value: ".mt", label: ".mt" },
    { value: ".tr", label: ".tr" },
  ], []);

  const getSelectedLabel = (): string => {
    return domainOptions.find(option => option.value === selectedDomain)?.label || "All";
  };

  const getIncludeDomains = (): string[] | undefined => {
    return selectedDomain ? [selectedDomain] : undefined;
  };

  return {
    selectedDomain,
    setSelectedDomain,
    domainOptions,
    getSelectedLabel,
    getIncludeDomains
  };
} 