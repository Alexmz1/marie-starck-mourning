import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, customer, delivery, totals } = body;

    // Validation de la distance pour la livraison (sécurité côté serveur)
    if (delivery.deliveryType === 'delivery') {
      // Vérification de la distance
      if (!delivery.distance || delivery.distance > 25) {
        return NextResponse.json(
          { error: 'La livraison est disponible uniquement dans un rayon de 25 km de la boutique.' },
          { status: 400 }
        );
      }
      
      // Vérification que l'adresse a été validée
      if (delivery.calculated !== true || delivery.error) {
        return NextResponse.json(
          { error: 'Veuillez vérifier l\'adresse de livraison.' },
          { status: 400 }
        );
      }
    }
    // Pour le Click & Collect, pas de validation d'adresse nécessaire

    // Construire les line items pour Stripe
    const line_items = [];

    // Ajouter les produits du panier
    items.forEach(item => {
      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.productName,
            description: `Taille: ${item.size}${item.color ? ` - Couleur: ${item.color.name}` : ''}${item.options?.ribbon?.enabled ? ' - Avec ruban personnalisé' : ''}`,
            images: item.productImage ? [item.productImage] : [],
          },
          unit_amount: Math.round((item.totalPrice || item.price) * 100), // Prix en centimes
        },
        quantity: item.quantity,
      });
    });

    // Ajouter les frais de livraison si applicable
    if (delivery.deliveryType === 'delivery' && delivery.fee > 0) {
      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de livraison',
            description: `${delivery.zone?.name || 'Livraison'} (${delivery.distance?.toFixed(1)}km)`,
          },
          unit_amount: Math.round(delivery.fee * 100), // Prix en centimes
        },
        quantity: 1,
      });
    }

    // Ajouter un produit informatif avec les détails de livraison/récupération (gratuit)
    const deliveryDate = delivery.deliveryType === 'delivery' ? customer.deliveryDate : customer.pickupDate;
    const deliveryInfo = delivery.deliveryType === 'delivery' 
      ? `• LIVRAISON\n→ Adresse: ${customer.address}, ${customer.city} ${customer.postalCode}\n→ Date: ${deliveryDate}\n${customer.specialInstructions ? `→ Instructions: ${customer.specialInstructions}` : ''}`
      : `• CLICK & COLLECT\n→ À récupérer: Centre commercial des Meillottes, 1 rue de la forêt de Sénart, 91450 Soisy-sur-Seine\n→ Date de récupération: ${deliveryDate}\n${customer.specialInstructions ? `→ Instructions: ${customer.specialInstructions}` : ''}`;

    line_items.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: delivery.deliveryType === 'delivery' ? '• Détails de livraison' : '• Détails de récupération',
          description: deliveryInfo.substring(0, 300), // Stripe limite à ~300 caractères
        },
        unit_amount: 0, // Gratuit - juste informatif
      },
      quantity: 1,
    });

    // Déterminer l'URL de base dynamiquement
    const host = request.headers.get('host');
    
    // Détection intelligente du protocole et de l'URL
    let baseUrl;
    if (process.env.BASE_URL && !process.env.BASE_URL.includes('localhost')) {
      // Utiliser l'URL configurée si elle n'est pas localhost
      baseUrl = process.env.BASE_URL;
    } else {
      // Détection automatique basée sur les headers
      const protocol = request.headers.get('x-forwarded-proto') || 
                      (process.env.NODE_ENV === 'production' ? 'https' : 'http');
      baseUrl = `${protocol}://${host}`;
    }
    
    console.log('🔗 Base URL utilisée:', baseUrl);

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      
      // Pré-remplir les informations client
      customer_email: customer.email,
      customer_creation: 'always',
      
      // Informations client pré-remplies
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Commande ${delivery.deliveryType === 'delivery' ? 'avec livraison' : 'Click & Collect'} - ${deliveryDate}`,
          metadata: {
            customer_name: `${customer.firstName} ${customer.lastName}`,
            customer_phone: customer.phone,
          },
        },
      },
      // Métadonnées complètes de la commande (visibles dans le Dashboard Stripe)
      metadata: {
        // Informations client
        customer_name: `${customer.firstName} ${customer.lastName}`,
        customer_email: customer.email,
        customer_phone: customer.phone,
        
        // Type de livraison
        delivery_type: delivery.deliveryType, // 'delivery' ou 'pickup'
        
        // Adresse (si livraison)
        delivery_address: delivery.deliveryType === 'delivery' ? 
          `${customer.address}, ${customer.city} ${customer.postalCode}` : 
          'Click & Collect - Centre commercial des Meillottes, 1 rue de la forêt de Sénart, 91450 Soisy-sur-Seine',
        
        // Informations complémentaires livraison
        additional_info: customer.additionalInfo || '',
        
        // Date et instructions
        delivery_date: delivery.deliveryType === 'delivery' ? customer.deliveryDate : customer.pickupDate,
        special_instructions: customer.specialInstructions || '',
        
        // Informations de livraison calculées
        delivery_fee: delivery.fee?.toString() || '0',
        delivery_zone: delivery.zone?.name || 'N/A',
        delivery_distance: delivery.distance?.toFixed(1) || 'N/A',
        
        // Totaux
        subtotal: totals.subtotal.toFixed(2),
        total: totals.total.toFixed(2),
        
        // Nombre d'articles
        items_count: items.reduce((sum, item) => sum + item.quantity, 0).toString(),

        // Panier complet encodé en JSON pour le webhook
        cart_json: JSON.stringify(
          items.map(item => {
            const ribbonEnabled = item.options?.ribbon?.enabled && item.options?.ribbon?.message;
            return {
              productId: item.productId,
              productName: item.productName,
              productImage: item.productImage,
              quantity: item.quantity,
              unitPrice: item.unitPrice || item.price || 0,
              totalPrice: item.totalPrice || ((item.unitPrice || item.price || 0) * item.quantity),
              customMessage: item.customMessage || '',
              selectedColor: item.color?.name || '',
              selectedSize: item.size || '',
              hasRibbon: ribbonEnabled || false,
              ribbonText: ribbonEnabled ? item.options.ribbon.message : '',
              ribbonPrice: ribbonEnabled ? (item.options.ribbon.price || 5.00) : 0
            };
          })
        )
      },
      // Collecter seulement l'adresse de facturation (obligatoire)
      billing_address_collection: 'required',
      // PAS de shipping_address_collection car on gère nous-mêmes l'adresse de livraison
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erreur création session Stripe:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
}