'use client'

import { useState, useEffect, useRef } from 'react'
import { Video, GalleryData } from '@/entities/youtube-video/types'

export function useYouTubeData() {
  const [shorts, setShorts] = useState<Video[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [subscriberCount, setSubscriberCount] = useState<string | null>(null)
  const [highlights, setHighlights] = useState<GalleryData['highlights'] | null>(null)
  const [loading, setLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    let canceled = false

    async function loadData() {
      if (canceled || !mountedRef.current) return

      setLoading(true)
      setError(null)

      try {
        // Add timestamp to prevent caching
        const response = await fetch('/api/youtube?t=' + Date.now(), { cache: 'no-store' })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const data: GalleryData = await response.json()

        if (canceled || !mountedRef.current) return

        setShorts(data.shorts || [])
        setVideos(data.videos || [])
        setSubscriberCount(data.subscriberCount || null)
        setHighlights(data.highlights || null)
        setIsOnline(true)
      } catch (e) {
        if (canceled || !mountedRef.current) return
        setError(e instanceof Error ? e.message : 'Error')
        setIsOnline(false)
      } finally {
        if (mountedRef.current) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      canceled = true
      mountedRef.current = false
    }
  }, [])

  return { shorts, videos, subscriberCount, highlights, loading, isOnline, error }
}
