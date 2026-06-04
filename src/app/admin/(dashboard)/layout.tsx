import { logoutAction } from '@/app/actions/authActions';
import { getCurrentUser } from '@/features/auth/services';
import styles from '../admin.module.css';
import { FaUser, FaUserGear, FaArrowRightFromBracket } from 'react-icons/fa6';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin EL</h2>
        </div>
        
        {/* User Card */}
        {user && (
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>
              <FaUser />
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name || user.email}</span>
              <span className={styles.userRole}>{user.role}</span>
            </div>
          </div>
        )}
        
<nav className={styles.nav}>
          <a href="/admin/dashboard" className={styles.navLink}>Resumen</a>
          <a href="/admin/artists" className={styles.navLink}>Artistas</a>
          <a href="/admin/events" className={styles.navLink}>Eventos</a>
          <a href="/admin/branding" className={styles.navLink}>Identidad</a>
          <a href="/admin/users" className={styles.navLink}><FaUserGear /> Usuarios</a>
        </nav>
        <form action={logoutAction} className={styles.logoutWrapper}>
          <button type="submit" className={styles.logoutBtn}>
            <FaArrowRightFromBracket />
            Cerrar Sesión
          </button>
        </form>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
