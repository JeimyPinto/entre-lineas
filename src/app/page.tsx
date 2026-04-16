import MainSection from '@/components/section';
import Gallery from '@/components/gallery'
import ArtistSection from '@/components/ArtistSection'
import EventsSection from '@/components/EventsSection'
import Contact from '@/components/Contact'
import HistorySection from '@/components/HistorySection'
import Footer from '@/components/Footer'
import { eventService } from '@/services/eventService'
import { artistService } from '@/services/artistService'

export default async function Home() {
  // Carga paralela de datos en el servidor
  const [events, artists] = await Promise.all([
    eventService.getAll(),
    artistService.getAll()
  ]);

  return (
    <main className="home">
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
