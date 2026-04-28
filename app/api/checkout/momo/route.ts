import { NextRequest, NextResponse } from 'next/server';

interface MoMoPayload {
  phone: string;
  pin: string;
  amount: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: MoMoPayload = await request.json();

    if (!body.phone || !/^07\d{8}$/.test(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number. Use format: 07XXXXXXXX' },
        { status: 400 }
      );
    }

    if (!body.pin || !/^\d{4}$/.test(body.pin)) {
      return NextResponse.json(
        { error: 'PIN must be exactly 4 digits' },
        { status: 400 }
      );
    }

    if (body.pin === '0000') {
      return NextResponse.json(
        { error: 'Transaction declined. Please try a different PIN.' },
        { status: 422 }
      );
    }

    if (typeof body.amount !== 'number' || body.amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    const transactionId = Array.from({ length: 8 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    return NextResponse.json({
      success: true,
      transactionId,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}