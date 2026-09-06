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

    // If an external email provider (Resend, SendGrid, etc.) is configured via ENV, trigger dispatch
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Rimslin Support <notifications@rimslin.com>",
            to: ["support@rimslin.com"],
            reply_to: cleanedData.email,
            subject: `[Rimslin Inquiry] ${cleanedData.subject} - ${cleanedData.name}`,
            text: `New contact inquiry received:\n\nName: ${cleanedData.name}\nEmail: ${cleanedData.email}\nSubject: ${cleanedData.subject}\nTime: ${cleanedData.timestamp}\n\nMessage:\n${cleanedData.message}`,
          }),
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
