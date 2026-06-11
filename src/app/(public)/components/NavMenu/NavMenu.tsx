"use client";
import styles from "./NavMenu.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaUserShield } from "react-icons/fa6";

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
          <span className={styles.navLogoBullet} aria-hidden="true">
            <Image src="/1-03.png" alt="" width={50} height={50} aria-hidden="true" />
          </span>
          {link.label}
        </Link>
      ))}
      <Link href="/login" className={styles.adminNavLink} onClick={onNavigate}>
        <FaUserShield size={16} />
        Panel de Control
      </Link>
    </nav>
  );
}
