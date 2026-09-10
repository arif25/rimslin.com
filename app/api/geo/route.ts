import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Extract geo location headers provided by hosting platforms (Vercel, Cloudflare, AWS CloudFront, etc.)
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    request.headers.get("cloudfront-viewer-country");

  return NextResponse.json({
    country: country ? country.toUpperCase() : null,
  });
}
