import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HireBoard — Find Your Next Role",
  description: "Browse thousands of remote and on-site jobs from top companies worldwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
