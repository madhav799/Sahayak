import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils"; // adjust if using different import path
import Payment from "@/models/Payment.model";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
  await connectDB();
  
  let body = await req.formData();
  body = Object.fromEntries(body);

  // Find payment by order ID
  const p = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ success: false, message: "OrderId not found" });
  }

  // Fetch user for Razorpay secret
  const user = await User.findOne({ username: p.to_user });
  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" });
  }
  const secret = user.razorpaySecret;

  // Verify payment
  const paymentVerified = validatePaymentVerification(
    { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
    body.razorpay_signature,
    secret
  );

  if (paymentVerified) {
    // Update payment in DB
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { new: true }
    );

    // Construct redirect URL to username page with paymentdone=true
    const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`;

    console.log("Redirecting to:", redirectUrl);

    return NextResponse.redirect(redirectUrl, { status: 303 });
  } else {
    return NextResponse.json({ success: false, message: "Payment verification failed" });
  }
};
