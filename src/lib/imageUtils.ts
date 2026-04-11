export type ArtistImageOrientation = 'portraitImage' | 'squareImage' | 'landscapeImage';

export function clampArtistImageRatio(width: number, height: number) {
  const ratio = width / height;
  return Math.min(Math.max(ratio, 0.65), 1.4);
}

export function getArtistImageOrientation(ratio: number): ArtistImageOrientation {
  if (ratio <= 0.85) return 'portraitImage';
  if (ratio >= 1.15) return 'landscapeImage';
  return 'squareImage';
}
