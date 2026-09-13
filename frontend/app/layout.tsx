import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnomalyX",
  description: "Admin fraud monitoring system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
