import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OrgaFlow",
  description: "Plateforme de structuration interne et digitalisation"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
