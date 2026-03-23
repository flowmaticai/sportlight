import Airtable from 'airtable';

const AIRTABLE_BASE_ID =
  process.env.TESTIMONIALS_AIRTABLE_BASE_ID ||
  process.env.AIRTABLE_BASE_ID ||
  'appWD0RmenfZUo0bp';
const AIRTABLE_TABLE_ID =
  process.env.TESTIMONIALS_AIRTABLE_TABLE_ID ||
  process.env.AIRTABLE_TABLE_ID ||
  'tblAMf5eEd6t8ffY9';
const AIRTABLE_TOKEN =
  process.env.TESTIMONIALS_AIRTABLE_TOKEN ||
  process.env.AIRTABLE_TOKEN ||
  process.env.VITE_AIRTABLE_TOKEN ||
  process.env.REACT_APP_AIRTABLE_TOKEN;

const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS_PER_WINDOW = 5;

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 5000);
};

const checkRateLimit = (ip) => {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];
  const recentRequests = userRequests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);

  if (rateLimitStore.size > 10000) {
    const oldestKey = rateLimitStore.keys().next().value;
    rateLimitStore.delete(oldestKey);
  }

  return true;
};

export const handler = async (event) => {
  const origin = event.headers.origin || '';
  const allowedOrigins = [
    'https://sportlightathletes.com',
    'https://www.sportlightathletes.com',
    /^https:\/\/.*\.netlify\.app$/
  ];

  const isAllowedOrigin = allowedOrigins.some(allowed => {
    if (typeof allowed === 'string') {
      return origin === allowed;
    }
    return allowed.test(origin);
  });

  const headers = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'https://sportlightathletes.com',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';

    if (!checkRateLimit(clientIp)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ error: 'Too many requests. Please try again later.' })
      };
    }

    if (!AIRTABLE_TOKEN) {
      throw new Error(
        'Airtable testimonials token env var is not set. Expected one of: TESTIMONIALS_AIRTABLE_TOKEN, AIRTABLE_TOKEN, VITE_AIRTABLE_TOKEN, REACT_APP_AIRTABLE_TOKEN'
      );
    }

    const formData = JSON.parse(event.body);

    if (!formData.name || !formData.testimonial) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE_ID);

    const primaryFields = {
      'Full Name': sanitizeInput(formData.name),
      'Email': sanitizeInput(formData.email || ''),
      'Sport': sanitizeInput(formData.sport || ''),
      'School/Team': sanitizeInput(formData.school || ''),
      'Training Duration': sanitizeInput(formData.training_period || ''),
      'Your Experience': sanitizeInput(formData.testimonial || ''),
      'Your Rating': formData.rating ? Number(formData.rating) : undefined
    };

    const fallbackFields = {
      'Full Name': sanitizeInput(formData.name),
      'Email': sanitizeInput(formData.email || ''),
      'Sport': sanitizeInput(formData.sport || ''),
      'School/Team': sanitizeInput(formData.school || ''),
      'Training Duration': sanitizeInput(formData.training_period || ''),
      'Experience': sanitizeInput(formData.testimonial || ''),
      'Rating': formData.rating ? Number(formData.rating) : undefined
    };

    let record;
    try {
      record = await base(AIRTABLE_TABLE_ID).create([{ fields: primaryFields }]);
    } catch (createError) {
      // Some bases use "Experience"/"Rating" instead of "Your Experience"/"Your Rating".
      if (
        createError?.message &&
        (createError.message.includes('UNKNOWN_FIELD_NAME') ||
          createError.message.includes('INVALID_REQUEST'))
      ) {
        record = await base(AIRTABLE_TABLE_ID).create([{ fields: fallbackFields }]);
      } else {
        throw createError;
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Testimonial submitted successfully',
        recordId: record[0].id
      })
    };
  } catch (error) {
    console.error('Airtable testimonial submission error:', error.message);

    if (error.message && error.message.includes('token env var is not set')) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          error: 'SERVICE_UNAVAILABLE',
          message: 'Testimonial form is temporarily unavailable. Please try again later.'
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'SUBMISSION_ERROR',
        message: error.message || 'Failed to submit testimonial'
      })
    };
  }
};
