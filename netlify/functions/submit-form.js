import Airtable from 'airtable';

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appTynyFPGeJNMu3l';
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || 'tblZ8F1YVuk7p6vL2';
const AIRTABLE_TOKEN =
  process.env.AIRTABLE_TOKEN ||
  process.env.VITE_AIRTABLE_TOKEN ||
  process.env.REACT_APP_AIRTABLE_TOKEN;

console.log('Airtable Config:', {
  baseId: AIRTABLE_BASE_ID,
  tableId: AIRTABLE_TABLE_ID,
  hasToken: !!AIRTABLE_TOKEN
});

const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS_PER_WINDOW = 10;

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
        'Airtable token env var is not set. Expected one of: AIRTABLE_TOKEN, VITE_AIRTABLE_TOKEN, REACT_APP_AIRTABLE_TOKEN'
      );
    }

    const formData = JSON.parse(event.body);

    if (!formData.name || !formData.email || !formData.sport || !formData.goals) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    if (formData.name.length > 100 || formData.email.length > 255 ||
        formData.phone.length > 20 || formData.goals.length > 1000 ||
        formData.message.length > 2000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Input exceeds maximum length' })
      };
    }

    const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE_ID);

    console.log('Creating record in table:', AIRTABLE_TABLE_ID);

    const record = await base(AIRTABLE_TABLE_ID).create([
      {
        fields: {
          'Full Name': sanitizeInput(formData.name),
          'Email': sanitizeInput(formData.email),
          'Phone Number': sanitizeInput(formData.phone || ''),
          'Primary Sport': sanitizeInput(formData.sport),
          'Experience Level': sanitizeInput(formData.experience || ''),
          'Desired Goals': sanitizeInput(formData.goals),
          'Interested Service': sanitizeInput(formData.program || ''),
          'Preferred Training Time': sanitizeInput(formData.preferred_time || ''),
          'Additional Message': sanitizeInput(formData.message || '')
        }
      }
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        recordId: record[0].id
      })
    };
  } catch (error) {
    console.error('Airtable submission error:', {
      message: error.message,
      statusCode: error.statusCode,
      error: error.error,
      stack: error.stack
    });

    if (error.statusCode === 401) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'INVALID_TOKEN',
          message: 'Airtable token is invalid or expired'
        })
      };
    }

    if (error.statusCode === 404 || error.message.includes('NOT_FOUND') || error.message.includes('Could not find table')) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'TABLE_NOT_FOUND',
          message: `Airtable table "${AIRTABLE_TABLE_ID}" not found in base "${AIRTABLE_BASE_ID}". Please verify the table ID is correct.`
        })
      };
    }

    if (error.message.includes('INVALID_REQUEST') || error.message.includes('UNKNOWN_FIELD_NAME')) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'FIELD_ERROR',
          message: 'Field names do not match Airtable table structure. Error: ' + error.message
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'UNKNOWN_ERROR',
        message: error.message,
        details: `Base: ${AIRTABLE_BASE_ID}, Table: ${AIRTABLE_TABLE_ID}`
      })
    };
  }
};