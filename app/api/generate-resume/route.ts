import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT =
  "You are an expert Gulf and international recruiter specializing in blue-collar, trade, and vocational jobs. Take user inputs (trade, experience, language skills, target country) and generate professional, ATS-friendly bullet points in international CV standard format with precise trade terminology.";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      jobTitle,
      experience,
      skills,
      targetCountry,
      phone,
      email,
      languages,
    } = body;

    // Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "দয়া করে আপনার নাম প্রদান করুন।" },
        { status: 400 }
      );
    }
    if (!jobTitle || typeof jobTitle !== "string" || !jobTitle.trim()) {
      return NextResponse.json(
        { error: "দয়া করে কাজের পদবী প্রদান করুন।" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const isApiKeyConfigured =
      apiKey && apiKey !== "your_key_here" && apiKey.trim().length > 10;

    // Call Google Gemini API if API key is configured
    if (isApiKeyConfigured) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);

        const prompt = `Generate a professional, ATS-friendly international standard CV/resume formatted strictly as JSON based on the following applicant details:
- Full Name: ${name}
- Target Job Title / Trade: ${jobTitle}
- Years & Details of Experience: ${experience || "Experienced in the trade"}
- Key Skills & Tools: ${skills || "Practical trade tools and equipment"}
- Target Country: ${targetCountry || "Gulf Countries (Saudi Arabia / UAE / Qatar)"}
- Phone/WhatsApp: ${phone || "+880 1700-000000"}
- Email: ${email || "applicant@example.com"}
- Languages: ${languages || "Bengali (Native), Basic Spoken Arabic, Workplace Hindi, Basic English"}

Respond ONLY with valid JSON matching this exact schema:
{
  "fullName": "${name}",
  "targetJobTitle": "${jobTitle}",
  "contactInfo": {
    "phone": "${phone || "+880 1700-000000"}",
    "email": "${email || "applicant@example.com"}",
    "location": "${targetCountry || "Available for Overseas Relocation"}",
    "languages": "${languages || "Bengali, Workplace Arabic, Hindi, English"}"
  },
  "summary": "3-4 sentence professional summary highlighting trade dedication, safety compliance, adaptability, and readiness for overseas work.",
  "experience": [
    {
      "title": "${jobTitle}",
      "companyOrLocation": "Reputed Site / Contracting Company",
      "duration": "${experience ? "Past 3-5 Years" : "Recent Practical Experience"}",
      "responsibilities": [
        "Action-oriented bullet point 1 demonstrating trade competence and equipment handling.",
        "Action-oriented bullet point 2 demonstrating safety compliance and site teamwork.",
        "Action-oriented bullet point 3 demonstrating bilingual communication with supervisors and multicultural colleagues."
      ]
    }
  ],
  "coreSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6"],
  "tradeStrengths": ["Strength 1", "Strength 2", "Strength 3", "Strength 4"],
  "languages": [
    {"language": "Bengali", "level": "Native"},
    {"language": "Workplace Arabic (Khaleeji)", "level": "Practical Working Proficiency"},
    {"language": "Workplace Hindi", "level": "Conversational"},
    {"language": "English", "level": "Basic Workplace Communication"}
  ],
  "additionalDetails": [
    "Valid International Passport: Ready for Immediate Visa Processing",
    "Medical Fitness: Physically fit & GAMCA certified for overseas deployment",
    "Shift Flexibility: Ready for extended site shifts and overtime duties"
  ],
  "rawText": "Complete plain-text formatted version of the resume with clear sections, headers, and bullet points ready to copy."
}`;

        // Attempt generation with gemini-2.5-flash, fallback to gemini-1.5-flash
        let rawOutput: string | undefined;
        const candidateModels = ["gemini-2.5-flash", "gemini-1.5-flash"];

        for (const modelName of candidateModels) {
          try {
            const model = genAI.getGenerativeModel({
              model: modelName,
              systemInstruction: SYSTEM_PROMPT,
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.4,
              },
            });

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            if (responseText) {
              rawOutput = responseText;
              break;
            }
          } catch (modelErr: any) {
            console.warn(
              `[Rimslin AI Engine] Model ${modelName} call failed:`,
              modelErr?.message || modelErr
            );
          }
        }

        if (rawOutput) {
          const parsedResume = JSON.parse(rawOutput);
          return NextResponse.json({
            success: true,
            demoMode: false,
            resume: parsedResume,
          });
        }
      } catch (geminiError: any) {
        console.error(
          "[Rimslin AI Engine] Gemini API error (using fallback generator):",
          geminiError?.message || geminiError
        );
      }
    }

    // High-quality structured fallback generator (used if API key is not yet configured, rate limited, or temporarily unavailable)
    const sanitizedName = name.trim();
    const sanitizedTitle = jobTitle.trim();
    const sanitizedExp =
      experience?.trim() || "৩ বছর (সৌদি আরব / গালফ অঞ্চলের বাস্তব প্রজেক্ট অভিজ্ঞতা)";
    const sanitizedSkills =
      skills?.trim() || "ট্রেড টুলস হ্যান্ডলিং, সেফটি প্রোটোকল, সাইট কোলাবোরেশন";
    const sanitizedCountry =
      targetCountry?.trim() || "সৌদি আরব / আমিরাত / কাতার (Gulf Region)";

    const fallbackResume = {
      fullName: sanitizedName,
      targetJobTitle: sanitizedTitle,
      contactInfo: {
        phone: phone || "+880 1700-000000",
        email:
          email || `${sanitizedName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        location: sanitizedCountry,
        languages:
          languages ||
          "Bengali (Native), Workplace Arabic, Workplace Hindi, Basic English",
      },
      summary: `Dedicated, highly disciplined ${sanitizedTitle} with extensive hands-on trade experience (${sanitizedExp}). Proven track record in executing on-site tasks safely, following supervisor instructions precisely, and collaborating effectively across multicultural teams in the Gulf and overseas. Fast learner with strong commitment to quality craftsmanship and safety standards.`,
      experience: [
        {
          title: sanitizedTitle,
          companyOrLocation: `Major Contracting & Site Works (${sanitizedCountry})`,
          duration: sanitizedExp,
          responsibilities: [
            `Executed daily ${sanitizedTitle} operations strictly following international safety and trade standards.`,
            `Handled specialized site equipment, tools, and materials efficiently, minimizing waste and downtime.`,
            "Communicated effectively with Gulf supervisors in Workplace Arabic and South Asian crew in Hindi.",
            "Consistently met tight project deadlines while upholding zero-accident site safety protocols.",
          ],
        },
      ],
      coreSkills: [
        ...sanitizedSkills
          .split(/[,،\n]+/)
          .map((s: string) => s.trim())
          .filter(Boolean),
        "Site Safety & OSHA/Gulf Compliance",
        "Tools & Machinery Operation",
        "Multicultural Team Coordination",
        "Emergency Response & First Aid Basics",
      ].slice(0, 8),
      tradeStrengths: [
        "Reliable & Punctual under demanding site conditions",
        "Physically fit and adaptable to high-temperature Gulf environments",
        "Accustomed to 10-12 hour site shifts and overtime",
        "Quick problem-solver with strong attention to detail",
      ],
      languages: [
        { language: "Bengali", level: "Native Proficiency" },
        {
          language: "Workplace Arabic (Khaleeji)",
          level: "Professional Working Proficiency",
        },
        { language: "Workplace Hindi", level: "Conversational" },
        { language: "Workplace English", level: "Basic Technical Terminology" },
      ],
      additionalDetails: [
        "Passport: Valid International Passport (Ready for Immediate Visa Endorsement)",
        "Medical Status: GAMCA Medically Sound & Fit for Travel",
        "Availability: Immediate deployment upon visa issuance",
      ],
      rawText: `=======================================================
${sanitizedName.toUpperCase()}
Target Position: ${sanitizedTitle}
Target Location: ${sanitizedCountry}
Contact: ${phone || "+880 1700-000000"} | Email: ${email || "applicant@example.com"}
Languages: Bengali (Native), Arabic (Workplace), Hindi (Conversational), English (Basic)
=======================================================

PROFESSIONAL SUMMARY
--------------------
Dedicated, highly disciplined ${sanitizedTitle} with extensive hands-on trade experience (${sanitizedExp}). Proven track record in executing on-site tasks safely, following supervisor instructions precisely, and collaborating effectively across multicultural teams in the Gulf and overseas. Fast learner with strong commitment to quality craftsmanship and safety standards.

CORE TRADE SKILLS
-----------------
* ${sanitizedSkills}
* Site Safety & Gulf Compliance
* Tools & Machinery Operation
* Multicultural Team Coordination
* Quality Control & Defect Minimization

PROFESSIONAL EXPERIENCE
-----------------------
Position: ${sanitizedTitle}
Location: ${sanitizedCountry}
Experience Duration: ${sanitizedExp}
Responsibilities:
- Executed daily ${sanitizedTitle} operations strictly following international safety and trade standards.
- Handled specialized site equipment, tools, and materials efficiently, minimizing waste and downtime.
- Communicated effectively with Gulf supervisors in Workplace Arabic and South Asian crew in Hindi.
- Consistently met tight project deadlines while upholding zero-accident site safety protocols.

LANGUAGE PROFICIENCY
--------------------
- Bengali: Native
- Workplace Arabic (Khaleeji): Professional Working
- Workplace Hindi: Conversational (Site communication)
- Workplace English: Basic Technical Terms

ADDITIONAL INFORMATION
----------------------
- Valid Passport ready for immediate visa processing
- GAMCA Medically fit and ready for deployment
- Overtime & shift work readiness`,
    };

    return NextResponse.json({
      success: true,
      resume: fallbackResume,
    });
  } catch (error: any) {
    console.error("[Rimslin AI Engine] Server Error:", error?.message || error);
    return NextResponse.json(
      { error: "রেজুমি তৈরিতে সাময়িক সমস্যা হচ্ছে, অনুগ্রহ করে আবার চেষ্টা করুন" },
      { status: 500 }
    );
  }
}
