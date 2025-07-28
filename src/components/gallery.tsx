"use client";


import { useState, useEffect } from "react";
import GalleryItem from "./GalleryItem";
import GalleryModal from "./GalleryModal";
import YouTubeIframe from "./YouTubeIframe";
import SuscribeBanner from "./SuscribeBanner";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface GalleryData {
  shorts: Video[];
  videos: Video[];
  subscriberCount?: string;
}
export default function Gallery() {
	const [shorts, setShorts] = useState<Video[]>([]);
	const [videos, setVideos] = useState<Video[]>([]);
	const [subscriberCount, setSubscriberCount] = useState<string | null>(null);
	const [selected, setSelected] = useState<string | null>(null);
	const [isOnline, setIsOnline] = useState(true);
	const [carouselIndex, setCarouselIndex] = useState(0);
	const [activeBlock, setActiveBlock] = useState<'videos' | 'shorts'>('videos');

	useEffect(() => {
		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);
		setIsOnline(navigator.onLine);
		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);
		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	useEffect(() => {
		if (!isOnline) return;
		fetch("/api/youtube")
			.then((res) => res.json())
			.then((data: GalleryData) => {
				setShorts(data.shorts || []);
				setVideos(data.videos || []);
				setSubscriberCount(data.subscriberCount || null);
			});
	}, [isOnline]);

	return (
		<div className="gallery-section">
			{!isOnline && (
				<div className="gallery-offline-banner">
					<Image
						src="/entre lineas 2-02.png"
						alt="Entre Líneas Logo"
						style={{ height: "48px", marginBottom: "0.5rem" }}
					/>
					<span>Sin conexión a internet. Conéctate para ver la galería de videos.</span>
				</div>
			)}
			{/* Bloque informativo superior */}
			<div className="gallery-info-block">
				<div className="gallery-info-header">
					<Image src="/1-01.png." alt="Logo Entre Líneas" width={56} height={56} style={{ borderRadius: '1.2rem', background: '#fff' }} />
					<div className="gallery-info-title">
						<h2>Galería de Videos</h2>
						{subscriberCount && (
							<span className="gallery-subscribers">{Number(subscriberCount).toLocaleString()} suscriptores</span>
						)}
					</div>
				</div>
				<p className="gallery-info-desc">
					Este es un compendio de los últimos videos y shorts subidos al canal oficial de Entre Líneas. ¡Explora el contenido y no olvides suscribirte para apoyar el proyecto!
				</p>
				<a
					className="btn btn-primary gallery-suscribe-btn"
					href="https://www.youtube.com/@EntreLineasOficial" target="_blank" rel="noopener noreferrer"
				>
					Suscribirse al canal
				</a>
			</div>
			<div className="gallery-block-tabs">
				<button
					className={activeBlock === 'videos' ? 'active' : ''}
					onClick={() => setActiveBlock('videos')}
				>Videos</button>
				<button
					className={activeBlock === 'shorts' ? 'active' : ''}
					onClick={() => setActiveBlock('shorts')}
				>Shorts</button>
			</div>
			{/* Carousel nav solo en móvil */}
			{((activeBlock === 'videos' ? videos : shorts).length > 1) && typeof window !== 'undefined' && window.innerWidth <= 768 && (
				<div className="gallery-carousel-nav">
					{Array.from({ length: (activeBlock === 'videos' ? videos : shorts).length }).map((_, i) => (
						<button
							key={i}
							className={"gallery-carousel-dot" + (i === carouselIndex ? " active" : "")}
							aria-label={`Ir al video ${i + 1}`}
							onClick={() => setCarouselIndex(i)}
						/>
					))}
				</div>
			)}
			<div
				className="gallery-grid"
				style={
					typeof window !== 'undefined' && window.innerWidth <= 768 && (activeBlock === 'videos' ? videos : shorts).length > 0
						? { scrollBehavior: 'smooth', transform: `translateX(-${carouselIndex * 86}vw)` }
						: { scrollBehavior: 'smooth' }
				}
			>
				{(activeBlock === 'videos' ? videos : shorts).map((video) => (
					<GalleryItem
						key={video.id}
						id={video.id}
						title={video.title}
						thumbnail={video.thumbnail}
						onClick={setSelected}
					/>
				))}
			</div>
			<GalleryModal open={!!selected} onClose={() => setSelected(null)}>
				{selected && <YouTubeIframe videoId={selected} />}
				<SuscribeBanner />
				<button
					className="gallery-modal-close"
					onClick={() => setSelected(null)}
				>
					Cerrar
				</button>
			</GalleryModal>
		</div>
	);
}