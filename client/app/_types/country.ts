// --- Type Definitions for API responses ---

interface Currency {
    name: string;
    symbol: string;
}

interface CountryName {
    common: string;
    official: string;
}

interface Flags {
    png: string;
    svg: string;
}

// Interface for the country object in a list/grid view
export interface Country {
    cca3: string;
    name: CountryName;
    flags: Flags;
    capital: string[];
    population: number;
    currencies: Record<string, Currency>;
}

// Interface for the detailed country view
export interface CountryDetails extends Country {
    continents: string[];
    languages: Record<string, string>;
    region: string;
    subregion: string;
    latlng: [number, number];
    borders?: string[];
}

export interface PaginationInfo {
    total: number;
    limit: number;
    currentPage: number;
    totalPages: number;
}

// Generic API response structure
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    pagination?: PaginationInfo;
}

export interface CountryDetailPageProps {
    params: {
      cca3: string;
    };
  }