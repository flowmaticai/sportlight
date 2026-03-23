interface TestimonialData {
  name: string;
  email: string;
  sport: string;
  school: string;
  training_period: string;
  rating: number;
  testimonial: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  sport: string;
  experience: string;
  program: string;
  preferred_time: string;
  goals: string;
  message: string;
}

const getApiBase = () => {
  if (import.meta.env.DEV) {
    return '/.netlify/functions';
  }
  return '/.netlify/functions';
};

export const submitTestimonial = async (data: TestimonialData) => {
  try {
    const apiUrl = `${getApiBase()}/submit-testimonial`;
    console.log('Submitting testimonial to URL:', apiUrl);
    console.log('Testimonial data:', data);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error response:', errorData);
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log('Success response:', result);
    return { success: true, record: result };
  } catch (error: any) {
    console.error('Error submitting testimonial:', error);
    return { success: false, error };
  }
};

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const apiUrl = `${getApiBase()}/submit-form`;
    console.log('Submitting to URL:', apiUrl);
    console.log('Form data:', data);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error response:', errorData);
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log('Success response:', result);
    return { success: true, record: result };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};
