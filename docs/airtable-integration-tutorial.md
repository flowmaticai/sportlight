# Airtable Forms Integration Tutorial

## Overview
This tutorial will guide you through connecting your website forms to Airtable for automatic data collection and management.

## Step 1: Set Up Your Airtable Base

### 1.1 Create a New Base
1. Go to [Airtable.com](https://airtable.com) and sign in
2. Click "Create a base" 
3. Choose "Start from scratch"
4. Name your base (e.g., "Sportlight Athletes Leads")

### 1.2 Create Your Table Structure
Create a table called "Contact Submissions" with these fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| Name | Single line text | Contact's full name |
| Email | Email | Contact's email address |
| Phone | Phone number | Contact's phone number |
| Sport | Single select | Primary sport (Running, Volleyball, etc.) |
| Experience | Single select | Experience level |
| Service | Single select | Interested service |
| Preferred Time | Single select | Preferred training time |
| Goals | Long text | Training goals |
| Message | Long text | Additional message |
| Submission Date | Date | Auto-populated submission date |
| Status | Single select | Lead status (New, Contacted, Converted) |

### 1.3 Configure Single Select Options

**Sport Options:**
- Long Distance Running
- Volleyball
- Youth Sports (General)
- Basketball
- Soccer
- Tennis
- Swimming
- Other

**Experience Options:**
- Beginner (0-1 years)
- Intermediate (2-5 years)
- Advanced (5+ years)
- Competitive/Elite

**Service Options:**
- 1-on-1 Personal Training
- 1-on-2 Training
- Group Training
- Runner's S&C
- School Team S&C
- Online Training Programs
- Performance Assessment
- Not Sure - Need Consultation

**Preferred Time Options:**
- Morning (6AM-10AM)
- Late Morning (10AM-12PM)
- Afternoon (12PM-4PM)
- Evening (4PM-8PM)
- Weekend Only
- Flexible

**Status Options:**
- New
- Contacted
- Qualified
- Converted
- Not Interested

## Step 2: Get Your Airtable API Credentials

### 2.1 Get Your Base ID
1. Go to [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)
2. Select your base
3. Copy the Base ID (starts with "app...")

### 2.2 Create a Personal Access Token
1. Go to [Airtable Developer Hub](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Name it (e.g., "Sportlight Website Forms")
4. Add these scopes:
   - `data.records:read`
   - `data.records:write`
5. Add access to your base
6. Click "Create token"
7. **Copy and save the token securely**

## Step 3: Implementation Options

### Option A: Direct Form Submission (Client-Side)

#### 3.1 Install Airtable JavaScript SDK
```bash
npm install airtable
```

#### 3.2 Create Airtable Service
```javascript
// src/services/airtable.js
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_TOKEN
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

export const submitContactForm = async (formData) => {
  try {
    const record = await base('Contact Submissions').create([
      {
        fields: {
          'Name': formData.name,
          'Email': formData.email,
          'Phone': formData.phone,
          'Sport': formData.sport,
          'Experience': formData.experience,
          'Service': formData.service,
          'Preferred Time': formData.preferredTime,
          'Goals': formData.goals,
          'Message': formData.message,
          'Submission Date': new Date().toISOString(),
          'Status': 'New'
        }
      }
    ]);
    return { success: true, record };
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return { success: false, error };
  }
};
```

#### 3.3 Environment Variables
Create `.env` file:
```
REACT_APP_AIRTABLE_TOKEN=your_personal_access_token_here
REACT_APP_AIRTABLE_BASE_ID=your_base_id_here
```

### Option B: Server-Side Submission (Recommended for Security)

#### 3.1 Create Serverless Function
```javascript
// netlify/functions/submit-form.js
const Airtable = require('airtable');

const base = new Airtable({
  apiKey: process.env.AIRTABLE_TOKEN
}).base(process.env.AIRTABLE_BASE_ID);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const formData = JSON.parse(event.body);
    
    const record = await base('Contact Submissions').create([
      {
        fields: {
          'Name': formData.name,
          'Email': formData.email,
          'Phone': formData.phone,
          'Sport': formData.sport,
          'Experience': formData.experience,
          'Service': formData.service,
          'Preferred Time': formData.preferredTime,
          'Goals': formData.goals,
          'Message': formData.message,
          'Submission Date': new Date().toISOString(),
          'Status': 'New'
        }
      }
    ]);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ success: true, record: record[0] })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

#### 3.2 Environment Variables for Netlify
In Netlify dashboard, add:
- `AIRTABLE_TOKEN`: Your personal access token
- `AIRTABLE_BASE_ID`: Your base ID

### Option C: Using Airtable Forms (Easiest)

#### 3.1 Create Airtable Form
1. In your Airtable base, click "Create" → "Form"
2. Add all the fields you want to collect
3. Customize the form design
4. Get the form URL

#### 3.2 Embed or Redirect
```javascript
// Redirect to Airtable form
const handleAirtableForm = () => {
  window.open('https://airtable.com/shrXXXXXXXXXXXXX', '_blank');
};
```

## Step 4: Update Your React Form

### 4.1 Update Contact Form Component
```javascript
// src/pages/Contact.tsx
import { submitContactForm } from '../services/airtable';

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setIsSubmitted(true);
      setFormData({
        name: '', email: '', phone: '', sport: '', 
        experience: '', goals: '', service: '', 
        preferredTime: '', message: ''
      });
    } else {
      setError('Failed to submit form. Please try again.');
    }
  } catch (error) {
    setError('An error occurred. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

## Step 5: Set Up Automations (Optional)

### 5.1 Email Notifications
1. In Airtable, go to "Automations"
2. Create trigger: "When record created"
3. Add action: "Send email"
4. Configure email template

### 5.2 Slack Notifications
1. Add Slack integration
2. Send notifications to your team channel
3. Include lead details and status

### 5.3 Follow-up Sequences
1. Create automation for status changes
2. Set up reminder emails
3. Track lead progression

## Step 6: Data Management

### 6.1 Create Views
- **New Leads**: Filter by Status = "New"
- **This Week**: Filter by Submission Date
- **By Sport**: Group by Sport field
- **High Priority**: Filter by Service type

### 6.2 Lead Scoring
Add a formula field for lead scoring:
```
IF(
  AND({Sport} = "Long Distance Running", {Experience} = "Advanced (5+ years)"),
  "High Priority",
  IF({Service} = "1-on-1 Personal Training", "Medium Priority", "Low Priority")
)
```

## Step 7: Analytics and Reporting

### 7.1 Create Dashboard
- Total submissions by month
- Conversion rates by source
- Popular services requested
- Response time tracking

### 7.2 Export Data
- Regular CSV exports for analysis
- Integration with Google Sheets
- Custom reporting dashboards

## Security Best Practices

1. **Never expose API keys in client-side code**
2. **Use environment variables for sensitive data**
3. **Implement rate limiting on forms**
4. **Validate all input data**
5. **Use HTTPS for all communications**
6. **Regularly rotate API tokens**

## Troubleshooting

### Common Issues:
1. **CORS errors**: Use serverless functions
2. **API rate limits**: Implement retry logic
3. **Field validation**: Match Airtable field types
4. **Token permissions**: Ensure proper scopes

### Testing:
1. Test form submissions in development
2. Verify data appears in Airtable
3. Test error handling scenarios
4. Validate email notifications

## Next Steps

1. Set up the Airtable base structure
2. Choose your implementation method
3. Configure environment variables
4. Test the integration thoroughly
5. Set up automations and notifications
6. Monitor and optimize performance

This integration will give you powerful lead management capabilities with automatic data collection, organization, and follow-up workflows.