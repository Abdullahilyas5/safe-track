import Stripe from "stripe";
import { NextResponse } from "next/server";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

// Use the Stripe lib with an explicit API version.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = body?.amount;

    // Basic validation: ensure amount is a positive integer (cents).
    if (typeof amount !== "number" || !Number.isInteger(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    // Log for server-side debugging
    console.error("create-payment error:", err);
    const message = err?.message ?? "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
