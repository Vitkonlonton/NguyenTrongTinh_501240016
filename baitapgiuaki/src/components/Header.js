import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

const Header = ({ cartItems, currentPage, onPageChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClick = (page) => {
    onPageChange(page);
    setIsDropdownOpen(false);
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
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              ☰ Menu
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleMenuClick('home')}>🏠 Trang chủ</button>
                <button onClick={() => handleMenuClick('products')}>🛍️ Sản phẩm</button>
                <button onClick={() => handleMenuClick('cart')}>
                  🛒 Giỏ hàng ({cartItemCount})
                </button>
                <button onClick={() => handleMenuClick('orders')}>📦 Đơn hàng đã đặt</button>
              </div>
            )}
          </div>
          
          <button 
            className="cart-button"
            onClick={() => onPageChange('cart')}
          >
            🛒 ({cartItemCount})
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;