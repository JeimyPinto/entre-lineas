import Header from '@/components/header'

export default function Home() {
  return (
    <main className="home-main">
      <Header />
      {/* Contenedor adaptable: escritorio y móvil */}
      <div className="home-container">
        <section className="home-section"></section>
      </div>
    </main>
  );
}
