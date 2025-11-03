import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { password } = await request.json()

    // Vérifier le mot de passe avec celui du .env
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not configured in environment variables')
      return NextResponse.json(
        { error: 'Configuration manquante' },
        { status: 500 }
      )
    }

    if (password === adminPassword) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}