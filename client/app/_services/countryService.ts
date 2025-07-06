import { Country, CountryDetails, ApiResponse } from "../_types/country";

// --- API Service ---

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://country-explorer-app.onrender.com/api/v1';

/**
 * A generic, type-safe utility function to handle API requests.
 * @param {string} url - The URL to fetch.
 * @param {RequestInit} options - Fetch options.
 * @returns {Promise<T>} - The JSON response, typed to the expected structure.
 */
const fetchApi = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<T>;
    } catch (error) {
        console.error("API call failed:", error);
        // Re-throw the error to be handled by the calling function
        throw error;
    }
};

/**
 * Fetches a list of countries based on search, filter, and pagination parameters.
 * @param {Record<string, string>} params - The query parameters.
 * @returns {Promise<ApiResponse<Country[]>>}
 */
export const getCountries = (params: Record<string, string>): Promise<ApiResponse<Country[]>> => {
    const query = new URLSearchParams(params).toString();
    return fetchApi<ApiResponse<Country[]>>(`${API_BASE_URL}/countries?${query}`);
};


/**
 * Fetches a lightweight list of country suggestions for a search query.
 * @param {string} query - The search term.
 * @returns {Promise<Country[]>} - An array of partial country objects.
 */
export const getSuggestions = async (query: string): Promise<Country[]> => {
    const response = await fetchApi<ApiResponse<Country[]>>(`${API_BASE_URL}/countries/suggestions?q=${query}`);
    return response.data;
};

/**
 * Fetches a unique list of all continents.
 * @returns {Promise<string[]>} - An array of continent names.
 */
export const getContinents = async (): Promise<string[]> => {
    const response = await fetchApi<ApiResponse<string[]>>(`${API_BASE_URL}/countries/continents`);
    return response.data; // The backend wraps data in a 'data' property
};

/**
 * Fetches the full details for a single country by its cca3 code from our backend.
 * @param {string} cca3 - The 3-letter country code.
 * @returns {Promise<CountryDetails>} - The full country data.
 */
export const getCountryByCca3 = async (cca3: string): Promise<CountryDetails> => {
    const response = await fetchApi<ApiResponse<CountryDetails>>(`${API_BASE_URL}/countries/${cca3}`);
    return response.data;
};

/**
 * Alternative function to fetch country details directly from the external REST Countries API.
 * @param {string} cca3 - The 3-letter country code.
 * @returns {Promise<CountryDetails>} - The full country data from the external source.
 */
export const getCountryByCca3External = async (cca3: string): Promise<CountryDetails> => {
    // Note: The external API might return an array, so we take the first element.
    const response = await fetchApi<CountryDetails[]>(`https://restcountries.com/v3.1/alpha/${cca3}`);
    return response[0];
};
