import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // এখানে Firebase Firestore-এ ইউজারের কোর্স এনরোলমেন্ট ডাটা সেভ/আপডেট করতে পারেন
            return NextResponse.json({ success: true, message: "Payment verified successfully" });
        } else {
            return NextResponse.json(
                { success: false, message: "পেমেন্ট ভেরিফিকেশন ব্যর্থ হয়েছে" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json(
            { success: false, message: "সার্ভারে সমস্যা হয়েছে" },
            { status: 500 }
        );
    }
}