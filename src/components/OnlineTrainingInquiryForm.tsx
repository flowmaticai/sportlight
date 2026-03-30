import { ChangeEvent, FormEvent, useState } from 'react';
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormState {
  fullName: string;
  email: string;
  phoneNumber: string;
  mainSport: string;
  goals: string;
}

const initialFormState: FormState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  mainSport: '',
  goals: '',
};

const AIRTABLE_BASE_ID = (import.meta.env.ONLINE_AIRTABLE_BASE_ID ||
  import.meta.env.VITE_AIRTABLE_BASE_ID ||
  import.meta.env.AIRTABLE_BASE_ID) as string | undefined;
const AIRTABLE_TABLE_ID = (import.meta.env.VITE_AIRTABLE_ONLINE_TRAINING_TABLE_ID ||
  import.meta.env.ONLINE_AIRTABLE_TABLE_ID ||
  import.meta.env.VITE_AIRTABLE_TABLE_ID ||
  import.meta.env.AIRTABLE_TABLE_ID ||
  'tblZ8F1YVuk7p6vL2') as string | undefined;
const AIRTABLE_PERSONAL_ACCESS_TOKEN = (import.meta.env.ONLINE_AIRTABLE_TOKEN ||
  import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN ||
  import.meta.env.VITE_AIRTABLE_TOKEN) as string | undefined;

const OnlineTrainingInquiryForm = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!AIRTABLE_PERSONAL_ACCESS_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
      setErrorMessage('Online training form is temporarily unavailable. Please contact us directly.');
      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(false);
    setErrorMessage('');

    try {
      // Development-only: move this token to a secure server-side endpoint before production.
      const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: {
              'Full Name': formData.fullName.trim(),
              Email: formData.email.trim().toLowerCase(),
              'Phone Number': formData.phoneNumber.trim(),
              'Main Sport': formData.mainSport.trim(),
              Goals: formData.goals.trim(),
            },
          }),
        }
      );

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload?.error?.message || 'Unable to submit form right now.');
      }

      setFormData(initialFormState);
      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong while submitting. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-charcoal to-charcoal-soft rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
      <div className="mb-6">
        <h4 className="text-2xl font-display font-black text-white mb-2">Apply For Online Training</h4>
        <p className="text-ash">Tell us a bit about your sport and goals, and we will contact you.</p>
      </div>

      {isSubmitted && (
        <div className="mb-5 flex items-start space-x-3 rounded-xl border border-green-400/25 bg-green-500/10 px-4 py-3">
          <CheckCircle2 size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
          <p className="text-green-100 text-sm sm:text-base">
            Thank you! Your details have been submitted.
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-5 flex items-start space-x-3 rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3">
          <AlertCircle size={20} className="text-red-300 mt-0.5 flex-shrink-0" />
          <p className="text-red-100 text-sm sm:text-base">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-ash mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-white/15 bg-charcoal/70 text-white placeholder:text-ash/60 px-4 py-3 outline-none transition-all duration-300 focus:border-flame/70 focus:ring-2 focus:ring-flame/30"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-ash mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/15 bg-charcoal/70 text-white placeholder:text-ash/60 px-4 py-3 outline-none transition-all duration-300 focus:border-flame/70 focus:ring-2 focus:ring-flame/30"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-ash mb-2">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            placeholder="Enter your phone number"
            className="w-full rounded-xl border border-white/15 bg-charcoal/70 text-white placeholder:text-ash/60 px-4 py-3 outline-none transition-all duration-300 focus:border-flame/70 focus:ring-2 focus:ring-flame/30"
          />
        </div>

        <div>
          <label htmlFor="mainSport" className="block text-sm font-semibold text-ash mb-2">
            Main Sport
          </label>
          <textarea
            id="mainSport"
            name="mainSport"
            value={formData.mainSport}
            onChange={handleInputChange}
            required
            rows={3}
            placeholder="e.g. Swimming, Athletics, Basketball"
            className="w-full rounded-xl border border-white/15 bg-charcoal/70 text-white placeholder:text-ash/60 px-4 py-3 outline-none transition-all duration-300 focus:border-flame/70 focus:ring-2 focus:ring-flame/30 resize-none"
          />
        </div>

        <div>
          <label htmlFor="goals" className="block text-sm font-semibold text-ash mb-2">
            Goals
          </label>
          <textarea
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleInputChange}
            required
            rows={4}
            placeholder="Tell us about your training goals..."
            className="w-full rounded-xl border border-white/15 bg-charcoal/70 text-white placeholder:text-ash/60 px-4 py-3 outline-none transition-all duration-300 focus:border-flame/70 focus:ring-2 focus:ring-flame/30 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-gradient-to-r from-flame to-accent hover:from-flame-dark hover:to-accent/90 text-white px-8 py-4 rounded-xl font-display font-bold transition-all duration-300 hover-scale inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Start Your Journey</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default OnlineTrainingInquiryForm;
