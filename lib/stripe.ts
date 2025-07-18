import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
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
    },
  },
};