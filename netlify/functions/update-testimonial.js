import Airtable from 'airtable';

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appgNcM4lFde1mLon';
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

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
    if (!AIRTABLE_TOKEN) {
      throw new Error('AIRTABLE_TOKEN environment variable is not set');
    }

    const { id, action } = JSON.parse(event.body);

    if (!id || !action) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: id and action' })
      };
    }

    const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE_ID);

    if (action === 'approve') {
      await base('Testimonials').update(id, {
        'Approval Status': 'Approved',
        'Published Status': 'Published'
      });
    } else if (action === 'unapprove') {
      await base('Testimonials').update(id, {
        'Approval Status': 'Pending',
        'Published Status': 'Unpublished'
      });
    } else if (action === 'delete') {
      await base('Testimonials').destroy(id);
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid action. Use: approve, unapprove, or delete' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, action })
    };
  } catch (error) {
    console.error('Error updating testimonial:', error.message);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'UPDATE_ERROR',
        message: error.message || 'Failed to update testimonial'
      })
    };
  }
};
