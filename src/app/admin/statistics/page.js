'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon,
  CloudIcon,
  PhotoIcon,
  ServerIcon,
  ExclamationTriangleIcon,
  CircleStackIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const PRIMARY_COLOR = '#276f88'

export default function StatisticsPage() {
  const [uploadThingStats, setUploadThingStats] = useState(null)
  const [neonStats, setNeonStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [neonLoading, setNeonLoading] = useState(true)
  const [error, setError] = useState(null)
  const [neonError, setNeonError] = useState(null)

  useEffect(() => {
    fetchUploadThingStats()
    fetchNeonStats()
  }, [])

  const fetchNeonStats = async () => {
    try {
      setNeonLoading(true)
      const response = await fetch('/api/admin/statistics/neon')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du chargement des statistiques Neon')
      }
      
      setNeonStats(data)
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques Neon:', error)
      setNeonError(error.message)
    } finally {
      setNeonLoading(false)
    }
  }

  const fetchUploadThingStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/statistics/uploadthing')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du chargement des statistiques')
      }
      
      setUploadThingStats(data)
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatPercentage = (used, total) => {
    if (total === 0) return 0
    return ((used / total) * 100).toFixed(1)
  }

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
  }

  if (loading || neonLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 font-light">Chargement des statistiques...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
          Statistiques
        </h1>
        <p className="mt-2 text-sm font-light text-gray-600">
          Vue d'ensemble de l'utilisation de vos ressources
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Erreur</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
          <button
            onClick={fetchUploadThingStats}
            className="ml-auto px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Section UploadThing */}
      {uploadThingStats && (
        <div className="space-y-6">
          <div className="flex items-center">
            <CloudIcon className="h-6 w-6 mr-3" style={{ color: PRIMARY_COLOR }} />
            <h2 className="text-xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
              Stockage UploadThing
            </h2>
            <button
              onClick={() => {
                fetchUploadThingStats()
                fetchNeonStats()
              }}
              className="ml-auto px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
            >
              Actualiser tout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Nombre total de fichiers */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <div className="flex items-center">
                <PhotoIcon className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <div className="text-2xl font-light text-gray-900">
                    {uploadThingStats.totalFiles}
                  </div>
                  <div className="text-sm font-light text-gray-600">
                    Fichiers stockés
                  </div>
                </div>
              </div>
            </div>

            {/* Espace utilisé */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <div className="flex items-center">
                <ServerIcon className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <div className="text-2xl font-light text-gray-900">
                    {formatFileSize(uploadThingStats.totalSize)}
                  </div>
                  <div className="text-sm font-light text-gray-600">
                    Espace utilisé
                  </div>
                </div>
              </div>
            </div>

            {/* Pourcentage d'utilisation */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <div className="flex items-center">
                <ChartBarIcon className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <div className="text-2xl font-light text-gray-900">
                    {uploadThingStats.quotaUsed ? formatPercentage(uploadThingStats.totalSize, uploadThingStats.quotaUsed) : 'N/A'}%
                  </div>
                  <div className="text-sm font-light text-gray-600">
                    Quota utilisé
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Barre de progression de l'utilisation */}
          {uploadThingStats.quotaUsed && (
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Utilisation du stockage</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Utilisé: {formatFileSize(uploadThingStats.totalSize)}</span>
                  <span>Limite: {formatFileSize(uploadThingStats.quotaUsed)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      formatPercentage(uploadThingStats.totalSize, uploadThingStats.quotaUsed) > 80 
                        ? 'bg-red-500' 
                        : formatPercentage(uploadThingStats.totalSize, uploadThingStats.quotaUsed) > 60
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ 
                      width: `${Math.min(formatPercentage(uploadThingStats.totalSize, uploadThingStats.quotaUsed), 100)}%` 
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {formatPercentage(uploadThingStats.totalSize, uploadThingStats.quotaUsed)}% utilisé
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section Neon Tech */}
      {neonError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Erreur Neon</h3>
            <p className="text-sm text-red-700 mt-1">{neonError}</p>
          </div>
          <button
            onClick={fetchNeonStats}
            className="ml-auto px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
          >
            Réessayer
          </button>
        </div>
      )}

      {neonStats && (
        <div className="space-y-6">
          <div className="flex items-center">
            <CircleStackIcon className="h-6 w-6 mr-3" style={{ color: PRIMARY_COLOR }} />
            <h2 className="text-xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
              Base de données Neon Tech
            </h2>
            <button
              onClick={fetchNeonStats}
              className="ml-auto px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
            >
              Actualiser
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Projet */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <div className="flex items-center">
                <ServerIcon className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <div className="text-lg font-light text-gray-900">
                    {neonStats.project.name || 'Projet Neon'}
                  </div>
                  <div className="text-sm font-light text-gray-600">
                    Région: {neonStats.project.region}
                  </div>
                </div>
              </div>
            </div>

            {/* Stockage estimé */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <div className="flex items-center">
                <CircleStackIcon className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <div className="text-2xl font-light text-gray-900">
                    {neonStats.estimated_storage.formatted}
                  </div>
                  <div className="text-sm font-light text-gray-600">
                    Données écrites
                  </div>
                </div>
              </div>
            </div>

            {/* Temps de calcul */}
            {neonStats.consumption && (
              <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <div className="flex items-center">
                  <ClockIcon className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <div className="text-2xl font-light text-gray-900">
                      {formatTime(neonStats.consumption.compute_time_seconds)}
                    </div>
                    <div className="text-sm font-light text-gray-600">
                      Temps de calcul
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transfert de données */}
            {neonStats.consumption && (
              <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <div className="flex items-center">
                  <CloudIcon className="h-8 w-8 text-orange-500" />
                  <div className="ml-4">
                    <div className="text-2xl font-light text-gray-900">
                      {formatFileSize(neonStats.consumption.data_transfer_bytes)}
                    </div>
                    <div className="text-sm font-light text-gray-600">
                      Données transférées
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Barres de progression des quotas */}
          {neonStats.consumption && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quota temps de calcul */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Temps de calcul</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Utilisé: {formatTime(neonStats.consumption.compute_time_seconds)}</span>
                    <span>Limite: {formatTime(neonStats.quotas.compute_time_limit)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        formatPercentage(neonStats.consumption.compute_time_seconds, neonStats.quotas.compute_time_limit) > 80 
                          ? 'bg-red-500' 
                          : formatPercentage(neonStats.consumption.compute_time_seconds, neonStats.quotas.compute_time_limit) > 60
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ 
                        width: `${Math.min(formatPercentage(neonStats.consumption.compute_time_seconds, neonStats.quotas.compute_time_limit), 100)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatPercentage(neonStats.consumption.compute_time_seconds, neonStats.quotas.compute_time_limit)}% utilisé
                  </div>
                </div>
              </div>

              {/* Quota stockage */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Stockage</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Utilisé: {neonStats.estimated_storage.formatted}</span>
                    <span>Limite: {formatFileSize(neonStats.quotas.storage_limit)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        formatPercentage(neonStats.estimated_storage.bytes, neonStats.quotas.storage_limit) > 80 
                          ? 'bg-red-500' 
                          : formatPercentage(neonStats.estimated_storage.bytes, neonStats.quotas.storage_limit) > 60
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ 
                        width: `${Math.min(formatPercentage(neonStats.estimated_storage.bytes, neonStats.quotas.storage_limit), 100)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatPercentage(neonStats.estimated_storage.bytes, neonStats.quotas.storage_limit)}% utilisé
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section pour futures statistiques */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Plus de statistiques bientôt</h3>
        <p className="text-sm text-gray-600">
          Cette section sera enrichie avec des statistiques sur les ventes, les produits populaires, et plus encore.
        </p>
      </div>
    </div>
  )
}