# Contact Form Setup Guide

## Issue: 404 Error on Form Submission

If you're getting a "Request failed with status 404" error when submitting the contact form, this means the Netlify function cannot find your Airtable table.

## What We Fixed

1. **Added Console Logging**: The frontend now logs the exact URL being called and the form data
2. **Fixed Table Name**: Changed from using `AIRTABLE_TABLE_ID` to `AIRTABLE_TABLE_NAME` to match the .env configuration
3. **Better Error Messages**: The error messages now show which Base ID and Table Name are being used

## Environment Variables Required

The following environment variables must be set in **Netlify** (not just in your local .env file):

1. `VITE_AIRTABLE_TOKEN` - Your Airtable API token (starts with `pattEBWdOzVdqgPZT.`)
2. `VITE_AIRTABLE_BASE_ID` - Your Airtable Base ID (e.g., `appWD0RmenfZUo0bp`)
3. `VITE_AIRTABLE_TABLE_NAME` - Your Airtable Table Name (e.g., `Contact Submissions`)

## How to Set Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site configuration** → **Environment variables**
4. Click **Add a variable**
5. Add each of the three variables above with their values from your `.env` file

## Verifying Your Airtable Configuration

To make sure your Airtable is set up correctly:

1. **Base ID**: Open your Airtable base in a browser. The URL will look like:
   ```
   https://airtable.com/appWD0RmenfZUo0bp/...
   ```
   The `appWD0RmenfZUo0bp` part is your Base ID.

2. **Table Name**: Make sure your table is named exactly `Contact Submissions` (case-sensitive!)

3. **Field Names**: Your Airtable table must have these exact field names:
   - `Full Name` (Single line text)
   - `Email` (Email)
   - `Phone Number` (Phone number)
   - `Primary Sport` (Single line text)
   - `Experience Level` (Single line text)
   - `Desired Goals` (Long text)
   - `Interested Service` (Single line text)
   - `Preferred Training Time` (Single line text)
   - `Additional Message` (Long text)

## Debugging in Production

Once deployed, you can check the Netlify function logs to see detailed error messages:

1. Go to Netlify dashboard
2. Select your site
3. Go to **Functions**
4. Click on `submit-form`
5. View the logs to see what's happening

The logs will now show:
- The Base ID being used
- The Table Name being used
- Whether the token is present
- Detailed error messages

## Common Issues

### 404 Error
- **Cause**: Table name doesn't match exactly (case-sensitive)
- **Solution**: Verify the table name in Airtable matches `VITE_AIRTABLE_TABLE_NAME`

### 401 Error
- **Cause**: Invalid or expired API token
- **Solution**: Generate a new token in Airtable and update the environment variable

### Field Error
- **Cause**: Field names in Airtable don't match the code
- **Solution**: Ensure all field names listed above exist in your Airtable table
