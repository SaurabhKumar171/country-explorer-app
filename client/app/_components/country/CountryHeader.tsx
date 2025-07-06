import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Country } from "@/app/_types/country";

interface CountryHeaderProps {
  country: Country;
}

export const CountryHeader: React.FC<CountryHeaderProps> = ({ country }) => (
  <div className="relative h-72 md:h-96 w-full">
    <Image
      src={country.flags.svg}
      alt={`Flag of ${country.name.common}`}
      fill
      style={{ objectFit: "cover" }}
      priority
      className="opacity-20"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
    <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-10 relative z-10">
      <Link
        href="/search"
        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white font-semibold px-4 py-2 rounded-lg mb-4 w-fit"
      >
        &larr; Back to Search
      </Link>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white shadow-lg">
        {country.name.common}
      </h1>
      <h2 className="text-xl md:text-2xl text-gray-300 mt-1">
        {country.name.official}
      </h2>
    </div>
  </div>
);
