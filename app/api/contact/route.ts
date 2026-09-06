import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "অনুগ্রহ করে আপনার নামটি লিখুন।" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "অনুগ্রহ করে আপনার ইমেইল ঠিকানা দিন।" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "দয়া করে একটি সঠিক ইমেইল ঠিকানা দিন।" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "অনুগ্রহ করে আপনার বার্তার বিবরণ লিখুন।" },
        { status: 400 }
      );
    }

    const cleanedData = {
      name: name.trim(),
      email: email.trim(),
      subject: (subject || "সাধারণ জিজ্ঞাসা (General Inquiry)").trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      recipient: "support@rimslin.com",
    };

    console.log(
      `[CONTACT INQUIRY RECEIVED] From: ${cleanedData.name} <${cleanedData.email}> | Subject: ${cleanedData.subject}`
    );
    console.log(`[MESSAGE BODY]: ${cleanedData.message}`);

    // If Resend API key is configured via ENV, trigger dispatch using official SDK
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Rimslin Support <onboarding@resend.dev>",
          to: ["support@rimslin.com"],
          replyTo: cleanedData.email,
          subject: `[Rimslin Inquiry] ${cleanedData.subject} - ${cleanedData.name}`,
          text: `New contact inquiry received:\n\nName: ${cleanedData.name}\nEmail: ${cleanedData.email}\nSubject: ${cleanedData.subject}\nTime: ${cleanedData.timestamp}\n\nMessage:\n${cleanedData.message}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #059669; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Rimslin নতুন ইনকোয়ারি (Contact Inquiry)
              </h2>
              <p><strong>নাম:</strong> ${cleanedData.name}</p>
              <p><strong>ইমেইল:</strong> <a href="mailto:${cleanedData.email}">${cleanedData.email}</a></p>
              <p><strong>বিষয়:</strong> ${cleanedData.subject}</p>
              <p><strong>সময়:</strong> ${new Date(cleanedData.timestamp).toLocaleString()}</p>
              <div style="margin-top: 16px; padding: 14px; background: #f8fafc; border-left: 4px solid #059669; border-radius: 4px;">
                <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${cleanedData.message}</p>
              </div>
              <p style="font-size: 12px; color: #64748b; margin-top: 24px;">
                এই বার্তাটি Rimslin.com এর অনলাইন চ্যাটবক্স / কন্টাক্ট ফর্ম থেকে স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে।
              </p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.warn("[MAIL DISPATCH WARNING]", mailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।",
        data: {
          name: cleanedData.name,
          email: cleanedData.email,
          subject: cleanedData.subject,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
