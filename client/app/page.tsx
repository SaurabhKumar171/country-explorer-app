import { SearchBar } from "./_components/SearchBar";
import { FiGlobe } from "react-icons/fi";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gray-900">
      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-hero-pattern bg-cover bg-center animate-[kenburns_20s_ease-in-out_infinite]"
          style={{ backgroundImage: "url('/background.webp')" }}
        />
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/60 to-black/80" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl animate-[fadeInUp_1s_ease-out]">
        {/* The SearchBar component is wrapped in a styled container for the home page */}
        <div className="bg-gray-900/50 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border border-white/10">
          <div className="text-center mb-8">
            <FiGlobe className="mx-auto text-5xl text-blue-400 mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Country Explorer
            </h1>
            <p className="text-lg text-gray-300 mt-2">
              Your guide to the world.
            </p>
          </div>
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
