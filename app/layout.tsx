import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pipeline — Govly Application / Mike Battaglia",
  description:
    "An agentic capture assistant demo built by Mike Battaglia for Govly (YC S21). Scripted agent trace: filter, score, draft, gate.",
  openGraph: {
    title: "Pipeline — Govly Application / Mike Battaglia",
    description: "Agentic capture assistant demo for government contractors.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
