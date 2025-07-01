import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import cartIcon from './assets/cartIcon.png'
import DropdownIcon from './assets/dropdownIcon.png'
import logo from './assets/logo.png'
import Home from './Home.jsx'

function App() {
  return (
    <Router>
      <div className="app-container">
        
        <div className="content-container">
          <nav className="horizontal-nav">
            <Link to="/" className="nav-button">
            <img src={logo} alt="Logo" className="logo-icon" />
            </Link>
            <Link to="/" className="nav-button">
            Shop Products <img src={DropdownIcon} alt="Dropdown Icon" className="nav-icon" />
            </Link>
            <Link to="/" className="nav-button">
            Deals <img src={DropdownIcon} alt="Dropdown Icon" className="nav-icon" />
            </Link>
            <Link to="/cart" className="nav-button">
            Cart <img src={cartIcon} alt="Cart Icon" className="nav-icon" />
            </Link>
          </nav>
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App