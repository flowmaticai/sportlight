import { useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import { submitTestimonial } from '../lib/airtable';

interface FormData {
  name: string;
  sport: string;
  school: string;
  training_period: string;
  testimonial: string;
  rating: number;
  email: string;
}

const TestimonialSubmissionForm = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState<FormData>({
    name: '',
    sport: '',
    school: '',
    training_period: '',
    testimonial: '',
    rating: 5,
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formElement = e.currentTarget;
    const formTop = formElement.getBoundingClientRect().top + window.pageYOffset - 100;

    try {
      const result = await submitTestimonial(formData);

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit testimonial');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        sport: '',
        school: '',
        training_period: '',
        testimonial: '',
        rating: 5,
        email: ''
      });

      window.scrollTo({ top: formTop, behavior: 'smooth' });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting testimonial:', err);
      const message = err instanceof Error ? err.message : '';
      const isServerIssue =
        message.includes('SERVICE_UNAVAILABLE') ||
        message.includes('token env var is not set') ||
        message.includes('TABLE_NOT_FOUND') ||
        message.includes('UNKNOWN_ERROR');
      setError(isServerIssue ? t.contact.formUnavailable : t.testimonialForm.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-charcoal-soft to-charcoal rounded-2xl p-8 border border-accent/30 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} className="text-accent" />
        </div>
        <h3 className="text-2xl font-display font-black text-white mb-4">
          {t.testimonialForm.successTitle}
        </h3>
        <p className="text-ash">
          {t.testimonialForm.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-charcoal-soft to-charcoal rounded-2xl p-8 border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-white font-display font-bold mb-2">
            {t.testimonialForm.nameLabel} <span className="text-flame">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors"
            placeholder={t.testimonialForm.namePlaceholder}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-white font-display font-bold mb-2">
            {t.testimonialForm.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors"
            placeholder={t.testimonialForm.emailPlaceholder}
          />
          <p className="text-ash/60 text-xs mt-1">{t.testimonialForm.emailHelper}</p>
        </div>

        <div>
          <label htmlFor="sport" className="block text-white font-display font-bold mb-2">
            {t.testimonialForm.sportLabel}
          </label>
          <input
            type="text"
            id="sport"
            value={formData.sport}
            onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors"
            placeholder={t.testimonialForm.sportPlaceholder}
          />
        </div>

        <div>
          <label htmlFor="school" className="block text-white font-display font-bold mb-2">
            {t.testimonialForm.schoolLabel}
          </label>
          <input
            type="text"
            id="school"
            value={formData.school}
            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors"
            placeholder={t.testimonialForm.schoolPlaceholder}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="training_period" className="block text-white font-display font-bold mb-2">
            {t.testimonialForm.trainingPeriodLabel}
          </label>
          <input
            type="text"
            id="training_period"
            value={formData.training_period}
            onChange={(e) => setFormData({ ...formData, training_period: e.target.value })}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors"
            placeholder={t.testimonialForm.trainingPeriodPlaceholder}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-white font-display font-bold mb-2">
            {t.testimonialForm.ratingLabel} <span className="text-flame">*</span>
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={`${
                    star <= formData.rating
                      ? 'text-flame fill-current'
                      : 'text-white/20'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="testimonial" className="block text-white font-display font-bold mb-2">
            {t.testimonialForm.testimonialLabel} <span className="text-flame">*</span>
          </label>
          <textarea
            id="testimonial"
            required
            value={formData.testimonial}
            onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition-colors resize-none"
            placeholder={t.testimonialForm.testimonialPlaceholder}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-flame/10 border border-flame/30 rounded-xl">
          <p className="text-flame text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/80 text-white px-8 py-4 rounded-xl font-display font-bold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>{t.testimonialForm.submittingButton}</span>
          </>
        ) : (
          <>
            <Send size={20} />
            <span>{t.testimonialForm.submitButton}</span>
          </>
        )}
      </button>

      <p className="text-ash/60 text-sm text-center mt-4">
        {t.testimonialForm.disclaimer}
      </p>
    </form>
  );
};

export default TestimonialSubmissionForm;
