export const dynamic = 'force-dynamic';

import { eventService } from '@/features/events/services';
import Button from '@/shared/ui/Button/Button';
import EventsGridClient from './EventsGridClient';
import styles from '../artists/artists.module.css';

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

      {loadError && (
        <p style={{ color: 'var(--color-red)', gridColumn: '1 / -1' }}>
          Error al conectar con el servidor. No se pudieron cargar los eventos.
        </p>
      )}

      {!loadError && <EventsGridClient events={events} />}
    </div>
  );
}