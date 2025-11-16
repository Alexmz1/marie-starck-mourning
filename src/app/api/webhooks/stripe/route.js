import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.text();
  const sig = headers().get('stripe-signature');

  let event;

  try {
    // Vérifier la signature du webhook
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Traiter l'événement
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Traitement du checkout terminé
async function handleCheckoutCompleted(session) {
  console.log('Checkout completed:', session.id);
  
  try {
    // Récupérer les détails de la session avec les line items
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'customer', 'payment_intent']
    });

    // Sauvegarder la commande en base de données
    const savedOrder = await saveOrderToDatabase(fullSession);
    
    console.log('✅ Commande sauvegardée:', savedOrder.orderNumber);
    
    // TODO: Envoyer email de confirmation
    // await sendOrderConfirmationEmail(savedOrder);

  } catch (error) {
    console.error('Error handling checkout completion:', error);
    throw error;
  }
}

// Traitement du paiement réussi
async function handlePaymentSucceeded(paymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);
  
  // TODO: Mettre à jour le statut de la commande
  // await updateOrderStatus(paymentIntent.id, 'paid');
}

// Traitement du paiement échoué
async function handlePaymentFailed(paymentIntent) {
  console.log('Payment failed:', paymentIntent.id);
  
  // TODO: Mettre à jour le statut de la commande
  // await updateOrderStatus(paymentIntent.id, 'failed');
  
  // TODO: Envoyer email d'échec de paiement
  // await sendPaymentFailedEmail(paymentIntent);
}

