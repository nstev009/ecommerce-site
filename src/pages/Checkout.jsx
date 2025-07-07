import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContent.jsx';
import '../styles/Checkout.css';

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discount > 0 
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const verifyInputFields = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newErrors = {};

    // Helper functions for validation
    const isNameValid = (name) => /^[A-Za-z\s'-]+$/.test(name.trim());
    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPhoneValid = (phone) => /^[\d\s\-\(\)\+]{10,}$/.test(phone.replace(/\s/g, ''));
    const isCardNumberValid = (cardNumber) => {
      const cleaned = cardNumber.replace(/\s/g, '');
      return /^\d{13,19}$/.test(cleaned);
    };
    const isExpiryValid = (expiry) => {
      const match = expiry.match(/^(\d{2})\/(\d{2})$/);
      if (!match) return false;
      const month = parseInt(match[1]);
      const year = parseInt(match[2]) + 2000;
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      
      return month >= 1 && month <= 12 && (year > currentYear || (year === currentYear && month >= currentMonth));
    };
    const isCvvValid = (cvv) => /^\d{3,4}$/.test(cvv);
    const isZipValid = (zip) => /^\d{5}(-?\d{4})?$/.test(zip);

    // Validate all fields
    if (!data.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!isNameValid(data.firstName)) {
      newErrors.firstName = 'First name can only contain letters, spaces, hyphens, and apostrophes';
    }

    if (!data.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!isNameValid(data.lastName)) {
      newErrors.lastName = 'Last name can only contain letters, spaces, hyphens, and apostrophes';
    }

    if (!data.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isEmailValid(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!data.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isPhoneValid(data.phone)) {
      newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }

    if (!data.address?.trim()) {
      newErrors.address = 'Street address is required';
    } else if (data.address.trim().length < 5) {
      newErrors.address = 'Please enter a complete street address';
    }

    if (!data.city?.trim()) {
      newErrors.city = 'City is required';
    } else if (!isNameValid(data.city)) {
      newErrors.city = 'City name can only contain letters, spaces, hyphens, and apostrophes';
    }

    if (!data.state?.trim()) {
      newErrors.state = 'State is required';
    } else if (!isNameValid(data.state)) {
      newErrors.state = 'State name can only contain letters, spaces, hyphens, and apostrophes';
    }

    if (!data.zipCode?.trim()) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!isZipValid(data.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code (e.g., 12345 or 12345-6789)';
    }

    if (!data.cardNumber?.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!isCardNumberValid(data.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number (13-19 digits)';
    }

    if (!data.expiryDate?.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!isExpiryValid(data.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY) that is not expired';
    }

    if (!data.cvv?.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!isCvvValid(data.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    setIsSubmitting(false);

    // If no errors, process the order
    if (Object.keys(newErrors).length === 0) {
      handleOrderSubmit(data);
    } else {
      // Scroll to first error
      const firstErrorField = document.querySelector('.form-group.error input');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
    }
  };

  const handleOrderSubmit = (orderData) => {
    // Simulate order processing
    alert(`Order placed successfully! Thank you, ${orderData.firstName}!\n\nTotal: $${getTotalPrice()}\n\nA confirmation email will be sent to ${orderData.email}`);
    console.log('Order data:', orderData);
    console.log('Cart items:', cartItems);
    
    // Clear the cart after successful order
    clearCart();
    
    navigate('/review');
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      
      <div className="checkout-container">
        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="checkout-items">
            {cartItems.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} className="checkout-item-image" />
                <div className="checkout-item-details">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p className="checkout-item-price">
                    ${((item.discount > 0 
                      ? item.price * (1 - item.discount / 100) 
                      : item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <h3>Total: ${getTotalPrice()}</h3>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="checkout-form">
          <h3>Shipping Information</h3>
          <form onSubmit={verifyInputFields}>
            <div className={`form-group ${errors.firstName ? 'error' : ''}`}>
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            
            <div className={`form-group ${errors.lastName ? 'error' : ''}`}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
            
            <div className={`form-group ${errors.email ? 'error' : ''}`}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className={`form-group ${errors.phone ? 'error' : ''}`}>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567" />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            
            <div className={`form-group ${errors.address ? 'error' : ''}`}>
              <label htmlFor="address">Street Address</label>
              <input type="text" id="address" name="address" placeholder="123 Main Street" />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
            
            <div className="form-row">
              <div className={`form-group ${errors.city ? 'error' : ''}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
              
              <div className={`form-group ${errors.state ? 'error' : ''}`}>
                <label htmlFor="state">State</label>
                <input type="text" id="state" name="state" placeholder="CA" />
                {errors.state && <span className="error-message">{errors.state}</span>}
              </div>
              
              <div className={`form-group ${errors.zipCode ? 'error' : ''}`}>
                <label htmlFor="zipCode">Zip Code</label>
                <input type="text" id="zipCode" name="zipCode" placeholder="12345" />
                {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
              </div>
            </div>
            
            <h3>Payment Information</h3>
            
            <div className={`form-group ${errors.cardNumber ? 'error' : ''}`}>
              <label htmlFor="cardNumber">Card Number</label>
              <input 
                type="text" 
                id="cardNumber" 
                name="cardNumber" 
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
              {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
            </div>
            
            <div className="form-row">
              <div className={`form-group ${errors.expiryDate ? 'error' : ''}`}>
                <label htmlFor="expiryDate">Expiry Date</label>
                <input 
                  type="text" 
                  id="expiryDate" 
                  name="expiryDate" 
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
              </div>
              
              <div className={`form-group ${errors.cvv ? 'error' : ''}`}>
                <label htmlFor="cvv">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  name="cvv" 
                  placeholder="123"
                  maxLength="4"
                />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>
            
            <button 
              type="submit" 
              className="place-order-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : `Place Order - $${getTotalPrice()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Checkout;