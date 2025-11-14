import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          }
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
              }
            }
          }
        },
        _count: {
          select: {
            items: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Enrichir les données pour les commandes sans customer lié
    const enrichedOrders = orders.map(order => {
      // Créer un objet customerInfo sécurisé
      const customerInfo = order.customer ? {
        firstName: order.customer.firstName || '',
        lastName: order.customer.lastName || '',
        email: order.customer.email || '',
        phone: order.customer.phone || ''
      } : {
        firstName: order.customerFirstName || 'N/A',
        lastName: order.customerLastName || 'N/A',
        email: order.customerEmail || 'N/A',
        phone: order.customerPhone || 'N/A'
      };

      // Debug: log pour voir la structure des données
      console.log(`Commande ${order.orderNumber}:`, {
        hasCustomer: !!order.customer,
        customerFirstName: order.customerFirstName,
        customerLastName: order.customerLastName,
        customerEmail: order.customerEmail
      });

      return {
        ...order,
        customerInfo
      };
    });

    return NextResponse.json(enrichedOrders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    );
  }
}