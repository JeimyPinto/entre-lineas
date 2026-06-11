import localFont from 'next/font/local';
import { Esteban } from 'next/font/google';

export const cloister = localFont({
  src: '../../public/fonts/CloisterBlack.ttf',
  variable: '--font-cloister',
  display: 'swap',
});

export const esteban = Esteban({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-esteban',
  display: 'swap',
});
