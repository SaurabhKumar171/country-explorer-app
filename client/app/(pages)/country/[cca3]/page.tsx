import { getCountryByCca3 } from "../../../_services/countryService";
import { notFound } from "next/navigation";
import { CountryHeader } from "@/app/_components/country/CountryHeader";
import { StatsGrid } from "@/app/_components/country/StatsGrid";
import { CountrySidebar } from "@/app/_components/country/CountrySidebar";

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ cca3: string }>;
}) {
  try {
    const param = await params;
    const country = await getCountryByCca3(param.cca3);

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <CountryHeader country={country} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <StatsGrid country={country} />
            <CountrySidebar country={country} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch country details:", error);
    notFound();
  }
}
