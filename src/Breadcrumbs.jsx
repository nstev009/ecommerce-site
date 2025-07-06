import { Link, useLocation } from 'react-router-dom'
import './Breadcrumbs.css'

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function Breadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

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