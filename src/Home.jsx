import './Home.css'
import './index.css'
import all_products from './assets/products.js'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [trendingProducts, setTrendingProducts] = useState([])
  const uniqueCategories = [...new Set(all_products.map(product => product.category))];

  useEffect(() => {
    const getRandomProducts = () => {
      const shuffled = [...all_products].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 4)
    }
    
    setTrendingProducts(getRandomProducts())
  }, []) 

  return (
    <div className='home-container'>
      <h1 className='home-title'>Welcome to Atlas Electronics</h1>
      <p className='home-description'>Here at Atlas, we are dedicated to bringing you the best for the cheapest possible!</p>
      <div className='trending-container'>
        <h2 className='trending-title'>Trending Today</h2>
        <div className='trending-products'>
          {trendingProducts.map(product => (
            <div key={product.id} className='product-card'>
              <img src={product.image} alt={product.name} className='product-image' />
              <h3>{product.name}</h3>
              <p className='product-price'>${product.price.toFixed(2)}</p>
              {product.discount > 0 && (
                <span className='product-discount'>{product.discount}% OFF</span>
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
)
}

export default Home