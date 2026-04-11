import MainSection from '@/components/section';
import Gallery from '@/components/gallery'
import ArtistSection from '@/components/ArtistSection'
import EventsSection from '@/components/EventsSection'
import Contact from '@/components/Contact'
import HistorySection from '@/components/HistorySection'
import Footer from '@/components/Footer'

export default function Home() {
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
        <ArtistSection />
      </div>
      <div id="eventos">
        <EventsSection />
      </div>
      <Contact />
      <Footer />
    </main>
  );
}
