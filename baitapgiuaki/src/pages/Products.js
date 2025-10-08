import React, { useState } from 'react';
import products from '../data/products';
import './Products.css';

const Products = ({ addToCart, addToWishlist, wishlist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = priceFilter === 'all' || 
                          (priceFilter === 'under2m' && product.price < 2000000) ||
                          (priceFilter === '2m-3m' && product.price >= 2000000 && product.price <= 3000000) ||
                          (priceFilter === 'over3m' && product.price > 3000000);
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1><i className="bi bi-collection"></i> Bộ Sưu Tập Nước Hoa</h1>
          <p className="page-subtitle">Khám phá những mùi hương độc đáo và tinh tế</p>
        </div>
        
        {/* Bộ lọc và tìm kiếm */}
        <div className="filters-section-luxury">
          <div className="search-container-luxury">
            <div className="search-icon">
              <i className="bi bi-search"></i>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm... (ví dụ: CM24)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-luxury"
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
          
          <div className="filters-container-luxury">
            <div className="filter-group">
              <label className="filter-label">
                <i className="bi bi-funnel me-1"></i>Lọc theo giá
              </label>
              <select 
                value={priceFilter} 
                onChange={(e) => setPriceFilter(e.target.value)}
                className="filter-select-luxury"
              >
                <option value="all">Tất cả giá</option>
                <option value="under2m">Dưới 2 triệu</option>
                <option value="2m-3m">2 - 3 triệu</option>
                <option value="over3m">Trên 3 triệu</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">
                <i className="bi bi-sort-down me-1"></i>Sắp xếp
              </label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select-luxury"
              >
                <option value="name">Theo tên A-Z</option>
                <option value="price-low">Giá: Thấp đến cao</option>
                <option value="price-high">Giá: Cao đến thấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Thông tin kết quả */}
        <div className="results-info">
          <p>
            <i className="bi bi-info-circle me-1"></i>
            Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm
            {searchTerm && ` cho từ khóa "${searchTerm}"`}
          </p>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="products-grid">
          {filteredProducts.map(product => {
            const isInWishlist = wishlist.some(item => item.id === product.id);
            
            return (
              <div key={product.id} className="product-card-luxury">
                <div className="product-image-luxury">
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay">
                    <button 
                      className="quick-view-btn"
                      onClick={() => addToCart(product)}
                    >
                      <i className="bi bi-cart-plus me-1"></i>Thêm vào giỏ
                    </button>
                  </div>
                  <button 
                    className={`wishlist-heart ${isInWishlist ? 'in-wishlist' : ''}`}
                    onClick={() => addToWishlist(product)}
                  >
                    <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                  </button>
                </div>
                <div className="product-info-luxury">
                  <h3>{product.name}</h3>
                  <p className="product-description-luxury">{product.description}</p>
                  <div className="product-price-luxury">
                    {formatPrice(product.price)}
                  </div>
                  <button 
                    className="add-to-cart-btn-luxury"
                    onClick={() => addToCart(product)}
                  >
                    <i className="bi bi-cart3 me-2"></i>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products-luxury">
            <div className="no-products-icon">
              <i className="bi bi-search" style={{fontSize: '4rem'}}></i>
            </div>
            <h3>Không tìm thấy sản phẩm phù hợp</h3>
            <p>Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setSearchTerm('');
                setPriceFilter('all');
                setSortBy('name');
              }}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;