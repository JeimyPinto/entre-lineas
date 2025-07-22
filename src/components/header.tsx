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
    <header className="header">
      {/* Logo y título */}
      <div className="header-logo-title">
        <Image
          src="/1-02.png"
          alt="Logo"
          width={77}
          height={109}
          className="logo-img"
        />
        <h1 className="header-title">
          Entre Líneas
        </h1>
      </div>

      {/* Menú de escritorio */}
      <nav className="header-nav">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="nav-link"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
