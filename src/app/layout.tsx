import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rick & Morty",
  description: "Next.js + Bun + Tailwind + Paginación",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-dvh bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
