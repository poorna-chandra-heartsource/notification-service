import { registerAs } from '@nestjs/config';

export default registerAs('mailConfig', () => ({
    smtpHost: process.env.SMTP_HOST,
    smtpPort: parseInt(process.env.SMTP_PORT, 10),
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    fromEmail: process.env.FROM_EMAIL || 'no-reply@yourdomain.com',
  }));
  