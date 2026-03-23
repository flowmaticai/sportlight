import { Link } from 'react-router-dom';
import { BarChart3, Target, Dumbbell, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import ImageCarousel from '../components/ImageCarousel';
import BackgroundImage from '../components/BackgroundImage';
import { useState } from 'react';

const TrainingRoadMap = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const roadmapIcons = [BarChart3, Target, Dumbbell, TrendingUp];

  const roadmapImages = [
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770644196195-4r6qcf.png',
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770644547341-gigqj.png',
    [
      'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770644673545-6l4r0ii.png',
      'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770644709599-qbwfr1.png'
    ],
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770644854869-hjnabc.png'
  ];

  return (
    <div className="bg-charcoal min-h-screen pt-16 sm:pt-20">
      <BackgroundImage
        src="https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768671141120-al1k28.png"
        className="py-12 sm:py-24 overflow-hidden min-h-[400px] sm:min-h-[600px] flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-8 sm:mb-16 animate-slide-up">
            <div className="inline-block mb-4">
              <span className="text-flame font-display font-black text-sm tracking-widest">METHODOLOGY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-4 sm:mb-6 tracking-tight px-4">
              {t.servicesPage.roadmap}
            </h1>
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-charcoal/60 backdrop-blur-sm rounded-2xl sm:rounded-full border border-flame/20 max-w-[90%] sm:max-w-none">
              <span className="text-xs sm:text-sm font-display font-bold text-white tracking-wide">
                {language === 'zh' ? '評估' : 'Assessment'}
              </span>
              <span className="text-flame font-bold text-xs sm:text-sm">&rarr;</span>
              <span className="text-xs sm:text-sm font-display font-bold text-white tracking-wide">
                {language === 'zh' ? '分析' : 'Analysis'}
              </span>
              <span className="text-flame font-bold text-xs sm:text-sm">&rarr;</span>
              <span className="text-xs sm:text-sm font-display font-bold text-white tracking-wide">
                {language === 'zh' ? '訓練' : 'Training'}
              </span>
              <span className="text-flame font-bold text-xs sm:text-sm">&rarr;</span>
              <span className="text-xs sm:text-sm font-display font-bold text-white tracking-wide">
                {language === 'zh' ? '監察' : 'Monitoring'}
              </span>
            </div>
          </div>
        </div>
      </BackgroundImage>

      <section className="py-12 sm:py-24 bg-charcoal-soft grain-overlay relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-20">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white mb-4 sm:mb-6">
                {t.servicesPage.foundation} <span className="text-flame">{t.servicesPage.foundationAccent}</span> {t.servicesPage.foundationTitle}
              </h2>
              <p className="text-ash leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg">
                {t.servicesPage.foundationText1}<span className="text-white font-bold">{t.servicesPage.foundationKeyAreas}</span>{t.servicesPage.foundationText2}
              </p>
              <p className="text-ash leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                {t.servicesPage.foundationText3}<span className="text-flame font-bold">{t.servicesPage.foundationHighlight}</span>{t.servicesPage.foundationText4}<span className="text-white font-bold">{t.servicesPage.foundationAssessment}</span>{t.servicesPage.foundationText5}
              </p>
            </div>

            <div className="bg-gradient-to-br from-charcoal to-charcoal-soft rounded-2xl p-6 sm:p-8 border border-flame/20">
              <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-4 sm:mb-6 flex items-center">
                <BarChart3 className="text-flame mr-3" size={24} />
                {t.servicesPage.understandingAssessment}
              </h3>
              <div className="space-y-4">
                {t.servicesPage.assessmentTests.map((test, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-charcoal/50 rounded-xl border border-white/5 hover:border-flame/30 transition-all duration-300">
                    <div className="w-2 h-2 bg-flame rounded-full flex-shrink-0 mt-2" />
                    <div>
                      <p className="text-white font-semibold">{test.name}</p>
                      <p className="text-ash text-sm">{test.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12 sm:space-y-24">
            {t.servicesPage.roadmapSteps.map((item, index) => {
              const IconComponent = roadmapIcons[index];
              const isEven = index % 2 === 0;
              const imageData = roadmapImages[index];

              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center animate-slide-up ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="bg-gradient-to-br from-charcoal to-charcoal-soft rounded-2xl p-6 sm:p-8 border border-flame/20 h-full">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-flame/10 rounded-xl flex-shrink-0">
                          <IconComponent size={28} className="text-flame sm:w-8 sm:h-8" />
                        </div>
                        <div>
                          <h4 className="text-2xl sm:text-3xl font-display font-black text-white">{item.step}</h4>
                          <p className="text-flame text-base sm:text-lg font-semibold">{item.label}</p>
                        </div>
                      </div>
                      <p className="text-white font-bold mb-3 sm:mb-4 text-lg sm:text-xl">{item.tagline}</p>
                      <p className="text-ash leading-relaxed text-base sm:text-lg">{item.description}</p>
                    </div>
                  </div>

                  <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    {!imageErrors[index] && (
                      <>
                        {Array.isArray(imageData) ? (
                          <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border-4 border-flame/30 shadow-2xl">
                            <ImageCarousel images={imageData} interval={10000} />
                          </div>
                        ) : index === 1 || index === 3 ? (
                          <div className="relative rounded-2xl overflow-hidden shadow-2xl group bg-charcoal">
                            <img
                              src={imageData}
                              alt={item.step}
                              className="w-full h-auto border-4 border-flame/30 rounded-2xl transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                              onError={() => setImageErrors(prev => ({ ...prev, [index]: true }))}
                            />
                          </div>
                        ) : (
                          <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border-4 border-flame/30 shadow-2xl group bg-charcoal">
                            <img
                              src={imageData}
                              alt={item.step}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                              onError={() => setImageErrors(prev => ({ ...prev, [index]: true }))}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 sm:mt-16 text-center">
            <div className="bg-gradient-to-br from-charcoal-soft to-charcoal rounded-2xl p-6 sm:p-8 md:p-12 border border-flame/20 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white mb-3 sm:mb-4">
                {t.servicesPage.readyToStart}
              </h3>
              <p className="text-ash text-base sm:text-lg mb-6 sm:mb-8">
                {t.servicesPage.readyToStartText}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/contact"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-flame hover:bg-flame-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-display font-bold transition-all duration-300 hover-scale"
                >
                  {t.servicesPage.bookTrialSession}
                </Link>
                <Link
                  to="/services"
                  className="bg-flame hover:bg-flame/80 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-display font-bold transition-all duration-300 hover-scale"
                >
                  {t.servicesPage.viewPrograms}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingRoadMap;
