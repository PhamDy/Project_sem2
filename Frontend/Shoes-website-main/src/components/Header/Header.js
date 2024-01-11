import React, { useState } from 'react';
import  './Header.css';
import Sidecart from '../Popup/sidecart';
import SearchBar from '../Popup/SearchBar';
import MiniMenu from '../Popup/MobileMenu';
import { Link } from 'react-router-dom';


function Header() {
    const [isSidecartOpen, setSidecartOpen] = useState(false);

    const handleOpenSidecart = () => {
      setSidecartOpen(true);
    };
  
    const handleCloseSidecart = () => {
      setSidecartOpen(false);
    };

    const [isSearchBarOpen, setSearchBarOpen] = useState(false);

    const handleOpenSearchBar = () => {
        setSearchBarOpen(true);
    };

    const handleCloseSearchBar = () => {
        setSearchBarOpen(false);
    }

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleOpenMenu = () => {
        setMenuOpen(true);
    };

    const handleCloseMenu = () => {
        setMenuOpen(false);
    }

    return (
        <>
         <SearchBar SearchOpen={isSearchBarOpen} SearchClose={handleCloseSearchBar} />
        <div id="header">
                <div className="container container-header">
                    <div className="row header-row">
                        <div className="col-md-2 header-1">
                            <Link className="header-logo" to="/Shoes-website">WALKZ</Link>

                            <div id="icon-navbar" className="icon-navbar" onClick={handleOpenMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="col-md-8 header-2" style={{ justifyContent: 'center', textAlign: 'center' }}>
                            <ul className="nav-item-box">
                                <li className="nav-item"><Link to="/Shoes-website" className="underline">Home</Link></li>
                                <li className="nav-item"><Link to="/product" className="underline">Shop</Link></li>
                                <li className="nav-item"><Link to="/aboutus" className="underline">About Us</Link></li>
                                <li className="nav-item"><Link to="/blog" className="underline">Blog</Link></li>
                                <li className="nav-item"><Link to="/contact" className="underline">Contact Us</Link></li>

                            </ul>
                            <div className="header-small-content">
                                <a style={{ display: 'none' }} className="header-logo-smaller" href="index.html">WALKZ</a>
                            </div>
                        </div>
                        <div className="col-md-2 header-3">
                            <ul className="icon-box">
                                <li className="nav-icon" id="search-icon" onClick={handleOpenSearchBar}> <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '18px' }}></i></li>
                                <li className="nav-icon user-icon"><a href="login.html"> <i className="fa-regular fa-user"></i></a></li>
                                <li style={{ position: 'relative' }} className="nav-icon" id="open-cart-btn" onClick={handleOpenSidecart}><i className="fa-solid fa-basket-shopping"></i>
                                    <span className="amount-cart">1</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <MiniMenu MenuOpen={isMenuOpen} MenuClose={handleCloseMenu} />
                <Sidecart isOpen={isSidecartOpen} onClose={handleCloseSidecart} />
            </div><section className="banner-section">
                <div className="container-fluid container-banner">
                    <div className="banner-sections">
                        <div className="box-content-right">
                            <div className="text-right box-info">
                                <div style={{ textAlign: 'right' }} className="box-title1">
                                    <h3 className="title-small mb-0">NEW!</h3>
                                </div>
                                <div className="box-title2">
                                    <h3 className="titlebig mb-0">MINZUNO INDOOR</h3>
                                </div>
                                <div className="box-title3">
                                    <h3 className="title-small mb-0">For players seeking a resilient K-Leather futsal shoe.<br />Especially suited to players with great technique and speed.</h3>
                                </div>
                                <div className="btn-banner">
                                    <a className="btn-banner-main" href="product.html">SHOP NOW</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
    )
}

export default Header;