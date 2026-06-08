export const dynamic = 'force-dynamic';

import { eventService } from '@/features/events/services';
import Button from '@/shared/ui/Button/Button';
import Card from '@/shared/ui/Card/Card';
import { deleteEventAction } from '@/app/actions/eventActions';
import styles from '../artists/artists.module.css'; // Reutilizamos estilos de lista

export default async function AdminEventsPage() {
  let events: import('@/entities/event/types').Event[] = [];
  let loadError = false;

  try {
    events = await eventService.getAll();
  } catch {
    loadError = true;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gestión de Eventos</h1>
        <Button href="/admin/events/new">Nueva Edición</Button>
      </div>

      <div className={styles.grid}>
        {loadError && (
          <p style={{ color: 'var(--color-red)', gridColumn: '1 / -1' }}>
            Error al conectar con el servidor. No se pudieron cargar los eventos.
          </p>
        )}
        {!loadError && events.map((event) => (
          <Card key={event.id} title={event.title} subtitle={event.date}>
            <div className={styles.artistInfo}>
              <p><strong>Edición:</strong> #{event.id}</p>
              <p><strong>Lugar:</strong> {event.location}</p>
              <div className={styles.actions}>
                <Button href={`/admin/events/edit/${event.id}`} variant="ghost" className={styles.actionBtn}>
                  Editar
                </Button>
                <form action={deleteEventAction}>
                  <input type="hidden" name="id" value={event.id} />
                  <Button type="submit" variant="danger" className={styles.deleteBtn}>
                    Eliminar
                  </Button>
                </form>
              </div>
            </div>
          </Card>
        ))}
        {!loadError && events.length === 0 && (
          <p style={{ color: 'var(--color-grey-light)' }}>No hay eventos registrados en la base de datos.</p>
        )}
      </div>
    </div>
  );
}
