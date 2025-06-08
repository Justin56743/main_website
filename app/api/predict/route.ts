import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    if (!body || !Array.isArray(body.features)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Send request to Flask API
    const flaskResponse = await fetch('https://backend-klbu.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ features: body.features }),
    });

    if (!flaskResponse.ok) {
      throw new Error('Failed to fetch prediction');
    }

    // Parse Flask response
    const data = await flaskResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}