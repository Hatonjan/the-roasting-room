import { createContext, useState } from 'react'
import { getProducts } from '../services/api'

export const CacheContext = createContext()

export default function CacheContextProvider({ children }) {
  const [cache, setCache] = useState({
    products: null,
    productsLoading: false,
    productsError: null,
    cacheTime: null // Track when data was cached
  })

  // Prefetch products data
  const prefetchProducts = async () => {
    // Don't fetch if already cached and less than 5 minutes old
    if (cache.products && cache.cacheTime) {
      const cacheAge = Date.now() - cache.cacheTime
      const fiveMinutes = 5 * 60 * 1000
      if (cacheAge < fiveMinutes) {
        return cache.products // Return cached data
      }
    }

    // Only fetch if not already loading
    if (cache.productsLoading) {
      return cache.products
    }

    setCache(prev => ({ ...prev, productsLoading: true, productsError: null }))

    try {
      const data = await getProducts()
      setCache(prev => ({
        ...prev,
        products: data,
        productsLoading: false,
        cacheTime: Date.now()
      }))
      return data
    } catch (err) {
      setCache(prev => ({
        ...prev,
        productsLoading: false,
        productsError: err.message
      }))
      throw err
    }
  }

  // Clear cache (useful for logout, etc.)
  const clearCache = () => {
    setCache({
      products: null,
      productsLoading: false,
      productsError: null,
      cacheTime: null
    })
  }

  const value = {
    cache,
    prefetchProducts,
    clearCache
  }

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  )
}
