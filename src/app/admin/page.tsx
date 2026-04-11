"use client";
import { useState, useEffect } from 'react';
import { Artist } from '@/types/artists';
import { getArtistsData } from '@/data/artists';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);
  // const [loading, setLoading] = useState(false); // ESLint unused
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [selectedFile, setSelectedFile] = useState<{ [key: string]: File | null }>({});

  const ADMIN_EMAIL = 'admin@entrelinas.com';
  const ADMIN_PASSWORD = 'founder123'; // Cambiar en producción

  useEffect(() => {
    if (isLoggedIn) {
      loadArtists();
    }
  }, [isLoggedIn]);

  async function loadArtists() {
    try {
      const data = await getArtistsData();
      setArtists(data);
    } catch (error) {
      console.error('Error loading artists:', error);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Credenciales incorrectas');
    }
  }

  async function handleFileSelect(id: string, file: File) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Imagen demasiado grande (max 5MB)');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Solo imágenes permitidas');
      return;
    }
    setSelectedFile(prev => ({ ...prev, [id]: file }));
  }

  async function handleUpload(id: string) {
    const file = selectedFile[id];
    if (!file) return;

    setUploading(prev => ({ ...prev, [id]: true }));

    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', id);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Imagen subida correctamente');
        setSelectedFile(prev => ({ ...prev, [id]: null }));
        loadArtists(); // Reload
      } else {
        alert('Error al subir imagen');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error al subir');
    } finally {
      setUploading(prev => ({ ...prev, [id]: false }));
    }
  }

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', background: 'var(--color-dark)', borderRadius: 'var(--border-radius-xl)', border: '1px solid var(--color-border)' }}>
        <h1 style={{ textAlign: 'center', color: 'var(--color-white)', marginBottom: '1rem' }}>Panel Admin - Entre Líneas</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 'var(--border-radius-m)', border: '1px solid var(--color-border)', background: 'var(--color-bg-overlay-soft)', color: 'var(--color-white)' }}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 'var(--border-radius-m)', border: '1px solid var(--color-border)', background: 'var(--color-bg-overlay-soft)', color: 'var(--color-white)' }}
            required
          />
          {loginError && <p style={{ color: 'var(--color-red)', textAlign: 'center' }}>{loginError}</p>}
          <Button type="submit" style={{ marginTop: '0.5rem' }}>Ingresar</Button>
        </form>
        <p style={{ textAlign: 'center', color: 'var(--color-grey-light)', marginTop: '1rem', fontSize: '0.875rem' }}>
          Email: admin@entrelinas.com | Pass: founder123
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-white)', fontSize: '2rem' }}>Panel de Control - Artistas</h1>
        <Button onClick={() => setIsLoggedIn(false)} variant="secondary">Salir</Button>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
        {artists.map((artist) => (
          <div key={artist.id} style={{ background: 'var(--color-dark)', padding: '1.5rem', borderRadius: 'var(--border-radius-l)', border: '1px solid var(--color-border)' }}>
            <h3 style={{ color: 'var(--color-white)', marginBottom: '1rem' }}>{artist.name}</h3>
            <div style={{ position: 'relative', width: '100%', height: '200px', background: 'var(--color-black)', borderRadius: 'var(--border-radius-m)', overflow: 'hidden', marginBottom: '1rem' }}>
              {artist.image ? (
                <Image src={artist.image} alt={artist.name} fill style={{ objectFit: 'cover' }} />
              ) : (
                <p style={{ color: 'var(--color-grey-light)', textAlign: 'center', lineHeight: '200px' }}>Sin imagen</p>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFileSelect(artist.id, e.target.files[0])}
              style={{ display: 'block', marginBottom: '0.5rem', width: '100%', padding: '0.5rem', borderRadius: 'var(--border-radius-s)', border: '1px solid var(--color-border)', background: 'var(--color-bg-overlay-soft)' }}
            />
            <Button 
              onClick={() => handleUpload(artist.id)}
              disabled={uploading[artist.id] || !selectedFile[artist.id]}
              style={{ width: '100%' }}
            >
              {uploading[artist.id] ? 'Subiendo...' : `Subir para ${artist.name}`}
            </Button>
            {selectedFile[artist.id] && (
              <p style={{ fontSize: '0.8rem', color: 'var(--color-grey-light)', marginTop: '0.5rem' }}>
                Listo: {selectedFile[artist.id]?.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
