import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/global.css";
import Header from "@/components/header"
export const metadata: Metadata = {
  title: "Entre Lineas",
  description: "Plataforma Web de Entre Lineas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        {/* Reset de css */}
        <Script src="https://gist.github.com/devinschumacher/6cbd52c082040f0e4c414836aebdb36f.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
