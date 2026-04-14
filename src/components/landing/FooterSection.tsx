import './landing.css';

export function FooterSection() {
  return (
    <footer className="footer-section">
      <div className="container footer__content">
        <p className="footer__univ">
          Sản phẩm học thuật môn Triết Học Mác - Lênin • <strong>FPT University</strong>
        </p>
        <div className="footer__members">
          <span>Nguyễn Văn Học - SS181054</span>
          <span>Ngô Thành Đạt - SE180026</span>
          <span>Huỳnh Khả Tú - SE182134</span>
          <span>Uông Thanh Tú - SE183853</span>
        </div>
      </div>
    </footer>
  );
}
