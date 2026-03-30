import Airtable from 'airtable';

const AIRTABLE_BASE_ID =
  process.env.ONLINE_AIRTABLE_BASE_ID ||
  process.env.VITE_AIRTABLE_BASE_ID ||
  process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_ID =
  process.env.ONLINE_AIRTABLE_TABLE_ID ||
  process.env.VITE_AIRTABLE_ONLINE_TRAINING_TABLE_ID ||
  process.env.VITE_AIRTABLE_TABLE_ID ||
  process.env.AIRTABLE_TABLE_ID ||
  'tblZ8F1YVuk7p6vL2';
const AIRTABLE_TOKEN =
  process.env.ONLINE_AIRTABLE_TOKEN ||
  process.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN ||
  process.env.VITE_AIRTABLE_TOKEN ||
  process.env.AIRTABLE_TOKEN;

const sanitize = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '').substring(0, 5000);
};

export const handler = async (event) => {
  const origin = event.headers.origin || '';
  const allowedOrigins = [
    'https://sportlightathletes.com',
    'https://www.sportlightathletes.com',
    /^https:\/\/.*\.netlify\.app$/,
  ];

  const isAllowedOrigin = allowedOrigins.some((allowed) => {
    if (typeof allowed === 'string') return origin === allowed;
    return allowed.test(origin);
  });

  const headers = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'https://sportlightathletes.com',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          message: 'Online training form is temporarily unavailable. Please contact us directly.',
        }),
      };
    }

    const payload = JSON.parse(event.body || '{}');
    const { fullName, email, phoneNumber, mainSport, goals } = payload;

    if (!fullName || !email || !phoneNumber || !mainSport || !goals) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing required fields.' }),
      };
    }

    const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE_ID);

    await base(AIRTABLE_TABLE_ID).create([
      {
        fields: {
          'Full Name': sanitize(fullName),
          Email: sanitize(email).toLowerCase(),
          'Phone Number': sanitize(phoneNumber),
          'Main Sport': sanitize(mainSport),
          Goals: sanitize(goals),
        },
      },
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: error?.message || 'Unable to submit form right now.',
      }),
    };
  }
};
