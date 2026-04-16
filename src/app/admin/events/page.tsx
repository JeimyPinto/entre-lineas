import { eventService } from '@/services/eventService';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import styles from '../artists/artists.module.css'; // Reutilizamos estilos de lista

export default async function AdminEventsPage() {
  const events = await eventService.getAll();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gestión de Eventos</h1>
        <Button href="/admin/events/new">Nueva Edición</Button>
      </div>

      <div className={styles.grid}>
        {events.map((event) => (
          <Card key={event.id} title={event.title} subtitle={event.date}>
            <div className={styles.artistInfo}>
              <p><strong>Edición:</strong> #{event.id}</p>
              <p><strong>Lugar:</strong> {event.location}</p>
              <div className={styles.actions}>
                <Button variant="ghost" className={styles.actionBtn}>Editar</Button>
                <Button variant="outline" className={styles.deleteBtn}>Eliminar</Button>
              </div>
            </div>
          </Card>
        ))}
        {events.length === 0 && (
          <p style={{ color: 'var(--color-grey-light)' }}>No hay eventos registrados en la base de datos.</p>
        )}
      </div>
    </div>
  );
}
