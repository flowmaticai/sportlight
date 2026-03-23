// PERFORMANCE: Utility for prefetching images and routes
// This improves perceived performance by loading resources before they're needed

/**
 * Prefetch images for faster loading when navigating to new pages
 */
export const prefetchImages = (imageUrls: string[]) => {
  if (typeof window === 'undefined') return;

  imageUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Prefetch critical images for specific routes
 */
export const routeImagePrefetch = {
  about: [
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768669398773-a3err.png',
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768670514031-l6xnwq.png',
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768670570621-rytg19.png',
  ],
  services: [
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1769860021369-p10h2.png',
  ],
  testimonials: [
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768673223775-bufado.jpeg',
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768672322648-h1pds.jpeg',
  ],
};

/**
 * Prefetch route on hover for instant navigation
 */
export const prefetchOnHover = (route: keyof typeof routeImagePrefetch) => {
  const images = routeImagePrefetch[route];
  if (images) {
    prefetchImages(images);
  }
};
