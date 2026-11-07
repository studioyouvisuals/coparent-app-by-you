import { NextResponse } from "next/server";
import Stripe from "stripe";

// Starter is free: only paid plans go through Stripe Checkout.
const PRICES: Record<string, string | undefined> = {
  pro: process.env.STRIPE_PRICE_PRO,
  business: process.env.STRIPE_PRICE_BUSINESS,
};

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return NextResponse.json({ demo: true });

  const body = (await req.json().catch(() => ({}))) as { plan?: unknown };
  const price = typeof body.plan === "string" ? PRICES[body.plan] : undefined;
  if (!price) return NextResponse.json({ error: "unknown_plan" }, { status: 400 });

  const origin = new URL(req.url).origin;
  try {
    const session = await new Stripe(secret).checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/parametres?paiement=ok`,
      cancel_url: `${origin}/parametres`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout failed", err);
    return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
  }
}
