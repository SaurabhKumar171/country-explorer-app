"use client";

import React from "react";
import Link from "next/link";
import { Select } from "../ui/Select";
import { SearchBar } from "../SearchBar";
import { FiGlobe, FiSliders, FiChevronDown } from "react-icons/fi";

interface SearchHeaderProps {
  sortValue: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  sortValue,
  onSortChange,
}) => {
  return (
    <header className="bg-gray-900/70 backdrop-blur-lg shadow-lg sticky top-0 z-20 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 min-h-20 py-4 md:py-0">
          {/* Left Side: Logo/Brand */}
          <div className="hidden md:flex">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
            >
              <FiGlobe />
              <span className="hidden lg:inline">Explorer</span>
            </Link>
          </div>

          {/* Center: Search Bar */}
          <div className="w-full md:w-auto md:flex-grow md:max-w-xl">
            <SearchBar compact={true} />
          </div>

          {/* Right Side: Sort Options */}
          <div className="hidden md:flex items-center justify-end gap-3">
            <label
              htmlFor="sort-by"
              className="font-semibold text-sm text-gray-300 flex items-center gap-2 shrink-0"
            >
              <FiSliders />
              <span>Sort by:</span>
            </label>
            <div className="relative">
              <Select
                id="sort-by"
                value={sortValue}
                onChange={onSortChange}
                className="w-48 h-12 !pl-4 !pr-10 !bg-gray-800/50 border-gray-700 text-white appearance-none focus:!ring-2 focus:!ring-blue-500/50 transition-all duration-300"
              >
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="population_desc">Population (High-Low)</option>
                <option value="population_asc">Population (Low-High)</option>
                <option value="capital_asc">Capital (A-Z)</option>
                <option value="capital_desc">Capital (Z-A)</option>
                <option value="currency_asc">Currency (A-Z)</option>
                <option value="currency_desc">Currency (Z-A)</option>
              </Select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <FiChevronDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
