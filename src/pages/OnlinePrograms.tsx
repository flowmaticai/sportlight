import { MessageCircle, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const OnlinePrograms = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-charcoal min-h-screen pt-20">
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-charcoal via-charcoal-soft to-charcoal grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines opacity-5"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-flame/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-flame via-accent to-electric bg-clip-text text-transparent">
              {t.onlinePrograms.comingSoon}
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-ash max-w-2xl mx-auto leading-relaxed mb-12">
            {t.onlinePrograms.stayTuned}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-flame hover:bg-flame-dark text-white px-8 py-4 rounded-xl text-lg font-display font-bold transition-all duration-300 hover-scale"
            >
              <MessageCircle size={24} />
              <span>{t.onlinePrograms.whatsapp}</span>
            </Link>

            <a
              href="https://www.instagram.com/sportlight.athletes/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 text-white px-8 py-4 rounded-xl text-lg font-display font-bold transition-all duration-300 hover-scale"
            >
              <Instagram size={24} />
              <span>{t.onlinePrograms.instagram}</span>
            </a>

            <a
              href="mailto:info@sportlight.biz"
              className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-electric hover:bg-electric/80 text-white px-8 py-4 rounded-xl text-lg font-display font-bold transition-all duration-300 hover-scale"
            >
              <Mail size={24} />
              <span>{t.onlinePrograms.email}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnlinePrograms;
