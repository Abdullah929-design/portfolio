const express = require('express');
const { Resend } = require('resend');
const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = 'abdullahsallehaqeel123@gmail.com';

// Submit contact form — sends email via Resend
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — email not sent.');
    return res.status(500).json({ message: 'Email service not configured.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: OWNER_EMAIL,
      reply_to: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a14;color:#e2e8f0;border-radius:12px;">
          <h2 style="color:#a78bfa;margin-top:0;">📬 New Portfolio Contact</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#94a3b8;width:80px;">Name</td>
              <td style="padding:8px 0;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#94a3b8;">Email</td>
              <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#06b6d4;">${email}</a></td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #1e1e2e;margin:16px 0;" />
          <p style="color:#94a3b8;margin:0 0 8px;">Message:</p>
          <p style="background:#1e1e2e;padding:16px;border-radius:8px;line-height:1.7;margin:0;">${message.replace(/\n/g, '<br/>')}</p>
          <p style="margin:24px 0 0;font-size:12px;color:#475569;">Sent via your portfolio contact form</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(400).json({ message: 'Failed to send message: ' + (error.message || 'Unknown error') });
    }

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;