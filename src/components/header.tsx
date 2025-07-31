"use client";

import Image from "next/image";
import { useState } from "react";

import NavMenu from "./NavMenu";
import MenuButton from "./MenuButton";

import "@/styles/header.css";

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
    <header className="header">
      <div className="header-row">
        <div className="header-logo-title">
          <Image
            src="/1-01.png"
            alt="Logo"
            width={107}
            height={139}
            className="header-logo"
          />
          <h1 className="header-title">
            Entre Líneas
          </h1>
        </div>
        <MenuButton open={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        />
      </div>
      <div className="header-navmenu">
        <NavMenu links={links} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}
