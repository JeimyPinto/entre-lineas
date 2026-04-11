"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  FaTimeline, 
  FaQuoteLeft, 
  FaLayerGroup, 
  FaLandmark, 
  FaBookOpen,
  FaChevronRight,
  FaChevronLeft
} from "react-icons/fa6";
import styles from "./HistorySection.module.css";

export default function HistorySection() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      type: "cover",
      content: (
        <div className={styles.cover}>
          <Image 
            src="/1-02.png" 
            alt="Logo Entre Líneas" 
            width={200} 
            height={280} 
            className={styles.logo}
          />
          <h2 className={styles.coverTitle}>Historia</h2>
          <span className={styles.coverSubtitle}>ENTRE LÍNEAS</span>
          <p className={styles.coverSubtitleWrapper}>Haz clic para abrir</p>
        </div>
      )
    },
    {
      type: "index",
      title: "Índice",
      content: (
        <div className={styles.indexContainer}>
          {[
            { id: 2, label: "Introducción", icon: <FaTimeline /> },
            { id: 3, label: "Antecedentes", icon: <FaLandmark /> },
            { id: 5, label: "Perspectiva", icon: <FaQuoteLeft /> },
            { id: 6, label: "Estructura", icon: <FaLayerGroup /> },
            { id: 7, label: "Visión de Expansión y Valor Social", icon: <FaLayerGroup /> }
          ].map((item) => (
            <div 
              key={item.id} 
              className={styles.indexItem}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPage(item.id);
              }}
            >
              <div className={styles.indexItemContent}>
                {item.icon}
                <span>{item.label}</span>
              </div>
              <FaChevronRight size={14} />
            </div>
          ))}
        </div>
      )
    },
    {
      type: "content",
      title: "Introducción",
      content: (
        <div className={styles.pageText}>
          <p>
            &quot;Entre Líneas es una plataforma audiovisual y artística colombiana nacida de la unión de un núcleo de amigos vinculados por la disciplina del freestyle.&quot;
          </p>
          <p>
            Lo que inició como un vínculo de fraternidad evolucionó hacia una estructura profesional diseñada para otorgar visibilidad al talento, con presencia activa en Manizales, Chinchiná y Medellín.
          </p>
          <p>
            El movimiento se proyecta hacia una escala nacional, con el objetivo de descentralizar la cultura urbana.
          </p>
        </div>
      )
    },
    {
      type: "content",
      title: "Antecedentes",
      content: (
        <div className={styles.pageText}>
          <p>
            El origen del movimiento se sitúa en un entorno donde la rima improvisada contaba con estructuras establecidas, pero con limitada apertura hacia las nuevas propuestas.
          </p>
          <p>
            Los artistas emergentes enfrentaban barreras donde la trayectoria de los expertos funcionaba como un obstáculo para el relevo generacional.
          </p>
          <p>
            Frente a esto, surgieron alternativas periféricas que buscaban democratizar la práctica.
          </p>
        </div>
      )
    },
    {
      type: "content",
      title: "Contexto Social",
      content: (
        <div className={styles.pageText}>
          <p>
            Un pilar fundamental fue el fomento de espacios <strong>libres de violencia y consumo</strong>.
          </p>
          <p>
            Entre Líneas fue el único colectivo que defendió activamente esta premisa bajo la consigna:
          </p>
          <blockquote className={styles.pageBlockquote}>
            &quot;Entre Líneas es un espacio libre del consumo de sustancias psicoactivas y de la violencia&quot;
          </blockquote>
          <p>
            Esta política permitió que una nueva generación tomara el control de la narrativa regional.
          </p>
        </div>
      )
    },
    {
      type: "content",
      title: "Visión de Galáctico",
      content: (
        <div className={styles.pageText}>
          <p>
            Para el fundador, Entre Líneas trasciende la definición de organización cultural; representa un <strong>proyecto de vida</strong>.
          </p>
          <p>
            Funciona como un ecosistema donde convergen la pasión por el arte y la necesidad de institucionalizar la cultura urbana.
          </p>
          <p>
            Se fundamenta en la convicción de que el freestyle es una herramienta de autoconocimiento con la capacidad de transformar realidades.
          </p>
        </div>
      )
    },
    {
      type: "content",
      title: "Estructura I",
      content: (
        <div className={styles.miniGrid}>
          <div className={styles.miniArea}>
            <span className={styles.miniAreaTitle}>Diseño Visual</span>
            <p className={styles.miniAreaDesc}>Identidad gráfica y flyers propios para estética profesional.</p>
          </div>
          <div className={styles.miniArea}>
            <span className={styles.miniAreaTitle}>Audiovisual</span>
            <p className={styles.miniAreaDesc}>Postproducción y edición de video de alta calidad.</p>
          </div>
          <div className={styles.miniArea}>
            <span className={styles.miniAreaTitle}>Producción Musical</span>
            <p className={styles.miniAreaDesc}>Beatmaking y grabación de voces para artistas locales.</p>
          </div>
        </div>
      )
    },
    {
      type: "content",
      title: "Estructura II",
      content: (
        <div className={styles.miniGrid}>
          <div className={styles.miniArea}>
            <span className={styles.miniAreaTitle}>Gestión Jurídica</span>
            <p className={styles.miniAreaDesc}>Asesoría en copyright y propiedad intelectual.</p>
          </div>
          <div className={styles.miniArea}>
            <span className={styles.miniAreaTitle}>Fomento a la Escena</span>
            <p className={styles.miniAreaDesc}>Patrocinio a otras competencias locales.</p>
          </div>
          <div className={styles.miniArea}>
            <span className={styles.miniAreaTitle}>Eje Pedagógico</span>
            <p className={styles.miniAreaDesc}>Talleres y charlas de formación artística y personal.</p>
          </div>
        </div>
      )
    },
    {
      type: "content",
      title: "Visión de Expansión y Valor Social",
      content: (
        <div className={styles.pageText}>
          <p>
            La identidad de Entre Líneas se fundamenta en la recuperación de la plaza pública mediante tres pilares:
          </p>
          <p>
            <strong>Entornos Seguros:</strong> Espacios libres de consumo y vicios, garantizando un ambiente profesional.
          </p>
          <p>
            <strong>Inclusión Familiar:</strong> Acceso para familias y menores de edad para la normalización del movimiento.
          </p>
          <p>
            <strong>Cultura en Expansión:</strong> Consolidación del arte urbano como herramienta de transformación legítima y accesible para la sociedad.
          </p>
        </div>
      )
    },
    {
      type: "cover",
      content: (
        <div className={styles.cover} style={{ background: 'var(--color-dark)' }}>
          <Image 
            src="/1-05.png" 
            alt="Logo Entre Líneas" 
            width={100} 
            height={140} 
            style={{ opacity: 0.5, width: 'auto', height: 'auto' }}
          />
          <h2 className={styles.pageTitle} style={{ border: 'none', textAlign: 'center' }}>Fin del Capítulo</h2>
          <button 
            className={`${styles.navBtn} ${styles.finalChapterButton}`}
            onClick={(e) => { e.stopPropagation(); setCurrentPage(0); }}
          >
            Volver al inicio
          </button>
        </div>
      )
    }
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <section id="historia" className={styles.historySection}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderTitle}>
          <FaBookOpen className={styles.icon} />
          <h2 className={styles.title}>Libro de Memorias</h2>
        </div>
        <p className={styles.sectionHeaderSubtitle}>
          Toda historia merece ser contada. Este libro comprende la historia de Entre Líneas narrada desde los ojos de Galáctico, su fundador. 
          Desde sus humildes comienzos como un grupo de amigos apasionados por el freestyle, hasta su transformación en un movimiento cultural 
          que ha revolucionado la escena urbana colombiana. Explora cómo un sueño colectivo se convirtió en una realidad que trasciende 
          generaciones, espacios libres de violencia y una visión que transforma vidas a través del arte.
        </p>
      </div>

      <div className={styles.bookWrapper}>
        <div className={styles.book}>
          {pages.map((page, index) => {
            // Determine stacking and rotation
            const isFlipped = index < currentPage;
            const isCurrent = index === currentPage;
            
            return (
              <motion.div
                key={index}
                className={`${styles.page} ${isFlipped ? styles.flipped : ""}`}
                initial={false}
                animate={{
                  rotateY: isFlipped ? -180 : 0,
                  zIndex: isFlipped ? (index + 1) : (pages.length - index),
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.645, 0.045, 0.355, 1]
                }}
                onClick={isCurrent ? nextPage : (isFlipped && index === currentPage - 1 ? prevPage : undefined)}
              >
                <div className={styles.pageContent}>
                  {page.title && <h3 className={styles.pageTitle}>{page.title}</h3>}
                  {page.content}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button 
          className={styles.navBtn} 
          onClick={prevPage}
        >
          <FaChevronLeft className={styles.navBtnIcon} /> Anterior
        </button>
        <span className={styles.pageCounter}>
          {currentPage + 1} / {pages.length}
        </span>
        <button 
          className={styles.navBtn} 
          onClick={nextPage}
        >
          Siguiente <FaChevronRight className={styles.navBtnIcon} />
        </button>
      </div>
    </section>
  );
}
