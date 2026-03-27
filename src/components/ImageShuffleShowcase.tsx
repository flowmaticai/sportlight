import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageShuffleShowcaseProps {
  images: string[];
  alt?: string;
  interval?: number;
  zoomOut?: boolean;
}

const ImageShuffleShowcase = ({
  images,
  alt = "Showcase Image",
  interval = 10000,
  zoomOut = false
}: ImageShuffleShowcaseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([0, 1]));

  useEffect(() => {
    images.slice(0, 2).forEach((src, _idx) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 800);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  useEffect(() => {
    const nextNextIndex = (currentIndex + 2) % images.length;
    if (!preloadedImages.has(nextNextIndex)) {
      const img = new Image();
      img.src = images[nextNextIndex];
      setPreloadedImages(prev => new Set([...prev, nextNextIndex]));
    }
  }, [currentIndex, images, preloadedImages]);

  const nextIndex = (currentIndex + 1) % images.length;
  const objectFitClass = zoomOut ? 'object-contain' : 'object-cover';
  const backgroundClass = zoomOut ? 'bg-charcoal' : '';

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-2xl ${backgroundClass}`}>
      <motion.img
        key={`back-${nextIndex}`}
        src={images[nextIndex]}
        alt={alt}
        decoding="async"
        loading="lazy"
        className={`absolute inset-0 w-full h-full ${objectFitClass} rounded-2xl shadow-2xl`}
        style={{ willChange: 'transform' }}
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={isTransitioning ? {
          scale: 1.0,
          opacity: 1,
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
        } : {
          scale: 0.9,
          opacity: 0.7
        }}
      />

      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.img
            key={`front-${currentIndex}`}
            src={images[currentIndex]}
            alt={alt}
            decoding="async"
            loading="eager"
            className={`absolute inset-0 w-full h-full ${objectFitClass} rounded-2xl shadow-2xl`}
            style={{ willChange: 'transform' }}
            initial={{ scale: 1.0, opacity: 1 }}
            animate={{ scale: 1.0, opacity: 1 }}
            exit={{
              scale: [1.05, 0.9],
              opacity: [1, 0.7],
              transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageShuffleShowcase;
