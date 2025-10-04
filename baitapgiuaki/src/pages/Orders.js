import React, { useState, useEffect } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load orders từ localStorage
  useEffect(() => {
    const loadOrders = () => {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('perfumeShopOrders') || '[]');
        // Sắp xếp theo thời gian mới nhất
        const sortedOrders = savedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Lỗi khi load đơn hàng:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
    
    // Lắng nghe sự kiện storage change (nếu có nhiều tab)
    const handleStorageChange = () => {
      loadOrders();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang xử lý':
        return 'processing';
      case 'Đang giao hàng':
        return 'shipping';
      case 'Đã giao hàng':
        return 'delivered';
      case 'Đã hủy':
        return 'cancelled';
      default:
        return 'processing';
    }
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="loading-orders">
            <div className="loading-spinner"></div>
            <p>Đang tải thông tin đơn hàng...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <h1>📦 Đơn Hàng Đã Đặt</h1>
          <p>Theo dõi trạng thái đơn hàng của bạn</p>
        </div>
        
        {orders.length === 0 ? (
          <div className="no-orders-luxury">
            <div className="no-orders-icon">📭</div>
            <h3>Bạn chưa có đơn hàng nào</h3>
            <p>Hãy khám phá và mua sắm những sản phẩm tuyệt vời</p>
            <button 
              className="start-shopping-btn"
              onClick={() => {
                window.location.hash = 'products';
                window.dispatchEvent(new HashChangeEvent('hashchange'));
              }}
            >
              🛍️ Bắt đầu mua sắm
            </button>
          </div>
        ) : (
          <div className="orders-content">
            <div className="orders-stats">
              <div className="stat-card">
                <span className="stat-number">{orders.length}</span>
                <span className="stat-label">Tổng đơn hàng</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {orders.filter(order => order.status === 'Đã giao hàng').length}
                </span>
                <span className="stat-label">Đã giao</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {orders.filter(order => order.status === 'Đang xử lý').length}
                </span>
                <span className="stat-label">Đang xử lý</span>
              </div>
            </div>

            <div className="orders-list-luxury">
              {orders.map(order => (
                <div key={order.id} className="order-card-luxury">
                  <div className="order-header-luxury">
                    <div className="order-basic-info">
                      <h3>Đơn hàng #{order.orderNumber || order.id}</h3>
                      <p className="order-date">📅 {formatDate(order.orderDate)}</p>
                      <p className={`order-status ${getStatusColor(order.status)}`}>
                        {order.status}
                      </p>
                    </div>
                    <div className="order-total-luxury">
                      <strong>{formatPrice(order.total)}</strong>
                      <p>{order.items.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm</p>
                    </div>
                  </div>
                  
                  <div className="order-preview-items">
                    <div className="preview-title">Sản phẩm đã đặt:</div>
                    <div className="preview-items-grid">
                      {order.items.slice(0, 3).map(item => (
                        <div key={item.id} className="preview-item">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/60x60?text=Ảnh';
                            }}
                          />
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="preview-more">
                          +{order.items.length - 3} sản phẩm khác
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="order-actions-luxury">
                    <button 
                      className="detail-btn-luxury"
                      onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                    >
                      {selectedOrder?.id === order.id ? '📖 Thu gọn' : '📖 Xem chi tiết'}
                    </button>
                    
                    {order.status === 'Đang xử lý' && (
                      <button className="cancel-btn-luxury">
                        ❌ Hủy đơn hàng
                      </button>
                    )}
                    
                    {order.status === 'Đã giao hàng' && (
                      <button className="review-btn-luxury">
                        ⭐ Đánh giá
                      </button>
                    )}
                  </div>

                  {selectedOrder?.id === order.id && (
                    <div className="order-details-luxury">
                      <div className="details-section">
                        <h4>📋 Chi Tiết Đơn Hàng</h4>
                        <div className="order-items-detailed">
                          {order.items.map(item => (
                            <div key={item.id} className="detailed-item">
                              <div className="item-image-detailed">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/60x60?text=Ảnh';
                                  }}
                                />
                              </div>
                              <div className="item-info-detailed">
                                <span className="item-name-detailed">{item.name}</span>
                                <span className="item-price-detailed">{formatPrice(item.price)}</span>
                              </div>
                              <div className="item-quantity-detailed">
                                Số lượng: {item.quantity}
                              </div>
                              <div className="item-total-detailed">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="details-section">
                        <h4>💰 Tổng Kết Thanh Toán</h4>
                        <div className="order-summary-detailed">
                          <div className="summary-row">
                            <span>Tạm tính:</span>
                            <span>{formatPrice(order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="summary-row discount">
                              <span>Giảm giá:</span>
                              <span>-{formatPrice(order.discount)}</span>
                            </div>
                          )}
                          <div className="summary-row shipping">
                            <span>Phí vận chuyển:</span>
                            <span>Miễn phí</span>
                          </div>
                          <div className="summary-row total">
                            <span>Tổng thanh toán:</span>
                            <span>{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="details-section">
                        <h4>🚚 Thông Tin Giao Hàng</h4>
                        <div className="delivery-info-detailed">
                          <p><strong>Người nhận:</strong> {order.fullName}</p>
                          <p><strong>Điện thoại:</strong> {order.phone}</p>
                          <p><strong>Email:</strong> {order.email}</p>
                          <p><strong>Địa chỉ:</strong> {order.address}</p>
                          <p><strong>Phương thức thanh toán:</strong> {
                            order.paymentMethod === 'cash' ? 'Tiền mặt khi nhận hàng' : 'Chuyển khoản ngân hàng'
                          }</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;