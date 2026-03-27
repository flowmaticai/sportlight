import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, Zap, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import LogoCarousel from '../components/LogoCarousel';
import BackgroundImage from '../components/BackgroundImage';
import TestimonialSubmissionForm from '../components/TestimonialSubmissionForm';

const TestimonialsCarousel = ({ testimonials, t }: { testimonials: any[], t: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [handleNext]);

  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      items.push({ ...testimonials[index], position: i });
    }
    return items;
  };

  return (
    <section className="py-24 bg-charcoal-soft grain-overlay relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-flame font-display font-black text-sm tracking-widest">{t.testimonials.testimonialsTag}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">
            {t.testimonials.whatOurAthletesSay} <span className="text-flame">{t.testimonials.athletesSay}</span>
          </h2>
          <p className="text-xl text-ash max-w-3xl mx-auto">
            {t.testimonials.realTestimonials}
          </p>
        </div>

        <div className="relative h-[850px] md:h-[800px] flex items-center justify-center mb-12">
          <div className="absolute inset-0 flex items-center justify-center">
            {getVisibleTestimonials().map((testimonial, idx) => {
              const position = testimonial.position;
              const isCenter = position === 0;

              return (
                <div
                  key={`${testimonial.name}-${idx}`}
                  className={`absolute transition-all duration-700 ease-in-out ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{
                    transform: `translateX(${position * 100}%) scale(${isCenter ? 1 : 0.85})`,
                    zIndex: isCenter ? 20 : 10 - Math.abs(position),
                  }}
                >
                  <div
                    className={`bg-gradient-to-br from-charcoal to-charcoal-soft rounded-2xl border transition-all duration-700 h-[720px] md:h-[680px] ${
                      isCenter
                        ? 'border-flame/40 shadow-2xl shadow-flame/20 w-[340px] md:w-[420px]'
                        : 'border-white/5 opacity-40 md:opacity-60 w-[300px] md:w-[360px]'
                    } ${position === -1 ? 'hidden md:block' : ''} ${position === 1 ? 'hidden md:block' : ''}`}
                  >
                    <div className="p-8 md:p-10 flex flex-col items-center text-center h-full">
                      <div
                        className={`mb-6 rounded-full bg-gradient-to-br from-accent/20 to-flame/20 border-4 flex items-center justify-center overflow-hidden ${
                          isCenter ? 'w-32 h-32 border-flame/30' : 'w-24 h-24 border-accent/20'
                        }`}
                      >
                        {testimonial.image && !testimonial.image.includes('Placeholder') ? (
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            loading="lazy"
                            decoding="async"
                            className={`w-full h-full object-cover ${
                              testimonial.imagePosition === 'bottom' ? 'object-bottom' :
                              testimonial.imagePosition === 'center' ? 'object-center' : 'object-top'
                            }`}
                          />
                        ) : (
                          <User size={isCenter ? 48 : 36} className="text-white/60" />
                        )}
                      </div>

                      <h3 className={`font-display font-black text-white mb-2 ${isCenter ? 'text-2xl' : 'text-xl'}`}>
                        {testimonial.name}
                      </h3>
                      <p className="text-accent font-bold text-sm mb-4">{testimonial.sport}</p>

                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={isCenter ? 18 : 16} className="text-flame fill-current" />
                        ))}
                      </div>

                      <Quote size={isCenter ? 28 : 24} className="text-white/10 mb-4" />

                      <div className={`text-ash italic leading-relaxed mb-6 flex-grow ${isCenter ? 'text-base' : 'text-sm'}`}>
                        <p>{testimonial.text}</p>
                      </div>

                      <div className="bg-charcoal/50 rounded-xl p-4 border border-accent/20 w-full mt-auto">
                        <h4 className={`font-display font-black text-white mb-1 ${isCenter ? 'text-sm' : 'text-xs'}`}>
                          {testimonial.achievement}
                        </h4>
                        <p className={`text-accent ${isCenter ? 'text-xs' : 'text-[10px]'}`}>{testimonial.results}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center items-center space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 300);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-flame'
                  : 'w-3 h-3 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const testimonials = [
    {
      name: "Lau Cheuk Yin",
      sport: "D1 Volleyball",
      achievement: language === 'zh' ? "彈跳高度提升二十厘米" : "20cm Jump Height Improvement",
      rating: 5,
      text: "參加 SPORTlight Athletes 3 個月，跳躍高度提升接近 20cm。Mo sir 會因應需要設計針對性訓練，加強爆發力同上肢力量。Pull-up 由 bodyweight 做唔到 4 下，進步到加 12kg 做 6–8 下。非常期待繼續同 SPORTlight Athletes 一齊進步。",
      image: "https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768673223775-bufado.jpeg",
      imagePosition: "top",
      results: language === 'zh' ? "三個月內彈跳高度增加二十厘米，引體上升由四下進步到負重十二公斤做六至八下" : "20cm jump height increase and pull-up strength from 4 reps to 6-8 reps with 12kg in 3 months"
    },
    {
      name: "Chan King Hoi",
      sport: "D1 Volleyball",
      achievement: language === 'zh' ? "耐力及表現提升" : "Enhanced Endurance & Performance",
      rating: 5,
      text: "解決體能差嘅問題，令我可以長時間保持高水平表現。",
      image: "https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768672322648-h1pds.jpeg",
      imagePosition: "top",
      results: language === 'zh' ? "解決體能問題，能夠長時間保持高水平表現" : "Solved fitness issues and can maintain high-level performance for extended periods"
    },
    {
      name: "Lau Yuk Ming",
      sport: "Muay Thai",
      achievement: language === 'zh' ? "整體表現提升" : "Overall Performance Improvement",
      rating: 5,
      text: "大概半年了，經過一連串訓練自覺體能有明顯進步，力量同速度都有改進，更重要係多咗檢視自己發力嘅動作是否正確。",
      image: "https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768557977042-wvkdns.jpeg",
      imagePosition: "top",
      results: language === 'zh' ? "半年後力量同速度明顯提升" : "Significant improvement in strength and speed after 6 months"
    },
    {
      name: "Kito",
      sport: "Softball",
      achievement: language === 'zh' ? "力量提升及傷患預防" : "Enhanced Power & Injury Prevention",
      rating: 5,
      text: "係SPORTlight Athletes訓練令到我加強左各方面嘅能力，令到我可以將自己嘅力量能更加發揮在投擲上，亦低幫我減低左受傷風險。",
      image: "https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768672601101-c9a5jd.jpeg",
      imagePosition: "center",
      results: language === 'zh' ? "投擲力量提升，受傷風險降低" : "Enhanced throwing power and reduced injury risk"
    },
    {
      name: "Chiang Cheuk Hang",
      sport: "Badminton",
      achievement: language === 'zh' ? "五年肌力及體能訓練旅程" : "5-Year S&C Journey Success",
      rating: 5,
      text: "接觸 S&C 第 5 年，感激 Mo sir 一直喺背後支持。S&C 不只提升表現，更能強化身體、減低受傷風險，延長運動員生涯。兩次腳踝受傷期間，Mo sir 針對性調整訓練，讓我能持續進步。非常感謝一路以來的專業指導。",
      image: "https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768672176258-0abwrq.jpeg",
      imagePosition: "top",
      results: language === 'zh' ? "五年持續進步，傷患管理得宜" : "5 years of continuous improvement with injury management"
    },
    {
      name: "Kory",
      sport: "Badminton",
      achievement: language === 'zh' ? "速度、耐力及力量提升" : "Improved Speed, Endurance & Strength",
      rating: 5,
      text: "2025年3月左右開始參加訓練，訓練內容會針對運動的需要而定，亦有幫助解決我一直的問題(例如ITBS, 肌力不足及運動容易喘氣等) 感覺持續訓練後在速度、體能及力量上有提升，令運動表現更好。",
      image: "https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768672499806-gagru.jpeg",
      imagePosition: "top",
      results: language === 'zh' ? "解決髂脛束症候群、肌力不足同氣喘問題，速度、耐力同力量均有提升" : "Resolved ITBS, muscle weakness, and breathing issues while improving speed, endurance and strength"
    },
    {
      name: "Lau Kin Hang",
      sport: "Chinese Shuttlecock",
      achievement: language === 'zh' ? "糾正失衡及提升表現" : "Corrected Imbalance & Enhanced Performance",
      rating: 5,
      text: "係SPORTLIGHT Athletes訓練嘅時候，先發現自己嘅弱項。做左運動員有十幾年，一路以為自己嘅重心腳比起活動腳好，但係原來係錯嘅 Thank you SPORTLIGHT Athletes幫我修正番，然後幫我加強，令我平衡番，係運動表現上，可以加強。",
      image: "https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768672532425-57txr.jpeg",
      imagePosition: "top",
      results: language === 'zh' ? "發現並糾正十幾年嘅失衡問題，表現得以提升" : "Discovered and corrected long-standing imbalance after 10+ years as athlete, leading to improved performance"
    }
  ];

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'flame':
        return 'text-flame';
      case 'electric':
        return 'text-electric';
      case 'accent':
        return 'text-accent';
      default:
        return 'text-white';
    }
  };


  return (
    <div className="bg-charcoal min-h-screen pt-16 sm:pt-20">
      <BackgroundImage
        src="/DSC07449.png"
        backgroundPosition="center 90%"
        className="py-12 sm:py-24 overflow-hidden min-h-[400px] sm:min-h-[600px] flex items-center"
      >
        <div className="absolute inset-0 diagonal-lines opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-8 sm:mb-16 animate-slide-up">
            <div className="inline-block mb-4">
              <span className="text-accent font-display font-black text-sm tracking-widest">{t.testimonials.successStories}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-4 sm:mb-6 tracking-tight px-4">
              {t.testimonials.title} <span className="bg-gradient-to-r from-accent to-flame bg-clip-text text-transparent">{t.testimonials.titleAccent}</span>
            </h1>
            <p className="text-base sm:text-xl text-ash max-w-3xl mx-auto leading-relaxed px-4">
              {t.testimonials.subtitle}
            </p>
          </div>
        </div>
      </BackgroundImage>

      <TestimonialsCarousel testimonials={testimonials} t={t} />

      <LogoCarousel />

      <section className="py-24 bg-charcoal grain-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-br from-flame/5 to-electric/5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-electric font-display font-black text-sm tracking-widest">{t.testimonials.performanceMetrics}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">
              {t.testimonials.realImprovements} <span className="text-electric">{t.testimonials.improvements}</span>
            </h2>
            <p className="text-xl text-ash max-w-3xl mx-auto">
              {t.testimonials.measurableGains}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.testimonials.performanceHighlights.map((highlight: any, index: number) => {
              const colors = ['flame', 'electric', 'accent', 'flame'];
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-charcoal-soft to-charcoal rounded-2xl p-8 border border-white/5 hover:border-electric/30 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center mr-4">
                      <span className={`${getColorClasses(colors[index])} font-display font-black text-xl`}>{highlight.metric}</span>
                    </div>
                    <div>
                      <h4 className="font-display font-black text-white text-lg">{highlight.title}</h4>
                      <p className="text-ash text-sm">{highlight.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-ash leading-relaxed text-sm">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal-soft grain-overlay relative">
        <div className="absolute inset-0 diagonal-lines opacity-5"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-accent font-display font-black text-sm tracking-widest">{t.testimonialForm?.tag || 'SHARE YOUR STORY'}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">
              {t.testimonialForm?.title || 'Share Your'} <span className="text-accent">{t.testimonialForm?.titleAccent || 'Experience'}</span>
            </h2>
            <p className="text-xl text-ash max-w-2xl mx-auto">
              {t.testimonialForm?.subtitle || 'Train or have trained with Sportlight? Share your experience and inspire other athletes on their journey.'}
            </p>
          </div>

          <TestimonialSubmissionForm />
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-charcoal via-charcoal-soft to-charcoal grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-flame/20 via-accent/20 to-electric/20"></div>
        <div className="absolute inset-0 diagonal-lines opacity-10"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-charcoal-soft/50 backdrop-blur-md rounded-2xl p-12 border border-accent/20">
            <div className="flex items-center justify-center mb-6">
              <Zap size={32} className="text-accent" />
            </div>
            <h2 className="text-4xl font-display font-black text-white mb-6">{t.testimonials.readyToWrite}</h2>
            <p className="text-xl text-ash mb-8">
              {t.testimonials.readyToWriteText}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto bg-flame hover:bg-flame-dark text-white px-8 py-4 rounded-xl text-lg font-display font-bold transition-all duration-300 hover-scale flex items-center justify-center space-x-2"
              >
                <span>{t.testimonials.startYourJourney}</span>
              </Link>
            </div>

            <p className="text-ash text-sm mt-6">
              {t.testimonials.joinAthletes} • {t.testimonials.freeConsultationAvailable}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
