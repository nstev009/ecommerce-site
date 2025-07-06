import { createContext, useCallback, useContext, useState } from 'react'

const BreadcrumbContext = createContext()

export function BreadcrumbProvider({ children }) {
  const [breadcrumbHistory, setBreadcrumbHistory] = useState([])

  const updateBreadcrumbHistory = useCallback((path, label) => {
    setBreadcrumbHistory(prev => {
      if (window.location.pathname === '/checkout') {
        return prev; // Don't update if we're on checkout
      }
      
      if (!path.startsWith('/item/')) {
        return [{ path, label }]
      }
      
      return prev
    })
  }, [])

  const setBreadcrumbForItem = useCallback((parentPath, parentLabel) => {
    setBreadcrumbHistory([{ path: parentPath, label: parentLabel }])
  }, [])

  const setBreadcrumbTrail = useCallback((trail) => {
    setBreadcrumbHistory(trail)
  }, [])

  const appendToBreadcrumb = useCallback((path, label) => {
    setBreadcrumbHistory(prev => [...prev, { path, label }])
  }, [])

  const clearBreadcrumbHistory = useCallback(() => {
    setBreadcrumbHistory([])
  }, [])

  return (
    <BreadcrumbContext.Provider value={{
      breadcrumbHistory,
      updateBreadcrumbHistory,
      setBreadcrumbForItem,
      setBreadcrumbTrail,
      appendToBreadcrumb,
      clearBreadcrumbHistory
    }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider')
  }
  return context
}
