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
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={styles.headerNavLink}
          onClick={onNavigate}
        >
          <span className={styles.navLogoBullet}>
            <Image src="/1-03.png" alt="Ojo" width={50} height={50} />
          </span>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
