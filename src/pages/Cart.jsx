import { useNavigate } from 'react-router-dom';
import BreadcrumbTracker from '../components/BreadcrumbTracker.jsx';
import { useCart } from '../context/CartContent.jsx';
import '../styles/Cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discount > 0 
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log('Proceeding to checkout');
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <BreadcrumbTracker label="Cart">
        <div className="cart">
          <h2>Your Cart</h2>
          <p className="empty-cart">Your cart is empty. Start shopping to add items!</p>
        </div>
      </BreadcrumbTracker>
    );
  }

  return (
    <BreadcrumbTracker label="Cart">
      <div className="cart">
      <h2>Your Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</h2>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              
              <div className="cart-item-price">
                {item.discount > 0 ? (
                  <>
                    <span className="cart-price-original">${item.price.toFixed(2)}</span>
                    <span className="cart-price-discounted">
                      ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                    </span>
                    <span className="cart-discount-badge">{item.discount}% OFF</span>
                  </>
                ) : (
                  <span className="cart-price">${item.price.toFixed(2)}</span>
                )}
              </div>
              
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
              
              <div className="cart-item-total">
                Subtotal: ${((item.discount > 0 
                  ? item.price * (1 - item.discount / 100) 
                  : item.price) * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: ${getTotalPrice()}</h3>
        </div>
        
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
          <button onClick={handleCheckout} className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
    </BreadcrumbTracker>
  );
}

export default Cart;