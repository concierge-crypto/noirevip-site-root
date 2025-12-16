import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOIRE — Private Chauffeur",
  description: "NOIRE Private Chauffeur Service — Ultra Luxury. Absolute Discretion.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
