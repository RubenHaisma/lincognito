import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export const getStripeJs = async () => {
  const stripeJs = await import('@stripe/stripe-js');
  return stripeJs.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    priceId: '',
    features: {
      clients: 2,
      posts: 10,
      analytics: false,
      support: 'email',
      agencies: 0,
      teamMembers: 1,
    },
  },
  STARTER: {
    name: 'Starter',
    price: 10,
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    features: {
      clients: 5,
      posts: 100,
      analytics: true,
      support: 'priority',
      agencies: 0,
      teamMembers: 1,
    },
  },
  PROFESSIONAL: {
    name: 'Professional',
    price: 30,
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
    features: {
      clients: 20,
      posts: -1, // unlimited
      analytics: true,
      support: 'phone',
      agencies: 0,
      teamMembers: 3,
    },
  },
  AGENCY: {
    name: 'Agency',
    price: 99,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID!,
    features: {
      clients: -1, // unlimited
      posts: -1, // unlimited
      analytics: true,
      support: 'dedicated',
      agencies: 5,
      teamMembers: 10,
    },
  },
};

export async function createCheckoutSession(
  priceId: string,
  customerId?: string,
  metadata?: Record<string, string>
) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer: customerId,
    success_url: `${process.env.NEXTAUTH_URL}/dashboard/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/billing?canceled=true`,
    metadata,
    allow_promotion_codes: true,
    billing_address_collection: 'required',
  });

  return session;
}

export async function createCustomerPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/dashboard/billing`,
  });

  return session;
}

export async function createCustomer(email: string, name: string) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      platform: 'lincognito',
    },
  });

  return customer;
}