import MainSection from './components/MainSection/section';
import Gallery from './components/Gallery/gallery'
import ArtistSection from './components/ArtistSection/ArtistSection'
import EventsSection from './components/EventsSection/EventsSection'
import Contact from './components/Contact/Contact'
import HistorySection from './components/HistorySection/HistorySection'
import Footer from './components/Footer/Footer'
import { eventService } from '@/features/events/services'
import { artistService } from '@/features/artists/services'

export default async function Home() {
  let events: import('@/entities/event/types').Event[] = [];
  let artists: import('@/entities/artist/types').Artist[] = [];
  let serverError: string | null = null;

  try {
    [events, artists] = await Promise.all([
      eventService.getAll(),
      artistService.getAll()
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
        <MainSection />
      </div>
      <HistorySection />
      <div id="galeria">
        <Gallery />
      </div>
      <div id="artistas">
        <ArtistSection initialArtists={artists} />
      </div>
      <div id="eventos">
        <EventsSection initialEvents={events} />
      </div>
      <Contact />
      <Footer />
    </main>
  );
}
