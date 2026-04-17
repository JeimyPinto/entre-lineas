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
import { historyHeader, historyChapters, type HistoryContent } from "@/data/history";
import styles from "./HistorySection.module.css";

const iconMap = {
  timeline: <FaTimeline />,
  landmark: <FaLandmark />,
  layer: <FaLayerGroup />,
  book: <FaBookOpen />
};

export default function HistorySection() {
  return (
    <section id="historia" className={styles.historySection}>
      <motion.div 
        className={styles.sectionHeader}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.title}>{historyHeader.title}</h2>
        <p className={styles.sectionHeaderSubtitle}>
          {historyHeader.subtitle}
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
        
        {historyChapters.map((chapter: HistoryContent, index: number) => (
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
              <span style={{ color: 'var(--color-red)', marginRight: '1rem' }}>
                {iconMap[chapter.icon]}
              </span>
              {chapter.title}
            </h3>
            
            <div className={styles.chapterContent}>
              <div className={styles.pageText}>
                {chapter.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                
                {chapter.blockquote && (
                  <blockquote className={styles.pageBlockquote}>
                    <FaQuoteLeft style={{ marginBottom: '1rem', opacity: 0.5 }} /> <br />
                    &quot;{chapter.blockquote}&quot;
                  </blockquote>
                )}

                {chapter.gridItems && (
                  <div className={styles.miniGrid}>
                    {chapter.gridItems.map((item, i) => (
                      <div key={i} className={styles.miniArea}>
                        <span className={styles.miniAreaTitle}>{item.title}</span>
                        <p className={styles.miniAreaDesc}>{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
