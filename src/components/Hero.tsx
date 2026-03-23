import React from 'react';
import { ChevronDown, Play, Star, TrendingUp, Users, Award } from 'lucide-react';

const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-xl">Hero background image placeholder</span>
        </div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="animate-fade-in-up">
          {/* Trust Badge */}
          <div className="flex items-center justify-center space-x-1 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white/90">Trust badge placeholder</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white mb-6 leading-tight">
            <span className="block">UNLOCK YOUR</span>
            <span className="block bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              ATHLETIC
            </span>
            <span className="block text-white">POTENTIAL</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            Elite athletic coaching that transforms performance. From 1-on-1 training to group classes 
            and online programs - we help athletes reach their peak potential.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <TrendingUp size={20} />
              <span>Start Your Journey</span>
            </button>
            <button
              onClick={scrollToServices}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 backdrop-blur-sm">
              <Play size={20} />
              <span>View Programs</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="text-orange-400 mr-1 sm:mr-2" size={20} />
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">XXX</div>
              </div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base">Stat placeholder</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="text-orange-400 mr-1 sm:mr-2" size={20} />
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">XX%</div>
              </div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base">Stat placeholder</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="text-orange-400 mr-1 sm:mr-2" size={20} />
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">X+</div>
              </div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base">Stat placeholder</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;