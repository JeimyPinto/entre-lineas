"use client";
import styles from "./NavMenu.module.css";
import Link from "next/link";
import Image from "next/image";

interface NavMenuProps {
  links: { label: string; href: string }[];
  open: boolean;
  onNavigate?: () => void;
}

export default function NavMenu({ links, open, onNavigate }: NavMenuProps) {
  return (
    <nav className={`${styles.headerNav} ${open ? styles.open : ""}`}>
      {/* Botón de cerrar solo visible en móvil y cuando el menú está abierto */}
      {open && (
        <button
          className={styles.navmenuCloseBtn}
          aria-label="Cerrar menú"
          onClick={onNavigate}
        >
          ×
        </button>
      )}
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={styles.headerNavLink}
          onClick={onNavigate}
        >
          <span className={styles.navLogoBullet}>
            <Image
              src="/1-01.png"
              alt="logo viñeta"
              width={28}
              height={28}
              style={{ minWidth: 28, minHeight: 28 }}
            />
          </span>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
