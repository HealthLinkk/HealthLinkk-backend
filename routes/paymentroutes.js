import express from 'express';
import { createPaymentIntent } from '../controllers/paymentcontroller.js';

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await createPaymentIntent(amount);
    res.json(paymentIntent);
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
