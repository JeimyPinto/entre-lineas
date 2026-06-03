"use client"
import { useState, useEffect } from "react";
import { Video, GalleryData } from "@/entities/youtube-video/types";

export function useYouTubeData() {
  const [shorts, setShorts] = useState<Video[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [subscriberCount, setSubscriberCount] = useState<string | null>(null);
  const [highlights, setHighlights] = useState<GalleryData['highlights'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("/api/youtube")
      .then((res) => res.json())
      .then((data: GalleryData) => {
        setShorts(data.shorts || []);
        setVideos(data.videos || []);
        setSubscriberCount(data.subscriberCount || null);
        setHighlights(data.highlights || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching YouTube data:", err);
        setLoading(false);
      });
  }, [isOnline]);

  return { shorts, videos, subscriberCount, highlights, loading, isOnline };
}
