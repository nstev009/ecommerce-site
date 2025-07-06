import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import all_products from './assets/products.js'
import BreadcrumbTracker from './BreadcrumbTracker.jsx'
import './Home.css'
import './index.css'

function Home() {
  const [trendingProducts, setTrendingProducts] = useState([])
  const uniqueCategories = [...new Set(all_products.map(product => product.category))];
  const navigate = useNavigate()

  useEffect(() => {
    const getRandomProducts = () => {
      const shuffled = [...all_products].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 4)
    }
    
    setTrendingProducts(getRandomProducts())
  }, [])

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/item/${productId}`)
    } else {
      console.error('Product ID is undefined')
    }
  }

  return (
    <BreadcrumbTracker label="Home">
      <div className='home-container'>
      <h1 className='home-title'>Welcome to Atlas Electronics</h1>
      <p className='home-description'>Here at Atlas, we are dedicated to bringing you the best for the cheapest possible!</p>
      <div className='trending-container'>
        <h2 className='trending-title'>Trending Today</h2>
        <div className='trending-products'>
          {trendingProducts.map(product => (
            <div 
              key={product.id} 
              className='product-card' 
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: 'pointer' }}
              >
              <img src={product.image} alt={product.name} className='product-image' />
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
      <div className='trending-container'>
      <h2 className='trending-title'>Shop by Category</h2>
      <div className='trending-products'>
        {uniqueCategories.map(category => {
          // Find the first product with this category to use its image
          const categoryProduct = all_products.find(product => product.category === category);
          return (
            <div key={category} className='product-card'>
              <Link to={`/${category}`} className="category-link">
                <img src={categoryProduct.image} alt={category} className='product-image' />
                <h3>{category}</h3>
              </Link>
            </div>
          );
      })}
      </div>
    </div>
  </div>
    </BreadcrumbTracker>
    
)
}

export default Home