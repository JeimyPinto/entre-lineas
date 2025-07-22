"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="flex items-center justify-between py-4 bg-primary/95 px-6 shadow-md backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <Image src="/1-02.png" alt="Logo" width={77} height={109} />
        <h1 className='text-secondary text-5xl'>Entre Lineas</h1>
      </div>
      {/* Menú de escritorio */}
      <nav className="hidden md:flex items-center gap-6 text-xl">
        <a href="#" className="text-secondary border-b-2 border-transparent hover:border-fourth transition-all pb-1">Inicio</a>
        <a href="#" className="text-secondary border-b-2 border-transparent hover:border-fourth transition-all pb-1">Galería</a>
        <a href="#" className="text-secondary border-b-2 border-transparent hover:border-fourth transition-all pb-1">Eventos</a>
        <a href="#" className="text-secondary border-b-2 border-transparent hover:border-fourth transition-all pb-1">Contacto</a>
        <a href="#" className="text-secondary border-b-2 border-transparent hover:border-fourth transition-all pb-1">Artistas</a>
      </nav>
      {/* Botón hamburguesa en móvil */}
      <button
        className="md:hidden text-secondary hover:text-fourth transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        <Image src="/menu.svg" alt="Menú" width={50} height={50} />
      </button>
      {/* Menú móvil */}
      {menuOpen && (
        <nav className="flex flex-col items-center gap-4 text-xl bg-primary/90 py-6 px-8 rounded-b-xl shadow-lg animate-fade-in-down md:hidden fixed top-16 left-0 right-0">
          <a href="#" className="text-secondary w-full text-center py-2 border-b border-fourth">Inicio</a>
          <a href="#" className="text-secondary w-full text-center py-2 border-b border-fourth">Galería</a>
          <a href="#" className="text-secondary w-full text-center py-2 border-b border-fourth">Eventos</a>
          <a href="#" className="text-secondary w-full text-center py-2 border-b border-fourth">Contacto</a>
          <a href="#" className="text-secondary w-full text-center py-2">Artistas</a>
        </nav>
      )}
    </header>
  );
}
