import { useNavigate } from 'react-router-dom';
import '../styles/Toast.css';

function Toast({ show, onClose }) {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="add-to-cart-toast">
      <span>Item added to cart!</span>
      <button onClick={onClose} className="toast-btn">Dismiss</button>
      <button onClick={() => navigate('/cart')} className="toast-btn">Go to Cart</button>
    </div>
  );
}

export default Toast;