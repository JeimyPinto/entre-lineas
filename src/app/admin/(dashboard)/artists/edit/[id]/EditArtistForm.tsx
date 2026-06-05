'use client';

import { useState } from 'react';
import { updateArtistAction } from '@/app/actions/artistActions';
import { Artist, SocialLink } from '@/entities/artist/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import TagSelector from '@/components/ui/TagSelector';
import LocationSelector from '@/components/ui/LocationSelector';
import YearSelector from '@/components/ui/YearSelector';
import ImageUploader from '@/components/ui/ImageUploader';
import { FaInstagram, FaYoutube, FaTiktok, FaFacebook, FaXTwitter, FaGlobe, FaLink } from 'react-icons/fa6';
import styles from '../../new/new.module.css';

interface EditArtistFormProps {
  artist: Artist;
  id: string;
}

type TabId = 'info' | 'location' | 'photo' | 'socials' | 'bio';

const PLATFORMS = [
  { value: 'instagram', label: 'Instagram', icon: FaInstagram },
  { value: 'youtube', label: 'YouTube', icon: FaYoutube },
  { value: 'tiktok', label: 'TikTok', icon: FaTiktok },
  { value: 'facebook', label: 'Facebook', icon: FaFacebook },
  { value: 'twitter', label: 'Twitter/X', icon: FaXTwitter },
  { value: 'web', label: 'Web Personal', icon: FaGlobe },
  { value: 'other', label: 'Otro', icon: FaLink },
] as const;

export default function EditArtistForm({ artist, id }: EditArtistFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('info');

  // Social links state
  const [socials, setSocials] = useState<SocialLink[]>(artist.socials || []);

  function addSocial() {
    setSocials([...socials, { platform: 'instagram', url: '', label: '' }]);
  }

  function removeSocial(index: number) {
    setSocials(socials.filter((_, i) => i !== index));
  }

  function updateSocial(index: number, field: keyof SocialLink, value: string) {
    const updated = [...socials];
    updated[index] = { ...updated[index], [field]: value };
    setSocials(updated);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    
    // Add socials as JSON string
    formData.set('socials', JSON.stringify(socials));

    const result = await updateArtistAction(id, formData);

    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
  }

  const tabs: { id: TabId; label: string }[] = [
    { id: 'info', label: 'Info Básica' },
    { id: 'location', label: 'Ubicación' },
    { id: 'photo', label: 'Foto' },
    { id: 'socials', label: 'Redes' },
    { id: 'bio', label: 'Biografía' },
  ];

  return (
    <Card className={styles.formCard}>
      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        {/* Tabs Navigation */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            >
              {tab.label}
              {tab.id === 'socials' && socials.length > 0 && (
                <span className={styles.tabBadge}>{socials.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {/* Tab 1: Basic Info */}
          {activeTab === 'info' && (
            <div className={styles.tabPanel}>
              <div className={styles.row}>
                <Input label="Alias / Nombre Artístico" name="alias" defaultValue={artist.alias} placeholder="Nombre que se muestra en la web" />
                <Input label="Nombre Real" name="name" defaultValue={artist.name} required />
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
            </div>
          )}

          {/* Tab 2: Location */}
          {activeTab === 'location' && (
            <div className={styles.tabPanel}>
              <div className={styles.row}>
                <LocationSelector label="Origen" name="origin" defaultValue={artist.origin} />
                <YearSelector label="Trayectoria (Inició en...)" name="trajectory" defaultValue={artist.trajectory} />
              </div>
            </div>
          )}

          {/* Tab 3: Photo */}
          {activeTab === 'photo' && (
            <div className={styles.tabPanel}>
              <ImageUploader
                label="Foto del Artista"
                name="imageFile"
                defaultImage={artist.image}
                defaultPosition={artist.imagePosition}
              />
            </div>
          )}

          {/* Tab 4: Socials */}
          {activeTab === 'socials' && (
            <div className={styles.tabPanel}>
              <div className={styles.socialsList}>
{socials.map((social, index) => {
                const PlatformIcon = PLATFORMS.find(p => p.value === social.platform)?.icon || FaLink;
                return (
                  <div key={index} className={styles.socialRow}>
                    <div className={styles.socialIcon}>
                      <PlatformIcon size={20} />
                    </div>
                    <select
                      value={social.platform}
                      onChange={(e) => updateSocial(index, 'platform', e.target.value)}
                      className={styles.socialSelect}
                    >
                      {PLATFORMS.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                    <Input
                      label="URL"
                      value={social.url}
                      onChange={(e) => updateSocial(index, 'url', e.target.value)}
                      placeholder="https://..."
                      className={styles.socialInput}
                    />
                    <Input
                      label="Etiqueta"
                      value={social.label}
                      onChange={(e) => updateSocial(index, 'label', e.target.value)}
                      placeholder="Opcional"
                      className={styles.socialLabel}
                    />
                    <button
                      type="button"
                      onClick={() => removeSocial(index)}
                      className={styles.socialRemove}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
                <Button type="button" variant="secondary" onClick={addSocial}>
                  + Agregar Red Social
                </Button>
              </div>
            </div>
          )}

          {/* Tab 5: Bio */}
          {activeTab === 'bio' && (
            <div className={styles.tabPanel}>
              <div className={styles.textareaGroup}>
                <label className={styles.label}>Biografía (una oración por línea)</label>
                <textarea
                  name="bio"
                  className={styles.textarea}
                  rows={8}
                  defaultValue={artist.bio.join('\n')}
                ></textarea>
              </div>
            </div>
          )}
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
