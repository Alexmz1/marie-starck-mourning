import { NextResponse } from 'next/server'

export function middleware(request) {
  // Vérifier si c'est une route admin (sauf l'API d'auth)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/api/admin/auth')) {
    
    // Pour les routes admin, on laisse le composant client gérer l'authentification
    // Le middleware se contente de laisser passer
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ]
}