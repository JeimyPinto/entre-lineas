'use client';

import { useState } from 'react';
import { createArtistAction } from '@/app/actions/artistActions';
import { SocialLink } from '@/entities';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import Card from '@/shared/ui/Card/Card';
import TagSelector from '@/shared/ui/TagSelector/TagSelector';
import LocationSelector from '@/shared/ui/LocationSelector/LocationSelector';
import YearSelector from '@/shared/ui/YearSelector/YearSelector';
import ImageUploader from '@/shared/ui/ImageUploader/ImageUploader';
import { FaInstagram, FaYoutube, FaTiktok, FaFacebook, FaXTwitter, FaGlobe, FaLink } from 'react-icons/fa6';
import styles from './new.module.css';

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

export default function NewArtistPageClient() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('info');
  const [socials, setSocials] = useState<SocialLink[]>([]);

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
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.set('socials', JSON.stringify(socials));

    const result = await createArtistAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
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
    <div className={styles.container}>
      <header className={styles.header}>
        <Button href="/admin/artists" variant="outline">← Volver</Button>
        <h1>Registrar Talento</h1>
      </header>

      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
          {/* Fixed header with tabs - stays in place */}
          <div className={styles.formHeader}>
            {/* Tabs Navigation */}
            <div className={styles.tabs} role="tablist" aria-label="Secciones del formulario">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
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
          </div>

          {/* Scrollable body with tab panels */}
          <div className={styles.formBody}>
            {/* Tab Content - All panels rendered, only active visible */}
            <div className={styles.tabContent}>
              {/* Tab 1: Basic Info */}
              <div
                id="panel-info"
                role="tabpanel"
                aria-labelledby="tab-info"
                className={`${styles.tabPanel} ${activeTab === 'info' ? styles.tabPanelActive : styles.tabPanelHidden}`}
                hidden={activeTab !== 'info'}
              >
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
              </div>

              {/* Tab 2: Location */}
              <div
                id="panel-location"
                role="tabpanel"
                aria-labelledby="tab-location"
                className={`${styles.tabPanel} ${activeTab === 'location' ? styles.tabPanelActive : styles.tabPanelHidden}`}
                hidden={activeTab !== 'location'}
              >
                <div className={styles.row}>
                  <LocationSelector label="Origen" name="origin" />
                  <YearSelector label="Trayectoria (Inició en...)" name="trajectory" min={1900} />
                </div>
              </div>

              {/* Tab 3: Photo */}
              <div
                id="panel-photo"
                role="tabpanel"
                aria-labelledby="tab-photo"
                className={`${styles.tabPanel} ${activeTab === 'photo' ? styles.tabPanelActive : styles.tabPanelHidden}`}
                hidden={activeTab !== 'photo'}
              >
                <ImageUploader label="Foto del Artista" name="imageFile" />
              </div>

              {/* Tab 4: Socials */}
              <div
                id="panel-socials"
                role="tabpanel"
                aria-labelledby="tab-socials"
                className={`${styles.tabPanel} ${activeTab === 'socials' ? styles.tabPanelActive : styles.tabPanelHidden}`}
                hidden={activeTab !== 'socials'}
              >
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

              {/* Tab 5: Bio */}
              <div
                id="panel-bio"
                role="tabpanel"
                aria-labelledby="tab-bio"
                className={`${styles.tabPanel} ${activeTab === 'bio' ? styles.tabPanelActive : styles.tabPanelHidden}`}
                hidden={activeTab !== 'bio'}
              >
                <div className={styles.textareaGroup}>
                  <label className={styles.label}>Biografía (una oración por línea)</label>
                  <textarea name="bio" className={styles.textarea} rows={8}></textarea>
                </div>
              </div>
            </div>

            {error && <div className={styles.errorMsg}>{error}</div>}

            <div className={styles.formActions}>
              <Button type="submit" disabled={loading}>
                {loading ? 'Guardando…' : 'Guardar Artista'}
              </Button>
            </div>
          </div>
        </div>
        </form>
      </Card>
    </div>
  );
}