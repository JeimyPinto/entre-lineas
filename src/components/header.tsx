"use client";

import Image from "next/image";

export default function Header() {
  const links = [
    { label: "Inicio", href: "#" },
    { label: "Galería", href: "#" },
    { label: "Eventos", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Artistas", href: "#" },
  ];

  return (
    <header className="w-full items-center justify-between bg-primary px-8">
      {/* Logo y título */}
      <div className="flex items-center justify-start gap-3 md:gap-5">
        <Image
          src="/1-02.png"
          alt="Logo"
          width={77}
          height={109}
          className="select-none"
        />
        <h1 className="text-secondary text-3xl md:text-5xl font-cloister tracking-tight">
          Entre Líneas
        </h1>
      </div>

      {/* Menú de escritorio */}
      <nav className="hidden md:flex items-center gap-8 text-lg">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="px-2 py-1 rounded transition-colors duration-200 hover:text-fourth hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-fourth"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
