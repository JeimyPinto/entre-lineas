import { eventService } from '@/features/events/services';
import Button from '@/shared/ui/Button/Button';
import Card from '@/shared/ui/Card/Card';
import EditEventForm from './EditEventForm';
import styles from '../../../artists/new/new.module.css';

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let event = null;
  let error = null;

  try {
    event = await eventService.getById(id);
    if (!event) error = "Edición no encontrada";
  } catch (err: any) {
    error = err.message;
  }

  if (error || !event) {
    return (
      <div className={styles.container}>
        <Card title="Error">
          <p>{error || `La edición con ID ${id} no existe.`}</p>
          <Button href="/admin/events" variant="outline" style={{ marginTop: '1rem' }}>Volver a la lista</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Button href="/admin/events" variant="outline">Volver</Button>
        <h1>Editar Edición</h1>
      </header>

      <EditEventForm event={event} id={id} />
    </div>
  );
}