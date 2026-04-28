import { NextRequest, NextResponse } from 'next/server';

interface OrderPayload {
  items: Array<{ product: { id: number; name: string; price: number }; quantity: number }>;
  deliveryDetails: {
    fullName: string;
    phone: string;
    address: string;
    notes?: string;
  };
  total: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderPayload = await request.json();

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Items must be a non-empty array' },
        { status: 400 }
      );
    }

    if (typeof body.total !== 'number' || body.total <= 0) {
      return NextResponse.json(
        { error: 'Total must be a positive number' },
        { status: 400 }
      );
    }

    if (!body.deliveryDetails) {
      return NextResponse.json(
        { error: 'Delivery details are required' },
        { status: 400 }
      );
    }

    const orderId = Math.random().toString(36).substring(2, 8).toUpperCase();

    return NextResponse.json({
      success: true,
      orderId,
      estimatedDelivery: '2-3 hours',
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}