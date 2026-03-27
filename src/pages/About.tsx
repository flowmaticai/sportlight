import { useState, useEffect } from 'react';
import { Award, Target, Heart, Trophy, Zap, Sparkles, Users, Dumbbell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import ImageShuffleShowcase from '../components/ImageShuffleShowcase';
import BackgroundImage from '../components/BackgroundImage';

const About = () => {
  const [currentBryanImageIndex, setCurrentBryanImageIndex] = useState(0);
  const [currentMoImageIndex, setCurrentMoImageIndex] = useState(0);
  const { language } = useLanguage();
  const t = translations[language];

  const bryanImages = [
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768670570621-rytg19.png',
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768893221342-bzis0b.png'
  ];

  const moImages = [
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768670514031-l6xnwq.png',
    'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768893593917-o4l4mk.png'
  ];

  useEffect(() => {
    const bryanInterval = setInterval(() => {
      setCurrentBryanImageIndex((prevIndex) => (prevIndex + 1) % bryanImages.length);
    }, 15000);

    const moInterval = setInterval(() => {
      setCurrentMoImageIndex((prevIndex) => (prevIndex + 1) % moImages.length);
    }, 15000);

    return () => {
      clearInterval(bryanInterval);
      clearInterval(moInterval);
    };
  }, [bryanImages.length, moImages.length]);

  const values = [
    { icon: Target, title: t.about.assessFirst, description: t.about.assessFirstDesc },
    { icon: Award, title: t.about.scienceBased, description: t.about.scienceBasedDesc },
    { icon: Heart, title: t.about.injuryPrevention, description: t.about.injuryPreventionDesc },
    { icon: Trophy, title: t.about.provenResults, description: t.about.provenResultsDesc }
  ];

  const specializations = [
    { icon: Dumbbell, title: t.about.longDistanceRunners, description: t.about.runnersDesc, gradient: 'from-flame to-accent' },
    { icon: Trophy, title: t.about.volleyballPlayersTitle, description: t.about.volleyballDesc, gradient: 'from-electric to-accent' },
    { icon: Users, title: t.about.youthAthletes, description: t.about.youthDesc, gradient: 'from-accent to-flame' }
  ];

  return (
    <div className="bg-charcoal min-h-screen pt-16 sm:pt-20">
      <BackgroundImage
        src="https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1768669398773-a3err.png"
        className="overflow-hidden min-h-[600px] sm:min-h-screen flex items-center"
      >
        <div className="absolute inset-0 diagonal-lines opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-24 w-full">
          <div className="text-center mb-8 sm:mb-16 animate-slide-up">
            <div className="inline-block mb-4">
              <span className="text-flame font-display font-black text-sm tracking-widest">{t.about.whoWeAre}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-4 sm:mb-6 tracking-tight px-4">
              {t.about.title} <span className="bg-gradient-to-r from-flame to-accent bg-clip-text text-transparent">{t.about.titleAccent}</span>
            </h1>
            <p className="text-base sm:text-xl text-ash max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              {t.about.subtitle}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-4 px-4">
              <span className="bg-gradient-to-r from-flame via-electric to-accent bg-clip-text text-transparent">
                {t.about.motto}
              </span>
            </h2>
          </div>
        </div>
      </BackgroundImage>

      <section className="py-24 bg-charcoal-soft grain-overlay relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-block mb-6">
                <span className="text-electric font-display font-black text-sm tracking-widest">{t.about.ourStory}</span>
              </div>
              <h2 className="text-4xl font-display font-black text-white mb-6">{t.about.theBeginning}</h2>
              <div className="space-y-6 text-ash leading-relaxed mb-10">
                <p>{t.about.story1}</p>
                <p>{t.about.story2}</p>
                <p>{t.about.story3}</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-display font-black text-white mb-6">{t.about.values}</h3>
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-charcoal/50 rounded-xl border border-white/5 hover:border-electric/20 transition-all">
                    <div className="flex-shrink-0 w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center">
                      <value.icon size={24} className="text-electric" />
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-black text-white mb-2">{value.title}</h4>
                      <p className="text-sm text-ash leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:sticky lg:top-24">
              <ImageShuffleShowcase
                images={[
                  'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770633257279-msbh.png',
                  'https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770633453418-h5nbb.png'
                ]}
                alt="Sportlight Athletes Training"
                interval={10000}
                zoomOut={true}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal grain-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-flame/5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="text-accent font-display font-black text-lg tracking-widest">{t.about.meetTheTeam}</span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white mb-6">{t.about.ourCoaches} <span className="text-accent">{t.about.coaches}</span></h2>
            <p className="text-xl text-ash max-w-3xl mx-auto">
              {t.about.coachesSubtitle}
            </p>
          </div>

          <div className="space-y-16 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl font-display font-black text-white mb-2">{t.about.moYuen}</h3>
                <p className="text-flame font-bold text-lg mb-6">{t.about.leadCoach}</p>

                <p className="text-ash leading-relaxed mb-6">
                  {t.about.moStory}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {t.about.moCredentials.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-flame rounded-full"></div>
                      <span className="text-white text-base font-extrabold">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 mt-8">
                  <div className="bg-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-electric/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <Target size={20} className="text-electric" />
                      <h4 className="text-xl font-display font-black text-white">{t.about.vision}</h4>
                    </div>
                    <p className="text-ash leading-relaxed">{t.about.visionText}</p>
                  </div>

                  <div className="bg-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-accent/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <Sparkles size={20} className="text-accent" />
                      <h4 className="text-xl font-display font-black text-white">{t.about.mission}</h4>
                    </div>
                    <ul className="space-y-3">
                      {t.about.missionItems.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-ash text-sm leading-normal">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* POLISH: Added shadow-lg for visual depth */}
              <div className="relative h-96 lg:h-[500px]">
                {moImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Mo Yuen"
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full rounded-2xl object-cover object-[center_40%] border border-flame/20 shadow-lg transition-opacity duration-1000 ${
                      index === currentMoImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1 h-96 lg:h-[500px]">
                {bryanImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Bryan Leung"
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full rounded-2xl object-cover ${
                      index === 1 ? 'object-[center_38%]' : 'object-[center_40%]'
                    } border border-electric/20 shadow-lg transition-opacity duration-1000 ${
                      index === currentBryanImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>

              <div className="order-1 lg:order-2">
                <h3 className="text-4xl font-display font-black text-white mb-2">{t.about.bryanLeung}</h3>
                <p className="text-electric font-bold text-lg mb-6">{t.about.mainCoach}</p>

                <div className="text-ash leading-relaxed mb-6 space-y-4">
                  {t.about.bryanStory.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.about.bryanCredentials.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-electric rounded-full"></div>
                      <span className="text-white text-base font-extrabold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-16">
              <div>
                <h3 className="text-4xl font-display font-black text-white mb-2">{t.about.thirdCoach}</h3>
                <p className="text-accent font-bold text-lg mb-6">{t.about.thirdCoachTitle}</p>

                <div className="text-ash leading-relaxed mb-6 space-y-4">
                  {t.about.thirdCoachStory.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.about.thirdCoachCredentials.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      <span className="text-white text-base font-extrabold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-96 lg:h-[500px]">
                <img
                  src="/WhatsApp_Image_2026-02-20_at_16.20.41.jpeg"
                  alt="Coach Leung"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full rounded-2xl object-cover object-center border border-accent/20 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal-soft grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines opacity-5"></div>
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-flame/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-electric/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-flame font-display font-black text-sm tracking-widest">{t.about.specializations}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">{t.about.athleteFocus} <span className="text-flame">{t.about.focus}</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {specializations.map((spec, index) => (
              <div
                key={index}
                className="group relative bg-charcoal rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover-lift overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${spec.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${spec.gradient} opacity-10 rounded-full blur-2xl`}></div>

                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${spec.gradient} rounded-2xl mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                    <spec.icon size={36} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white mb-4 group-hover:text-flame transition-colors duration-300">{spec.title}</h3>
                  <p className="text-ash leading-relaxed">{spec.description}</p>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${spec.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-flame/10 via-transparent to-electric/10"></div>
        <div className="absolute top-0 left-0 w-full h-full diagonal-lines opacity-5"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-charcoal-soft to-charcoal border border-flame/20 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-flame/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-electric/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-block mb-6">
                <span className="text-flame font-display font-black text-sm tracking-widest uppercase">
                  {language === 'zh' ? '真實成果' : 'Real Results'}
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-6">
                {language === 'zh' ? '看看我們學員的' : 'See Our Athletes'} <span className="bg-gradient-to-r from-flame to-accent bg-clip-text text-transparent">{language === 'zh' ? '成功故事' : 'Success Stories'}</span>
              </h2>

              <p className="text-xl text-ash mb-10 max-w-2xl mx-auto leading-relaxed">
                {language === 'zh'
                  ? '從提升表現到預防傷患，了解我們的運動員如何透過科學化訓練達成目標。'
                  : 'From performance gains to injury prevention, discover how our athletes achieve their goals through scientifically grounded training.'}
              </p>

              <Link
                to="/testimonials"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-flame to-accent text-white font-display font-bold text-lg tracking-wide rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-flame/50 hover:scale-105"
              >
                <span className="relative z-20">
                  {language === 'zh' ? '查看學員分享' : 'View Testimonials'}
                </span>
                <ArrowRight size={20} className="relative z-20 transition-transform duration-300 group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-flame opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
              </Link>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-ash">
                <div className="flex items-center space-x-2">
                  <Trophy size={18} className="text-flame" />
                  <span>{language === 'zh' ? '真實成果' : 'Real Results'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={18} className="text-electric" />
                  <span>{language === 'zh' ? '200+位學員' : '200+ Athletes'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap size={18} className="text-accent" />
                  <span>{language === 'zh' ? '持續進步' : 'Proven Gains'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
