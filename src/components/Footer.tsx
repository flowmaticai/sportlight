import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Mail, Phone, MapPin, Zap, Instagram, Clock, ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/contact');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-charcoal border-t border-flame/10 grain-overlay relative">
      <div className="absolute inset-0 diagonal-lines opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4 group cursor-pointer" onClick={scrollToTop}>
              <div className="relative">
                <div className="absolute inset-0 w-14 h-14 mr-4 bg-white/95 rounded-xl"></div>
                <img
                  src="/transparent_logo.png"
                  alt="Sportlight Athletes Logo"
                  className="relative w-14 h-14 mr-4 transition-transform duration-300 group-hover:scale-110 p-1"
                />
                <div className="absolute inset-0 w-14 h-14 mr-4 bg-flame/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <div className="text-2xl text-white italic" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>SPORTlight</div>
                <div className="text-xs text-flame/80 font-medium tracking-wide mt-0.5">{t('about.motto')}</div>
              </div>
            </div>
            <p className="text-ash leading-relaxed mb-8 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-3">
              <Link
                to="/contact"
                onClick={handleContactClick}
                className="p-3 bg-flame hover:bg-flame-dark rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-flame/30 group"
                aria-label="Contact"
              >
                <MessageCircle size={20} className="text-white group-hover:scale-110 transition-transform duration-300" />
              </Link>
              <a
                href="https://www.instagram.com/sportlight.athletes/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 group"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="mailto:info@sportlight.biz"
                className="p-3 bg-electric hover:bg-electric-dark rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-electric/30 group"
                aria-label="Email"
              >
                <Mail size={20} className="text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="tel:+85264810413"
                className="p-3 bg-flame hover:bg-flame-dark rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-flame/30 group"
                aria-label="Phone"
              >
               <Phone size={20} className="text-white group-hover:scale-110 transition-transform duration-300" />
             </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-display font-black text-white mb-6 tracking-wide">{t('footer.navigate')}</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: t('footer.links.home') },
                { to: '/about', label: t('footer.links.about') },
                { to: '/services', label: t('footer.links.training') },
                { to: '/online-programs', label: t('footer.links.online') },
                { to: '/testimonials', label: t('footer.links.stories') },
                { to: '/faq', label: t('footer.links.faq') },
                { to: '/contact', label: t('footer.links.contact') }
              ].map((link, index) => (
                <li key={index}>
                  {/* POLISH: Already has smooth transitions and hover state */}
                  <Link
                    to={link.to}
                    onClick={scrollToTop}
                    className="text-ash hover:text-flame transition-colors duration-300 font-medium group flex items-center space-x-2"
                  >
                    <div className="w-1.5 h-1.5 bg-electric rounded-full group-hover:w-3 transition-all duration-300"></div>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-black text-white mb-6 tracking-wide">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-flame flex-shrink-0 mt-1" />
                <div>
                  {/* POLISH: Added transition-all for smoother hover */}
                  <div className="text-ash hover:text-white transition-all duration-300">
                    <a href="tel:+85264810413">+852 6481 0413</a>
                  </div>
                  <div className="text-ash/60 text-sm">Mo Sir</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-electric flex-shrink-0 mt-1" />
                {/* POLISH: Added transition-all for smoother hover */}
                <a href="mailto:info@sportlight.biz" className="text-ash hover:text-white transition-all duration-300">
                  info@sportlight.biz
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={18} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <div className="text-ash">{t('footer.hours')}</div>
                  <div className="text-ash/60 text-sm">{t('footer.closed')}</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-flame flex-shrink-0 mt-1" />
                {/* POLISH: Added transition-all for smoother hover */}
                <a
                  href="https://maps.google.com/?q=Room+5A01,+Hung+Cheong+Factory+Building,+Lai+Chi+Kok,+Hong+Kong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ash hover:text-white transition-all duration-300 group"
                >
                  <div>Room 5A01, Hung Cheong</div>
                  <div>Factory Building</div>
                  <div className="text-ash/60 text-sm group-hover:text-flame transition-colors">Lai Chi Kok, HK</div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-ash/60 text-sm font-medium">
              {t('footer.copyright')}
            </p>

            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 text-ash hover:text-flame transition-colors duration-300"
            >
              <span className="text-sm font-display font-bold tracking-wide">{t('footer.backToTop')}</span>
              <div className="p-2 bg-charcoal-soft group-hover:bg-flame rounded-lg transition-all duration-300">
                <ArrowUp size={16} className="group-hover:text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
