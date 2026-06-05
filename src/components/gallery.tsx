"use client";

import { useState } from "react";
import GalleryItem from "./GalleryItem";
import GalleryModal from "./GalleryModal";
import YouTubeIframe from "./YouTubeIframe";
import SuscribeBanner from "./SuscribeBanner";
import Image from "next/image";
import styles from "./gallery.module.css";
import { useYouTubeData } from "@/features/youtube/hooks/useYouTubeData";
import Button from "./ui/Button";

import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Gallery() {
	const { shorts, videos, subscriberCount, loading, isOnline, error } = useYouTubeData();
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [selected, setSelected] = useState<string | null>(null);
	const [carouselIndex, setCarouselIndex] = useState(0);
	const [activeBlock, setActiveBlock] = useState<'videos' | 'shorts'>('videos');

	// Debug logging
	console.log("[Gallery] Render - loading:", loading, "isOnline:", isOnline, "videos:", videos.length, "shorts:", shorts.length, "error:", error);

	// Show loading only when we're actually loading data (not during initial SSR)
	if (loading) {
		return (
			<div className={styles.gallerySection}>
				<div className={styles.galleryLoading}>
					Cargando galería...
					{error && <p style={{ color: 'red', marginTop: '0.5rem' }}>Error: {error}</p>}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.gallerySection}>
			{!isOnline && (
				<div className={styles.galleryOfflineBanner}>
					<Image
						src="/entre lineas 2-02.png"
						alt="Entre Líneas Logo"
						width={48}
						height={48}
						style={{ marginBottom: "0.5rem", width: "auto", height: "auto" }}
					/>
					<span>Sin conexión a internet. Conéctate para ver la galería de videos.</span>
				</div>
			)}
			{/* Bloque informativo superior */}
			<div className={styles.galleryInfoBlock}>
				<div className={styles.galleryInfoHeader}>
					<Image src="/1-01.png" alt="Logo Entre Líneas" width={56} height={56} style={{ borderRadius: '1.2rem', background: '#fff', width: 'auto', height: 'auto' }} />
					<div className={styles.galleryInfoTitle}>
						<h2>Galería de Videos</h2>
						{subscriberCount && (
							<span className={styles.gallerySubscribers}>
								{typeof subscriberCount === 'string' ? subscriberCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(subscriberCount).toLocaleString()} suscriptores
							</span>
						)}
					</div>
				</div>
				<p className={styles.galleryInfoDesc}>
					Este es un compendio de los últimos videos y shorts subidos al canal oficial de Entre Líneas. ¡Explora el contenido y no olvides suscribirte para apoyar el proyecto!
				</p>
				<Button 
					href="https://www.youtube.com/@EntreLineasOficial" 
					variant="primary"
				>
					Suscribirse al canal
				</Button>
			</div>
			<div className={styles.galleryBlockTabs}>
				<button
					className={activeBlock === 'videos' ? styles.active : ''}
					onClick={() => setActiveBlock('videos')}
				>Videos</button>
				<button
					className={activeBlock === 'shorts' ? styles.active : ''}
					onClick={() => setActiveBlock('shorts')}
				>Shorts</button>
			</div>
			{/* Carousel nav solo en móvil. Dejamos que CSS controle la visibilidad pero JS controla el índice */}
			{((activeBlock === 'videos' ? videos : shorts).length > 1) && (
				<div className={styles.galleryCarouselNav}>
					{Array.from({ length: (activeBlock === 'videos' ? videos : shorts).length }).map((_, i) => (
						<button
							key={i}
							className={styles.galleryCarouselDot + (i === carouselIndex ? ` ${styles.active}` : "")}
							aria-label={`Ir al video ${i + 1}`}
							onClick={() => setCarouselIndex(i)}
						/>
					))}
				</div>
			)}
			<div
				className={styles.galleryGrid}
				style={
					isMobile && (activeBlock === 'videos' ? videos : shorts).length > 0
						? { transform: `translateX(-${carouselIndex * 86}vw)` }
						: undefined
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
				<div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
					<Button 
						variant="secondary" 
						onClick={() => setSelected(null)}
					>
						Cerrar
					</Button>
				</div>
			</GalleryModal>
		</div>
	);
}
