'use client'

import { useState } from 'react'
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const PRIMARY_COLOR = '#276f88'

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        // Stocker la session dans sessionStorage
        sessionStorage.setItem('admin_authenticated', 'true')
        onLogin()
      } else {
        setError('Mot de passe incorrect')
      }
    } catch (error) {
      setError('Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#faf8f3'}}>
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <LockClosedIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-6 text-3xl font-light text-gray-900">
            Accès Administration
          </h2>
          <div className="w-24 h-0.5 mx-auto my-6" style={{backgroundColor: '#858585'}}></div>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Veuillez saisir le mot de passe pour accéder à l'interface d'administration
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300 pr-12"
                placeholder="Mot de passe administrateur"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center font-light">
              {error}
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="py-4 px-12 font-light text-white transition-all duration-300 tracking-wide hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Vérification...
                </div>
              ) : (
                'SE CONNECTER'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}