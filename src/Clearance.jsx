import { useState, useEffect } from 'react'
import all_products from './assets/products.js'
import './Home.css'

function Clearance() {
  const [clearance, setClearance] = useState([])

  useEffect(() => {
    // Filter products that are on sale (discount > 0)
    const saleProducts = all_products.filter(product => product.discount > 0)
    // Sort by discount descending and pick top 4
    const topDiscounts = saleProducts
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 4)
    setClearance(topDiscounts)
  }, [])

  return (
    <div className="category-page">
      <h1>Clearance</h1>
      <div className="products-grid">
        {clearance.map(product => (
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

export default Clearance