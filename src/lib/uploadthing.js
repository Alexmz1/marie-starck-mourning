import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react";

// Générer les composants d'upload
export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();

// Générer les helpers pour utiliser UploadThing
export const { useUploadThing } = generateReactHelpers();