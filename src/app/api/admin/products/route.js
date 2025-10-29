import { prisma } from '../../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.json()
    console.log('🔍 Données reçues pour création:', JSON.stringify(data, null, 2))
    
    // Validation des données requises
    if (!data.name || !data.category || !data.subCategory) {
      console.log('❌ Validation échouée: champs manquants')
      console.log('- name:', data.name)
      console.log('- category:', data.category) 
      console.log('- subCategory:', data.subCategory)
      return NextResponse.json(
        { message: 'Les champs nom, catégorie et sous-catégorie sont requis' },
        { status: 400 }
      )
    }

    if (!data.variants || data.variants.length === 0) {
      console.log('❌ Validation échouée: pas de variantes')
      console.log('- variants:', data.variants)
      return NextResponse.json(
        { error: 'Au moins une variante de prix est requise' },
        { status: 400 }
      )
    }

    if (!data.colors || data.colors.length === 0) {
      console.log('❌ Validation échouée: pas de couleurs')
      console.log('- colors:', data.colors)
      return NextResponse.json(
        { error: 'Au moins une couleur est requise' },
        { status: 400 }
      )
    }

    console.log('✅ Validation des données réussie')
    console.log('📊 Variants à créer:', data.variants)

    // Vérifier l'unicité du slug
    const existingProduct = await prisma.product.findUnique({
      where: { slug: data.slug }
    })

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Un produit avec ce nom existe déjà' },
        { status: 400 }
      )
    }

    // Créer le produit avec ses variants et couleurs
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || null,
        category: data.category,
        subCategory: data.subCategory,
        slug: data.slug,
        inStock: data.inStock ?? true,
        featured: data.featured ?? false,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        images: data.images || [],
        
        // Créer les variants de prix
        productVariants: {
          create: data.variants.map((variant, index) => {
            console.log(`🔧 Traitement variant ${index}:`, variant)
            const processedVariant = {
              size: variant.size,
              price: parseFloat(variant.price),
              height: variant.height ? parseFloat(variant.height) : null,
              width: variant.width ? parseFloat(variant.width) : null,
              depth: variant.depth ? parseFloat(variant.depth) : null,
              diameter: variant.diameter ? parseFloat(variant.diameter) : null
            }
            console.log(`✅ Variant ${index} traité:`, processedVariant)
            return processedVariant
          })
        },
        
        // Créer les couleurs disponibles
        productColors: {
          create: data.colors.map(color => ({
            color: color
          }))
        }
      },
      include: {
        productVariants: true,
        productColors: true
      }
    })

    return NextResponse.json(product, { status: 201 })

  } catch (error) {
    console.error('Erreur lors de la création du produit:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Un produit avec ce nom existe déjà' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        productVariants: {
          orderBy: { price: 'asc' }
        },
        productColors: true,
        _count: {
          select: {
            orderItems: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}