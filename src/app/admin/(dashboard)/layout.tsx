'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/actions/authActions';
import { getCurrentUser } from '@/features/auth/services';
import { redirect } from 'next/navigation';
import styles from '../admin.module.css';
import { 
  FaChartLine, 
  FaUsers, 
  FaCalendar, 
  FaPalette, 
  FaUserGear, 
  FaArrowRightFromBracket,
  FaBars,
  FaXmark,
  FaUser
} from 'react-icons/fa6';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Resumen', icon: <FaChartLine /> },
  { href: '/admin/artists', label: 'Artistas', icon: <FaUsers /> },
  { href: '/admin/events', label: 'Eventos', icon: <FaCalendar /> },
  { href: '/admin/branding', label: 'Identidad', icon: <FaPalette /> },
  { href: '/admin/users', label: 'Usuarios', icon: <FaUserGear /> },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Redirect to login if no session
  if (!user) {
    redirect('/admin/login?expired=true');
  }

  return (
    <AdminLayoutClient user={user}>
      {children}
    </AdminLayoutClient>
  );
}

function AdminLayoutClient({ 
  user, 
  children 
}: { 
  user: { name: string | null; email: string; role: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sidebar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <div className={styles.adminContainer}>
      {/* Mobile menu button - only visible on mobile */}
      <button
        className={styles.mobileMenuBtn}
        onClick={toggleMobileMenu}
        aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile overlay */}
      <div
        className={`${styles.sidebarOverlay} ${isMobileOpen ? styles.visible : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isMobileOpen ? styles.open : ''}`}
        role="navigation"
        aria-label="Navegación principal"
      >
        {/* Brand/Header */}
        <div className={styles.sidebarHeader}>
          <a href="/admin/dashboard" className={styles.sidebarBrand} aria-label="Entre Líneas Admin">
            <div className={styles.brandIcon} aria-hidden="true">
              <FaPalette size={20} />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandName}>Entre Líneas</span>
              <span className={styles.brandTagline}>Panel de Control</span>
            </div>
          </a>
        </div>

        {/* User Card */}
        <div className={styles.userCard}>
          <div className={styles.userAvatar} aria-hidden="true">
            <FaUser size={18} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.name || user.email}</span>
            <span className={styles.userRole}>{user.role}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.navSection} aria-label="Secciones principales">
          <span className={styles.navSectionTitle}>Navegación</span>
          
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            
            return (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={closeMobileMenu}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={styles.navIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <span className={styles.navLabel}>{item.label}</span>
                {item.badge && (
                  <span className={styles.navBadge}>{item.badge}</span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Divider */}
        <div className={styles.navDivider} role="separator" />

        {/* Logout */}
        <div className={styles.logoutSection}>
          <form action={logoutAction} className={styles.logoutWrapper}>
            <button 
              type="submit" 
              className={styles.logoutBtn}
              onClick={closeMobileMenu}
            >
              <FaArrowRightFromBracket className={styles.logoutIcon} size={18} aria-hidden="true" />
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent} role="main">
        {children}
      </main>
    </div>
  );
}