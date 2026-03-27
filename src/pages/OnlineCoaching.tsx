import { Link } from 'react-router-dom';
import { Monitor, Calendar, MessageCircle, Target, TrendingUp, CheckCircle, Zap, Clock, FileText, BarChart3, Dumbbell, Award, TrendingUp as TrendingUpIcon, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const OnlineCoaching = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const iconMap = [Calendar, FileText, TrendingUp, Clock, BarChart3, Target];

  return (
    <div className="bg-charcoal min-h-screen pt-20">
      <section className="py-24 bg-gradient-to-br from-charcoal via-charcoal-soft to-charcoal grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines opacity-5"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-flame/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-flame/10 rounded-2xl mb-6 mx-auto">
              <Monitor size={40} className="text-flame" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white mb-6 tracking-tight">
              {t.onlineCoaching.title} <span className="bg-gradient-to-r from-flame to-accent bg-clip-text text-transparent">{t.onlineCoaching.titleAccent}</span>
            </h1>
            <div className="inline-flex items-center space-x-3 bg-flame/10 px-8 py-4 rounded-full border border-flame/20 mb-6">
              <Zap size={24} className="text-flame" />
              <span className="text-2xl font-display font-black text-flame">{t.onlineCoaching.tagline}</span>
            </div>
            <p className="text-xl text-ash max-w-3xl mx-auto leading-relaxed">
              {t.onlineCoaching.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal-soft grain-overlay relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-8">
                {t.onlineCoaching.challenges} <span className="text-flame">{t.onlineCoaching.challengesAccent}</span>?
              </h2>
              <div className="space-y-4 mb-8">
                {t.onlineCoaching.painPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-charcoal/50 rounded-xl border border-flame/10 hover:border-flame/30 transition-all duration-300">
                    <div className="w-8 h-8 bg-flame/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-flame font-bold">{index + 1}</span>
                    </div>
                    <p className="text-ash text-lg">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-charcoal to-charcoal-soft rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-display font-black text-white mb-6">
                {t.onlineCoaching.misconceptions} <span className="text-electric">{t.onlineCoaching.misconceptionsAccent}</span>?
              </h3>
              <div className="space-y-4">
                {t.onlineCoaching.struggles.map((struggle, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-electric/5 rounded-xl border border-electric/20">
                    <div className="w-2 h-2 bg-electric rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-ash text-lg">{struggle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal grain-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-br from-flame/5 to-accent/5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-flame font-display font-black text-sm tracking-widest">{t.onlineCoaching.programTag}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">
              {t.onlineCoaching.programTitle} <span className="text-flame">{t.onlineCoaching.programTitleAccent}</span>
            </h2>
            <p className="text-xl text-ash max-w-3xl mx-auto">
              {t.onlineCoaching.programSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {t.onlineCoaching.features.map((feature, index) => {
              const IconComponent = iconMap[index];
              return (
                <div key={index} className="bg-gradient-to-br from-charcoal-soft to-charcoal rounded-2xl p-8 border border-white/5 hover:border-flame/30 transition-all duration-500 hover-lift">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-flame/10 rounded-2xl mb-6">
                    <IconComponent size={28} className="text-flame" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white mb-3">{feature.title}</h3>
                  <p className="text-ash leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal-soft grain-overlay relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-charcoal to-charcoal-soft rounded-3xl p-8 lg:p-12 border-2 border-flame/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-6 right-6 bg-gradient-to-r from-flame to-accent px-6 py-2 rounded-full flex items-center space-x-2 shadow-lg animate-pulse">
              <Sparkles size={20} className="text-white" />
              <span className="text-white font-display font-black text-sm tracking-wide">NEW</span>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-flame/20 to-accent/20 rounded-2xl mb-6 border border-flame/30">
                <Dumbbell size={40} className="text-flame" />
              </div>
              <h3 className="text-4xl lg:text-5xl font-display font-black text-white mb-4">
                Online Training <span className="bg-gradient-to-r from-flame to-accent bg-clip-text text-transparent">Program</span>
              </h3>
              <p className="text-ash text-lg max-w-2xl mx-auto">
                Elite coaching combining in-person assessment with personalized online programming
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-charcoal/80 rounded-2xl p-6 border border-flame/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-flame/20 rounded-xl flex items-center justify-center">
                    <Award size={24} className="text-flame" />
                  </div>
                  <h4 className="text-xl font-display font-black text-white">Package Including</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-flame flex-shrink-0 mt-1" />
                    <span className="text-ash">1 Face to Face Session (including assessment)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-flame flex-shrink-0 mt-1" />
                    <span className="text-ash">4-week training program (3 sessions per week)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-flame flex-shrink-0 mt-1" />
                    <span className="text-ash">Follow Up call with coach (15min/2weeks)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-charcoal/80 rounded-2xl p-6 border border-electric/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-electric/20 rounded-xl flex items-center justify-center">
                    <Target size={24} className="text-electric" />
                  </div>
                  <h4 className="text-xl font-display font-black text-white">Service</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-electric flex-shrink-0 mt-1" />
                    <span className="text-ash">Personalised Strength Training specified for performance enhancement</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-electric flex-shrink-0 mt-1" />
                    <span className="text-ash">Periodisation optimizing performance Gain</span>
                  </li>
                </ul>
              </div>

              <div className="bg-charcoal/80 rounded-2xl p-6 border border-accent/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <TrendingUpIcon size={24} className="text-accent" />
                  </div>
                  <h4 className="text-xl font-display font-black text-white">Features</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-accent flex-shrink-0 mt-1" />
                    <span className="text-ash">Program Flexibility & Schedule Integration</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-accent flex-shrink-0 mt-1" />
                    <span className="text-ash">Bridging Recovery to Performance</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-accent flex-shrink-0 mt-1" />
                    <span className="text-ash">Monthly Following Up via video Call (15 min)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-flame/10 via-accent/10 to-electric/10 rounded-2xl p-6 sm:p-8 border border-flame/20 mb-8">
              <div className="text-center">
                <p className="text-ash text-base sm:text-lg mb-3">Original Price: <span className="line-through text-ash/60">$2400/4 weeks</span></p>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0">
                  <span className="text-lg sm:text-2xl font-display font-black text-white">Promotional Price:</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl sm:text-5xl font-display font-black bg-gradient-to-r from-flame to-accent bg-clip-text text-transparent">$1600</span>
                    <span className="text-lg sm:text-2xl font-display font-black text-white">/4 weeks</span>
                  </div>
                </div>
                <p className="text-accent text-sm mt-3 font-semibold">Limited Time Offer - Save $800!</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-gradient-to-r from-flame to-accent hover:from-flame-dark hover:to-accent/90 text-white px-10 py-5 rounded-xl text-lg font-display font-bold transition-all duration-300 hover-scale flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageCircle size={22} />
                <span>Start Your Journey</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-xl text-lg font-display font-bold transition-all duration-300 hover-scale border-2 border-white/20 flex items-center justify-center backdrop-blur-sm"
              >
                Learn More
              </Link>
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
            <h2 className="text-4xl font-display font-black text-white mb-6">{t.onlineCoaching.readyToStart}</h2>
            <p className="text-xl text-ash mb-8">
              {t.onlineCoaching.readyToStartText}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto bg-flame hover:bg-flame-dark text-white px-8 py-4 rounded-xl text-lg font-display font-bold transition-all duration-300 hover-scale flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>{t.onlineCoaching.whatsappMoSir}</span>
              </Link>
            </div>

            <div className="inline-flex items-center space-x-2 bg-flame/10 px-6 py-3 rounded-full border border-flame/20">
              <Monitor size={20} className="text-flame" />
              <span className="text-white font-display font-bold tracking-wide">{t.onlineCoaching.tagline}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnlineCoaching;
