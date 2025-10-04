import React from 'react';
import anh8 from '../assets/images/anh8.jpg'; // Import ảnh thật
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Chào Mừng Đến Với PERFUME SHOP</h1>
            <p className="hero-subtitle">Nơi Hương Thơm Trở Thành Phong Cách</p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section">
        <div className="container">
          <h2 className="section-title">Sức Mạnh Của Hương Thơm</h2>
          <div className="intro-content">
            <div className="intro-text">
              <div className="intro-block">
                <h3>🎯 Khám Phá Thế Giới Hương Thơm</h3>
                <p>
                  Tại <strong>PERFUME SHOP</strong>, chúng tôi tin rằng mỗi mùi hương là một câu chuyện, 
                  mỗi chai nước hoa là một tác phẩm nghệ thuật. Với hơn 200 thương hiệu nước hoa cao cấp 
                  từ khắp nơi trên thế giới, chúng tôi mang đến cho bạn trải nghiệm mua sắm độc đáo và 
                  đẳng cấp nhất.
                </p>
              </div>

              <div className="intro-block">
                <h3>✨ Phép Màu Của Nước Hoa</h3>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <span className="benefit-icon">💎</span>
                    <div>
                      <strong>Tăng Sự Tự Tin</strong>
                      <p>Mùi hương phù hợp giúp bạn tỏa sáng trong mọi hoàn cảnh</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🌟</span>
                    <div>
                      <strong>Thu Hút Ánh Nhìn</strong>
                      <p>Tạo ấn tượng khó phai trong lòng người đối diện</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🎭</span>
                    <div>
                      <strong>Thể Hiện Cá Tính</strong>
                      <p>Mỗi mùi hương kể một câu chuyện riêng về con người bạn</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🔮</span>
                    <div>
                      <strong>Ghi Dấu Ấn Đặc Biệt</strong>
                      <p>Mùi hương tạo nên những ký ức khó quên</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="intro-block">
                <h3>🌹 Hành Trình Cảm Xúc</h3>
                <p>
                  Một chai nước hoa cao cấp không chỉ đơn thuần là mùi hương - đó là một hành trình cảm xúc 
                  với ba tầng hương hòa quyện: <strong>Hương đầu</strong> tươi mới và ấn tượng, 
                  <strong> Hương giữa</strong> ấm áp và quyến rũ, <strong>Hương cuối</strong> đậm đà và lưu luyến. 
                  Mỗi giai đoạn đều mang đến những trải nghiệm độc đáo và đáng nhớ.
                </p>
              </div>

              <div className="cta-section">
                <h3>🚀 Bắt Đầu Hành Trình Của Bạn</h3>
                <p>
                  Khám phá bộ sưu tập độc quyền của chúng tôi và tìm ra mùi hương phản chiếu chân thực nhất 
                  con người bạn. Từ những hương cổ điển sang trọng đến các xu hướng hiện đại cá tính, 
                  <strong> PERFUME SHOP</strong> cam kết mang đến sự lựa chọn hoàn hảo nhất cho mọi phong cách.
                </p>
              </div>
            </div>
            
            <div className="intro-visual">
              <div className="perfume-image-container">
                <img 
                  src={anh8} 
                  alt="Nước hoa cao cấp PERFUME SHOP" 
                  className="perfume-real-image"
                />
                <div className="image-overlay">
                  <h4>Bộ Sưu Tập Độc Quyền</h4>
                  <p>Hương thơm vượt thời gian</p>
                </div>
                <div className="floating-notes">
                  <span className="note note-1">Hoa Hồng</span>
                  <span className="note note-2">Cam Bergamot</span>
                  <span className="note note-3">Gỗ Đàn Hương</span>
                  <span className="note note-4">Vanilla</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;