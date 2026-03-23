import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ChevronDown, Users, Award, Target, Zap, Trophy, ArrowRight, CheckCircle, MessageCircle, Instagram } from 'lucide-react';
import { useScrollAnimation, useMultipleScrollAnimations } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import { useCountUp } from '../hooks/useCountUp';

declare global {
  interface Window {
    iFrameSetup?: (iframe: HTMLIFrameElement) => void;
  }
}

const InstagramFeed = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && window.iFrameSetup) {
      window.iFrameSetup(iframeRef.current);
    }
  }, []);

  const handleLoad = () => {
    if (iframeRef.current && window.iFrameSetup) {
      window.iFrameSetup(iframeRef.current);
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-pink-500/20 shadow-2xl shadow-pink-500/10">
      <iframe
        ref={iframeRef}
        onLoad={handleLoad}
        src="https://app.mirror-app.com/feed-instagram/caa56e48-7850-4d1d-9c87-46c15c448db6/preview"
        style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px' }}
        scrolling="no"
        title="Sportlight Instagram Feed"
      />
    </div>
  );
};

const StatCard = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp({ end: value, suffix, duration: 2500 });

  return (
    <div className="text-center group">
      <div ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-2 group-hover:text-flame transition-colors duration-300">
        {count}
      </div>
      <div className="text-ash text-sm sm:text-base font-medium">{label}</div>
    </div>
  );
};

