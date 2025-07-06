import Link from "next/link";
import Image from "next/image";
import { Country } from "../_types/country";
import { FiUsers, FiMapPin, FiDollarSign } from "react-icons/fi";

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  // Get the first currency object, or null if none exist
  const currency = country.currencies
    ? Object.values(country.currencies)[0]
    : null;

  const capitalDisplay = country.capital?.[0] || "No capital city";
  const currencyDisplay = currency
    ? `${currency.name} (${currency.symbol})`
    : "No currency data";

  return (
    <Link href={`/country/${country.cca3}`} className="block group">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-white/10 h-full flex flex-col transition-all duration-300 hover:border-white/20 hover:bg-gray-700/60 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
          <Image
            src={country.flags.svg || country.flags.png}
            alt={`Flag of ${country.name.common}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 group-hover:from-black/30 transition-all duration-300"></div>
        </div>
        {/* Content Container */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-3 truncate text-white">
            {country.name.common}
          </h3>
          <div className="text-sm text-gray-300 space-y-2 flex-grow">
            <p className="flex items-center gap-2">
              <FiMapPin className="text-blue-400 flex-shrink-0" />
              <strong>Capital:</strong>
              <span className="truncate">{capitalDisplay}</span>
            </p>
            <p className="flex items-center gap-2">
              <FiUsers className="text-blue-400 flex-shrink-0" />
              <strong>Population:</strong>
              <span>{country.population.toLocaleString()}</span>
            </p>
          </div>
          <div className="text-xs text-gray-400 mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
            <FiDollarSign className="text-gray-500 flex-shrink-0" />
            <span className="truncate">{currencyDisplay}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
