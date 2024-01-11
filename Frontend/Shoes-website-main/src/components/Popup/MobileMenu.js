import React from "react";
import './MobileMenu.css';
import { Link } from 'react-router-dom';
const MiniMenu = ({ MenuOpen, MenuClose }) => {
    const handleOverlayClick = () => {
        if (MenuOpen) {
            MenuClose();
        }
    };

return(
    <><div id="backMenu" className={`backMenu ${MenuOpen ? 'show-back' : ''}`} onClick={handleOverlayClick}></div><div className={`side-menu-container ${MenuOpen ? 'open-menu' : ''}`}>
        <div id="sidemenu" className={`sidemenu ${MenuOpen ? 'open-menu' : ''}`}>

            <div className="menu-actions">
                <a href="" className="button-menu">
                    <div className="icon-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span>Menu</span>
                </a>
                <a href="login.html" className="button-login">
                    <span><i className="fa-regular fa-user" style={{ fontSize: '15px', marginRight: '10px' }}></i>LOGIN</span>
                </a>
            </div>

            <div className="sidemenu-content">
                <div className="menu-section">
                    <div className="menu-list">
                        <Link to="/Shoes-website">HOME</Link>
                    </div>
                    <div className="menu-list">
                        <Link to="/product">SHOP</Link>
                    </div>
                    <div className="menu-list">
                        <Link to="/aboutus">ABOUT US</Link>
                    </div>

                    <div className="menu-list">
                        <Link to="/blog">BLOG</Link>
                    </div>
                    <div className="menu-list">
                        <Link to="/contact">CONTACT US</Link>
                    </div>

                </div>
            </div>
            <div id="close-menu" className="close-menu" onClick={MenuClose}>Close</div>

        </div>
    </div></>
)
}

export default MiniMenu