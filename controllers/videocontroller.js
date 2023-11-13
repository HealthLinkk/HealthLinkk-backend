

import OpenTok from 'opentok';

const apiKey = '898zrsummsy2'; // Replace with your Vonage API key
const apiSecret = '5bpfm2yy68qyqdg5nz9b68z9se5zvumf54mn2qyymjhs5xyj73scnxveqcng8n36'; // Replace with your Vonage API secret

const opentok = new OpenTok(apiKey, apiSecret);

export async function generateToken(sessionId, role = 'publisher') {
  try {
    const token = opentok.generateToken(sessionId, { role });
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
}

export async function createSession() {
  try {
    const session = await opentok.createSession();
    return { sessionId: session.sessionId };
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Session creation failed');
  }
}
