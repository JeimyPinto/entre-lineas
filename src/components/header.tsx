"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import NavMenu from "./NavMenu";
import MenuButton from "./MenuButton";
import styles from "./header.module.css";
import BlinkingLogo from "./ui/BlinkingLogo";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) return null;

  const links = [
    { label: "Inicio", href: "/#inicio" },
    { label: "Historia", href: "/#historia" },
    { label: "Galería", href: "/#galeria" },
    { label: "Artistas", href: "/#artistas" },
    { label: "Eventos", href: "/#eventos" },
    { label: "Contacto", href: "/#contacto" },
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
        <Link href="/#inicio" className={styles.headerLogoTitle}>
          <div className={styles.headerLogo}>
            <BlinkingLogo closedImg="/1-04.png" openImg="/1-01.png" size={50} />
          </div>
          <h1 className={styles.headerTitle}>Entre Líneas</h1>
        </Link>
        
        <NavMenu links={links} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
        
        <MenuButton open={menuOpen} onClick={() => setMenuOpen((open) => !open)} />
      </div>
    </header>
  );
}
