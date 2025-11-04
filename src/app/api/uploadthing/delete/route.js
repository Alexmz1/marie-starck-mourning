import { NextResponse } from 'next/server';
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function DELETE(request) {
  try {
    const { fileKey } = await request.json();
    
    if (!fileKey) {
      return NextResponse.json(
        { error: 'File key is required' },
        { status: 400 }
      );
    }

    console.log('🗑️ Suppression du fichier UploadThing avec la clé:', fileKey);
    
    // Supprimer le fichier sur UploadThing
    const result = await utapi.deleteFiles(fileKey);
    
    console.log('✅ Fichier supprimé de UploadThing:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Fichier supprimé avec succès',
      result 
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de la suppression du fichier:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du fichier' },
      { status: 500 }
    );
  }
}