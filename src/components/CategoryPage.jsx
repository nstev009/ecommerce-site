import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import all_products from '../assets/products.js'
import BreadcrumbTracker from '../components/BreadcrumbTracker.jsx'
import '../styles/Home.css'

function CategoryPage({ category, displayName }) {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const categoryProducts = all_products.filter(
      product => product.category === category
    )
    setProducts(categoryProducts)
  }, [category])

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/item/${productId}`)
    } else {
      console.error('Product ID is undefined')
    }
  }

  return (
    <BreadcrumbTracker label={displayName || category}>
      <div className="category-page">
        <h1>{displayName || category}</h1>
        <div className="products-grid">
          {products.map(product => (
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
                    <span className='product-price-discounted'>
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className='product-price'>${product.price.toFixed(2)}</span>
                )}
              </div>
              {product.discount > 0 && (
                <div className="product-discount-banner">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BreadcrumbTracker>
  )
}

export default CategoryPage
