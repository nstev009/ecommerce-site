import { Link, useLocation } from 'react-router-dom'
import all_products from '../assets/products.js'
import { useBreadcrumb } from '../context/BreadcrumbContext.jsx'
import '../styles/Breadcrumbs.css'

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function Breadcrumbs() {
  const location = useLocation()
  const { breadcrumbHistory } = useBreadcrumb()
  
  // Handle item pages specially
  if (location.pathname.startsWith('/item/')) {
    const itemId = parseInt(location.pathname.split('/')[2])
    const product = all_products.find(p => p.id === itemId)
    
    return (
      <nav className="breadcrumbs">
        <Link to="/" className="breadcrumb-link">Home</Link>
        {breadcrumbHistory.map((crumb, idx) => (
          <span key={crumb.path}>
            <span className="breadcrumb-separator" style={{ margin: '0 0.5em' }}>{'>'}</span>
            <Link to={crumb.path} className="breadcrumb-link">{crumb.label}</Link>
          </span>
        ))}
        <span className="breadcrumb-separator" style={{ margin: '0 0.5em' }}>{'>'}</span>
        <span className="breadcrumb-current">{product ? product.name : 'Item'}</span>
      </nav>
    )
  }
  
  // Handle regular pages
  const pathnames = location.pathname.split('/').filter(x => x)

  // Special handling for checkout - always show Home > Cart > Checkout
  if (location.pathname === '/checkout') {
    return (
      <nav className="breadcrumbs">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator" style={{ margin: '0 0.5em' }}>{'>'}</span>
        <Link to="/cart" className="breadcrumb-link">Cart</Link>
        <span className="breadcrumb-separator" style={{ margin: '0 0.5em' }}>{'>'}</span>
        <span className="breadcrumb-current">Checkout</span>
      </nav>
    )
  }
  // Special handling for review - always show Home > Cart > Checkout > Review
  if (location.pathname === '/review') {
    return (
      <nav className="breadcrumbs">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator" style={{ margin: '0 0.5em' }}>{'>'}</span>
        <Link to="/cart" className="breadcrumb-link">Cart</Link>
        <span className="breadcrumb-separator" style={{ margin: '0 0.5em' }}>{'>'}</span>
        <Link to="/checkout" className="breadcrumb-link">Checkout</Link>
        <span className="breadcrumb-separator" style={{ margin: '0 0.5em' }}>{'>'}</span>
        <span className="breadcrumb-current">Review</span>
      </nav>
    )
  }

  // Use breadcrumbHistory if it exists and has items, otherwise fall back to URL-based breadcrumbs
  if (breadcrumbHistory && breadcrumbHistory.length > 0) {
    return (
      <nav className="breadcrumbs">
        <Link to="/" className="breadcrumb-link">Home</Link>
        {breadcrumbHistory.map((crumb, idx) => {
          const isLast = idx === breadcrumbHistory.length - 1
          return (
            <span key={crumb.path}>
              <span className="breadcrumb-separator" style={{ margin: '0 0.5em' }}>{'>'}</span>
              {isLast ? (
                <span className="breadcrumb-current">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="breadcrumb-link">{crumb.label}</Link>
              )}
            </span>
          )
        })}
      </nav>
    )
  }

  // Fallback to URL-based breadcrumbs
  return (
    <nav className="breadcrumbs">
      <Link to="/" className="breadcrumb-link">Home</Link>
      {pathnames.map((value, idx) => {
        const to = '/' + pathnames.slice(0, idx + 1).join('/')
        const isLast = idx === pathnames.length - 1
        return (
          <span key={to}>
            <span className="breadcrumb-separator" style={{ margin: '0 0.5em' }}>{'>'}</span>
            {isLast ? (
                <span className="breadcrumb-current">{capitalize(value)}</span>
        ) : (
            <Link to={to} className="breadcrumb-link">{capitalize(value)}</Link>
        )}
    </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs