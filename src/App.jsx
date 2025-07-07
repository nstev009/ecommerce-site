import { useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import cartIcon from './assets/cartIcon.png'
import DropdownIcon from './assets/dropdownIcon.png'
import logo from './assets/logo.png'
import { Breadcrumbs } from './components'
import { BreadcrumbProvider, CartProvider } from './context'
import {
  Cart,
  Checkout,
  Clearance,
  DailyDeals,
  Headphones,
  Home,
  Item,
  Keyboards,
  Laptops,
  Mice,
  Monitors,
  Review,
  TVs
} from './pages'

function App() {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false)
  const [showDealsDropdown, setShowDealsDropdown] = useState(false)

  return (
    <Router>
      <BreadcrumbProvider>
      <CartProvider>
        <div className="app-container">
        <div className="content-container">
          <nav className="horizontal-nav">
            <Link to="/" className="nav-button">
            <img src={logo} alt="Logo" className="logo-icon" />
            </Link>
            
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setShowProductsDropdown(true)}
              onMouseLeave={() => setShowProductsDropdown(false)}
            >
              <button className="dropdown-trigger">
                Shop Products <img src={DropdownIcon} alt="Dropdown Icon" className="nav-icon" />
              </button>
              {showProductsDropdown && (
                <div className="dropdown-menu">
                  <Link to="/Headphones" className="dropdown-item">Headphones</Link>
                  <Link to="/Keyboards" className="dropdown-item">Keyboards</Link>
                  <Link to="/Laptops" className="dropdown-item">Laptops</Link>
                  <Link to="/Mice" className="dropdown-item">Mice</Link>
                  <Link to="/Monitors" className="dropdown-item">Monitors</Link>
                  <Link to="/TVs" className="dropdown-item">TVs</Link>
                </div>
              )}
            </div>

            <div 
              className="nav-dropdown"
              onMouseEnter={() => setShowDealsDropdown(true)}
              onMouseLeave={() => setShowDealsDropdown(false)}
            >
              <button className="dropdown-trigger">
                Deals <img src={DropdownIcon} alt="Dropdown Icon" className="nav-icon" />
              </button>
              {showDealsDropdown && (
                <div className="dropdown-menu">
                  <Link to="/DailyDeals" className="dropdown-item">Daily Deals</Link>
                  <Link to="/Clearance" className="dropdown-item">Clearance</Link>
                </div>
              )}
            </div>

            <Link to="/cart" className="nav-button">
            Cart <img src={cartIcon} alt="Cart Icon" className="nav-icon" />
            </Link>
          </nav>
          <Breadcrumbs /> 
            <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Headphones" element={<Headphones />} />
              <Route path="/Keyboards" element={<Keyboards />} />
              <Route path="/Laptops" element={<Laptops />} />
              <Route path="/Mice" element={<Mice />} /> 
              <Route path="/Monitors" element={<Monitors />} />
              <Route path="/TVs" element={<TVs />} />
              <Route path="/dailydeals" element={<DailyDeals />} />
              <Route path="/clearance" element={<Clearance />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/item/:id" element={<Item />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/review" element={<Review />} />

            </Routes>
          </main>
        </div>
      </div>
      </CartProvider>
      </BreadcrumbProvider>
    </Router>
  )
}

export default App