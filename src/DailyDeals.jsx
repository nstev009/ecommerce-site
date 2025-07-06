import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import all_products from './assets/products.js'
import BreadcrumbTracker from './BreadcrumbTracker.jsx'
import './Home.css'

function DailyDeals() {
  const [deals, setDeals] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Filter products that are on sale (discount > 0)
    const saleProducts = all_products.filter(product => product.discount > 0)
    // Make a copy, shuffle, and pick 4 random sale products
    const shuffled = [...saleProducts].sort(() => 0.5 - Math.random())
    setDeals(shuffled.slice(0, 4))
  }, [])

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/item/${productId}`)
    } else {
      console.error('Product ID is undefined')
    }
  }

  return (
    <BreadcrumbTracker label="Daily Deals">
      <div className="category-page">
        <h1>Daily Deals</h1>
        <div className="products-grid">
          {deals.map(product => (
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

export default DailyDeals