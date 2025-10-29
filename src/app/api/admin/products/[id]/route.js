import { prisma } from '../../../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const awaitedParams = await params
    const product = await prisma.product.findUnique({
      where: { id: awaitedParams.id },
      include: {
        productVariants: {
          orderBy: { price: 'asc' }
        },
        productColors: true
      }
    })

    if (!product) {
      return NextResponse.json(
        { message: 'Produit non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error)
    return NextResponse.json(
      { message: 'Erreur lors de la récupération du produit' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const awaitedParams = await params
    const data = await request.json()
    
    // Validation des données requises
    if (!data.name || !data.category || !data.subCategory) {
      return NextResponse.json(
        { message: 'Les champs nom, catégorie et sous-catégorie sont requis' },
        { status: 400 }
      )
    }

    // Supprimer les anciennes variantes et couleurs
    await prisma.productVariant.deleteMany({
      where: { productId: awaitedParams.id }
    })
    
    await prisma.productColor.deleteMany({
      where: { productId: awaitedParams.id }
    })

    // Mettre à jour le produit avec les nouvelles données
    const updatedProduct = await prisma.product.update({
      where: { id: awaitedParams.id },
      data: {
        name: data.name,
        description: data.description || null,
        category: data.category,
        subCategory: data.subCategory,
        inStock: data.isActive ?? true,
        featured: data.featured ?? false,
        images: data.images || [],
        productVariants: {
          create: data.variants
            ?.filter(variant => variant.size && variant.price)
            .map(variant => ({
              size: variant.size,
              price: parseFloat(variant.price),
              height: variant.height ? parseFloat(variant.height) : null,
              width: variant.width ? parseFloat(variant.width) : null,
              depth: variant.depth ? parseFloat(variant.depth) : null,
              diameter: variant.diameter ? parseFloat(variant.diameter) : null
            })) || []
        },
        productColors: {
          create: data.colors?.map(color => ({ color })) || []
        }
      },
      include: {
        productVariants: true,
        productColors: true
      }
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Erreur lors de la modification du produit:', error)
    return NextResponse.json(
      { message: 'Erreur lors de la modification du produit' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const awaitedParams = await params
    // Supprimer les variantes et couleurs en premier (contraintes de clé étrangère)
    await prisma.productVariant.deleteMany({
      where: { productId: awaitedParams.id }
    })
    
    await prisma.productColor.deleteMany({
      where: { productId: awaitedParams.id }
    })

    // Supprimer le produit
    await prisma.product.delete({
      where: { id: awaitedParams.id }
    })

    return NextResponse.json({ message: 'Produit supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error)
    return NextResponse.json(
      { message: 'Erreur lors de la suppression du produit' },
      { status: 500 }
    )
  }
}