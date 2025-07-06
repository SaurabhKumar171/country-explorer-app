import React from "react";
import { StatCard } from "../ui/StatCard";
import {
  FiUsers,
  FiMapPin,
  FiGlobe,
  FiMessageSquare,
  FiDollarSign,
  FiCompass,
} from "react-icons/fi";
import { CountryDetails } from "@/app/_types/country";

interface StatsGridProps {
  country: CountryDetails;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ country }) => {
  // Format complex data points for display, providing descriptive fallbacks
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "";

  return (
    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <StatCard
        icon={<FiMapPin />}
        label="Capital"
        value={country.capital?.join(", ") || "No official capital"}
      />
      <StatCard
        icon={<FiUsers />}
        label="Population"
        value={country.population.toLocaleString()}
      />
      <StatCard
        icon={<FiGlobe />}
        label="Continent(s)"
        value={country.continents?.join(", ") || "Continent not specified"}
      />
      <StatCard
        icon={<FiCompass />}
        label="Region"
        value={country.region || "Region not specified"}
      />
      <StatCard
        icon={<FiDollarSign />}
        label="Currencies"
        value={currencies || "No currency data"}
      />
      <StatCard
        icon={<FiMessageSquare />}
        label="Languages"
        value={languages || "No official languages"}
      />
    </div>
  );
};
