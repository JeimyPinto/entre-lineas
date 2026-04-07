import MainSection from '@/components/section';
import Gallery from '@/components/gallery'
import ArtistSection from '@/components/ArtistSection'
import EventsSection from '@/components/EventsSection'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="home">
      <div id="inicio">
        <MainSection />
      </div>
      <div id="artistas">
        <ArtistSection />
      </div>
      <div id="eventos">
        <EventsSection />
      </div>
      <div id="galeria">
        <Gallery />
      </div>
      <Contact />
    </main>
  );
}
