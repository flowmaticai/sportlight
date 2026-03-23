import { Link } from 'react-router-dom';
import { User, Users, Clock, MapPin, CheckCircle, MessageCircle, Zap, Footprints, Trophy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import BackgroundImage from '../components/BackgroundImage';

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-charcoal min-h-screen pt-16 sm:pt-20">
      <BackgroundImage
        src="https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1769860021369-p10h2.png"
        className="py-12 sm:py-24 overflow-hidden min-h-[400px] sm:min-h-[600px] flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-8 sm:mb-16 animate-slide-up">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-4 sm:mb-6 tracking-tight px-4">
              {t.servicesPage.title} <span className="bg-gradient-to-r from-flame to-accent bg-clip-text text-transparent">{t.servicesPage.titleAccent}</span>
            </h1>
            <p className="text-base sm:text-xl text-ash max-w-3xl mx-auto leading-relaxed px-4">
              {t.servicesPage.subtitle}
            </p>
          </div>
        </div>
      </BackgroundImage>

      <section className="py-24 bg-charcoal-soft grain-overlay relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-charcoal to-charcoal-soft rounded-2xl overflow-hidden border border-flame/20 hover:border-flame/40 transition-all duration-500 hover-lift flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770819873299-061gcb.png)'
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent"></div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-flame/10 rounded-2xl mr-4">
                    <User size={28} className="text-flame" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black text-white">{t.servicesPage.oneOnOneTitle}</h3>
                    <p className="text-flame font-bold">{t.servicesPage.oneOnOneSubtitle}</p>
                  </div>
                </div>

                <p className="text-ash leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.servicesPage.oneOnOneDesc }} />

                <ul className="space-y-3 mb-6">
                  {t.servicesPage.oneOnOneFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle size={16} className="text-flame flex-shrink-0 mt-1" />
                      <span className="text-ash text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <div className="flex items-center space-x-4 mb-6 text-ash">
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span className="text-sm">60 {t.servicesPage.minutes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} />
                      <span className="text-sm">{t.servicesPage.inPerson}</span>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-full bg-flame hover:bg-flame-dark text-white py-3 px-6 rounded-xl font-display font-bold transition-all duration-300 text-center flex items-center justify-center space-x-2 hover-scale"
                  >
                    <MessageCircle size={18} />
                    <span>{t.servicesPage.bookTrialSession}</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-charcoal to-charcoal-soft rounded-2xl overflow-hidden border border-electric/20 hover:border-electric/40 transition-all duration-500 hover-lift flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://lmsfxezhrvxydfggudzh.supabase.co/storage/v1/object/public/testimonial-images/1770812486943-8ysyrs.png)'
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent"></div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-electric/10 rounded-2xl mr-4">
                    <Users size={28} className="text-electric" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black text-white">{t.servicesPage.oneOnTwoTitle}</h3>
                    <p className="text-electric font-bold">{t.servicesPage.oneOnTwoSubtitle}</p>
                  </div>
                </div>

                <p className="text-ash leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.servicesPage.oneOnTwoDesc }} />

                <ul className="space-y-3 mb-6">
                  {t.servicesPage.oneOnTwoFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle size={16} className="text-electric flex-shrink-0 mt-1" />
                      <span className="text-ash text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <div className="flex items-center space-x-4 mb-6 text-ash">
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span className="text-sm">60 {t.servicesPage.minutes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} />
                      <span className="text-sm">{t.servicesPage.inPerson}</span>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-full bg-flame hover:bg-flame-dark text-white py-3 px-6 rounded-xl font-display font-bold transition-all duration-300 text-center flex items-center justify-center space-x-2 hover-scale"
                  >
                    <MessageCircle size={18} />
                    <span>{t.servicesPage.bookTrialSession}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal grain-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-electric/5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="bg-gradient-to-br from-charcoal-soft to-charcoal rounded-2xl overflow-hidden border border-accent/20 hover:border-accent/40 transition-all duration-500 flex flex-col">
              <div className="relative h-80 bg-gradient-to-br from-accent/20 to-electric/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Footprints size={120} className="text-white/20" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-soft to-transparent"></div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-accent/10 rounded-2xl mr-4">
                    <Footprints size={28} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black text-white">{t.servicesPage.runnerSC}</h3>
                    <p className="text-accent font-bold">{t.servicesPage.runnerSCSubtitle}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-2xl font-display font-bold text-white mb-2">{t.servicesPage.runnerSCHeadline}</p>
                  <p className="text-ash text-lg">{t.servicesPage.runnerSCTagline}</p>
                </div>

                <p className="text-ash leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.servicesPage.runnerSCDesc }} />

                <div className="mb-6">
                  <p className="text-white font-semibold mb-3">{t.servicesPage.runnerSCImprove}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.servicesPage.runnerTrainingFocus.map((item, index) => (
                      <span key={index} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold border border-accent/20">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-ash leading-relaxed mb-6">
                  {t.servicesPage.runnerSCMonitoring}
                </p>

                <div className="bg-charcoal/50 rounded-xl p-4 mb-6 border border-white/5">
                  <p className="text-white font-semibold mb-3">{t.servicesPage.programFeatures}</p>
                  <ul className="space-y-2">
                    {t.servicesPage.runnerBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle size={16} className="text-accent flex-shrink-0" />
                        <span className="text-ash text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Link
                    to="/contact"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex-1 bg-flame hover:bg-flame-dark text-white py-3 px-6 rounded-xl font-display font-bold transition-all duration-300 text-center flex items-center justify-center space-x-2 hover-scale"
                  >
                    <MessageCircle size={18} />
                    <span>{t.servicesPage.joinRunnerSC}</span>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex-1 bg-accent/10 hover:bg-accent/20 text-accent py-3 px-6 rounded-xl font-display font-bold transition-all duration-300 text-center hover-scale border border-accent/20"
                  >
                    {t.servicesPage.inquire}
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-charcoal-soft to-charcoal rounded-2xl overflow-hidden border border-flame/20 hover:border-flame/40 transition-all duration-500 flex flex-col">
              <div className="relative h-80 bg-gradient-to-br from-flame/20 to-accent/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Trophy size={120} className="text-white/20" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-soft to-transparent"></div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-flame/10 rounded-2xl mr-4">
                    <Trophy size={28} className="text-flame" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black text-white">{t.servicesPage.volleyballSC}</h3>
                    <p className="text-flame font-bold">{t.servicesPage.volleyballSCSubtitle}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-2xl font-display font-bold text-white mb-2">{t.servicesPage.volleyballSCHeadline}</p>
                  <p className="text-ash text-lg">{t.servicesPage.volleyballSCTagline}</p>
                </div>

                <p className="text-ash leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.servicesPage.volleyballSCDesc }} />

                <div className="mb-6">
                  <p className="text-white font-semibold mb-3">{t.servicesPage.sixKeyAreas}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {t.servicesPage.volleyballPerformance.map((item, index) => (
                      <span key={index} className="px-3 py-2 bg-flame/10 text-flame rounded-lg text-sm font-semibold text-center border border-flame/20">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-ash leading-relaxed mb-6">
                  {t.servicesPage.volleyballDesigned}
                </p>

                <div className="bg-charcoal/50 rounded-xl p-4 mb-6 border border-white/5">
                  <p className="text-white font-semibold mb-3">{t.servicesPage.programFeatures}</p>
                  <ul className="space-y-2">
                    {t.servicesPage.volleyballBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle size={16} className="text-flame flex-shrink-0 mt-1" />
                        <span className="text-ash text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Link
                    to="/contact"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex-1 bg-flame hover:bg-flame-dark text-white py-3 px-6 rounded-xl font-display font-bold transition-all duration-300 text-center flex items-center justify-center space-x-2 hover-scale"
                  >
                    <MessageCircle size={18} />
                    <span>{t.servicesPage.joinVolleyballSC}</span>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex-1 bg-flame/10 hover:bg-flame/20 text-flame py-3 px-6 rounded-xl font-display font-bold transition-all duration-300 text-center hover-scale border border-flame/20"
                  >
                    {t.servicesPage.inquire}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-charcoal via-charcoal-soft to-charcoal grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-flame/20 via-accent/20 to-electric/20"></div>
        <div className="absolute inset-0 diagonal-lines opacity-10"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-charcoal-soft/50 backdrop-blur-md rounded-2xl p-12 border border-flame/20">
            <div className="flex items-center justify-center mb-6">
              <Zap size={32} className="text-flame" />
            </div>
            <h2 className="text-4xl font-display font-black text-white mb-6">{t.servicesPage.readyToStart}</h2>
            <p className="text-xl text-ash mb-8">
              {t.servicesPage.readyToStartText}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto bg-flame hover:bg-flame-dark text-white px-8 py-4 rounded-xl text-lg font-display font-bold transition-all duration-300 hover-scale flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>{t.servicesPage.whatsappMoSir}</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto bg-white hover:bg-ash text-charcoal px-8 py-4 rounded-xl text-lg font-display font-bold transition-all duration-300 hover-scale flex items-center justify-center space-x-2"
              >
                <span>{t.servicesPage.contactUs}</span>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-ash text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-flame" />
                <span>{t.servicesPage.freeConsultation}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-electric" />
                <span>{t.servicesPage.noContracts}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-accent" />
                <span>{t.servicesPage.flexibleScheduling}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
