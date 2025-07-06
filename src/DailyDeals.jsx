import { useState, useEffect } from 'react'
import all_products from './assets/products.js'
import './Home.css'

function DailyDeals() {
  const [deals, setDeals] = useState([])

  useEffect(() => {
  // Filter products that are on sale (discount > 0)
  const saleProducts = all_products.filter(product => product.discount > 0)
  // Make a copy, shuffle, and pick 4 random sale products
  const shuffled = [...saleProducts].sort(() => 0.5 - Math.random())
  setDeals(shuffled.slice(0, 4))
}, [])

  return (
    <div className="category-page">
      <h1>Daily Deals</h1>
      <div className="products-grid">
        {deals.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">
              ${product.price.toFixed(2)}
              <span className="product-discount"> {product.discount}% OFF</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyDeals