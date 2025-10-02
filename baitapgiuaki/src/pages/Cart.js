import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ cartItems, updateCartItem, removeFromCart, clearCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cash'
  });

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else if (newQuantity <= 100) {
      updateCartItem(productId, newQuantity);
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Ở đây sẽ xử lý gửi email và lưu đơn hàng
    alert('Đơn hàng đã được đặt thành công! Thông tin đã được gửi đến email của bạn.');
    clearCart();
    setShowCheckout(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 3);
    return deliveryDate.toLocaleDateString('vi-VN');
  };

  if (showCheckout) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="checkout-section">
            <h2>Thông Tin Thanh Toán</h2>
            <form onSubmit={handleCheckout} className="checkout-form">
              <div className="form-group">
                <label>Họ và Tên *</label>
                <input
                  type="text"
                  required
                  value={orderInfo.fullName}
                  onChange={(e) => setOrderInfo({...orderInfo, fullName: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Số Điện Thoại *</label>
                <input
                  type="tel"
                  required
                  value={orderInfo.phone}
                  onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  required
                  value={orderInfo.email}
                  onChange={(e) => setOrderInfo({...orderInfo, email: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Địa Chỉ *</label>
                <textarea
                  required
                  value={orderInfo.address}
                  onChange={(e) => setOrderInfo({...orderInfo, address: e.target.value})}
                  rows="3"
                />
              </div>
              
              <div className="delivery-info">
                <h4>Thông Tin Giao Hàng</h4>
                <p>📅 <strong>Ngày nhận hàng dự kiến:</strong> {getDeliveryDate()}</p>
              </div>
              
              <div className="payment-method">
                <h4>Phương Thức Thanh Toán</h4>
                <div className="payment-options">
                  <label>
                    <input
                      type="radio"
                      value="cash"
                      checked={orderInfo.paymentMethod === 'cash'}
                      onChange={(e) => setOrderInfo({...orderInfo, paymentMethod: e.target.value})}
                    />
                    💵 Tiền mặt khi nhận hàng
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="transfer"
                      checked={orderInfo.paymentMethod === 'transfer'}
                      onChange={(e) => setOrderInfo({...orderInfo, paymentMethod: e.target.value})}
                    />
                    🏦 Chuyển khoản ngân hàng
                  </label>
                </div>
              </div>
              
              <div className="order-summary-checkout">
                <h4>Tóm Tắt Đơn Hàng</h4>
                <p>Số lượng: {calculateTotalItems()} sản phẩm</p>
                <p className="total-price">Tổng tiền: {formatPrice(calculateTotal())}</p>
              </div>
              
              <div className="checkout-buttons">
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => setShowCheckout(false)}
                >
                  Quay lại giỏ hàng
                </button>
                <button type="submit" className="complete-order-btn">
                  ✅ Hoàn Thành Đặt Hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Giỏ Hàng Của Bạn</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Giỏ hàng của bạn đang trống</p>
            <button onClick={() => window.location.href = '#products'}>
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">{formatPrice(item.price)}</p>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={item.quantity >= 100}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-details">
                <p>Tổng số lượng: <strong>{calculateTotalItems()}</strong></p>
                <p className="total-price">Tổng tiền: <strong>{formatPrice(calculateTotal())}</strong></p>
              </div>
              <button 
                className="checkout-btn"
                onClick={() => setShowCheckout(true)}
              >
                Thanh Toán
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;