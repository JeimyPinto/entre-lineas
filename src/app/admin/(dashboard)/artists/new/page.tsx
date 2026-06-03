'use client';

import { useState } from 'react';
import { createArtistAction } from '@/app/actions/artistActions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import TagSelector from '@/components/ui/TagSelector';
import LocationSelector from '@/components/ui/LocationSelector';
import YearSelector from '@/components/ui/YearSelector';
import ImageUploader from '@/components/ui/ImageUploader';
import styles from './new.module.css';

export default function NewArtistPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await createArtistAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Button href="/admin/artists" variant="outline">Volver</Button>
        <h1>Registrar Talento</h1>
      </header>

      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
<div className={styles.row}>
            <Input label="Alias / Nombre Artístico" name="alias" placeholder="Nombre que se muestra en la web" required />
            <Input label="Nombre Real" name="name" required />
          </div>

          <div className={styles.row}>
            <TagSelector
              label="Roles en la Organización"
              name="orgRole"
              options={["Juez", "Host", "Artista", "Dj", "Fundador", "Logistica", "Freestyler"]}
              required
            />
            <Input label="Profesión u Ocupación" name="profession" />
          </div>

          <div className={styles.row}>
            <LocationSelector label="Origen" name="origin" />
            <YearSelector label="Trayectoria (Inició en...)" name="trajectory" min={1900} />
          </div>

          {/* Cargador de Imágenes con Preview */}
          <ImageUploader label="Foto del Artista" name="imageFile" />

          <Input label="Instagram URL" name="instagram" placeholder="https://instagram.com/..." />

          <div className={styles.textareaGroup}>
            <label className={styles.label}>Biografía (una oración por línea)</label>
            <textarea name="bio" className={styles.textarea} rows={5}></textarea>
          </div>

          {error && <div className={styles.errorMsg}>{error}</div>}

          <div className={styles.formActions}>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Artista'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
