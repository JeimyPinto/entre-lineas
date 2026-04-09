"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import NavMenu from "./NavMenu";
import MenuButton from "./MenuButton";
import styles from "./header.module.css";

export default function Header() {
  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Historia", href: "#historia" },
    { label: "Galería", href: "#galeria" },
    { label: "Artistas", href: "#artistas" },
    { label: "Eventos", href: "#eventos" },
    { label: "Contacto", href: "#contacto" },
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
        <Link href="#inicio" className={styles.headerLogoTitle}>
          <Image
            src="/1-01.png"
            alt="Logo Entre Líneas"
            width={60}
            height={78}
            className={styles.headerLogo}
            style={{ height: "auto" }}
          />
          <h1 className={styles.headerTitle}>Entre Líneas</h1>
        </Link>
        
        <NavMenu links={links} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
        
        <MenuButton open={menuOpen} onClick={() => setMenuOpen((open) => !open)} />
      </div>
    </header>
  );
}
