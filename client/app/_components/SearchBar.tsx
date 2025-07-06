"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { getContinents, getSuggestions } from "../_services/countryService";
import { useDebounce } from "../_hooks/useDebounce";
import { FiSearch, FiLoader } from "react-icons/fi";
import { Country } from "../_types/country";

interface SearchBarProps {
  compact?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ compact = false }) => {
  const router = useRouter();
  const searchBarRef = useRef<HTMLFormElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [continent, setContinent] = useState("");
  const [allContinents, setAllContinents] = useState<string[]>([]);

  // State for suggestions
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch continents for the dropdown on component mount
  useEffect(() => {
    const fetchContinents = async () => {
      try {
        const continentData = await getContinents();
        setAllContinents(continentData);
      } catch (error) {
        console.error("Failed to fetch continents:", error);
      }
    };
    fetchContinents();
  }, []);

  // This effect fetches suggestions from the server when the user stops typing
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchTerm.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        setNoResults(false);
        return;
      }
      setIsLoadingSuggestions(true);
      setNoResults(false);
      try {
        const suggestionData = await getSuggestions(debouncedSearchTerm);
        setSuggestions(suggestionData);
        if (suggestionData.length === 0) {
          setNoResults(true);
        }
        setShowSuggestions(true);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm]);

  // Effect to handle clicks outside to close the suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handles form submission (Enter key or Search button)
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuggestions(false);
    const params = new URLSearchParams();
    if (searchTerm) params.set("name", searchTerm);
    if (continent) params.set("continent", continent);
    router.push(`/search?${params.toString()}`);
  };

  // Handles clicking on a specific suggestion
  const handleSuggestionClick = (countryName: string) => {
    setSearchTerm(countryName);
    setShowSuggestions(false);
    router.push(`/search?name=${encodeURIComponent(countryName)}`);
  };

  // --- Style Definitions for Consistency ---
  const commonInputStyles =
    "h-12 focus:!ring-2 focus:!ring-blue-500/50 transition-all duration-300";
  const iconWrapperStyles =
    "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl";

  const compactInputClass = `${commonInputStyles} !pl-12 !pr-4 !bg-gray-800/50 border-gray-700 text-white placeholder-gray-400`;
  const heroInputClass = `${commonInputStyles} !pl-12 !pr-4 !bg-white/10 !border-white/20 !text-white !placeholder-gray-300 !text-lg`;

  const compactSelectClass = `${commonInputStyles} !px-4 !bg-gray-800/50 border-gray-700 text-white`;
  const heroSelectClass = `${commonInputStyles} !px-4 !bg-white/10 !border-white/20 !text-white !text-lg`;

  return (
    <form
      onSubmit={handleFormSubmit}
      ref={searchBarRef}
      className={compact ? "w-full" : "space-y-4"}
    >
      <div
        className={
          compact ? "flex flex-col md:flex-row items-center gap-2" : "space-y-4"
        }
      >
        <div className="relative flex-grow w-full">
          <div className={iconWrapperStyles}>
            {isLoadingSuggestions ? (
              <FiLoader className="animate-spin" />
            ) : (
              <FiSearch />
            )}
          </div>
          <Input
            type="text"
            placeholder={compact ? "Search..." : "Type a country name..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0 || noResults) setShowSuggestions(true);
            }}
            aria-label="Country Name"
            className={compact ? compactInputClass : heroInputClass}
            autoComplete="off"
          />

          {showSuggestions && (suggestions.length > 0 || noResults) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-30 overflow-hidden animate-[fadeIn_0.2s]">
              {noResults ? (
                <p className="px-4 py-3 text-gray-400">No results found.</p>
              ) : (
                <ul>
                  {suggestions.map((country, index) => (
                    <li
                      key={country.cca3}
                      className={index > 0 ? "border-t border-gray-700" : ""}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          handleSuggestionClick(country.name.common)
                        }
                        className="w-full text-left px-4 py-3 text-white hover:bg-blue-500/20 transition-colors flex items-center gap-3"
                      >
                        <FiSearch className="text-gray-400" />
                        {country.name.common}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {!compact && (
          <div className="relative flex items-center !mt-2 !mb-2">
            <hr className="w-full border-gray-600" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-gray-800/80 px-2 text-gray-400 text-sm">
              OR
            </span>
          </div>
        )}

        <Select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          aria-label="Select Continent"
          className={compact ? compactSelectClass : heroSelectClass}
        >
          <option value="" className={compact ? "" : "text-black"}>
            {compact ? "All Continents" : "Select a continent"}
          </option>
          {allContinents.map((c) => (
            <option key={c} value={c} className={compact ? "" : "text-black"}>
              {c}
            </option>
          ))}
        </Select>

        <Button
          type="submit"
          className={
            compact
              ? `${commonInputStyles} !px-6 !w-full md:!w-auto !bg-blue-600 hover:!bg-blue-700`
              : `${commonInputStyles} !w-full !text-lg !font-bold flex items-center justify-center gap-2 !bg-blue-600 hover:!bg-blue-700`
          }
        >
          {compact ? "Search" : "Search Countries"}
        </Button>
      </div>
    </form>
  );
};
