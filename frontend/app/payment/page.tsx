"use client";

import Checkout from "@/app/payment/components/CheckOutPage";
import convertToSubcurrency, { formatCurrency } from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; // Import the formatting function
import { useSearchParams } from "next/navigation"; // Import useSearchParams to read query parameters

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const totalAmount = parseFloat(searchParams.get("total") || "0"); // Get the total amount from the query parameter
  const amountInCents = convertToSubcurrency(totalAmount); // Convert the total amount to cents

  return (
    <main className="max-w-6xl mx-auto p-10 text-center rounded-md m-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Ben</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> {formatCurrency(totalAmount)}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: amountInCents, // Pass the total amount in cents to Stripe
          currency: "eur",
        }}
      >
        {/* Pass the total amount (in euros) to the Checkout component */}
        <Checkout amount={totalAmount} />
      </Elements>
    </main>
  );
}