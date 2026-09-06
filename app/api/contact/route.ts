import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    console.log("--> Triggering real Resend email dispatch...");
    console.log("API Key exists:", !!process.env.RESEND_API_KEY);

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is missing in environment variables' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Rimslin Support <notifications@rimslin.com>',
      // from: 'Rimslin Support <onboarding@resend.dev>',
      to: [process.env.SUPPORT_EMAIL || 'support@rimslin.com'],
      replyTo: email,
      subject: `[Rimslin Support] ${subject || 'New Inquiry'} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
          <h2 style="color: #047857; margin-top: 0;">নতুন বার্তা এসেছে (Rimslin.com)</h2>
          <p><strong>নাম:</strong> ${name}</p>
          <p><strong>ইমেইল:</strong> ${email}</p>
          <p><strong>বিষয়:</strong> ${subject || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p><strong>বার্তা:</strong></p>
          <div style="background: #f8fafc; padding: 14px; border-radius: 6px; border: 1px solid #cbd5e1;">
            ${message}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Returned Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Resend Success Data:", data);
    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (err: any) {
    console.error("Server catch error:", err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
