import { useState, useEffect, useRef } from 'react';

interface BackgroundImageProps {
  src: string;
  fallbackColor?: string;
  overlay?: string;
  className?: string;
  backgroundPosition?: string;
  children?: React.ReactNode;
  priority?: boolean;
}

const BackgroundImage = ({
  src,
  fallbackColor = 'bg-charcoal',
  overlay = 'bg-black/50',
  className = '',
  backgroundPosition = 'center',
  children,
  priority: _priority = false
}: BackgroundImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    imgRef.current = img;
    img.decoding = 'async';

    const timeoutId = setTimeout(() => {
      setImageError(true);
      setImageLoaded(true);
    }, 8000);

    img.onload = () => {
      clearTimeout(timeoutId);
      setImageLoaded(true);
    };

    img.onerror = () => {
      clearTimeout(timeoutId);
      setImageError(true);
      setImageLoaded(true);
    };

    img.src = src;

    return () => {
      clearTimeout(timeoutId);
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
      }
    };
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-charcoal animate-pulse" />
      )}
      {!imageError && imageLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: backgroundPosition,
            opacity: 1
          }}
        />
      )}
      {imageError && imageLoaded && (
        <div className={`absolute inset-0 ${fallbackColor}`} />
      )}
      <div className={`absolute inset-0 ${overlay}`} />
      {children}
    </div>
  );
};

export default BackgroundImage;
