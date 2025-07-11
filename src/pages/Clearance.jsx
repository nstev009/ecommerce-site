import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import all_products from '../assets/products.js'
import BreadcrumbTracker from '../components/BreadcrumbTracker.jsx'
import '../styles/Home.css'

function Clearance() {
  const [clearance, setClearance] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Filter products that are on sale (discount > 0)
    const saleProducts = all_products.filter(product => product.discount > 0)
    // Sort by discount descending and pick top 4
    const topDiscounts = saleProducts
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 4)
    setClearance(topDiscounts)
  }, [])

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/item/${productId}`)
    } else {
      console.error('Product ID is undefined')
    }
  }

  return (
    <BreadcrumbTracker label="Clearance">
      <div className="category-page">
        <h1>Clearance</h1>
        <div className="products-grid">
          {clearance.map(product => (
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: 'pointer' }}
            >
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <div className='product-price-container'>
                {product.discount > 0 ? (
                  <>
                    <span className='product-price-original'>${product.price.toFixed(2)}</span>
                    <span className='product-price-discounted'>${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                  </>
                ) : (
                  <span className='product-price'>${product.price.toFixed(2)}</span>
                )}
              </div>
              {product.discount > 0 && (
                <div className='product-discount-banner'>{product.discount}% OFF</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BreadcrumbTracker>
  )
}

export default Clearance