// Fonction pour sauvegarder une commande complète en BDD
async function saveOrderToDatabase(session) {
  try {
    // Générer un numéro de commande unique
    const orderNumber = `MS-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    // Extraire les données du customer depuis les métadonnées
    const metadata = session.metadata || {};
    
    // Extraire les noms du customer_name
    const customerName = metadata.customer_name || '';
    const [firstName = '', ...lastNameParts] = customerName.split(' ');
    const lastName = lastNameParts.join(' ');
    
    // Extraction séparée de l'adresse si livraison
    let deliveryAddress = null, deliveryPostalCode = null, deliveryCity = null;
    if (metadata.delivery_type === 'delivery' && metadata.delivery_address) {
      // On suppose que l'adresse est sous la forme "rue, ville codePostal"
      // Ex: "12 Rue des Acacias, Brétigny 91220"
      const addressParts = metadata.delivery_address.split(',');
      deliveryAddress = addressParts[0]?.trim() || null;
      if (addressParts[1]) {
        const cityPostal = addressParts[1].trim().split(' ');
        deliveryPostalCode = cityPostal.pop();
        deliveryCity = cityPostal.join(' ');
      }
    }

    // Données de base de la commande
    const orderData = {
      orderNumber,
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent?.id || session.payment_intent,

      // Informations client
      customerEmail: session.customer_email,
      customerFirstName: firstName,
      customerLastName: lastName,
      customerPhone: metadata.customer_phone || '',

      // Type et détails de livraison
      deliveryType: metadata.delivery_type === 'pickup' ? 'PICKUP' : 'DELIVERY',
      deliveryDate: metadata.delivery_date ? new Date(metadata.delivery_date) : null,
      deliveryAddress,
      deliveryPostalCode,
      deliveryCity,
      deliveryInstructions: metadata.special_instructions || null,

      // Montants (Stripe envoie en centimes)
      subtotal: (metadata.cart_json ? JSON.parse(metadata.cart_json).filter(i => !i.isRibbon).reduce((sum, i) => sum + (i.totalPrice || 0), 0) : (session.amount_subtotal || 0) / 100),
      deliveryFee: metadata.delivery_fee ? parseFloat(metadata.delivery_fee) : (((session.amount_total - session.amount_subtotal) || 0) / 100),
      total: session.amount_total / 100,

      // Paiement
      paymentMethod: 'stripe',
      paymentStatus: 'paid',
      currency: session.currency || 'eur',

      // Statut
      status: 'CONFIRMED'
    };

    // Si on a le panier complet en JSON, on l'utilise pour créer les orderItems avec toutes les options personnalisées
    let orderItems = [];
    if (metadata.cart_json) {
      try {
        const cart = JSON.parse(metadata.cart_json);
        orderItems = cart.map(item => {
          if (item.isRibbon) {
            return {
              productId: null,
              productName: 'Ruban personnalisé',
              productImage: 'https://via.placeholder.com/300x300?text=Ruban',
              quantity: 1,
              unitPrice: item.unitPrice || 5.00,
              totalPrice: item.totalPrice || 5.00,
              ribbonText: item.ribbonText || item.customMessage || '',
              hasRibbon: true,
              customMessage: item.ribbonText || item.customMessage || '',
              selectedColor: '',
              selectedSize: ''
            };
          }
          // Produit classique avec productId
          return {
            productId: item.productId || null,
            productName: item.productName,
            productImage: item.productImage,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            customMessage: item.customMessage,
            selectedColor: item.selectedColor,
            selectedSize: item.selectedSize,
            hasRibbon: false,
            ribbonText: ''
          };
        });
      } catch (e) {
        console.error('Erreur parsing cart_json:', e);
      }
    } else {
      // fallback legacy : parser les line_items Stripe
      orderItems = await buildOrderItems(session.line_items?.data || []);
    }

    const savedOrder = await prisma.order.create({
      data: {
        ...orderData,
        items: {
          create: orderItems
        }
      },
      include: {
        items: true
      }
    });

    console.log(`📦 Commande créée: ${savedOrder.orderNumber} (${savedOrder.total}€)`);
    return savedOrder;

  } catch (error) {
    console.error('❌ Erreur sauvegarde commande:', error);
    throw error;
  }
}

// Fonction pour construire les articles de commande
async function buildOrderItems(lineItems) {
  const orderItems = [];
  
  for (const item of lineItems) {
    // Parser les métadonnées du produit depuis la description
    const description = item.description || '';
    const sizeMatch = description.match(/Taille:\s*(\w+)/i);
    const colorMatch = description.match(/Couleur:\s*([^-]+)/i);
    const ribbonMatch = description.includes('ruban personnalisé');
    
    // Essayer de trouver le produit dans la base de données pour récupérer l'image
    let productImage = item.price.product.images?.[0] || null;
    let productId = null;
    
    if (!productImage) {
      try {
        // Chercher le produit par nom
        const productName = item.description?.split(' - ')[0] || item.price.product.name;
        const product = await prisma.product.findFirst({
          where: {
            name: {
              contains: productName,
              mode: 'insensitive'
            }
          },
          select: {
            id: true,
            images: true
          }
        });
        
        if (product) {
          productId = product.id;
          productImage = product.images?.[0] || null;
        }
      } catch (error) {
        console.error('Erreur lors de la recherche du produit:', error);
      }
    }
    
    const orderItem = {
      productId: productId,
      productName: item.description?.split(' - ')[0] || item.price.product.name,
      productImage: productImage,
      quantity: item.quantity,
      unitPrice: item.price.unit_amount / 100,
      totalPrice: (item.amount_total || item.amount_subtotal) / 100,
      
      // Variantes
      selectedSize: sizeMatch ? mapSize(sizeMatch[1]) : null,
      selectedColor: colorMatch ? mapColor(colorMatch[1].trim()) : null,
      
      // Options
      hasRibbon: ribbonMatch,
      ribbonText: ribbonMatch ? 'Ruban personnalisé' : null
    };
    
    orderItems.push(orderItem);
  }
  
  return orderItems;
}

// Mappers pour les enums
function mapSize(sizeStr) {
  const sizeMap = {
    'petit': 'PETIT',
    'moyen': 'MOYEN', 
    'grand': 'GRAND',
    'très grand': 'TRES_GRAND'
  };
  return sizeMap[sizeStr.toLowerCase()] || null;
}

function mapColor(colorStr) {
  const colorMap = {
    'multicolore': 'MULTICOLORE',
    'blanc': 'BLANC',
    'rose pâle': 'ROSE_PALE',
    'rose fushia': 'ROSE_FUSHIA',
    'rouge': 'ROUGE',
    'bleu violet': 'BLEU_VIOLET',
    'jaune': 'JAUNE',
    'orange': 'ORANGE'
  };
  return colorMap[colorStr.toLowerCase()] || null;
}