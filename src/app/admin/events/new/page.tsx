'use client';

import { useState } from 'react';
import { createEventAction } from '@/app/actions/eventActions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import styles from '../../artists/new/new.module.css'; // Reutilizamos estilos de formulario

export default function NewEventPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await createEventAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Button href="/admin/events" variant="outline">Volver</Button>
        <h1>Registrar Edición</h1>
      </header>

      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <Input label="Número de Edición (ID)" name="id" type="number" required />
            <Input label="Título (ej: Edición 1)" name="title" required />
          </div>

          <div className={styles.row}>
            <Input label="Fecha (ej: 11 de Octubre, 2023)" name="date" required />
            <Input label="Ubicación (Ciudad, Lugar)" name="location" required />
          </div>

          <Input label="URL de Instagram (Post)" name="postUrl" placeholder="https://www.instagram.com/p/..." />
          
          <Input label="Lista de Reproducción YouTube" name="youtubeLink" placeholder="https://www.youtube.com/watch?v=..." />

          <Input 
            label="Jueces (separados por coma)" 
            name="judges" 
            placeholder="Nombre 1, Nombre 2, Nombre 3" 
            required 
          />

          <Input 
            label="Hosts (separados por coma)" 
            name="hosts" 
            placeholder="Nombre 1, Nombre 2" 
          />

          {error && <div className={styles.errorMsg}>{error}</div>}

          <div className={styles.formActions}>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Publicar Edición'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
