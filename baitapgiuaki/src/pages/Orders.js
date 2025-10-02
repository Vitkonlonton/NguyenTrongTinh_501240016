import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'DH001',
      orderDate: '2024-01-15',
      totalAmount: 4500000,
      status: 'Đã giao hàng',
      items: [
        { id: 1, name: 'Chanel No.5', price: 2500000, quantity: 1 },
        { id: 2, name: 'Dior Sauvage', price: 2200000, quantity: 1 }
      ]
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="orders-page">
      <div className="container">
        <h1>Đơn Hàng Đã Đặt</h1>
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>Bạn chưa có đơn hàng nào</p>
            <button onClick={() => window.location.href = '#products'}>
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Đơn hàng #{order.orderNumber}</h3>
                    <p>Ngày đặt: {formatDate(order.orderDate)}</p>
                    <p className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </p>
                  </div>
                  <div className="order-total">
                    <strong>{formatPrice(order.totalAmount)}</strong>
                  </div>
                </div>
                
                <div className="order-actions">
                  <button 
                    className="detail-btn"
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                  >
                    {selectedOrder?.id === order.id ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                  </button>
                </div>

                {selectedOrder?.id === order.id && (
                  <div className="order-details">
                    <h4>Chi Tiết Đơn Hàng</h4>
                    <div className="order-items">
                      {order.items.map(item => (
                        <div key={item.id} className="order-item">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">Số lượng: {item.quantity}</span>
                          <span className="item-price">{formatPrice(item.price)}</span>
                          <span className="item-total">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="order-summary">
                      <div className="summary-row">
                        <span>Tổng tiền hàng:</span>
                        <span>{formatPrice(order.totalAmount)}</span>
                      </div>
                      <div className="summary-row">
                        <span>Phí vận chuyển:</span>
                        <span>{formatPrice(0)}</span>
                      </div>
                      <div className="summary-row total">
                        <span>Tổng thanh toán:</span>
                        <span>{formatPrice(order.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;