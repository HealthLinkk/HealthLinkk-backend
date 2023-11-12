import stripe from 'stripe';

const stripeSecretKey = 'sk_test_51OB2EWJDSWG1W5ZQ5EwSAfgbvqgVqiDybHG1gI7QGH0ClsPUYAMx5uWipjbeYK4d04it7Khlt6qMIb4Epfcd8QvM00xXcRQjxR'; // Replace with your actual Stripe secret key
const stripeClient = stripe(stripeSecretKey);

export async function createPaymentIntent(amount) {
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: 'usd', // or your preferred currency
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Payment initialization failed');
  }
}
