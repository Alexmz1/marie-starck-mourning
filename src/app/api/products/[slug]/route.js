import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function GET(request, { params }) {
  try {
    const awaitedParams = await params
    const slug = awaitedParams.slug

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug du produit requis' },
        { status: 400 }
      )
    }

    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
        inStock: true // Seulement les produits en stock pour le site public
      },
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
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      )
    }

    // Transformer les données pour le frontend
    const transformedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      slug: product.slug,
      category: product.category,
      subCategory: product.subCategory,
      images: product.images || [],
      variants: product.productVariants.map(v => ({
        id: v.id,
        size: v.size,
        price: parseFloat(v.price)
      })),
      colors: product.productColors.map(c => ({
        id: c.id,
        color: c.color
      })),
      featured: product.featured,
      inStock: product.inStock,
      orderCount: product._count.orderItems,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }

    return NextResponse.json(transformedProduct)
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}