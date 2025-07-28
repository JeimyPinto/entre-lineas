
"use client";
import '@/styles/navMenu.css';
import Link from "next/link";
import Image from "next/image";

interface NavMenuProps {
  links: { label: string; href: string }[];
  open: boolean;
  onNavigate?: () => void;
}

export default function NavMenu({ links, open, onNavigate }: NavMenuProps) {
  // Alternar entre los logos blanco y negro
  const logoPath = "/1-01.png";
  return (
    <nav className={`header-nav${open ? " open" : ""}`}>
      {/* Botón de cerrar solo visible en móvil y cuando el menú está abierto */}
      {open && (
        <button
          className="btn navmenu-close-btn"
          style={{ position: 'absolute', top: 18, right: 18, zIndex: 101, fontSize: 28, background: 'none', color: 'var(--color-secondary)' }}
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
          className="header-nav-link link nav-link-flex"
          onClick={onNavigate}
        >
          <span className="nav-logo-bullet">
            <Image
              src={logoPath}
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
