'use client';
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = {}

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/payment-result`,
      },
    });

    if (error) {
      setMessage(error.message ?? "Payment failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="text-white p-2 cursor-pointer my-10 w-full px-10 justify-center flex border rounded-sm bg-black disabled:opacity-50"
      >
        {loading ? "Processing..." : "Upgrade the Plan"}
      </button>
      {message && <div className="text-red-500 mt-2">{message}</div>}
    </form>
  );
}

const Page = (props: Props) => {
  const amount = 5000; // amount in cents ($50.00)
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch('/api/payments/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        });
        const data = await response.json();
        if (data?.clientSecret && !cancelled) {
          setClientSecret(data.clientSecret);
        } else if (!cancelled) {
          setError(data?.error || "Failed to create payment intent");
        }
      } catch (err: any) {
        if (!cancelled) setError(err?.message || "Network error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [amount]);

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!clientSecret) return <div className="p-4">Preparing payment...</div>;

  const options = { clientSecret };

  return (
    <div className="p-4">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    </div>
  )
};

export default Page;
