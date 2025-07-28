"use client";

import Image from "next/image";
import { useState } from "react";

import NavMenu from "./NavMenu";
import MenuButton from "./MenuButton";

export default function Header() {
  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Galería", href: "#galeria" },
    { label: "Eventos", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Artistas", href: "#" },
  ];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header section-box">
      {/* Logo, título y botón hamburguesa alineados */}
      <div className="header-logo-title">
        <div className="header-logo-title-inner">
          <Image
            src="/1-02.png"
            alt="Logo"
            width={107}
            height={139}
            className="logo-img"
          />
          <h1 className="header-title">
            Entre Líneas
          </h1>
        </div>
        <MenuButton open={menuOpen} onClick={() => setMenuOpen((open) => !open)} />
      </div>

      {/* Menú de navegación */}
      <NavMenu links={links} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
    </header>
  );
}
