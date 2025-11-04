import { createRouteHandler } from "uploadthing/next";
import { createUploadthing } from "uploadthing/server";

const f = createUploadthing();

// Configuration des routes d'upload
export const ourFileRouter = {
  // Route pour les images de produits (admin uniquement)
  productImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // Ici vous pouvez ajouter une vérification d'authentification admin
      // Pour l'instant, on autorise tout (à sécuriser en production)
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for admin:", metadata.uploadedBy);
      console.log("File URL:", file.url);
      console.log("File Key:", file.key);
      
      // Retourner les données qui seront envoyées au client
      return { 
        url: file.url, 
        key: file.key,
        uploadedBy: metadata.uploadedBy 
      };
    }),
};

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});