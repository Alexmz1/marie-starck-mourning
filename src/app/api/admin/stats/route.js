import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [productsCount, customersCount, ordersCount] = await Promise.all([
      prisma.product.count(),
      prisma.customer.count(),
      prisma.order.count()
    ]);

    return NextResponse.json({
      productsCount,
      customersCount,
      ordersCount
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
}