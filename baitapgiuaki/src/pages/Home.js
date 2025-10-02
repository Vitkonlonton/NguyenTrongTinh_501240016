import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Chào Mừng Đến Với PERFUME SHOP</h1>
          <p className="hero-subtitle">Nơi Hương Thơu Trở Thành Phong Cách</p>
        </div>
      </section>

      <section className="intro-section">
        <div className="container">
          <h2>Sức Mạnh Của Hương Thơm</h2>
          <div className="intro-content">
            <div className="intro-text">
              <p>
                Nước hoa không chỉ là một loại mỹ phẩm - đó là một tuyên bố về cá tính, 
                một vũ khí quyến rũ và một phần không thể thiếu trong phong cách của bạn.
              </p>
              
              <h3>✨ Tác Dụng Kỳ Diệu Của Nước Hoa</h3>
              <ul>
                <li>🎯 <strong>Tăng sự tự tin</strong> - Mùi hương phù hợp giúp bạn tỏa sáng</li>
                <li>💫 <strong>Thu hút ánh nhìn</strong> - Tạo ấn tượng khó phai</li>
                <li>🎭 <strong>Thể hiện cá tính</strong> - Mỗi mùi hương kể một câu chuyện</li>
                <li>🌙 <strong>Ghi nhớ đặc biệt</strong> - Mùi hương tạo nên ký ức</li>
                <li>🔥 <strong>Quyến rũ tức thì</strong> - Sức hút không thể cưỡng lại</li>
              </ul>

              <h3>🌹 Sự Quyến Rũ Vĩnh Cửu</h3>
              <p>
                Một chai nước hoa cao cấp không chỉ là mùi hương - đó là nghệ thuật, là cảm xúc, 
                là vũ điệu của các tầng hương hòa quyện. Từ hương đầu tươi mới, hương giữa ấm áp 
                đến hương cuối lưu luyến, mỗi giai đoạn đều mang đến trải nghiệm độc đáo.
              </p>

              <div className="cta-section">
                <h3>🎁 Khám Phá Bộ Sưu Tập Của Chúng Tôi</h3>
                <p>
                  Với hơn 200 nhãn hiệu nước hoa cao cấp từ khắp nơi trên thế giới, 
                  chúng tôi cam kết mang đến cho bạn những lựa chọn hoàn hảo nhất. 
                  Từ cổ điển sang trọng đến hiện đại cá tính, mọi phong cách đều được đáp ứng.
                </p>
              </div>
            </div>
            
            <div className="intro-image">
              <div className="perfume-showcase">
                <div className="perfume-bottle"></div>
                <div className="scent-waves"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;