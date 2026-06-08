export const dynamic = 'force-dynamic';

import styles from './page.module.css';
import Button from '@/shared/ui/Button/Button';
import { 
  FaUsers, 
  FaCalendarDays, 
  FaPalette, 
  FaChartLine, 
  FaPlus,
  FaArrowRightFromBracket,
  FaHouse,
  FaGlobe
} from 'react-icons/fa6';
import { logoutAction } from '@/app/actions/authActions';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Panel de Control</h1>
          <p className={styles.welcome}>Administra tu contenido de Entre Líneas</p>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="ghost" className={styles.logoutBtn}>
            <FaArrowRightFromBracket /> Cerrar Sesión
          </Button>
        </form>
      </header>

      {/* Quick Actions */}
      <section className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>
          <FaChartLine /> Acciones Rápidas
        </h2>
        <div className={styles.actionsGrid}>
          <Link href="/admin/artists" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FaUsers />
            </div>
            <div className={styles.actionInfo}>
              <h3>Artistas</h3>
              <p>Gestiona el talento</p>
            </div>
            <div className={styles.actionArrow}>
              <FaArrowRightFromBracket />
            </div>
          </Link>
          
          <Link href="/admin/events" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FaCalendarDays />
            </div>
            <div className={styles.actionInfo}>
              <h3>Eventos</h3>
              <p>Administra fechas</p>
            </div>
            <div className={styles.actionArrow}>
              <FaArrowRightFromBracket />
            </div>
          </Link>
          
          <Link href="/admin/branding" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FaPalette />
            </div>
            <div className={styles.actionInfo}>
              <h3>Identidad</h3>
              <p>Branding visual</p>
            </div>
            <div className={styles.actionArrow}>
              <FaArrowRightFromBracket />
            </div>
          </Link>
        </div>
      </section>

      {/* Quick Links */}
      <section className={styles.quickLinks}>
        <h2 className={styles.sectionTitle}>
          <FaGlobe /> Acceso Directo
        </h2>
        <div className={styles.linksRow}>
          <Link href="/" className={styles.linkButton}>
            <FaHouse /> Ver Sitio Web
          </Link>
          <Link href="/admin/artists/new" className={styles.linkButton}>
            <FaPlus /> Nuevo Artista
          </Link>
          <Link href="/admin/events/new" className={styles.linkButton}>
            <FaPlus /> Nuevo Evento
          </Link>
        </div>
      </section>
    </div>
  );
}
