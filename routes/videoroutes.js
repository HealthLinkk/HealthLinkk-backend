import express from 'express';
import { createSession, generateToken } from '../controllers/videocontroller.js';

const router = express.Router();

router.post('/create-session', async (req, res) => {
  try {
    const session = await createSession();
    res.json(session);
  } catch (error) {
    console.error('Error creating video session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/generate-token', async (req, res) => {
  const { sessionId, role } = req.body;

  try {
    const token = await generateToken(sessionId, role);
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
