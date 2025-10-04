import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';
import './ProductDetail.css';

const ProductDetail = ({ addToCart, addToWishlist, wishlist }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    author: ''
  });

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    
    // Load reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem(`product_${id}_reviews`) || '[]');
    setReviews(savedReviews);
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) {
      alert('Vui lòng điền đầy đủ thông tin đánh giá!');
      return;
    }

    const review = {
      ...newReview,
      id: Date.now(),
      date: new Date().toLocaleDateString('vi-VN'),
      productId: product.id
    };

    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    localStorage.setItem(`product_${id}_reviews`, JSON.stringify(updatedReviews));
    
    setNewReview({ rating: 5, comment: '', author: '' });
    alert('Cảm ơn bạn đã đánh giá sản phẩm!');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-not-found">
            <h2>Không tìm thấy sản phẩm</h2>
            <p>Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
          </div>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="#home">Trang chủ</a>
          <span> / </span>
          <a href="#products">Sản phẩm</a>
          <span> / </span>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images-section">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
              <div className="image-badge">🔥 Bán chạy</div>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="product-header">
              <h1>{product.name}</h1>
              <button 
                className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
                onClick={handleAddToWishlist}
                title={isInWishlist ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
              >
                {isInWishlist ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="product-rating">
              <div className="stars">
                {'★'.repeat(5)}
                <span className="rating-text">({reviews.length} đánh giá)</span>
              </div>
              <div className="average-rating">
                ⭐ {calculateAverageRating()}/5
              </div>
            </div>

            <div className="product-price-detail">
              <span className="current-price">{formatPrice(product.price)}</span>
              <span className="original-price">{formatPrice(product.price * 1.2)}</span>
              <span className="discount-badge">-20%</span>
            </div>

            <div className="product-description-detail">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <div>
                  <strong>Miễn phí vận chuyển</strong>
                  <p>Cho đơn hàng từ 1.000.000đ</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🔄</span>
                <div>
                  <strong>Đổi trả 7 ngày</strong>
                  <p>Hoàn tiền 100%</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🎁</span>
                <div>
                  <strong>Quà tặng đặc biệt</strong>
                  <p>Kèm hộp quà cao cấp</p>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="purchase-section">
              <div className="quantity-selector">
                <label>Số lượng:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="add-to-cart-detail"
                  onClick={handleAddToCart}
                >
                  🛒 Thêm vào giỏ hàng
                </button>
                <button className="buy-now-btn">
                  💳 Mua ngay
                </button>
              </div>
            </div>

            {/* Product Meta */}
            <div className="product-meta">
              <div className="meta-item">
                <strong>SKU:</strong> PERFUME-{product.id}
              </div>
              <div className="meta-item">
                <strong>Danh mục:</strong> Nước hoa cao cấp
              </div>
              <div className="meta-item">
                <strong>Tags:</strong> #{product.name.replace(/\s+/g, '')}, #perfume, #luxury
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs-section">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              📖 Mô tả sản phẩm
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              📋 Thông số kỹ thuật
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              ⭐ Đánh giá ({reviews.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Chi Tiết Sản Phẩm</h3>
                <p>
                  {product.name} là một trong những tác phẩm nghệ thuật hương thơm độc đáo, 
                  được chế tác tỉ mỉ bởi các chuyên gia hàng đầu trong ngành nước hoa. 
                  Mỗi chai {product.name} đều mang trong mình câu chuyện riêng, tạo nên 
                  dấu ấn khó phai trong lòng người sử dụng.
                </p>
                
                <h4>🎯 Đặc điểm nổi bật:</h4>
                <ul>
                  <li>Hương thơm lưu giữ lâu đến 8-12 giờ</li>
                  <li>Thiết kế chai đựng sang trọng, tinh tế</li>
                  <li>Thành phần tự nhiên, an toàn cho da</li>
                  <li>Phù hợp cho mọi dịp sử dụng</li>
                </ul>

                <h4>👃 Phân tầng hương thơm:</h4>
                <div className="scent-pyramid">
                  <div className="scent-level">
                    <strong>Hương đầu:</strong> Tươi mới, ấn tượng ngay lần đầu tiếp xúc
                  </div>
                  <div className="scent-level">
                    <strong>Hương giữa:</strong> Ấm áp, quyến rũ và đầy cảm xúc
                  </div>
                  <div className="scent-level">
                    <strong>Hương cuối:</strong> Đậm đà, lưu luyến khó quên
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <h3>Thông Số Kỹ Thuật</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <strong>Dung tích:</strong>
                    <span>100ml</span>
                  </div>
                  <div className="spec-item">
                    <strong>Nồng độ:</strong>
                    <span>Eau de Parfum (EDP)</span>
                  </div>
                  <div className="spec-item">
                    <strong>Xuất xứ:</strong>
                    <span>Pháp</span>
                  </div>
                  <div className="spec-item">
                    <strong>Giới tính:</strong>
                    <span>Unisex</span>
                  </div>
                  <div className="spec-item">
                    <strong>Độ lưu hương:</strong>
                    <span>8-12 giờ</span>
                  </div>
                  <div className="spec-item">
                    <strong>Độ tỏa hương:</strong>
                    <span>Trung bình - Mạnh</span>
                  </div>
                  <div className="spec-item">
                    <strong>Năm phát hành:</strong>
                    <span>2024</span>
                  </div>
                  <div className="spec-item">
                    <strong>Phong cách:</strong>
                    <span>{product.description}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <div className="reviews-header">
                  <div className="reviews-summary">
                    <h3>Đánh Giá Sản Phẩm</h3>
                    <div className="overall-rating">
                      <div className="rating-score">{calculateAverageRating()}</div>
                      <div className="rating-stars">{'★'.repeat(5)}</div>
                      <div className="rating-count">{reviews.length} đánh giá</div>
                    </div>
                  </div>

                  {/* Add Review Form */}
                  <form className="review-form" onSubmit={handleReviewSubmit}>
                    <h4>Thêm đánh giá của bạn</h4>
                    <div className="form-group">
                      <label>Tên của bạn:</label>
                      <input
                        type="text"
                        value={newReview.author}
                        onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                        placeholder="Nhập tên của bạn"
                      />
                    </div>
                    <div className="form-group">
                      <label>Đánh giá sao:</label>
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            className={`star-btn ${newReview.rating >= star ? 'active' : ''}`}
                            onClick={() => setNewReview({...newReview, rating: star})}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Bình luận:</label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                        rows="4"
                      />
                    </div>
                    <button type="submit" className="submit-review-btn">
                      Gửi đánh giá
                    </button>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="reviews-list">
                  {reviews.length === 0 ? (
                    <div className="no-reviews">
                      <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                      <p>Hãy là người đầu tiên đánh giá!</p>
                    </div>
                  ) : (
                    reviews.map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="review-author">
                            <strong>{review.author}</strong>
                            <div className="review-stars">
                              {'★'.repeat(review.rating)}
                            </div>
                          </div>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;