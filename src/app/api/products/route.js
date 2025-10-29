import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    let whereClause = {
      inStock: true // Seulement les produits en stock pour le site public
    }

    // Filtre par catégorie si spécifié
    if (category) {
      whereClause.category = category
    }

    // Filtre par produits en vedette si spécifié
    if (featured === 'true') {
      whereClause.featured = true
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        productVariants: {
          orderBy: {
            price: 'asc'
          }
        },
        productColors: true,
        _count: {
          select: {
            orderItems: true
          }
        }
      },
      orderBy: [
        { featured: 'desc' }, // Produits en vedette en premier
        { createdAt: 'desc' } // Puis les plus récents
      ],
      take: limit ? parseInt(limit) : undefined
    })

    // Transformer les données pour le frontend
    const transformedProducts = products.map(product => {
      const minPrice = product.productVariants.length > 0 
        ? Math.min(...product.productVariants.map(v => parseFloat(v.price)))
        : 0
      
      const maxPrice = product.productVariants.length > 0 
        ? Math.max(...product.productVariants.map(v => parseFloat(v.price)))
        : 0

      const priceRange = product.productVariants.length > 0
        ? minPrice === maxPrice 
          ? `${minPrice}€`
          : `à partir de ${minPrice}€`
        : 'Prix sur demande'

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        slug: product.slug,
        category: product.category,
        subCategory: product.subCategory,
        images: product.images,
        priceRange,
        minPrice,
        maxPrice,
        variants: product.productVariants.map(v => ({
          size: v.size,
          price: parseFloat(v.price),
          height: v.height,
          width: v.width,
          depth: v.depth,
          diameter: v.diameter
        })),
        colors: product.productColors.map(c => c.color),
        featured: product.featured,
        inStock: product.inStock,
        orderCount: product._count.orderItems
      }
    })

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}