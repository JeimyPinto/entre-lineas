import type { Metadata } from "next";
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
      </body>
    </html>
  );
}
