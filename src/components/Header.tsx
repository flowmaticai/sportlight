import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { prefetchOnHover } from '../utils/prefetch';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = () => location.pathname === '/services' || location.pathname === '/online-coaching';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-charcoal/98 backdrop-blur-md shadow-2xl border-b border-flame/20' : 'bg-transparent'
    } ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="absolute inset-0 w-14 h-14 mr-4 bg-white/95 rounded-xl"></div>
              <img
                src="/transparent_logo.png"
                alt="Sportlight Athletes Logo"
                className="relative w-14 h-14 mr-4 transition-transform duration-300 group-hover:scale-110 p-1"
              />
              <div className="absolute inset-0 w-14 h-14 mr-4 bg-flame/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className={`transition-colors duration-300 ${
              isScrolled || location.pathname !== '/'
                ? 'text-white'
                : 'text-white'
            }`}>
              <div className="text-lg lg:text-xl tracking-tight italic" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                <span className="relative">
                  SPORTlight
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-flame to-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </span>
              </div>
              <div className="text-[10px] text-flame/70 font-medium tracking-wider -mt-0.5 hidden lg:block">{t('about.motto')}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              to="/"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`px-4 py-2 rounded-lg font-display font-semibold text-sm tracking-wide transition-all duration-300 ${
                isActive('/')
                  ? 'bg-flame text-white'
                  : 'text-ash hover:text-white hover:bg-charcoal-soft'
              }`}
            >
              {t('nav.home')}
            </Link>
            {/* PERFORMANCE: Prefetch images on hover for instant navigation */}
            <Link
              to="/about"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              onMouseEnter={() => prefetchOnHover('about')}
              className={`px-4 py-2 rounded-lg font-display font-semibold text-sm tracking-wide transition-all duration-300 ${
                isActive('/about')
                  ? 'bg-flame text-white'
                  : 'text-ash hover:text-white hover:bg-charcoal-soft'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/training-roadmap"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`px-4 py-2 rounded-lg font-display font-semibold text-sm tracking-wide transition-all duration-300 ${
                isActive('/training-roadmap')
                  ? 'bg-flame text-white'
                  : 'text-ash hover:text-white hover:bg-charcoal-soft'
              }`}
            >
              ROAD MAP
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              {/* PERFORMANCE: Prefetch on hover */}
              <button
                className={`px-4 py-2 rounded-lg font-display font-semibold text-sm tracking-wide transition-all duration-300 flex items-center space-x-1 ${
                  isServicesActive()
                    ? 'bg-flame text-white'
                    : 'text-ash hover:text-white hover:bg-charcoal-soft'
                }`}
                onMouseEnter={() => prefetchOnHover('services')}
              >
                <span>{t('nav.services')}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 pt-3 z-50">
                  <div className="w-64 bg-charcoal-soft border border-flame/20 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
                    <Link
                      to="/services"
                      onClick={() => { setIsServicesDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="block px-5 py-3 text-ash hover:text-white hover:bg-flame/20 transition-all duration-200 font-medium border-b border-white/5"
                    >
                      {t('nav.performanceTraining')}
                    </Link>
                    <Link
                      to="/online-coaching"
                      onClick={() => { setIsServicesDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="block px-5 py-3 text-ash hover:text-white hover:bg-flame/20 transition-all duration-200 font-medium"
                    >
                      {t('nav.onlineTraining')}
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {/* PERFORMANCE: Prefetch images on hover */}
            <Link
              to="/testimonials"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              onMouseEnter={() => prefetchOnHover('testimonials')}
              className={`px-4 py-2 rounded-lg font-display font-semibold text-sm tracking-wide transition-all duration-300 ${
                isActive('/testimonials')
                  ? 'bg-flame text-white'
                  : 'text-ash hover:text-white hover:bg-charcoal-soft'
              }`}
            >
              {t('nav.stories')}
            </Link>
            <Link
              to="/faq"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`px-4 py-2 rounded-lg font-display font-semibold text-sm tracking-wide transition-all duration-300 ${
                isActive('/faq')
                  ? 'bg-flame text-white'
                  : 'text-ash hover:text-white hover:bg-charcoal-soft'
              }`}
            >
              {t('nav.faq')}
            </Link>
            <div className="pl-4 flex items-center space-x-2">
              <LanguageSwitcher />
              <Link
                to="/contact"
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group relative px-6 py-2.5 bg-gradient-to-r from-flame to-accent text-white font-display font-bold text-sm tracking-wide rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-flame/50 flex items-center space-x-2 z-10"
              >
                <span className="relative z-20">{t('nav.startNow')}</span>
                <Zap size={16} className="relative z-20 transition-transform duration-300 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-flame opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
              </Link>
            </div>
          </nav>

          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-white hover:text-flame transition-colors duration-300"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-charcoal-soft/98 backdrop-blur-md border-t border-flame/20 rounded-b-2xl shadow-2xl">
            <nav className="px-4 py-6 space-y-1">
              <Link to="/" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`block px-4 py-3 rounded-lg font-display font-semibold transition-all duration-200 ${isActive('/') ? 'bg-flame text-white' : 'text-ash hover:bg-charcoal hover:text-white'}`}>
                {t('nav.home')}
              </Link>
              <Link to="/about" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`block px-4 py-3 rounded-lg font-display font-semibold transition-all duration-200 ${isActive('/about') ? 'bg-flame text-white' : 'text-ash hover:bg-charcoal hover:text-white'}`}>
                {t('nav.about')}
              </Link>
              <Link to="/training-roadmap" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`block px-4 py-3 rounded-lg font-display font-semibold transition-all duration-200 ${isActive('/training-roadmap') ? 'bg-flame text-white' : 'text-ash hover:bg-charcoal hover:text-white'}`}>
                ROAD MAP
              </Link>
              <Link to="/services" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`block px-4 py-3 rounded-lg font-display font-semibold transition-all duration-200 ${isActive('/services') ? 'bg-flame text-white' : 'text-ash hover:bg-charcoal hover:text-white'}`}>
                {t('nav.performanceTraining').toUpperCase()}
              </Link>
              <Link to="/online-coaching" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`block px-4 py-3 rounded-lg font-display font-semibold transition-all duration-200 ${isActive('/online-coaching') ? 'bg-flame text-white' : 'text-ash hover:bg-charcoal hover:text-white'}`}>
                {t('nav.onlineTraining').toUpperCase()}
              </Link>
              <Link to="/testimonials" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`block px-4 py-3 rounded-lg font-display font-semibold transition-all duration-200 ${isActive('/testimonials') ? 'bg-flame text-white' : 'text-ash hover:bg-charcoal hover:text-white'}`}>
                {t('nav.stories')}
              </Link>
              <Link to="/faq" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`block px-4 py-3 rounded-lg font-display font-semibold transition-all duration-200 ${isActive('/faq') ? 'bg-flame text-white' : 'text-ash hover:bg-charcoal hover:text-white'}`}>
                {t('nav.faq')}
              </Link>
              <div className="pt-4 space-y-2">
                <div className="px-4">
                  <LanguageSwitcher />
                </div>
                <Link
                  to="/contact"
                  onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="block px-6 py-3 bg-gradient-to-r from-flame to-accent text-white font-display font-bold text-center rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-flame/50"
                >
                  {t('nav.startNow')}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
