import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "proof-of-presence",
  description: "The best online store for all types of footwear. We bring you the best at your own fingertips. Shop now!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          {children}
      </body>
    </html>
  );
}