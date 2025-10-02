import React, { useState } from 'react';
import './Header.css';

const Header = ({ cartItems, currentPage, onPageChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-section">
          <h1 className="shop-name">PERFUME SHOP</h1>
          <p className="slogan">Nước hoa của sự quyến rũ vĩnh cửu</p>
        </div>
        
        <div className="header-controls">
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              ☰ Menu
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => onPageChange('home')}>Trang chủ</button>
                <button onClick={() => onPageChange('products')}>Sản phẩm</button>
                <button onClick={() => onPageChange('cart')}>
                  Giỏ hàng ({cartItemCount})
                </button>
                <button onClick={() => onPageChange('orders')}>Đơn hàng đã đặt</button>
              </div>
            )}
          </div>
          
          <button 
            className="cart-button"
            onClick={() => onPageChange('cart')}
          >
            🛒 Giỏ hàng ({cartItemCount})
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;