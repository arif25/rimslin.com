import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Only instantiate Resend if API key is present to prevent module evaluation crashes
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // If Resend API key is not configured, safely log in development and return success
    if (!resend) {
      console.log('[RESEND INQUIRY (Configure RESEND_API_KEY in .env.local for live dispatch)]:', {
        name,
        email,
        subject: subject || 'নতুন জিজ্ঞাসা',
        message,
        recipient: process.env.SUPPORT_EMAIL || 'support@rimslin.com',
      });
      return NextResponse.json(
        {
          success: true,
          data: { id: 'simulated-dev-id' },
          message: 'Inquiry logged. Configure RESEND_API_KEY in .env.local for live email delivery.',
        },
        { status: 200 }
      );
    }

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Rimslin Support <notifications@rimslin.com>',
      to: [process.env.SUPPORT_EMAIL || 'support@rimslin.com'],
      replyTo: email,
      subject: `[Rimslin Support] ${subject || 'নতুন জিজ্ঞাসা'} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">
          <div style="background-color: #047857; color: #ffffff; padding: 20px 24px;">
            <h2 style="margin: 0; font-size: 18px; font-weight: 700;">নতুন বার্তা এসেছে (Rimslin Help Chat)</h2>
          </div>
          <div style="padding: 24px; color: #1e293b;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 100px; color: #64748b;">নাম:</td>
                <td style="padding: 6px 0; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #64748b;">ইমেইল:</td>
                <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #047857; text-decoration: underline;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #64748b;">বিষয়:</td>
                <td style="padding: 6px 0;">${subject || 'General Inquiry'}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p style="margin: 0 0 8px; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase;">গ্রাহকের বিস্তারিত বার্তা:</p>
            <div style="white-space: pre-line; background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 14px; line-height: 1.6; color: #0f172a;">
              ${message}
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Resend dispatch error:', error);
    return NextResponse.json({ error: 'Failed to send inquiry' }, { status: 500 });
  }
}
