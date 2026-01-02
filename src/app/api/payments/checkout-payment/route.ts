import Stripe from "stripe";

import { NextResponse } from "next/server";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { paymentMethodId, amount } = body;

        const paymentCheckout = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {price_data: {
                    currency: 'usd',
                    product_data: { name: 'Total Payment' },
                    unit_amount: amount,
                },quantity: 1,},
            ],
            mode: 'payment',
            success_url: 'https://localhost:3000/success',
            cancel_url: 'https://localhost:3000/cancel',
        })
        

    } catch (error) {
        console.error("checkout-payment error:", error);
    }
}