import styles from './page.module.css';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FaUsers, FaCalendarDays, FaGear, FaArrowRightFromBracket } from 'react-icons/fa6';
import { logoutAction } from '@/app/actions/authActions';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Panel de Control</h1>
          <p className={styles.welcome}>Bienvenido al centro de mando de Entre Líneas</p>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="danger" className={styles.logoutBtn}>
            <FaArrowRightFromBracket /> Cerrar Sesión
          </Button>
        </form>
      </header>

      <div className={styles.grid}>
        <Card title="Talento" icon={<FaUsers />} className={styles.statCard}>
          <p>Gestiona los perfiles de los artistas, jueces y hosts.</p>
          <Button href="/admin/artists" variant="primary" fullWidth>Ver Artistas</Button>
        </Card>

        <Card title="Eventos" icon={<FaCalendarDays />} className={styles.statCard}>
          <p>Crea y edita las fechas de la temporada actual.</p>
          <Button href="/admin/events" variant="primary" fullWidth>Ver Eventos</Button>
        </Card>

        <Card title="Configuración" icon={<FaGear />} className={styles.statCard}>
          <p>Ajustes generales de la plataforma y el sitio web.</p>
          <Button variant="outline" fullWidth disabled>Entrar (Próximamente)</Button>
        </Card>
      </div>
    </div>
  );
}
