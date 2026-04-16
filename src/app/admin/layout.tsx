import { logoutAction } from '@/app/actions/authActions';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin EL</h2>
        </div>
        <nav className={styles.nav}>
          <a href="/admin/dashboard" className={styles.navLink}>Resumen</a>
          <a href="/admin/artists" className={styles.navLink}>Artistas</a>
          <a href="/admin/events" className={styles.navLink}>Eventos</a>
          <a href="/admin/branding" className={styles.navLink}>Identidad Corp.</a>
        </nav>
        <form action={logoutAction} className={styles.logoutWrapper}>
          <button type="submit" className={styles.logoutBtn}>Cerrar Sesión</button>
        </form>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
