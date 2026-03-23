interface Logo {
  src: string;
  alt: string;
}

const logos: Logo[] = [
  { src: '/plk_trans.png', alt: 'PLK logo' },
  { src: '/shatin_trans.png', alt: 'Shatin College logo' },
  { src: '/kcc_trans.png', alt: 'KCC logo' },
  { src: '/yingwa_trans.png', alt: 'Ying Wa College logo' },
  { src: 'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770621649640-lyia6.png', alt: 'HKBU logo' },
  { src: '/ttc_trans.png', alt: 'TTC logo' },
  { src: '/ti-l_trans.png', alt: 'TI-L logo' },
  { src: 'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770621351900-nmij6o.png', alt: 'Institution logo' },
  { src: 'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770621779714-u1oagr.png', alt: 'Institution logo' },
  { src: 'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770621796091-dbtty.png', alt: 'Institution logo' },
  { src: 'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770621824031-hzobad.png', alt: 'Institution logo' },
];

const LogoCarousel = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-charcoal-soft/50 to-charcoal relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent"></div>

      <div className="relative z-10">
        <div className="text-center mb-12 px-4">
          <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-3 tracking-tight">
            Trusted By Top Educational Institutions
          </h3>
          <p className="text-ash/70 text-base md:text-lg font-body">
            Supporting athlete development across Hong Kong
          </p>
        </div>

        <div className="w-full overflow-hidden group/carousel">
          <div className="logo-carousel-track group-hover/carousel:[animation-play-state:paused]">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="logo-carousel-item"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-20 md:h-28 lg:h-32 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
