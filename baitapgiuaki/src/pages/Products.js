import React, { useState } from 'react';
import products from '../data/products';
import './Products.css';

const Products = ({ addToCart }) => {
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
        <h1>Bộ Sưu Tập Nước Hoa</h1>
        
        {/* Bộ lọc và tìm kiếm */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm... (ví dụ: CM24)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <select 
              value={priceFilter} 
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">Tất cả giá</option>
              <option value="under2m">Dưới 2 triệu</option>
              <option value="2m-3m">2 - 3 triệu</option>
              <option value="over3m">Trên 3 triệu</option>
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sắp xếp theo tên</option>
              <option value="price-low">Giá thấp đến cao</option>
              <option value="price-high">Giá cao đến thấp</option>
            </select>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">{formatPrice(product.price)}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>Không tìm thấy sản phẩm phù hợp với tìm kiếm của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;