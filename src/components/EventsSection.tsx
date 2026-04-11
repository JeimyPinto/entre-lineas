"use client";

import styles from "./EventsSection.module.css";
import InstagramCard from "./ui/InstagramCard";
import { eventsData } from "../data/events";

export default function EventsSection() {
  const events = eventsData;

  return (
    <section className={`${styles.eventsSection} mobile-section-padding`}>
      <div className={styles.sectionHeader}>
        <h2 className={`${styles.title} mobile-title-h1`}>Eventos</h2>
        <p className={styles.subtitle}>
          Revive los mejores momentos de nuestras batallas de freestyle y eventos culturales.
        </p>
      </div>

      <div className={`${styles.eventsGrid} mobile-reduced-gap`}>
        {events.map((event) => (
          <InstagramCard
            key={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            postUrl={event.postUrl}
            judges={event.judges}
            hosts={event.host}
            youtubeLink={event.youtubeLink}
          />
        ))}
      </div>
    </section>
  );
}
