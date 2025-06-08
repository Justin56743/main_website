import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body
    if (!req.body || !Array.isArray(req.body.features)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Send request to Flask API
    const flaskResponse = await fetch('https://backend-klbu.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ features: req.body.features }),
    });

    if (!flaskResponse.ok) {
      throw new Error('Failed to fetch prediction');
    }

    // Parse Flask response
    const data = await flaskResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}