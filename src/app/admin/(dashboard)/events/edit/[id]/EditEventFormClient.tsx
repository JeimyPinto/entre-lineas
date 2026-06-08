'use client';

import { useState } from 'react';
import { updateEventAction, deleteEventAction } from '@/app/actions/eventActions';
import { Event } from '@/entities/event/types';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import Card from '@/shared/ui/Card/Card';
import styles from '../../../artists/new/new.module.css';

interface EditEventFormClientProps {
  event: Event;
  id: string;
}

export default function EditEventFormClient({ event, id }: EditEventFormClientProps) {
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await updateEventAction(id, formData);

    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`¿Estás seguro de eliminar la edición "${event.title}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    setDeleting(true);
    const formData = new FormData();
    formData.set('id', id);
    await deleteEventAction(formData);
    // If we get here without redirect, there was an error
    setDeleting(false);
  }

  // Convert judges/hosts arrays to comma-separated strings for the form
  const judgesString = event.judges?.map(j => j.name).join(', ') || '';
  const hostsString = event.host?.map(h => h.name).join(', ') || '';

  return (
    <Card className={styles.formCard}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <Input label="Número de Edición (ID)" name="id" type="number" defaultValue={event.id} required disabled />
          <Input label="Título (ej: Edición 1)" name="title" defaultValue={event.title} required />
        </div>

        <div className={styles.row}>
          <Input label="Fecha (ej: 11 de Octubre, 2023)" name="date" defaultValue={event.date} required />
          <Input label="Ubicación (Ciudad, Lugar)" name="location" defaultValue={event.location} required />
        </div>

        <Input label="URL de Instagram (Post)" name="postUrl" defaultValue={event.postUrl} placeholder="https://www.instagram.com/p/..." />
        
        <Input label="Lista de Reproducción YouTube" name="youtubeLink" defaultValue={event.youtubeLink} placeholder="https://www.youtube.com/watch?v=..." />

        <Input 
          label="Jueces (separados por coma)" 
          name="judges" 
          defaultValue={judgesString}
          placeholder="Nombre 1, Nombre 2, Nombre 3" 
          required 
        />

        <Input 
          label="Hosts (separados por coma)" 
          name="hosts" 
          defaultValue={hostsString}
          placeholder="Nombre 1, Nombre 2" 
        />

        {error && <div className={styles.errorMsg}>{error}</div>}

        <div className={styles.formActions}>
          <Button type="submit" disabled={saving}>
            {saving ? 'Guardando Cambios...' : 'Guardar Cambios'}
          </Button>
          <Button type="button" variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Eliminando...' : 'Eliminar Edición'}
          </Button>
        </div>
      </form>
    </Card>
  );
}