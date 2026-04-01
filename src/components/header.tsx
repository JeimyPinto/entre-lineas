"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import NavMenu from "./NavMenu";
import MenuButton from "./MenuButton";
import styles from "./header.module.css";

export default function Header() {
  const links = [
    { label: "Inicio", href: "#" },
    { label: "Galería", href: "#galeria" },
    { label: "Artistas", href: "#" },
    { label: "Eventos", href: "#" },
    { label: "Contacto", href: "#" },
  ];
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.headerRow}>
        <div className={styles.headerLogoTitle}>
          <Image
            src="/1-01.png"
            alt="Logo Entre Líneas"
            width={60}
            height={78}
            className={styles.headerLogo}
          />
          <h1 className={styles.headerTitle}>Entre Líneas</h1>
        </div>
        
        {/* En desktop el NavMenu se integra aquí, en móvil usa el botón */}
        <div className={styles.headerDesktopNav}>
           <NavMenu links={links} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
        </div>

        <MenuButton open={menuOpen} onClick={() => setMenuOpen((open) => !open)} />
      </div>
    </header>
  );
}
