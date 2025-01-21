import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    try {
        const {amount} = await request.json();
        const paymentItent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "eur",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return NextResponse.json({clientSecret: paymentItent.client_secret});
        
    } catch (error) {
        console.log("internal error",error);
        return NextResponse.json({error: `internal Server Error: ${error}`}, {status: 500});
    }
}