# EmailJS Setup Guide

This guide will help you set up EmailJS to make your contact form functional.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID** (you'll need this later)

### For Gmail:
- You'll need to enable 2-factor authentication
- Generate an App Password for EmailJS
- Use your Gmail address and the App Password

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message from {{name}}

From: {{name}}
Email: {{email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (also called User ID)

## Step 5: Update Configuration

1. Open `src/config/emailjs.js`
2. Replace the placeholder values with your actual credentials:

```javascript
export const emailjsConfig = {
  serviceId: 'your_actual_service_id',
  templateId: 'your_actual_template_id', 
  publicKey: 'your_actual_public_key'
};
```

## Step 6: Test Your Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email to see if you received the message

## Template Variables

Make sure your EmailJS template includes these variables:
- `{{name}}` - User's name
- `{{email}}` - User's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content

## Troubleshooting

### Common Issues:

1. **"User ID is required"**: Make sure you've set the correct Public Key
2. **"Service is not found"**: Check your Service ID
3. **"Template is not found"**: Verify your Template ID
4. **Emails not sending**: Check your email service configuration

### Free Plan Limits:
- 200 emails per month
- EmailJS branding in emails
- Basic support

## Security Note

The configuration values in `emailjs.js` will be visible in your frontend code. This is normal for EmailJS as it's designed for client-side use. Your email credentials remain secure on EmailJS servers.

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: Available through their dashboard