import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ cartItems, updateCartItem, removeFromCart, clearCart, onPageChange }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orderInfo, setOrderInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cash'
  });

  // Debug: kiểm tra dữ liệu cart items
  useEffect(() => {
    console.log('Cart Items Data:', cartItems);
    cartItems.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, {
        name: item.name,
        hasImage: !!item.image,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      });
    });
  }, [cartItems]);

  // HÀM QUAY LẠI TRANG SẢN PHẨM
  const goBackToProducts = () => {
    window.location.hash = 'products';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal >= 1000000 ? 0 : 30000;
    return subtotal - discount + shipping;
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

  const applyCoupon = () => {
    const coupons = {
      'PERFUME10': 0.1,
      'WELCOME20': 0.2,
      'LUXURY15': 0.15
    };
    
    if (coupons[couponCode.toUpperCase()]) {
      const discountRate = coupons[couponCode.toUpperCase()];
      const discountAmount = calculateSubtotal() * discountRate;
      setDiscount(discountAmount);
      alert(`Áp dụng mã giảm giá thành công! Giảm ${discountRate * 100}%`);
    } else {
      alert('Mã giảm giá không hợp lệ!');
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const orderData = {
      ...orderInfo,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      })),
      total: calculateTotal(),
      discount: discount,
      orderDate: new Date().toISOString()
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('perfumeShopOrders') || '[]');
    const newOrder = {
      ...orderData, 
      id: Date.now(), 
      status: 'Đang xử lý',
      orderNumber: 'DH' + Date.now()
    };
    
    existingOrders.push(newOrder);
    localStorage.setItem('perfumeShopOrders', JSON.stringify(existingOrders));
    
    alert('Đơn hàng đã được đặt thành công! Chuyển đến trang đơn hàng...');
    clearCart();
    setShowCheckout(false);
    setDiscount(0);
    setCouponCode('');
    
    // Tự động chuyển đến trang đơn hàng
    setTimeout(() => {
      if (onPageChange) {
        onPageChange('orders');
      } else {
        window.location.hash = 'orders';
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
    }, 1500);
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

  // Hàm xử lý lỗi ảnh
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x300?text=Ảnh+sản+phẩm';
    e.target.alt = 'Ảnh sản phẩm không khả dụng';
  };

  if (showCheckout) {
    const subtotal = calculateSubtotal();
    const shipping = subtotal >= 1000000 ? 0 : 30000;
    
    return (
      <div className="cart-page">
        <div className="container">
          <div className="checkout-section-luxury">
            <div className="checkout-header">
              <h2><i className="bi bi-bag-check me-2"></i> Thanh Toán</h2>
              <p>Hoàn tất đơn hàng của bạn</p>
            </div>
            
            <form onSubmit={handleCheckout} className="checkout-form-luxury">
              <div className="form-grid">
                <div className="form-group-luxury">
                  <label><i className="bi bi-person me-2"></i>Họ và Tên *</label>
                  <input
                    type="text"
                    required
                    value={orderInfo.fullName}
                    onChange={(e) => setOrderInfo({...orderInfo, fullName: e.target.value})}
                    placeholder="Nhập họ và tên"
                  />
                </div>
                
                <div className="form-group-luxury">
                  <label><i className="bi bi-phone me-2"></i>Số Điện Thoại *</label>
                  <input
                    type="tel"
                    required
                    value={orderInfo.phone}
                    onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                
                <div className="form-group-luxury">
                  <label><i className="bi bi-envelope me-2"></i>Email *</label>
                  <input
                    type="email"
                    required
                    value={orderInfo.email}
                    onChange={(e) => setOrderInfo({...orderInfo, email: e.target.value})}
                    placeholder="Nhập email"
                  />
                </div>
                
                <div className="form-group-luxury full-width">
                  <label><i className="bi bi-geo-alt me-2"></i>Địa Chỉ Giao Hàng *</label>
                  <textarea
                    required
                    value={orderInfo.address}
                    onChange={(e) => setOrderInfo({...orderInfo, address: e.target.value})}
                    rows="3"
                    placeholder="Nhập địa chỉ giao hàng chi tiết"
                  />
                </div>
              </div>
              
              <div className="delivery-info-luxury">
                <h4><i className="bi bi-truck me-2"></i> Thông Tin Giao Hàng</h4>
                <div className="delivery-details">
                  <div className="delivery-item">
                    <span className="delivery-icon">
                      <i className="bi bi-calendar-check"></i>
                    </span>
                    <div>
                      <strong>Ngày nhận hàng dự kiến</strong>
                      <p>{getDeliveryDate()}</p>
                    </div>
                  </div>
                  <div className="delivery-item">
                    <span className="delivery-icon">
                      <i className="bi bi-clock"></i>
                    </span>
                    <div>
                      <strong>Thời gian giao hàng</strong>
                      <p>08:00 - 22:00 hàng ngày</p>
                    </div>
                  </div>
                  <div className="delivery-item">
                    <span className="delivery-icon">
                      <i className="bi bi-truck"></i>
                    </span>
                    <div>
                      <strong>Phí vận chuyển</strong>
                      <p>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="payment-method-luxury">
                <h4><i className="bi bi-credit-card me-2"></i> Phương Thức Thanh Toán</h4>
                <div className="payment-options-luxury">
                  <label className="payment-option">
                    <input
                      type="radio"
                      value="cash"
                      checked={orderInfo.paymentMethod === 'cash'}
                      onChange={(e) => setOrderInfo({...orderInfo, paymentMethod: e.target.value})}
                    />
                    <div className="payment-content">
                      <span className="payment-icon">
                        <i className="bi bi-cash-coin"></i>
                      </span>
                      <div>
                        <strong>Tiền mặt khi nhận hàng</strong>
                        <p>Thanh toán khi nhận được hàng</p>
                      </div>
                    </div>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      value="transfer"
                      checked={orderInfo.paymentMethod === 'transfer'}
                      onChange={(e) => setOrderInfo({...orderInfo, paymentMethod: e.target.value})}
                    />
                    <div className="payment-content">
                      <span className="payment-icon">
                        <i className="bi bi-bank"></i>
                      </span>
                      <div>
                        <strong>Chuyển khoản ngân hàng</strong>
                        <p>Chuyển khoản trước khi giao hàng</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="order-summary-checkout-luxury">
                <h4><i className="bi bi-receipt me-2"></i> Tóm Tắt Đơn Hàng</h4>
                <div className="order-items-preview">
                  {cartItems.map(item => (
                    <div key={item.id} className="order-preview-item">
                      <div className="preview-item-image">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          onError={handleImageError}
                        />
                      </div>
                      <div className="preview-item-details">
                        <span className="preview-item-name">{item.name}</span>
                        <span className="preview-item-quantity">Số lượng: {item.quantity}</span>
                      </div>
                      <span className="preview-item-total">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="summary-totals">
                  <div className="summary-row">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="summary-row discount">
                      <span>Giảm giá:</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="summary-row shipping">
                    <span>Phí vận chuyển:</span>
                    <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng thanh toán:</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>
              
              <div className="checkout-buttons-luxury">
                <button 
                  type="button" 
                  className="back-btn-luxury"
                  onClick={() => setShowCheckout(false)}
                >
                  <i className="bi bi-arrow-left me-2"></i>Quay lại giỏ hàng
                </button>
                <button type="submit" className="complete-order-btn-luxury">
                  <i className="bi bi-check-circle me-2"></i>Hoàn Thành Đặt Hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const shipping = subtotal >= 1000000 ? 0 : 30000;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1><i className="bi bi-cart3 me-2"></i> Giỏ Hàng Của Bạn</h1>
          <p>Kiểm tra và hoàn tất đơn hàng</p>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart-luxury">
            <div className="empty-cart-icon">
              <i className="bi bi-cart-x" style={{fontSize: '5rem'}}></i>
            </div>
            <h3>Giỏ hàng của bạn đang trống</h3>
            <p>Hãy khám phá các sản phẩm tuyệt vời của chúng tôi</p>
            <button 
              className="continue-shopping-btn"
              onClick={goBackToProducts}
            >
              <i className="bi bi-arrow-left me-2"></i>Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-luxury">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item-luxury">
                  <div className="item-image-luxury">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      onError={handleImageError}
                    />
                  </div>
                  <div className="item-details-luxury">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="item-price-single">{formatPrice(item.price)}</p>
                  </div>
                  <div className="quantity-controls-luxury">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="quantity-btn"
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={item.quantity >= 100}
                      className="quantity-btn"
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                  <div className="item-total-luxury">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  <button 
                    className="remove-btn-luxury"
                    onClick={() => {
                      if (window.confirm(`Bạn có chắc muốn xóa "${item.name}" khỏi giỏ hàng?`)) {
                        removeFromCart(item.id);
                      }
                    }}
                    title="Xóa sản phẩm"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-sidebar">
              <div className="coupon-section">
                <h4><i className="bi bi-tag me-2"></i> Mã Giảm Giá</h4>
                <div className="coupon-input-group">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                  <button 
                    onClick={applyCoupon} 
                    className="apply-coupon-btn"
                    disabled={!couponCode.trim()}
                  >
                    <i className="bi bi-check-lg me-2"></i>Áp dụng
                  </button>
                </div>
                <div className="coupon-codes">
                  <p><i className="bi bi-info-circle me-2"></i>Mã khuyến mãi có sẵn:</p>
                  <div className="available-coupons">
                    <span className="coupon-tag" title="Giảm 10%">
                      <i className="bi bi-percent me-1"></i>PERFUME10
                    </span>
                    <span className="coupon-tag" title="Giảm 20%">
                      <i className="bi bi-percent me-1"></i>WELCOME20
                    </span>
                    <span className="coupon-tag" title="Giảm 15%">
                      <i className="bi bi-percent me-1"></i>LUXURY15
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="cart-summary-luxury">
                <h4><i className="bi bi-receipt me-2"></i> Tóm Tắt Đơn Hàng</h4>
                <div className="summary-details-luxury">
                  <div className="summary-row">
                    <span><i className="bi bi-box-seam me-2"></i>Số lượng sản phẩm:</span>
                    <span>{calculateTotalItems()}</span>
                  </div>
                  <div className="summary-row">
                    <span><i className="bi bi-calculator me-2"></i>Tạm tính:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="summary-row discount">
                      <span><i className="bi bi-tag me-2"></i>Giảm giá:</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="summary-row shipping">
                    <span><i className="bi bi-truck me-2"></i>Phí vận chuyển:</span>
                    <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
                  </div>
                  <div className="summary-row total">
                    <span><i className="bi bi-currency-dollar me-2"></i>Tổng thanh toán:</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
                
                <button 
                  className="checkout-btn-luxury"
                  onClick={() => setShowCheckout(true)}
                >
                  <i className="bi bi-bag-check me-2"></i>Tiến Hành Thanh Toán
                </button>
                
                <button 
                  className="continue-shopping-btn"
                  onClick={goBackToProducts}
                >
                  <i className="bi bi-arrow-left me-2"></i>Tiếp tục mua sắm
                </button>

                <button 
                  className="clear-cart-btn"
                  onClick={() => {
                    if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
                      clearCart();
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>Xóa giỏ hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;