import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          
          {/* Về chúng tôi */}
          <div className="footer-section">
            <h3>Về Chúng Tôi</h3>
            <p>
              Ra đời vào ngày 14/8/2004 và hiện tại là nơi cung cấp hơn 200 nhãn hiệu 
              nước hoa cao cấp trên thế giới. Là website nước hoa đầu tiên tại Việt Nam. 
              Định hướng của chúng tôi là trở thành nhà cung cấp nước hoa số 1 tại VN, 
              mang lại sự lựa chọn đa dạng, sự thuận tiện, tiết kiệm tiền & thời gian, 
              đồng thời mang đến sự yên tâm & hài lòng đến với khách hàng.
            </p>
          </div>

          {/* Liên hệ */}
          <div className="footer-section">
            <h3>Liên Hệ</h3>
            <div className="contact-info">
              <p>🕐 <strong>Giờ hoạt động:</strong> 08h - 22h hàng ngày (cả T7 CN)</p>
              <p>📞 <strong>Tổng đài tư vấn 1:</strong> 0902290028</p>
              <p>📞 <strong>Tổng đài tư vấn 2:</strong> 0906919492</p>
              <p>📧 <strong>Email liên hệ:</strong> tinhtrong10112004@gmail.com</p>
            </div>
          </div>

          {/* Hỗ trợ */}
          <div className="footer-section">
            <h3>Hỗ Trợ</h3>
            <ul className="support-links">
              <li><a href="#membership">Khách hàng thân thiết (Membership)</a></li>
              <li><a href="#guide">Hướng dẫn đặt hàng & thanh toán</a></li>
              <li><a href="#terms">Điều khoản sử dụng website</a></li>
              <li><a href="#privacy">Chính sách bảo mật</a></li>
              <li><a href="#warranty">Chính sách bảo hành & đổi trả</a></li>
            </ul>
          </div>

          {/* Kết nối */}
          <div className="footer-section">
            <h3>Kết Nối</h3>
            <div className="social-links">
              <a href="#" className="social-link facebook" title="Facebook">
                📘 Facebook
              </a>
              <a href="#" className="social-link instagram" title="Instagram">
                📷 Instagram
              </a>
              <a href="#" className="social-link youtube" title="YouTube">
                📺 YouTube
              </a>
              <a href="#" className="social-link zalo" title="Zalo">
                💬 Zalo
              </a>
            </div>
          </div>

        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 PERFUME SHOP. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;