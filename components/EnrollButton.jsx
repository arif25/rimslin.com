"use client";

import React, { useState } from "react";

export default function EnrollButton({
    coursePrice,
    courseName,
    className = "",
    children,
}) {
    const [loading, setLoading] = useState(false);

    // ডায়নামিকভাবে স্ক্রিপ্ট লোড করার হেল্পার
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (typeof window !== "undefined" && window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);

        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            alert("Razorpay SDK লোড করা সম্ভব হয়নি। ইন্টারনেট কানেকশন চেক করুন।");
            setLoading(false);
            return;
        }

        try {
            // ১. অর্ডার তৈরি
            const res = await fetch("/api/razorpay/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: coursePrice }),
            });

            const data = await res.json();
            if (!data.success) {
                alert("অর্ডার তৈরি করা যায়নি।");
                setLoading(false);
                return;
            }

            // ২. পেমেন্ট পপ-আপ খোলা
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "Rimslin",
                description: `${courseName}-এ এনরোলমেন্ট`,
                order_id: data.order.id,
                handler: async function (response) {
                    const verifyRes = await fetch("/api/razorpay/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert("পেমেন্ট সফল হয়েছে! কোর্সে স্বাগতম।");
                        window.location.href = "/dashboard";
                    } else {
                        alert("পেমেন্ট যাচাই করা যায়নি।");
                    }
                },
                theme: {
                    color: "#2563eb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            console.error(err);
            alert("পেমেন্ট সম্পন্ন করা যায়নি।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className={
                className ||
                "w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
            }
        >
            {loading ? "প্রসেসিং হচ্ছে..." : children || `এনরোল করুন • ₹${coursePrice}`}
        </button>
    );
}
