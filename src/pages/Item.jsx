import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import all_products from '../assets/products.js'
import { useBreadcrumb } from '../context/BreadcrumbContext.jsx'
import { useCart } from '../context/CartContent.jsx'
import '../styles/Item.css'

function Item() {
  const { id } = useParams()
  const location = useLocation()
  const { setBreadcrumbForItem } = useBreadcrumb()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const foundProduct = all_products.find(item => item.id === parseInt(id))
    setProduct(foundProduct)
    
    // Set breadcrumb based on referrer or product category
    if (foundProduct) {
      const referrer = document.referrer
      if (referrer.includes('/TVs')) {
        setBreadcrumbForItem('/TVs', 'TVs')
      } else if (referrer.includes('/Laptops')) {
        setBreadcrumbForItem('/Laptops', 'Laptops')
      } else if (referrer.includes('/Headphones')) {
        setBreadcrumbForItem('/Headphones', 'Headphones')
      } else if (referrer.includes('/Keyboards')) {
        setBreadcrumbForItem('/Keyboards', 'Keyboards')
      } else if (referrer.includes('/Mice')) {
        setBreadcrumbForItem('/Mice', 'Mice')
      } else if (referrer.includes('/Monitors')) {
        setBreadcrumbForItem('/Monitors', 'Monitors')
      } else {
        // Default to category based on product
        const categoryPath = `/${foundProduct.category}`
        setBreadcrumbForItem(categoryPath, foundProduct.category)
      }
    }
  }, [id, setBreadcrumbForItem])

  if (!product) {
    return <div className="item-loading">Product not found</div>
  }

  const discountedPrice = product.discount > 0
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2)

  const handleAddToCart = () => {
    addToCart(product, quantity);
    console.log(`Added ${quantity} of ${product.name} to cart`)
  }

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value)))
  }

  return (
    <div className="item-container">
      <div className="item-image-section">
        <img 
          src={product.image} 
          alt={product.name}
          className="item-image"
        />
      </div>
      
      <div className="item-details-section">
        <h1 className="item-title">{product.name}</h1>
        
        <div className="item-price-section">
          {product.discount > 0 ? (
            <>
              <span className="item-price-discounted">${discountedPrice}</span>
              <span className="item-price-original">${product.price.toFixed(2)}</span>
              <span className="item-discount-badge">{product.discount}% OFF</span>
            </>
          ) : (
            <span className="item-price">${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className="item-category">
          <span className="category-label">Category: </span>
          <span className="category-value">{product.category}</span>
        </div>

        <div className="item-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <div className="item-purchase-section">
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
          </div>
          
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Item
