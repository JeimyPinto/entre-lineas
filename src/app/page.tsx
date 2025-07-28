import MainSection from '@/components/section';
import Gallery from '@/components/gallery'

export default function Home() {
  return (
    <main className="home">
      <div id="inicio">
        <MainSection />
      </div>
      <div id="galeria">
        <Gallery />
      </div>
    </main>
  );
}
