import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { SearchProvider } from "./_context/SearchProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Country Search App",
  description: "Search for countries and view their details",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchProvider>{children}</SearchProvider>
      </body>
    </html>
  );
}
