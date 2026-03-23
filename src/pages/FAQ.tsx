import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Mail, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const AccordionItem = ({ faq, globalIndex, isOpen, toggleItem }: any) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="bg-gradient-to-br from-charcoal to-charcoal-soft rounded-xl overflow-hidden border border-white/5 hover:border-electric/30 transition-all duration-500 hover-lift card-shine">
      <button
        onClick={() => toggleItem(globalIndex)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-200"
      >
        <h3 className="text-lg font-display font-bold text-white pr-4">
          {faq.question}
        </h3>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} className="text-electric flex-shrink-0" />
        </div>
      </button>

      <div
        className="accordion-content border-t border-white/5"
        style={{
          maxHeight: isOpen ? `${height}px` : '0px',
          opacity: isOpen ? 1 : 0
        }}
      >
        <div ref={contentRef} className="px-6 py-4">
          <p className="text-ash leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: t.faq.categories.general.title,
      faqs: [
        { question: t.faq.categories.general.q1, answer: t.faq.categories.general.a1 },
        { question: t.faq.categories.general.q2, answer: t.faq.categories.general.a2 },
        { question: t.faq.categories.general.q3, answer: t.faq.categories.general.a3 },
        { question: t.faq.categories.general.q4, answer: t.faq.categories.general.a4 }
      ]
    },
    {
      title: t.faq.categories.training.title,
      faqs: [
        { question: t.faq.categories.training.q1, answer: t.faq.categories.training.a1 },
        { question: t.faq.categories.training.q2, answer: t.faq.categories.training.a2 },
        { question: t.faq.categories.training.q3, answer: t.faq.categories.training.a3 },
        { question: t.faq.categories.training.q4, answer: t.faq.categories.training.a4 }
      ]
    },
    {
      title: t.faq.categories.booking.title,
      faqs: [
        { question: t.faq.categories.booking.q1, answer: t.faq.categories.booking.a1 },
        { question: t.faq.categories.booking.q2, answer: t.faq.categories.booking.a2 },
        { question: t.faq.categories.booking.q3, answer: t.faq.categories.booking.a3 },
        { question: t.faq.categories.booking.q4, answer: t.faq.categories.booking.a4 }
      ]
    },
    {
      title: t.faq.categories.pricing.title,
      faqs: [
        { question: t.faq.categories.pricing.q1, answer: t.faq.categories.pricing.a1 },
        { question: t.faq.categories.pricing.q2, answer: t.faq.categories.pricing.a2 },
        { question: t.faq.categories.pricing.q3, answer: t.faq.categories.pricing.a3 },
        { question: t.faq.categories.pricing.q4, answer: t.faq.categories.pricing.a4 }
      ]
    },
    {
      title: t.faq.categories.details.title,
      faqs: [
        { question: t.faq.categories.details.q1, answer: t.faq.categories.details.a1 },
        { question: t.faq.categories.details.q2, answer: t.faq.categories.details.a2 },
        { question: t.faq.categories.details.q3, answer: t.faq.categories.details.a3 },
        { question: t.faq.categories.details.q4, answer: t.faq.categories.details.a4 }
      ]
    },
    {
      title: t.faq.categories.health.title,
      faqs: [
        { question: t.faq.categories.health.q1, answer: t.faq.categories.health.a1 },
        { question: t.faq.categories.health.q2, answer: t.faq.categories.health.a2 },
        { question: t.faq.categories.health.q3, answer: t.faq.categories.health.a3 }
      ]
    },
    {
      title: t.faq.categories.trialSession.title,
      faqs: [
        { question: t.faq.categories.trialSession.q1, answer: t.faq.categories.trialSession.a1 },
        { question: t.faq.categories.trialSession.q2, answer: t.faq.categories.trialSession.a2 },
        { question: t.faq.categories.trialSession.q3, answer: t.faq.categories.trialSession.a3 },
        { question: t.faq.categories.trialSession.q4, answer: t.faq.categories.trialSession.a4 }
      ]
    }
  ];

  return (
    <div className="bg-charcoal min-h-screen pt-20">
      <section className="py-24 bg-gradient-to-br from-charcoal via-charcoal-soft to-charcoal grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines opacity-5"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-electric/10 rounded-2xl mb-6 mx-auto">
            <HelpCircle size={40} className="text-electric" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white mb-6 tracking-tight">
            {t.faq.title} <span className="bg-gradient-to-r from-electric to-accent bg-clip-text text-transparent">{t.faq.titleAccent}</span>
          </h1>
          <p className="text-xl text-ash max-w-3xl mx-auto leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>
      </section>

      <section className="py-24 bg-charcoal-soft grain-overlay relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-display font-black text-white mb-8 pb-4 border-b-2 border-electric/20">
                {category.title}
              </h2>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openItems.includes(globalIndex);

                  return (
                    <AccordionItem
                      key={faqIndex}
                      faq={faq}
                      globalIndex={globalIndex}
                      isOpen={isOpen}
                      toggleItem={toggleItem}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-charcoal via-charcoal-soft to-charcoal grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-flame/20 via-accent/20 to-electric/20"></div>
        <div className="absolute inset-0 diagonal-lines opacity-10"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-charcoal-soft/50 backdrop-blur-md rounded-2xl p-12 border border-electric/20">
            <div className="flex items-center justify-center mb-6">
              <Zap size={32} className="text-electric" />
            </div>
            <h2 className="text-4xl font-display font-black text-white mb-6">{t.faq.stillHaveQuestions}</h2>
            <p className="text-xl text-ash mb-8">
              {t.faq.stillHaveQuestionsText}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto bg-flame hover:bg-flame-dark text-white px-8 py-4 rounded-xl text-lg font-display font-bold transition-all duration-300 hover-scale flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>{t.faq.whatsappMoSir}</span>
              </Link>
              <a
                href="mailto:info@sportlight.biz"
                className="w-full sm:w-auto bg-white hover:bg-ash text-charcoal px-8 py-4 rounded-xl text-lg font-display font-bold transition-all duration-300 hover-scale flex items-center justify-center space-x-2"
              >
                <Mail size={20} />
                <span>{t.faq.emailUs}</span>
              </a>
            </div>

            <p className="text-ash text-sm mt-6">
              {t.faq.responseTime} • {t.faq.freeConsultation}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
