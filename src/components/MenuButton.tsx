import styles from "./MenuButton.module.css";

interface MenuButtonProps {
  open: boolean;
  onClick: () => void;
}

export default function MenuButton({ open, onClick }: MenuButtonProps) {
  return (
    <button
      className={`${styles.headerMenuButton} ${open ? styles.open : ""}`}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      onClick={onClick}
    >
      <div className={styles.hamburger}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
}
