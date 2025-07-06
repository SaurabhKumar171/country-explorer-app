import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 flex items-center gap-4 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg">
    <div className="text-blue-400 text-3xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-300">{label}</p>
      <p className="font-bold text-lg text-white truncate">{value}</p>
    </div>
  </div>
);
