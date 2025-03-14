import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Google Summer of Code Organizations",
    template: "%s | Google Summer of Code Organizations",
  },
  description:
    "Explore and analyze detailed information about organizations participating in Google Summer of Code (GSoC). Easily filter organizations based on various parameters to find the best match for your interests and skills.",
  keywords:
    "Google Summer of Code, GSoC 2025, GSoC organizations, open-source projects, filter GSoC organizations, GSoC technologies, GSoC categories, GSoC topics, GSoC projects, coding mentorship, open-source internships, software development, programming, GSoC stats, GSoC insights, GSoC contributors, GSoC ideas, beginner-friendly GSoC projects, GSoC timeline, GSoC history, GSoC past organizations, GSoC past projects, GSoC past years, GSoC past stats, GSoC past insights, GSoC past contributors, GSoC past ideas",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Suspense
          fallback={
            <div className="flex w-full h-screen items-center justify-center text-muted-foreground">
              Loading...
            </div>
          }
        >
          {children}
        </Suspense>
      </body>
    </html>
  );
}
