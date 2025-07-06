import { useState, useEffect } from 'react'
import all_products from './assets/products.js'
import './Home.css'

function Monitors() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const monitorsProducts = all_products.filter(
      product => product.category === "Monitors"
    )
    setProducts(monitorsProducts)
  }, [])

  return (
    <div className="category-page">
      <h1>Monitors</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            {product.discount > 0 && (
              <span className="product-discount">{product.discount}% OFF</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Monitors