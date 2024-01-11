import React from 'react';
import './Footer.css';

function Footer() {
    return (
      <div className='footer'>
        <div className="top-footer">
          <div className="container container-homepage">
            <div className="row">
              <div className="col-md-3 footer-padding">
                <div className="info-footer">
                  <div className="logo-name">
                    <a href="">
                      <h1>WALKZ</h1>
                    </a>
                  </div>
                  <p className="info-subs">
                    Subscribe our newsletter and get <br />discount 30% off
                  </p>
                  <div className="newsletter-email">
                    <form action method="post">
                      <div className="form-email">
                        <input type="email" name="EMAIL" className="form-control" placeholder="Your email address..." required />
                      </div>
                      <button className="footer-btn" type="submit">
                        <i className="fa-solid fa-paper-plane"></i>
                      </button>
                    </form>
                  </div>
                  <div className="social-footer">
                    <div>
                      <a className="social" href="">
                        <i className="fa-brands fa-square-x-twitter"></i>
                      </a>
                      <a className="social" href="">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a className="social" href="">
                        <i className="fa-brands fa-youtube"></i>
                      </a>
                      <a className="social" href="">
                        <i className="fa-brands fa-facebook"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 footer-border">
                <div className="footer-info">
                  <div className="header-detail-footer">
                    <h4>HOW CAN WE HELP YOU?</h4>
                    <hr />
                  </div>
                  <div className="footer-detail-content">
                    <li>
                      <a href="">Printing and embroidery</a>
                    </li>
                    <li>
                      <a href="">Frequently Asked Questions</a>
                    </li>
                    <li>
                      <a href="">Delivery time and costs</a>
                    </li>
                    <li>
                      <a href="">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="">Warranty</a>
                    </li>
                    <li>
                      <a href="">Returns</a>
                    </li>
                    <li>
                      <a href="">Cookies</a>
                    </li>
                  </div>
                </div>
              </div>
              <div className="col-md-3 footer-border">
                <div className="footer-info">
                  <div className="header-detail-footer">
                    <h4>CHOOSE YOUR SPORT</h4>
                    <hr />
                  </div>
                  <div className="footer-detail-content">
                    <li>
                      <a href="Running.html">Running</a>
                    </li>
                    <li>
                      <a href="basketball.html">Basketball</a>
                    </li>
                    <li>
                      <a href="">Handball</a>
                    </li>
                    <li>
                      <a href="">Field Hockey</a>
                    </li>
                    <li>
                      <a href="volleyball.html">Volleyball</a>
                    </li>
                    <li>
                      <a href="">Squash</a>
                    </li>
                    <li>
                      <a href="tennisShoes.html">Tennis</a>
                    </li>
                    <li>
                      <a href="">Korfball</a>
                    </li>
                  </div>
                </div>
              </div>
              <div className="col-md-3 footer-border">
                <div className="footer-info">
                  <div className="header-detail-footer">
                    <h4>CUSTOMER SERVICES</h4>
                    <hr />
                  </div>
                  <div className="footer-detail-content">
                    <li>
                      <a href="">Contact Us</a>
                    </li>
                    <li>
                      <a href="">Corporate Sale/Wholesalers</a>
                    </li>
                    <li>
                      <a href="">FAQ</a>
                    </li>
                    <li>
                      <a href="">Click&Collect</a>
                    </li>
                    <li>
                      <a href="">Size Guide</a>
                    </li>
                    <li>
                      <a href="">Shipping</a>
                    </li>
                    <li>
                      <a href="">Shipping</a>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <div className="containe">
            <div className="row align-items-center">
              <div className="col-md-6 text-md-left">
                <div className="copyright-text">
                  <p style={{ marginBottom: '0' }}>© Copyright | 2023 All Rights Reserved</p>
                </div>
              </div>
              <div className="col-md-6 text-md-right">
                <img src="Shoes/IMAGES/Home_Page_Picture/pay_copyright.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Footer;