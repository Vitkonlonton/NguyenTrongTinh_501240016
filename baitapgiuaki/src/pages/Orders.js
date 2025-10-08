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
            <p><i className="bi bi-hourglass-split me-2"></i>Đang tải thông tin đơn hàng...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <h1><i className="bi bi-receipt me-2"></i> Đơn Hàng Đã Đặt</h1>
          <p>Theo dõi trạng thái đơn hàng của bạn</p>
        </div>
        
        {orders.length === 0 ? (
          <div className="no-orders-luxury">
            <div className="no-orders-icon">
              <i className="bi bi-inbox" style={{fontSize: '5rem'}}></i>
            </div>
            <h3>Bạn chưa có đơn hàng nào</h3>
            <p>Hãy khám phá và mua sắm những sản phẩm tuyệt vời</p>
            <button 
              className="start-shopping-btn"
              onClick={() => {
                window.location.hash = 'products';
                window.dispatchEvent(new HashChangeEvent('hashchange'));
              }}
            >
              <i className="bi bi-bag me-2"></i>Bắt đầu mua sắm
            </button>
          </div>
        ) : (
          <div className="orders-content">
            <div className="orders-stats">
              <div className="stat-card">
                <span className="stat-number">{orders.length}</span>
                <span className="stat-label">
                  <i className="bi bi-receipt me-1"></i>Tổng đơn hàng
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {orders.filter(order => order.status === 'Đã giao hàng').length}
                </span>
                <span className="stat-label">
                  <i className="bi bi-check-circle me-1"></i>Đã giao
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {orders.filter(order => order.status === 'Đang xử lý').length}
                </span>
                <span className="stat-label">
                  <i className="bi bi-hourglass-split me-1"></i>Đang xử lý
                </span>
              </div>
            </div>

            <div className="orders-list-luxury">
              {orders.map(order => (
                <div key={order.id} className="order-card-luxury">
                  <div className="order-header-luxury">
                    <div className="order-basic-info">
                      <h3>
                        <i className="bi bi-hash me-2"></i>Đơn hàng #{order.orderNumber || order.id}
                      </h3>
                      <p className="order-date">
                        <i className="bi bi-calendar me-2"></i>{formatDate(order.orderDate)}
                      </p>
                      <p className={`order-status ${getStatusColor(order.status)}`}>
                        <i className={`bi ${
                          order.status === 'Đang xử lý' ? 'bi-hourglass-split' :
                          order.status === 'Đang giao hàng' ? 'bi-truck' :
                          order.status === 'Đã giao hàng' ? 'bi-check-circle' : 'bi-x-circle'
                        } me-2`}></i>
                        {order.status}
                      </p>
                    </div>
                    <div className="order-total-luxury">
                      <strong>{formatPrice(order.total)}</strong>
                      <p>
                        <i className="bi bi-box-seam me-1"></i>
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm
                      </p>
                    </div>
                  </div>
                  
                  <div className="order-preview-items">
                    <div className="preview-title">
                      <i className="bi bi-box-seam me-2"></i>Sản phẩm đã đặt:
                    </div>
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
                          <span className="item-quantity">
                            <i className="bi bi-x"></i>{item.quantity}
                          </span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="preview-more">
                          <i className="bi bi-plus-circle me-1"></i>
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
                      {selectedOrder?.id === order.id ? (
                        <><i className="bi bi-chevron-up me-2"></i>Thu gọn</>
                      ) : (
                        <><i className="bi bi-chevron-down me-2"></i>Xem chi tiết</>
                      )}
                    </button>
                    
                    {order.status === 'Đang xử lý' && (
                      <button className="cancel-btn-luxury">
                        <i className="bi bi-x-circle me-2"></i>Hủy đơn hàng
                      </button>
                    )}
                    
                    {order.status === 'Đã giao hàng' && (
                      <button className="review-btn-luxury">
                        <i className="bi bi-star me-2"></i>Đánh giá
                      </button>
                    )}
                  </div>

                  {selectedOrder?.id === order.id && (
                    <div className="order-details-luxury">
                      <div className="details-section">
                        <h4><i className="bi bi-list-check me-2"></i>Chi Tiết Đơn Hàng</h4>
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
                                <i className="bi bi-x me-1"></i>Số lượng: {item.quantity}
                              </div>
                              <div className="item-total-detailed">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="details-section">
                        <h4><i className="bi bi-calculator me-2"></i>Tổng Kết Thanh Toán</h4>
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
                        <h4><i className="bi bi-truck me-2"></i>Thông Tin Giao Hàng</h4>
                        <div className="delivery-info-detailed">
                          <p>
                            <i className="bi bi-person me-2"></i>
                            <strong>Người nhận:</strong> {order.fullName}
                          </p>
                          <p>
                            <i className="bi bi-phone me-2"></i>
                            <strong>Điện thoại:</strong> {order.phone}
                          </p>
                          <p>
                            <i className="bi bi-envelope me-2"></i>
                            <strong>Email:</strong> {order.email}
                          </p>
                          <p>
                            <i className="bi bi-geo-alt me-2"></i>
                            <strong>Địa chỉ:</strong> {order.address}
                          </p>
                          <p>
                            <i className="bi bi-credit-card me-2"></i>
                            <strong>Phương thức thanh toán:</strong> {
                              order.paymentMethod === 'cash' ? 'Tiền mặt khi nhận hàng' : 'Chuyển khoản ngân hàng'
                            }
                          </p>
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