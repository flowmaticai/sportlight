import Airtable from 'airtable';

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appgNcM4lFde1mLon';
const AIRTABLE_TOKEN =
  process.env.AIRTABLE_TOKEN ||
  process.env.VITE_AIRTABLE_TOKEN ||
  process.env.REACT_APP_AIRTABLE_TOKEN;

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
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    if (!AIRTABLE_TOKEN) {
      throw new Error(
        'Airtable token env var is not set. Expected one of: AIRTABLE_TOKEN, VITE_AIRTABLE_TOKEN, REACT_APP_AIRTABLE_TOKEN'
      );
    }

    const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE_ID);

    const records = await base('Testimonials')
      .select({
        sort: [{ field: 'Created', direction: 'desc' }]
      })
      .all();

    const testimonials = records.map(record => ({
      id: record.id,
      name: record.get('Full Name') || '',
      email: record.get('Email') || null,
      sport: record.get('Sport') || '',
      school: record.get('School/Team') || '',
      training_period: record.get('Training Duration') || '',
      testimonial: record.get('Experience') || '',
      rating: record.get('Rating') || 5,
      approved: record.get('Approval Status') === 'Approved',
      created_at: record.get('Created') || new Date().toISOString()
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(testimonials)
    };
  } catch (error) {
    console.error('Error fetching testimonials:', error.message);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'FETCH_ERROR',
        message: error.message || 'Failed to fetch testimonials'
      })
    };
  }
};
