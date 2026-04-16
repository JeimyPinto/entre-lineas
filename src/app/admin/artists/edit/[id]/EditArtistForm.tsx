'use client';

import { useState } from 'react';
import { updateArtistAction } from '@/app/actions/artistActions';
import { Artist } from '@/types/artists';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import TagSelector from '@/components/ui/TagSelector';
import LocationSelector from '@/components/ui/LocationSelector';
import YearSelector from '@/components/ui/YearSelector';
import ImageUploader from '@/components/ui/ImageUploader';
import styles from '../../new/new.module.css';

interface EditArtistFormProps {
  artist: Artist;
  id: string;
}

export default function EditArtistForm({ artist, id }: EditArtistFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await updateArtistAction(id, formData);

    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
  }

  return (
    <Card className={styles.formCard}>
      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        <div className={styles.row}>
          <div className={styles.textareaGroup}>
            <label className={styles.label}>ID (No editable)</label>
            <input className={`${styles.textarea} ${styles.disabledInput}`} value={id} disabled />
          </div>
          <Input label="Nombre del Artista" name="name" defaultValue={artist.name} required />
        </div>

        <div className={styles.row}>
          <TagSelector
            label="Roles en la Organización"
            name="orgRole"
            options={["Juez", "Host", "Artista", "Dj", "Fundador", "Logistica", "Freestyler"]}
            defaultValue={artist.orgRole}
            required
          />
          <Input label="Profesión u Ocupación" name="profession" defaultValue={artist.profession} />
        </div>

        <div className={styles.row}>
          <LocationSelector label="Origen" name="origin" defaultValue={artist.origin} />
          <YearSelector label="Trayectoria (Inició en...)" name="trajectory" defaultValue={artist.trajectory} />
        </div>

        <ImageUploader
          label="Foto del Artista"
          name="imageFile"
          defaultImage={artist.image}
          defaultPosition={artist.imagePosition}
        />

        <Input
          label="Instagram URL"
          name="instagram"
          defaultValue={artist.socials.find(s => s.platform === 'instagram')?.url || ''}
          placeholder="https://instagram.com/..."
        />

        <div className={styles.textareaGroup}>
          <label className={styles.label}>Biografía (una oración por línea)</label>
          <textarea
            name="bio"
            className={styles.textarea}
            rows={5}
            defaultValue={artist.bio.join('\n')}
          ></textarea>
        </div>

        {error && <div className={styles.errorMsg}>{error}</div>}

        <div className={styles.formActions}>
          <Button type="submit" disabled={saving}>
            {saving ? 'Guardando Cambios...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
