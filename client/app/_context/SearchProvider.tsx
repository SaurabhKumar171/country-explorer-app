"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Country, PaginationInfo } from "../_types/country";

// Define the shape of the context state
interface SearchContextType {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  continent: string;
  setContinent: Dispatch<SetStateAction<string>>;
  results: Country[];
  setResults: Dispatch<SetStateAction<Country[]>>;
  pagination: PaginationInfo | null;
  setPagination: Dispatch<SetStateAction<PaginationInfo | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

// Create the context with a default undefined value
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Custom hook to use the search context
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// The provider component
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [continent, setContinent] = useState<string>("");
  const [results, setResults] = useState<Country[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const value: SearchContextType = {
    searchTerm,
    setSearchTerm,
    continent,
    setContinent,
    results,
    setResults,
    pagination,
    setPagination,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
