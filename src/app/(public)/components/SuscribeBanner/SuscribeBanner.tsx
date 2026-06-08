import styles from "./SuscribeBanner.module.css";
import Button from "@/shared/ui/Button/Button";
import { FaYoutube } from "react-icons/fa6";
const CHANNEL_ID = "UColw-XWA4S-yN9SLKnL31xQ";

export default function SuscribeBanner() {
  return (
    <div className={styles.suscribeBanner}>
      <p>
        ¡Suscríbete a nuestro canal de YouTube!<br />
        <span>
          Es gratis y nos apoyas muchísimo 🙌
        </span>
      </p>
      <Button
        href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
        variant="primary"
        className={styles.subscribeButton}
      >
        <FaYoutube size={24} />
        Suscribirse
      </Button>
    </div>
  );
}
