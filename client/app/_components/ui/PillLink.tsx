import Link from "next/link";
import React from "react";

interface PillLinkProps {
  href: string;
  children: React.ReactNode;
}

export const PillLink: React.FC<PillLinkProps> = ({ href, children }) => (
  <Link
    href={href}
    className="bg-gray-700/50 hover:bg-gray-600/70 text-gray-200 font-medium px-3 py-1 rounded-full text-sm transition-colors"
  >
    {children}
  </Link>
);
