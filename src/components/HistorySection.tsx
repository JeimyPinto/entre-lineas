"use client";

import { motion } from "framer-motion";
import { 
  FaTimeline, 
  FaQuoteLeft, 
  FaLayerGroup, 
  FaLandmark, 
  FaBookOpen,
  FaArrowDown
} from "react-icons/fa6";
import styles from "./HistorySection.module.css";

export default function HistorySection() {
  const chapters = [
    {
      id: "origins",
      index: "01",
      title: "Los Orígenes",
      icon: <FaTimeline />,
      content: (
        <div className={styles.pageText}>
          <p>
            &quot;Entre Líneas es una plataforma audiovisual y artística colombiana nacida de la unión de un núcleo de amigos vinculados por la disciplina del freestyle.&quot;
          </p>
          <p>
            Lo que inició como un vínculo de fraternidad evolucionó hacia una estructura profesional diseñada para otorgar visibilidad al talento, con presencia activa en Manizales, Chinchiná y Medellín.
          </p>
          <p>
            El origen del movimiento se sitúa en un entorno donde la rima improvisada contaba con estructuras establecidas, pero con limitada apertura hacia las nuevas propuestas. Los artistas emergentes enfrentaban barreras donde la trayectoria de los expertos funcionaba como un obstáculo para el relevo generacional.
          </p>
        </div>
      )
    },
    {
      id: "philosophy",
      index: "02",
      title: "Filosofía y Propósito",
      icon: <FaLandmark />,
      content: (
        <div className={styles.pageText}>
          <p>
            Un pilar fundamental fue el fomento de espacios <strong>libres de violencia y consumo</strong>.
            Entre Líneas fue el único colectivo que defendió activamente esta premisa bajo la consigna:
          </p>
          <blockquote className={styles.pageBlockquote}>
            <FaQuoteLeft style={{ marginBottom: '1rem', opacity: 0.5 }} /> <br />
            &quot;Entre Líneas es un espacio libre del consumo de sustancias psicoactivas y de la violencia&quot;
          </blockquote>
          <p>
            Para el fundador, Galáctico, Entre Líneas trasciende la definición de organización cultural; representa un <strong>proyecto de vida</strong>. Funciona como un ecosistema donde convergen la pasión por el arte y la necesidad de institucionalizar la cultura urbana.
          </p>
        </div>
      )
    },
    {
      id: "structure",
      index: "03",
      title: "Estructura Institucional",
      icon: <FaLayerGroup />,
      content: (
        <div>
          <div className={styles.pageText}>
            <p>
              La profesionalización del arte urbano requiere una infraestructura sólida. Nuestra estructura se divide en ejes estratégicos que garantizan la calidad y sostenibilidad:
            </p>
          </div>
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
              <p className={styles.miniAreaDesc}>Talleres y formación artística.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "vision",
      index: "04",
      title: "Visión de Expansión",
      icon: <FaBookOpen />,
      content: (
        <div className={styles.pageText}>
          <p>
            La identidad de Entre Líneas se fundamenta en la recuperación de la plaza pública mediante tres pilares:
          </p>
          <p>
            <strong>Entornos Seguros:</strong> Espacios libres de consumo y vicios, garantizando un ambiente profesional donde el talento sea la prioridad.
          </p>
          <p>
            <strong>Inclusión Familiar:</strong> Acceso para familias y menores de edad, buscando la normalización del freestyle como una disciplina artística legítima frente a la sociedad.
          </p>
          <p>
            <strong>Cultura en Expansión:</strong> El movimiento se proyecta hacia una escala nacional, con el objetivo de descentralizar la cultura urbana y llevarla a cada rincón de Colombia.
          </p>
        </div>
      )
    }
  ];

  return (
    <section id="historia" className={styles.historySection}>
      <motion.div 
        className={styles.sectionHeader}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.title}>Nuestra Historia</h2>
        <p className={styles.sectionHeaderSubtitle}>
          Toda gran revolución comienza con una idea clara. Descubre el camino de Entre Líneas, 
          desde un grupo de amigos hasta un movimiento cultural nacional.
        </p>
        <motion.div 
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ marginTop: '2rem', color: 'var(--color-red)' }}
        >
          <FaArrowDown />
        </motion.div>
      </motion.div>

      <div className={styles.storyContainer}>
        <div className={styles.timelineLine} />
        
        {chapters.map((chapter, index) => (
          <motion.div 
            key={chapter.id}
            className={styles.chapter}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className={styles.chapterDot} />
            <span className={styles.chapterIndex}>{chapter.index}</span>
            <h3 className={styles.chapterTitle}>
              <span style={{ color: 'var(--color-red)', marginRight: '1rem' }}>{chapter.icon}</span>
              {chapter.title}
            </h3>
            <div className={styles.chapterContent}>
              {chapter.content}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
