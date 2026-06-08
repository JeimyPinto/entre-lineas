"use client";

import styles from "./EventsSection.module.css";
import InstagramCard from "@/shared/ui/InstagramCard/InstagramCard";
import { Event } from "@/entities/event/types";

interface EventsSectionProps {
  initialEvents: Event[];
}

export default function EventsSection({ initialEvents }: EventsSectionProps) {
  const events = initialEvents || [];

  return (
    <section className={`${styles.eventsSection} mobile-section-padding`}>
      <div className={styles.sectionHeader}>
        <h2 className={`${styles.title} mobile-title-h1`}>Eventos</h2>
        {events.length > 0 ? (
          <p className={styles.subtitle}>
            Revive los mejores momentos de nuestras batallas de freestyle y eventos culturales.
          </p>
        ) : (
          <p className={styles.subtitle}>No se pudieron cargar los eventos. Verifica tu conexión e inténtalo de nuevo.</p>
        )}
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
