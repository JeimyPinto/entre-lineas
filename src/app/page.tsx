import Header from '@/components/header'

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-third to-fourth px-2 md:px-0">
      <Header />
      {/* Contenedor adaptable: escritorio y móvil */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 py-6 px-2 md:px-0">
        <section className="flex items-center w-full bg-primary rounded-lg min-h-[200px]"></section>
      </div>
    </main>
  );
}
