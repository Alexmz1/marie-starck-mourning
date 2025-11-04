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

    // Récupérer le produit actuel pour gérer les images
    const currentProduct = await prisma.product.findUnique({
      where: { id: awaitedParams.id }
    })

    if (!currentProduct) {
      return NextResponse.json(
        { message: 'Produit non trouvé' },
        { status: 404 }
      )
    }

    // Gérer la suppression des anciennes images si de nouvelles sont fournies
    if (data.imageKeys && data.imageKeys.length > 0) {
      // Si on a de nouvelles images, supprimer les anciennes de UploadThing
      if (currentProduct.imageKeys && currentProduct.imageKeys.length > 0) {
        try {
          // Importer UTApi pour supprimer les fichiers
          const { UTApi } = await import("uploadthing/server");
          const utapi = new UTApi();
          
          console.log('🗑️ Suppression des anciennes images:', currentProduct.imageKeys);
          await utapi.deleteFiles(currentProduct.imageKeys);
          console.log('✅ Anciennes images supprimées de UploadThing');
        } catch (error) {
          console.error('❌ Erreur lors de la suppression des anciennes images:', error);
          // On continue malgré l'erreur pour ne pas bloquer la mise à jour
        }
      }
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
        images: data.images || currentProduct.images || [],
        imageKeys: data.imageKeys || currentProduct.imageKeys || [],
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
    
    // Récupérer le produit pour obtenir les clés des images
    const product = await prisma.product.findUnique({
      where: { id: awaitedParams.id }
    })

    if (!product) {
      return NextResponse.json(
        { message: 'Produit non trouvé' },
        { status: 404 }
      )
    }

    // Supprimer les images de UploadThing si elles existent
    if (product.imageKeys && product.imageKeys.length > 0) {
      try {
        const { UTApi } = await import("uploadthing/server");
        const utapi = new UTApi();
        
        console.log('🗑️ Suppression des images du produit:', product.imageKeys);
        await utapi.deleteFiles(product.imageKeys);
        console.log('✅ Images supprimées de UploadThing');
      } catch (error) {
        console.error('❌ Erreur lors de la suppression des images:', error);
        // On continue malgré l'erreur pour ne pas bloquer la suppression du produit
      }
    }

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