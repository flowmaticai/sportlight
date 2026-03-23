import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="group relative px-4 py-2 bg-charcoal-soft hover:bg-charcoal text-white font-display font-semibold text-sm rounded-lg transition-all duration-300 border border-ash/20 hover:border-electric/50 flex items-center space-x-2"
      aria-label="Switch language"
    >
      <Globe size={16} className="text-electric" />
      <span>{language === 'en' ? '中文' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;