const Home = () => {
  const { t } = useLanguage();

  const scrollToServices = () => {
    const element = document.getElementById('services-preview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const servicesAnimation = useMultipleScrollAnimations(4);
  const methodologyAnimation = useMultipleScrollAnimations(3);
  const trialAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  const services = [
    {
      icon: Users,
      title: t('services.oneOnOne.title'),
      description: t('services.oneOnOne.description'),
      features: [t('services.oneOnOne.features.custom'), t('services.oneOnOne.features.technique'), t('services.oneOnOne.features.tracking')]
    },
    {
      icon: Trophy,
      title: t('services.volleyball.title'),
      description: t('services.volleyball.description'),
      features: [t('services.volleyball.features.jump'), t('services.volleyball.features.power'), t('services.volleyball.features.injury')]
    },
    {
      icon: Target,
      title: t('services.runners.title'),
      description: t('services.runners.description'),
      features: [t('services.runners.features.economy'), t('services.runners.features.core'), t('services.runners.features.injury')]
    },
    {
      icon: Users,
      title: t('services.team.title'),
      description: t('services.team.description'),
      features: [t('services.team.features.motivation'), t('services.team.features.conditioning'), t('services.team.features.building')]
    }
  ];

  const stats = [
    { value: 150, suffix: "+", label: t('hero.stats.athletes') },
    { value: 95, suffix: "%", label: t('hero.stats.improved') },
    { value: 7, suffix: "", label: t('hero.stats.years') },
    { value: 3, suffix: "", label: t('hero.stats.sports') }
  ];

  return (
    <div className="bg-charcoal">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-soft to-charcoal"></div>
        <div className="absolute inset-0 diagonal-lines opacity-10"></div>
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-flame/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-electric/10 rounded-full blur-3xl" style={{animationDelay: '3s'}}></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-8">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 leading-none tracking-tighter animate-slide-up-delay-1">
            <span className="block">{t('hero.title1')}</span>
            <span className="block bg-gradient-to-r from-flame via-accent to-electric bg-clip-text text-transparent">
              {t('hero.title2')}
            </span>
            <span className="block">{t('hero.title3')}</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-ash mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay-2">
            {t('hero.subtitle')}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8 animate-slide-up-delay-3">
            {stats.map((stat, index) => (
              <StatCard key={index} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-4 relative z-20">
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-flame to-accent text-white font-display font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-flame/50 btn-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-flame opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">{t('hero.bookTrial')}</span>
              <ArrowRight size={20} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button
              onClick={scrollToServices}
              className="group px-8 py-4 bg-charcoal-soft hover:bg-charcoal text-white font-display font-bold text-lg rounded-xl transition-all duration-300 border border-ash/20 hover:border-flame/50 flex items-center justify-center space-x-2 btn-glow"
            >
              <span>{t('hero.explore')}</span>
              <ChevronDown size={20} className="transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </section>

      <section id="services-preview" className="py-24 bg-gradient-to-br from-charcoal-soft via-charcoal to-charcoal-soft grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-charcoal-soft/60 to-charcoal pointer-events-none"></div>
        <div className="absolute inset-0 diagonal-lines opacity-5"></div>
        <div className="absolute inset-0">
          <img
            src="https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770620545324-a7u6se.jpeg"
            alt=""
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover blur-lg opacity-40"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 mb-16">
            <div className="lg:w-1/2 scroll-fade-left is-visible">
              <div className="inline-block mb-4">
                <span className="text-flame font-display font-black text-sm tracking-widest">{t('services.programs')}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-6 tracking-tight">
                {t('services.title')} <span className="text-flame">{t('services.titleAccent')}</span>
              </h2>
              <p className="text-xl text-ash max-w-xl leading-relaxed">
                {t('services.subtitle')}
              </p>
            </div>
            <div className="lg:w-2/5 flex justify-center lg:justify-end scroll-fade-right is-visible">
              {/* POLISH: Added shadow-2xl for visual depth */}
              <div className="w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-2xl overflow-hidden border-4 border-flame/30 shadow-2xl shadow-flame/20">
                {/* PERFORMANCE: Eager loading + async decoding for above-the-fold image */}
                <img
                  src="https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770620545324-a7u6se.jpeg"
                  alt="Training"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                ref={servicesAnimation.setRef(index)}
                className={`group relative bg-charcoal-soft rounded-2xl p-8 border border-flame/10 hover:border-flame/30 transition-all duration-500 hover-lift card-shine border-glow overflow-hidden scroll-fade-up ${servicesAnimation.visibleItems[index] ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-flame/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-flame/10 rounded-2xl mb-6 group-hover:bg-flame/20 transition-all duration-300 icon-bounce">
                    <service.icon size={28} className="text-flame" />
                  </div>

                  <h3
                    className="text-2xl font-display font-black text-white mb-3 group-hover:text-flame transition-colors duration-300"
                    dangerouslySetInnerHTML={{ __html: service.title }}
                  />

                  <p className="text-ash mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-electric rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-ash text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="group inline-flex items-center space-x-2 bg-flame hover:bg-flame-dark text-white px-8 py-4 rounded-xl font-display font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-flame/30"
            >
              <span>{t('services.allPrograms')}</span>
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 bg-charcoal grain-overlay relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-charcoal via-charcoal-soft/60 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-charcoal-soft/60 to-charcoal pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-flame/5"></div>
        <div className="absolute inset-0">
          <img
            src="https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1769855325871-6qxp6.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover blur-lg opacity-40"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:justify-between gap-12 mb-16">
            <div className="lg:w-1/2 lg:text-right scroll-fade-right is-visible">
              <div className="inline-block mb-4">
                <span className="text-electric font-display font-black text-sm tracking-widest">{t('methodology.tag')}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-6 tracking-tight">
                {t('methodology.title')} <span className="text-electric">{t('methodology.titleAccent')}</span>
              </h2>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-start scroll-fade-left is-visible">
              {/* POLISH: Added shadow-2xl for visual depth */}
              <div className="w-full max-w-xl lg:max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden border-4 border-electric/30 shadow-2xl shadow-electric/20">
                <img
                  src="https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1769855325871-6qxp6.png"
                  alt="Methodology"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              ref={methodologyAnimation.setRef(0)}
              className={`group relative bg-gradient-to-br from-charcoal-soft to-charcoal rounded-2xl p-8 border border-electric/10 hover:border-electric/30 transition-all duration-500 hover-lift scroll-fade-up ${methodologyAnimation.visibleItems[0] ? 'is-visible' : ''}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric/5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-electric/10 rounded-2xl mb-6">
                  <Target size={24} className="text-electric" />
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-4">{t('methodology.assessFirst.title')}</h3>
                <p className="text-ash leading-relaxed">
                  {t('methodology.assessFirst.description')}
                </p>
              </div>
            </div>

            <div
              ref={methodologyAnimation.setRef(1)}
              className={`group relative bg-gradient-to-br from-charcoal-soft to-charcoal rounded-2xl p-8 border border-flame/10 hover:border-flame/30 transition-all duration-500 hover-lift scroll-fade-up ${methodologyAnimation.visibleItems[1] ? 'is-visible' : ''}`}
              style={{ transitionDelay: '0.15s' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-flame/5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-flame/10 rounded-2xl mb-6">
                  <Award size={24} className="text-flame" />
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-4">{t('methodology.preventInjuries.title')}</h3>
                <p className="text-ash leading-relaxed">
                  {t('methodology.preventInjuries.description')}
                </p>
              </div>
            </div>

            <div
              ref={methodologyAnimation.setRef(2)}
              className={`group relative bg-gradient-to-br from-charcoal-soft to-charcoal rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-500 hover-lift scroll-fade-up ${methodologyAnimation.visibleItems[2] ? 'is-visible' : ''}`}
              style={{ transitionDelay: '0.3s' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-2xl mb-6">
                  <Zap size={24} className="text-accent" />
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-4">{t('methodology.personalized.title')}</h3>
                <p className="text-ash leading-relaxed">
                  {t('methodology.personalized.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/about"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative bg-gradient-to-br from-charcoal-soft to-charcoal rounded-2xl px-10 py-6 border border-electric/20 hover:border-electric/50 transition-all duration-500 hover-lift flex items-center space-x-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-electric/5 to-flame/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <span className="relative z-10 text-2xl font-display font-black text-white group-hover:text-electric transition-colors duration-300">{t('methodology.about')}</span>
              <ArrowRight size={24} className="relative z-10 text-electric transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>

      <section
        ref={trialAnimation.ref}
        className="py-32 bg-gradient-to-br from-charcoal via-charcoal-soft to-charcoal grain-overlay relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-charcoal via-charcoal/60 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-charcoal-soft/60 to-charcoal pointer-events-none"></div>
        <div className="absolute inset-0 diagonal-lines opacity-5"></div>
        <div className="absolute inset-0">
          <img
            src="https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1769856523579-9bo02e.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover blur-lg opacity-40"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start gap-16">
            <div className={`lg:w-1/2 scroll-fade-left ${trialAnimation.isVisible ? 'is-visible' : ''}`}>
              <div className="inline-block mb-4">
                <span className="text-accent font-display font-black text-sm tracking-widest">{t('trial.tag')}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-6 tracking-tight">
                {t('trial.title')} <span className="text-accent">{t('trial.titleAccent')}</span>
              </h2>
              <p className="text-xl text-ash mb-8 leading-relaxed">
                {t('trial.subtitle')}
              </p>

              <div className="space-y-6 mb-8">
                <div className="bg-gradient-to-br from-electric/10 to-transparent rounded-2xl p-6 border border-electric/20">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-electric rounded-full text-white font-display font-black text-xl mr-4">
                      1
                    </div>
                    <h3 className="text-xl font-display font-black text-white">{t('trial.step1Title')}</h3>
                  </div>
                  <p className="text-ash leading-relaxed pl-16">
                    {t('trial.step1Description')}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-flame/10 to-transparent rounded-2xl p-6 border border-flame/20">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-flame rounded-full text-white font-display font-black text-xl mr-4">
                      2
                    </div>
                    <h3 className="text-xl font-display font-black text-white">{t('trial.step2Title')}</h3>
                  </div>
                  <p className="text-ash leading-relaxed pl-16">
                    {t('trial.step2Description')}
                  </p>
                </div>
              </div>
            </div>

            <div className={`lg:w-1/2 scroll-fade-right ${trialAnimation.isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
              <div className="mb-8">
                {/* POLISH: Added shadow-2xl for visual depth */}
                <div className="w-full aspect-[4/3] rounded-[40px] overflow-hidden border-4 border-accent/30 shadow-2xl shadow-accent/20">
                  <img
                    src="https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1769856523579-9bo02e.png"
                    alt="Training session"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="bg-charcoal-soft rounded-2xl p-8 border border-ash/10">
                <h4 className="text-xl font-display font-black text-white mb-6">{t('trial.whatYouGet')}</h4>
                <ul className="space-y-4">
                  {[
                    t('trial.benefits.assessment'),
                    t('trial.benefits.training'),
                    t('trial.benefits.recommendations'),
                    t('trial.benefits.noCommitment')
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle size={20} className="text-electric flex-shrink-0" />
                      <span className="text-ash">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-flame to-accent text-white px-10 py-5 rounded-xl font-display font-black text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-flame/50"
            >
              <MessageCircle size={24} />
              <span>{t('trial.bookNow')}</span>
              <ArrowRight size={24} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-charcoal-soft via-charcoal to-charcoal-soft grain-overlay relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-charcoal via-charcoal-soft/60 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-charcoal/60 to-charcoal pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-flame/10 via-accent/10 to-electric/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-flame/10 via-accent/10 to-electric/10 rounded-2xl p-8 md:p-12 text-center border border-flame/20">
            <div className="inline-block mb-4">
              <span className="text-flame font-display font-black text-sm tracking-widest">{t('about.schoolExperience')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-4">
              {t('about.schoolExperience')}
            </h2>
            <p className="text-ash mb-8 max-w-2xl mx-auto text-lg">
              {t('about.schoolExperienceText')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-charcoal-soft rounded-xl p-6 border border-flame/10 hover:border-flame/30 transition-all duration-300 hover-lift">
                <div className="text-5xl font-display font-black text-flame mb-2">100+</div>
                <div className="text-ash font-medium">{t('about.runnersTrained')}</div>
              </div>
              <div className="bg-charcoal-soft rounded-xl p-6 border border-electric/10 hover:border-electric/30 transition-all duration-300 hover-lift">
                <div className="text-5xl font-display font-black text-electric mb-2">50+</div>
                <div className="text-ash font-medium">{t('about.volleyballPlayers')}</div>
              </div>
              <div className="bg-charcoal-soft rounded-xl p-6 border border-accent/10 hover:border-accent/30 transition-all duration-300 hover-lift">
                <div className="text-5xl font-display font-black text-accent mb-2">13+</div>
                <div className="text-ash font-medium">{t('about.partnerSchools')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={ctaAnimation.ref}
        className="py-32 bg-charcoal grain-overlay relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-charcoal via-charcoal/60 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-flame/20 via-accent/20 to-electric/20"></div>
        <div className="absolute inset-0 diagonal-lines opacity-10"></div>

        <div className={`max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10 scroll-fade-up ${ctaAnimation.isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-8 tracking-tight">
            {t('cta.title')} <span className="bg-gradient-to-r from-flame via-accent to-electric bg-clip-text text-transparent">{t('cta.titleAccent')}</span>?
          </h2>
          <p className="text-xl text-ash mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center space-x-2 bg-flame hover:bg-flame-dark text-white px-8 py-4 rounded-xl font-display font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-flame/30"
            >
              <span>{t('cta.consultation')}</span>
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-ash text-center mb-4 font-display font-bold tracking-wide">{t('cta.followJourney')}</p>
            <div className="flex justify-center">
              <a
                href="https://www.instagram.com/sportlight.athletes/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-xl font-display font-bold transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/30"
              >
                <Instagram size={20} />
                <span>@sportlight.athletes</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gradient-to-br from-charcoal-soft via-charcoal to-charcoal-soft grain-overlay relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-charcoal to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <Instagram size={24} className="text-pink-500" />
              <span className="text-pink-500 font-display font-black text-sm tracking-widest">INSTAGRAM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-4 tracking-tight">
              Follow Our <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-ash max-w-xl mx-auto mb-6">
              Stay updated with the latest training highlights and athlete achievements
            </p>
            <a
              href="https://www.instagram.com/sportlight.athletes/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 font-display font-bold transition-all duration-300"
            >
              <span>@sportlight.athletes</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          <InstagramFeed />
        </div>
      </section>
    </div>
  );
};

export default Home;
