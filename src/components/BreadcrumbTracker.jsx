import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useBreadcrumb } from '../context/BreadcrumbContext.jsx'

function BreadcrumbTracker({ children, label }) {
  const { updateBreadcrumbHistory } = useBreadcrumb()
  const location = useLocation()

  useEffect(() => {
    // Only update for non-item pages
    if (!location.pathname.startsWith('/item/')) {
      updateBreadcrumbHistory(location.pathname, label || location.pathname.slice(1))
    }
  }, [location.pathname, label, updateBreadcrumbHistory])

  return children
}

export default BreadcrumbTracker
