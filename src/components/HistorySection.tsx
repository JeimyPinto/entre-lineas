"use client";
import styles from "./HistorySection.module.css";
import { FaTimeline, FaQuoteLeft, FaLayerGroup, FaLandmark } from "react-icons/fa6";

export default function HistorySection() {
  return (
    <section id="historia" className={styles.historySection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Historia</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.content}>
          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <FaTimeline className={styles.icon} />
              <h3 className={styles.subsectionTitle}>Introducción</h3>
            </div>
            <p className={styles.text}>
              "Entre Líneas es una plataforma audiovisual y artística colombiana nacida de la unión de un núcleo de amigos vinculados por la disciplina del freestyle. Lo que inició como un vínculo de fraternidad evolucionó hacia una estructura profesional diseñada para otorgar visibilidad al talento, con presencia activa en Manizales, Chinchiná y Medellín. El movimiento se proyecta hacia una escala nacional, habiendo gestionado ya la participación de artistas en municipios como Anserma y Pereira con el objetivo de descentralizar la cultura urbana."
            </p>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <FaLandmark className={styles.icon} />
              <h3 className={styles.subsectionTitle}>Antecedentes y Contexto de la Escena</h3>
            </div>
            <div className={styles.text}>
              <p>
                El origen del movimiento se sitúa en un entorno donde la rima improvisada contaba con estructuras establecidas y dinámicas consolidadas. No obstante, este panorama se caracterizaba por una limitada apertura hacia las nuevas propuestas y los talentos emergentes. Los artistas novatos enfrentaban barreras en los círculos de práctica y competencias, donde la trayectoria de los expertos funcionaba como un obstáculo para el relevo generacional.
              </p>
              <p>
                Frente al modelo de gestión predominante en sectores tradicionales, surgieron alternativas periféricas que buscaban democratizar la práctica. Espacios como Subtecráneo, THC y Eter se plantaron como opciones frente al estilo institucionalizado del freestyle convencional. De estas dinámicas de resistencia no solo nació Entre Líneas, sino una red de colectivos que desafiaron la estructura cerrada del pasado.
              </p>
              <p>
                Un pilar fundamental en esta transición fue el fomento deliberado de espacios libres de violencia y del consumo de sustancias psicoactivas. A diferencia de otras organizaciones de la época, Entre Líneas fue el único colectivo que defendió y adaptó activamente sus espacios bajo esta premisa. Durante las jornadas, la organización enfatizaba su postura mediante el perifoneo constante de la consigna: <strong>"Entre Líneas es un espacio libre del consumo de sustancias psicoactivas y de la violencia"</strong>. Esta política atrajo a un público más joven y a una generación de artistas con una visión renovada, priorizando el bienestar y el respeto mutuo. Con el tiempo, la escena previa se diluyó, permitiendo que la nueva generación tomara el control de la narrativa regional.
              </p>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <FaQuoteLeft className={styles.icon} />
              <h3 className={styles.subsectionTitle}>El Sentido del Proyecto: Perspectiva de Galáctico</h3>
            </div>
            <p className={styles.text}>
              Para Galáctico, fundador del movimiento, Entre Líneas trasciende la definición de una organización cultural convencional; representa un proyecto de vida. Bajo su óptica, la organización funciona como un ecosistema donde convergen la pasión por el arte y la necesidad de institucionalizar la cultura urbana. La plataforma busca inspirar y transformar realidades, fundamentada en la convicción de que el freestyle es una herramienta de autoconocimiento con la capacidad de cambiar e incluso salvar vidas.
            </p>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <FaLayerGroup className={styles.icon} />
              <h3 className={styles.subsectionTitle}>Estructura Multidisciplinar y Áreas de Acción</h3>
            </div>
            <p className={styles.text}>
              La evolución de Entre Líneas ha permitido la creación de diversas divisiones operativas que garantizan la autonomía y profesionalismo del colectivo:
            </p>
            
            <div className={styles.areasGrid}>
              <div className={styles.areaItem}>
                <strong className={styles.areaTitle}>Diseño Visual</strong>
                <p className={styles.areaDescription}>Creación de identidad gráfica y flyers propios, dotando a los eventos de una estética profesional y reconocible.</p>
              </div>
              
              <div className={styles.areaItem}>
                <strong className={styles.areaTitle}>Producción Audiovisual</strong>
                <p className={styles.areaDescription}>Postproducción y edición de video de todas las competencias y actividades, garantizando un registro histórico de alta calidad.</p>
              </div>
              
              <div className={styles.areaItem}>
                <strong className={styles.areaTitle}>Producción Musical</strong>
                <p className={styles.areaDescription}>Laboratorio creativo para la grabación de voces y creación de ritmos (beatmaking), proporcionando a los artistas herramientas técnicas para su obra.</p>
              </div>
              
              <div className={styles.areaItem}>
                <strong className={styles.areaTitle}>Gestión Jurídica y Propiedad Intelectual</strong>
                <p className={styles.areaDescription}>Asesoría en temas de copyright, distribución musical y marcos legales, protegiendo los derechos de los creadores y profesionalizando su salida al mercado.</p>
              </div>
              
              <div className={styles.areaItem}>
                <strong className={styles.areaTitle}>Fomento a la Escena</strong>
                <p className={styles.areaDescription}>Política de patrocinio a otras competencias mediante la entrega de premios simbólicos para los campeones, fortaleciendo el tejido de la comunidad urbana.</p>
              </div>
              
              <div className={styles.areaItem}>
                <strong className={styles.areaTitle}>Eje Pedagógico</strong>
                <p className={styles.areaDescription}>Desarrollo de talleres y charlas enfocados en la formación artística y el crecimiento personal, utilizando el freestyle como motor de disciplina y expresión.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
