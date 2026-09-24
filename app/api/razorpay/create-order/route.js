import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
    try {
        const { amount, currency = "INR" } = await req.json();

        // Razorpay টাকার হিসেব পয়সায় নেয় (১ টাকা = ১০০ পয়সা)
        const options = {
            amount: Math.round(Number(amount) * 100),
            currency: currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error("Razorpay Order Creation Error:", error);
        return NextResponse.json(
            { success: false, message: "অর্ডার তৈরি করা যায়নি" },
            { status: 500 }
        );
    }
}