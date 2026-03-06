import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import ComponentsChromeButton from "@/components/ComponentsChromeButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-title",
});

export const metadata: Metadata = {
  title: "Nutrition Funnel",
  description: "Build your nutrition plan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sourceSerif4.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ComponentsChromeButton />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
      </body>
    </html>
  );
}
