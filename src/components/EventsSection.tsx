"use client";

import styles from "./EventsSection.module.css";
import InstagramCard from "./ui/InstagramCard";
import { eventsData } from "../data/events";

export default function EventsSection() {
  const events = eventsData;

  return (
    <section className={styles.eventsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Eventos</h2>
        <p className={styles.subtitle}>
          Revive los mejores momentos de nuestras batallas de freestyle y eventos culturales.
        </p>
      </div>

      <div className={styles.eventsGrid}>
        {events.map((event) => (
          <InstagramCard
            key={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            postUrl={event.postUrl}
            thumbnail={event.thumbnail}
            judges={event.judges}
          />
        ))}
      </div>
    </section>
  );
}
