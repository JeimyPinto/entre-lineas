"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface BlinkingLogoProps {
  closedImg: string;
  openImg: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const BlinkingLogo = ({ 
  closedImg, 
  openImg, 
  size = 60, 
  className = "",
  style = {}
}: BlinkingLogoProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const blink = () => {
      // Random intervals for a more natural effect
      const blinkDuration = 150; //ms
      const nextBlink = Math.random() * 4000 + 2000; // 2-6 seconds between blinks

      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setIsOpen(true);
        }, blinkDuration);
        blink();
      }, nextBlink);
    };

    blink();
  }, []);

  return (
    <div 
      className={className} 
      style={{ 
        position: 'relative', 
        width: size, 
        height: size * 1.3, // Logos are vertical
        ...style 
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isOpen ? 'open' : 'closed'}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 0.1 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <Image
            src={isOpen ? openImg : closedImg}
            alt="Entre Líneas Logo"
            fill
            sizes="100px"
            style={{ objectFit: 'contain' }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BlinkingLogo;
