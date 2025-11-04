import { NextResponse } from 'next/server'
import { prisma } from '../../../../../../lib/prisma'

export async function GET() {
  try {
    // Calculer des statistiques basées sur notre utilisation locale
    const databaseUrl = process.env.DATABASE_URL
    const isNeonDatabase = databaseUrl.includes('neon.tech')
    
    if (!isNeonDatabase) {
      throw new Error('Cette base de données n\'utilise pas Neon Tech')
    }

    // Extraire les informations du projet depuis l'URL
    const hostMatch = databaseUrl.match(/@(.+?)\.neon\.tech/)
    const host = hostMatch ? hostMatch[1] : null
    const projectIdMatch = host ? host.match(/^(ep-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+)/) : null
    const projectId = projectIdMatch ? projectIdMatch[1] : 'Inconnu'
    const region = host ? host.match(/\.([a-z0-9-]+)\.aws$/)?.[1] || 'eu-central-1' : 'eu-central-1'

    // Compter nos données pour estimer l'utilisation
    const [
      productCount,
      orderCount,
      customerCount,
      totalRecords
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.customer.count(),
      // Estimer le nombre total d'enregistrements dans toutes les tables
      prisma.$queryRaw`SELECT COUNT(*) FROM (
        SELECT 1 FROM products UNION ALL
        SELECT 1 FROM orders UNION ALL
        SELECT 1 FROM customers UNION ALL
        SELECT 1 FROM inquiries UNION ALL
        SELECT 1 FROM product_variants UNION ALL
        SELECT 1 FROM product_colors UNION ALL
        SELECT 1 FROM order_items UNION ALL
        SELECT 1 FROM subscriptions
      ) as total_count`
    ])

    // Estimation approximative de la taille de la base de données
    // Basée sur le nombre d'enregistrements et une taille moyenne par enregistrement
    const estimatedRecordSize = 500 // bytes par enregistrement (estimation)
    const estimatedDbSize = Number(totalRecords[0].count) * estimatedRecordSize
    
    // Simulation de temps de calcul basée sur l'activité
    const now = new Date()
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const secondsToday = Math.floor((now - dayStart) / 1000)
    const estimatedComputeTime = Math.min(secondsToday * 0.1, 3600) // Max 1 heure estimée

    const stats = {
      project: {
        id: projectId,
        name: 'Marie Starck Database',
        region: region,
        created_at: new Date().toISOString(),
        platform_id: 'neon'
      },
      consumption: {
        active_time_seconds: secondsToday,
        compute_time_seconds: estimatedComputeTime,
        written_data_bytes: estimatedDbSize,
        data_transfer_bytes: estimatedDbSize * 0.5, // Estimation des transferts
      },
      branches: {
        total: 1,
        main_branch: {
          name: 'main',
          id: 'main',
          primary: true
        }
      },
      quotas: {
        // Quotas gratuits Neon
        compute_time_limit: 100 * 3600, // 100 heures
        storage_limit: 0.5 * 1024 * 1024 * 1024, // 0.5 GB
        data_transfer_limit: 5 * 1024 * 1024 * 1024 // 5 GB
      },
      estimated_storage: {
        bytes: estimatedDbSize,
        formatted: formatBytes(estimatedDbSize)
      },
      database_stats: {
        products: productCount,
        orders: orderCount,
        customers: customerCount,
        total_records: Number(totalRecords[0].count)
      }
    }

    return NextResponse.json(stats)

  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques Neon:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}