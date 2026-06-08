import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { purpose, name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, and message are required.' });
  }

  // Configure SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Prevents certificate self-signing validation failures
    },
  });

  try {
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: 'binudp.dev@gmail.com',
      subject: `New Contact Request: ${purpose || 'General Inquiry'}`,
      text: `New Contact Request from Binud Software Solutions website:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nPurpose: ${purpose || 'General'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
          <h2 style="color: #695dd3; margin-top: 0; font-size: 20px;">New Contact Request</h2>
          <p>You have received a new contact request from your website form:</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 120px; color: #4a5568;">Name:</td>
                <td style="padding: 6px 0; color: #2d3748;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Email:</td>
                <td style="padding: 6px 0; color: #2d3748;"><a href="mailto:${email}" style="color: #695dd3; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Phone:</td>
                <td style="padding: 6px 0; color: #2d3748;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Purpose:</td>
                <td style="padding: 6px 0; color: #2d3748;">${purpose || 'General'}</td>
              </tr>
            </tbody>
          </table>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-weight: bold; margin-bottom: 8px; color: #4a5568;">Message:</p>
          <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 16px; white-space: pre-wrap; color: #2d3748;">${message}</div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully via SMTP' });
  } catch (error) {
    console.error('SMTP sending error:', error);
    return res.status(500).json({ error: 'Failed to send email via SMTP', details: error.message });
  }
}
