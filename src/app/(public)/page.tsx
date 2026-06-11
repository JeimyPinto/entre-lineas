import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import MainSection from './components/MainSection/section';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { eventService } from '@/features/events/services';
import { artistService } from '@/features/artists/services';
import { getYouTubeData } from '@/features/youtube/services';

const Gallery = dynamic(() => import('./components/Gallery/gallery'), {
  loading: () => <div className="loading-placeholder" aria-hidden="true">Cargando...</div>,
});

const ArtistSection = dynamic(() => import('./components/ArtistSection/ArtistSection'), {
  loading: () => <div className="loading-placeholder" aria-hidden="true">Cargando...</div>,
});

const EventsSection = dynamic(() => import('./components/EventsSection/EventsSection'), {
  loading: () => <div className="loading-placeholder" aria-hidden="true">Cargando...</div>,
});

const HistorySection = dynamic(() => import('./components/HistorySection/HistorySection'), {
  loading: () => <div className="loading-placeholder" aria-hidden="true">Cargando...</div>,
});

export default async function Home() {
  let events: import('@/entities/event/types').Event[] = [];
  let artists: import('@/entities/artist/types').Artist[] = [];
  let highlights: Awaited<ReturnType<typeof getYouTubeData>> = null;
  let serverError: string | null = null;

  try {
    [events, artists, highlights] = await Promise.all([
      eventService.getAll(),
      artistService.getAll(),
      getYouTubeData()
    ]);

    if (events.length === 0 && artists.length === 0) {
      serverError = 'Error al conectar con el servidor.';
    }
  } catch (e) {
    serverError = 'Error al conectar con el servidor.';
    console.error('[Home] Error inesperado:', e);
  }

  return (
    <main className="home">
      {serverError && (
        <div className="server-error-banner" role="alert">
          <p>{serverError} Algunos datos podrían no estar disponibles.</p>
        </div>
      )}
      <div id="inicio">
        <MainSection highlights={highlights} />
      </div>
      <Suspense fallback={<div className="loading-placeholder" aria-hidden="true">Cargando...</div>}>
        <HistorySection />
      </Suspense>
      <div id="galeria">
        <Suspense fallback={<div className="loading-placeholder" aria-hidden="true">Cargando...</div>}>
          <Gallery />
        </Suspense>
      </div>
      <div id="artistas">
        <Suspense fallback={<div className="loading-placeholder" aria-hidden="true">Cargando...</div>}>
          <ArtistSection initialArtists={artists} />
        </Suspense>
      </div>
      <div id="eventos">
        <Suspense fallback={<div className="loading-placeholder" aria-hidden="true">Cargando...</div>}>
          <EventsSection initialEvents={events} />
        </Suspense>
      </div>
      <Contact />
      <Footer />
    </main>
  );
}