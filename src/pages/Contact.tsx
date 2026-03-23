import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sport: '',
    experience: '',
    goals: '',
    service: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSetupNotice, setShowSetupNotice] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'service') {
      setFormData(prev => ({ ...prev, [name]: value, preferredTime: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const getTimeSlotOptions = () => {
    if (formData.service === "Runner's S&C") {
      return language === 'zh' ? {
        'Thursday 7:30pm-8:30pm (Sheung Wan)': '星期四 7:30pm-8:30pm（上環）',
        'Thursday 8:35pm-9:35pm (Sheung Wan)': '星期四 8:35pm-9:35pm（上環）',
        'Wednesday 7:15pm-8:15pm (Lai Chi Kok)': '星期三 7:15pm-8:15pm（荔枝角）',
        'Friday 7:15pm-8:15pm (Lai Chi Kok)': '星期五 7:15pm-8:15pm（荔枝角）',
        'Sunday 2pm-3pm (Lai Chi Kok)': '星期日 2pm-3pm（荔枝角）'
      } : {
        'Thursday 7:30pm-8:30pm (Sheung Wan)': 'Thursday 7:30pm-8:30pm (Sheung Wan)',
        'Thursday 8:35pm-9:35pm (Sheung Wan)': 'Thursday 8:35pm-9:35pm (Sheung Wan)',
        'Wednesday 7:15pm-8:15pm (Lai Chi Kok)': 'Wednesday 7:15pm-8:15pm (Lai Chi Kok)',
        'Friday 7:15pm-8:15pm (Lai Chi Kok)': 'Friday 7:15pm-8:15pm (Lai Chi Kok)',
        'Sunday 2pm-3pm (Lai Chi Kok)': 'Sunday 2pm-3pm (Lai Chi Kok)'
      };
    } else if (formData.service === 'Volleyball S&C') {
      return language === 'zh' ? {
        'Thursday 7:15pm-8:15pm (Lai Chi Kok)': '星期四 7:15pm-8:15pm（荔枝角）',
        'Thursday 8:15pm-9:15pm (Lai Chi Kok)': '星期四 8:15pm-9:15pm（荔枝角）',
        'Sunday 9am-10am (Lai Chi Kok)': '星期日 9am-10am（荔枝角）',
        'Sunday 10:10am-11:10am (Lai Chi Kok)': '星期日 10:10am-11:10am（荔枝角）',
        'Sunday 11:20am-12:20pm (Lai Chi Kok)': '星期日 11:20am-12:20pm（荔枝角）'
      } : {
        'Thursday 7:15pm-8:15pm (Lai Chi Kok)': 'Thursday 7:15pm-8:15pm (Lai Chi Kok)',
        'Thursday 8:15pm-9:15pm (Lai Chi Kok)': 'Thursday 8:15pm-9:15pm (Lai Chi Kok)',
        'Sunday 9am-10am (Lai Chi Kok)': 'Sunday 9am-10am (Lai Chi Kok)',
        'Sunday 10:10am-11:10am (Lai Chi Kok)': 'Sunday 10:10am-11:10am (Lai Chi Kok)',
        'Sunday 11:20am-12:20pm (Lai Chi Kok)': 'Sunday 11:20am-12:20pm (Lai Chi Kok)'
      };
    } else {
      return t.contact.timeSlots;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setShowSetupNotice(false);

    if (!formData.name || !formData.email || !formData.phone || !formData.sport || !formData.goals) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = '/.netlify/functions/submit-form';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          sport: formData.sport,
          experience: formData.experience || '',
          program: formData.service || '',
          preferred_time: formData.preferredTime || '',
          goals: formData.goals.trim(),
          message: formData.message.trim() || ''
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      setIsSubmitted(true);
      setFormData({
        name: '', email: '', phone: '', sport: '', experience: '',
        goals: '', service: '', preferredTime: '', message: ''
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err: any) {
      console.error('Form submission error:', err);
      setShowSetupNotice(true);
      setError(`Submission Failed: ${err.message || 'Unable to submit your message. Please try contacting us directly.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-charcoal min-h-screen pt-20">
      <section className="py-24 bg-gradient-to-br from-charcoal via-charcoal-soft to-charcoal grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines opacity-5"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white mb-6 tracking-tight">
              {t.contact.title} <span className="bg-gradient-to-r from-flame to-accent bg-clip-text text-transparent">{t.contact.titleAccent}</span>
            </h1>
            <p className="text-xl text-ash max-w-3xl mx-auto leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal-soft grain-overlay relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-charcoal to-charcoal-soft rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-display font-black text-white mb-6">{t.contact.bookConsultation}</h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-display font-bold mb-2 text-white">{t.contact.messageSent}</h4>
                    <p className="text-ash mb-4">{t.contact.messageSentText}</p>
                    <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                      <p className="text-green-400 text-sm">
                        {t.contact.fasterResponse}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-flame/10 border border-flame/20 rounded-lg p-6">
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <h4 className="font-display font-bold text-flame mb-2">{t.contact.formUnavailable}</h4>
                            <p className="text-ash text-sm mb-4">{error}</p>
                            {showSetupNotice && (
                              <div className="mt-4 pt-4 border-t border-flame/20">
                                <p className="text-white text-sm font-medium mb-3">{t.contact.contactDirectly}</p>
                                <div className="grid grid-cols-1 gap-3">
                                  {/* POLISH: Added transition-all for smoother hover */}
                                  <a
                                    href="mailto:info@sportlight.biz?subject=Training Inquiry&body=Hi, I'm interested in training with Sportlight Athletes."
                                    className="inline-flex items-center justify-center space-x-2 bg-electric hover:bg-electric/80 text-white px-4 py-3 rounded-lg text-sm font-display font-bold transition-all duration-300"
                                  >
                                    <Mail size={16} />
                                    <span>{t.contact.emailUs}</span>
                                  </a>
                                </div>
                                <div className="mt-3 p-3 bg-charcoal/50 rounded-lg border border-white/5">
                                  <p className="text-ash text-xs">
                                    {t.contact.fastestResponseText}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-ash mb-2">
                          {t.contact.fullName} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          maxLength={100}
                          minLength={2}
                          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent text-white placeholder-ash/50 transition-all duration-300 hover:border-white/20 focus:shadow-lg focus:shadow-flame/20"
                          placeholder={t.contact.fullNamePlaceholder}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-ash mb-2">
                          {t.contact.email} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          maxLength={255}
                          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent text-white placeholder-ash/50 transition-all duration-300 hover:border-white/20 focus:shadow-lg focus:shadow-flame/20"
                          placeholder={t.contact.emailPlaceholder}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-ash mb-2">
                        {t.contact.phone} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        maxLength={20}
                        minLength={8}
                        pattern="[0-9+\s\-()]{8,20}"
                        className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent text-white placeholder-ash/50"
                        placeholder={t.contact.phonePlaceholder}
                      />
                      <p className="mt-1 text-xs text-ash/70">{t.contact.phoneHelper}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="sport" className="block text-sm font-medium text-ash mb-2">
                          {t.contact.primarySport} *
                        </label>
                        <select
                          id="sport"
                          name="sport"
                          value={formData.sport}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent text-white transition-all duration-300 hover:border-white/20 focus:shadow-lg focus:shadow-flame/20"
                        >
                          <option value="">{t.contact.selectSport}</option>
                          {Object.entries(t.contact.sports).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-ash mb-2">
                          {t.contact.experienceLevel}
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent text-white transition-all duration-300 hover:border-white/20 focus:shadow-lg focus:shadow-flame/20"
                        >
                          <option value="">{t.contact.selectExperience}</option>
                          {Object.entries(t.contact.experienceLevels).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-ash mb-2">
                          {t.contact.interestedService}
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent text-white transition-all duration-300 hover:border-white/20 focus:shadow-lg focus:shadow-flame/20"
                        >
                          <option value="">{t.contact.selectService}</option>
                          {Object.entries(t.contact.services).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="preferredTime" className="block text-sm font-medium text-ash mb-2">
                          {t.contact.preferredTime}
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent text-white transition-all duration-300 hover:border-white/20 focus:shadow-lg focus:shadow-flame/20"
                        >
                          <option value="">{t.contact.selectTime}</option>
                          {Object.entries(getTimeSlotOptions()).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                        {(formData.service === "Runner's S&C" || formData.service === 'Volleyball S&C') && (
                          <p className="mt-2 text-xs text-electric">
                            {language === 'zh' ? '已顯示特定班次時間' : 'Showing specific class times for this program'}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="goals" className="block text-sm font-medium text-ash mb-2">
                        {t.contact.goals} *
                      </label>
                      <textarea
                        id="goals"
                        name="goals"
                        value={formData.goals}
                        onChange={handleInputChange}
                        required
                        maxLength={1000}
                        minLength={10}
                        rows={4}
                        className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent resize-none text-white placeholder-ash/50 transition-all duration-300 hover:border-white/20 focus:shadow-lg focus:shadow-flame/20"
                        placeholder={t.contact.goalsPlaceholder}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-ash mb-2">
                        {t.contact.additionalMessage}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        maxLength={2000}
                        rows={3}
                        className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg focus:ring-2 focus:ring-flame focus:border-transparent resize-none text-white placeholder-ash/50 transition-all duration-300 hover:border-white/20 focus:shadow-lg focus:shadow-flame/20"
                        placeholder={t.contact.additionalMessagePlaceholder}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full font-display font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isSubmitting
                          ? 'bg-ash/50 cursor-not-allowed text-white/50'
                          : 'bg-gradient-to-r from-flame to-accent hover:from-flame/80 hover:to-accent/80 text-white hover-scale btn-glow'
                      }`}
                    >
                      <Send size={20} />
                      <span>{isSubmitting ? t.contact.sending : t.contact.sendMessage}</span>
                    </button>

                    <p className="text-center text-ash text-sm">
                      {t.contact.freeConsultation} • {t.contact.noCommitment} • {t.contact.responseTime}
                    </p>

                    <div className="bg-electric/10 border border-electric/20 rounded-lg p-4">
                      <p className="text-electric text-sm text-center">
                        <strong>{t.contact.needImmediate}</strong> {t.contact.instantResponse}
                        <span className="font-medium ml-1">
                          +852 6481 0413
                        </span>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-charcoal to-charcoal-soft rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-display font-black text-white mb-6">{t.contact.contactInfo}</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <MessageCircle size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white">{t.contact.whatsapp}</h4>
                      <p className="text-ash">6481 0413 {t.contact.moSir}</p>
                      <p className="text-sm text-ash/60">{t.contact.fastestResponseTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-electric/10 rounded-lg flex items-center justify-center">
                      <Phone size={20} className="text-electric" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white">{t.contact.phoneLabel}</h4>
                      <p className="text-ash">+852 6481 0413</p>
                      <p className="text-ash">+852 9645 6229 {t.contact.activeSoon}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-flame/10 rounded-lg flex items-center justify-center">
                      <Mail size={20} className="text-flame" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white">{t.contact.emailLabel}</h4>
                      <p className="text-ash">info@sportlight.biz</p>
                      <p className="text-sm text-ash/60">{t.contact.replyTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center">
                      <Instagram size={20} className="text-pink-500" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white">{t.contact.instagram}</h4>
                      {/* POLISH: Added transition-all for smoother hover */}
                      <a
                        href="https://www.instagram.com/sportlight.athletes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:text-pink-300 hover:underline transition-all duration-300"
                      >
                        @sportlight.athletes
                      </a>
                      <p className="text-sm text-ash/60">{t.contact.trainingTips}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <MapPin size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white">{t.contact.location}</h4>
                      {/* POLISH: Added transition-all for smoother hover */}
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Room+5A01+Hung+Cheong+Factory+Building+Lai+Chi+Kok+Hong+Kong"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-electric hover:text-electric/80 hover:underline transition-all duration-300"
                      >
                        {t.contact.address}<br />
                        {t.contact.area}
                      </a>
                      <p className="text-sm text-ash/60 mt-1">{t.contact.viewOnMap}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-electric/10 rounded-lg flex items-center justify-center">
                      <Clock size={20} className="text-electric" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white">{t.contact.trainingHours}</h4>
                      <p className="text-ash">{t.contact.hours}</p>
                      <p className="text-sm text-ash/60">{t.contact.closedSundays} • {t.contact.flexibleScheduling}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
