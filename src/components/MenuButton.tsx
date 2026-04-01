import styles from "./MenuButton.module.css";
import Image from "next/image";

interface MenuButtonProps {
  open: boolean;
  onClick: () => void;
}

export default function MenuButton({ open, onClick }: MenuButtonProps) {
  return (
    <button
      className={styles.headerMenuButton}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      onClick={onClick}
    >
      <Image src="/menu.svg" alt="Menú" width={32} height={32} />
    </button>
  );
}
