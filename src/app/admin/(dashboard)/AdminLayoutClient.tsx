'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
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
  FaUser,
  FaLink,
  FaDatabase,
  FaFlag,
  FaLocationDot,
  FaBuilding
} from 'react-icons/fa6';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  { href: '/admin', label: 'Resumen', icon: <FaChartLine /> },
  { href: '/admin/artists', label: 'Artistas', icon: <FaUsers /> },
  { href: '/admin/events', label: 'Eventos', icon: <FaCalendar /> },
  { href: '/admin/artist_socials', label: 'Redes Sociales', icon: <FaLink /> },
  { href: '/admin/youtube_cache', label: 'Cache YouTube', icon: <FaDatabase /> },
  { href: '/admin/branding', label: 'Identidad', icon: <FaPalette /> },
  { href: '/admin/users', label: 'Usuarios', icon: <FaUserGear /> },
  { href: '/admin/countries', label: 'Países', icon: <FaFlag /> },
  { href: '/admin/departments', label: 'Departamentos', icon: <FaLocationDot /> },
  { href: '/admin/cities', label: 'Ciudades', icon: <FaBuilding /> },
];

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
  org_role?: string[];
  image?: string | null;
}

interface AdminLayoutClientProps {
  user: SessionUser;
  children: React.ReactNode;
}

export default function AdminLayoutClient({ 
  user, 
  children 
}: AdminLayoutClientProps) {
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

  const handleLogout = async () => {
    closeMobileMenu();
    await signOut({ callbackUrl: '/login' });
  };

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
          <a href="/admin" className={styles.sidebarBrand} aria-label="Entre Líneas Admin">
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
              (item.href !== '/admin' && pathname.startsWith(item.href));
            
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
          <button 
            type="button" 
            className={styles.logoutBtn}
            onClick={handleLogout}
          >
            <FaArrowRightFromBracket className={styles.logoutIcon} size={18} aria-hidden="true" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent} role="main">
        {children}
      </main>
    </div>
  );
}