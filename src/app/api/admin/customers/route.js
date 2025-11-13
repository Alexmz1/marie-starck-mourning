import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        orders: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
            total: true,
            createdAt: true,
          }
        },
        _count: {
          select: {
            orders: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculer le total des commandes par client
    const customersWithStats = customers.map(customer => ({
      ...customer,
      totalSpent: customer.orders.reduce((sum, order) => sum + order.total, 0),
      lastOrderDate: customer.orders.length > 0 ? customer.orders[0]?.createdAt : null
    }));

    return NextResponse.json(customersWithStats);
  } catch (error) {
    console.error('Erreur lors de la récupération des clients:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des clients' },
      { status: 500 }
    );
  }
}