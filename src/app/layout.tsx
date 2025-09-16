import type { Metadata } from "next";

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
      <body className="min-h-dvh bg-white text-neutral-900">{children}</body>
    </html>
  );
}
