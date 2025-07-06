import React from "react";
import { PillLink } from "../ui/PillLink";
import { FiMap, FiExternalLink } from "react-icons/fi";
import { CountryDetails } from "@/app/_types/country";

interface CountrySidebarProps {
  country: CountryDetails;
}

export const CountrySidebar: React.FC<CountrySidebarProps> = ({ country }) => (
  <div className="space-y-8">
    {country.borders && country.borders.length > 0 && (
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <FiMap /> Bordering Countries
        </h3>
        <div className="flex flex-wrap gap-2">
          {country.borders.map((borderCca3) => (
            <PillLink key={borderCca3} href={`/country/${borderCca3}`}>
              {borderCca3}
            </PillLink>
          ))}
        </div>
      </div>
    )}
    <a
      href={`https://www.google.com/maps/place/${country.name.common}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full text-center bg-blue-600 hover:bg-blue-700 font-semibold p-4 rounded-xl transition-colors"
    >
      View on Google Maps <FiExternalLink />
    </a>
  </div>
);
