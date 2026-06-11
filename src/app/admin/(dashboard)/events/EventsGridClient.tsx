'use client';

import { useState, useCallback } from 'react';
import { Event as EventType } from '@/entities';
import Button from '@/shared/ui/Button/Button';
import Card from '@/shared/ui/Card/Card';
import { deleteEventAction } from '@/app/actions/eventActions';
import styles from '../artists/artists.module.css';
import DeleteConfirmModal from '@/shared/ui/DeleteConfirmModal/DeleteConfirmModal';
import VirtualizedGrid from '@/shared/ui/VirtualizedGrid/VirtualizedGrid';

interface EventsGridClientProps {
  events: EventType[];
}

export default function EventsGridClient({ events }: EventsGridClientProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<EventType | null>(null);

  const handleDelete = (event: EventType) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;
    setIsDeleting(true);
    const formData = new FormData();
    formData.set('id', String(eventToDelete.id));
    await deleteEventAction(formData);
    setIsDeleting(false);
    setShowDeleteModal(false);
    setEventToDelete(null);
  };

  const renderEvent = useCallback((event: EventType) => (
    <Card key={event.id} title={event.title} subtitle={event.date}>
      <div className={styles.artistInfo}>
        <p><strong>Edición:</strong> #{event.id}</p>
        <p><strong>Lugar:</strong> {event.location}</p>
        <div className={styles.actions}>
          <Button href={`/admin/events/edit/${event.id}`} variant="ghost" className={styles.actionBtn}>
            Editar
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={isDeleting}
            className={styles.deleteBtn}
            onClick={() => handleDelete(event)}
          >
            {isDeleting ? 'Borrando...' : 'Eliminar'}
          </Button>
        </div>
      </div>
    </Card>
  ), [handleDelete, isDeleting]);

  return (
    <>
      <div className={styles.grid}>
        <VirtualizedGrid
          items={events}
          columnCount={3}
          itemHeight={280}
          itemWidth={320}
          overscanCount={5}
          emptyMessage="No hay eventos registrados en la base de datos."
        >
          {renderEvent}
        </VirtualizedGrid>
      </div>

      {eventToDelete && (
        <DeleteConfirmModal
          open={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setEventToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Eliminar evento"
          message={`¿Estás seguro de eliminar "${eventToDelete.title}"? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}