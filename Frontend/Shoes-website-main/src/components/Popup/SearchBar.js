import React from "react";
import './SearchBar.css';


const SearchBar = ({ SearchOpen, SearchClose }) => {
    const handleOverlayClick = () => {
        if (SearchOpen) {
            SearchClose();
        }
    };
return (
    <><div id="backdrop2" className={`backdrop2 ${SearchOpen ? 'shows' : ''}`} onClick={handleOverlayClick}></div><div id="back-of-search" className={`container-fsearchluid back-of-search-container ${SearchOpen ? 'opens-back' : ''}`}></div><div className={`search-bar ${SearchOpen ? 'opens' : ''}`} id="search-bar">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="search-top">
                        <h3 className="search-title">Start typing and hit Enter</h3>
                    </div>
                    <form className="search-form" action="">
                        <input type="hidden" name="type" value="product" />
                        <input type="text" name="" placeholder="Search Product" className="search-input" />
                        <button className="button-search"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    <div id="close-search" className="close-search">
                        <span onClick={SearchClose}>&times;</span>
                    </div>
                    <div className="search-result">
                        <div className="the-result row">
                            <div className="col-md-4">
                                <ul className="prod-search">
                                    <li className="product-info-search">
                                        <a href=""><img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes1.webp" alt="" className="search-prod-img" /></a>
                                        <h4 className="product-title-search">
                                            <a href=""> BaskedBall
                                                <span className="highlight">Shoes</span>
                                            </a>
                                        </h4>
                                        <span>
                                            <p className="price-product-search mb-0">
                                                <span className="price">$179.99 USD</span>
                                                <s className="old-price">$213.00 USD</s>
                                            </p>
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-4">
                                <ul className="prod-search">
                                    <li className="product-info-search">
                                        <a href=""><img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes2.webp" alt="" className="search-prod-img" /></a>
                                        <h4 className="product-title-search">
                                            <a href=""> On Cloudflyer Men

                                            </a>
                                        </h4>
                                        <span>
                                            <p className="price-product-search mb-0">
                                                <span className="price">$179.99 USD</span>
                                                <s className="old-price">$213.00 USD</s>
                                            </p>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <ul className="prod-search">
                                    <li className="product-info-search">
                                        <a href=""><img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes2.webp" alt="" className="search-prod-img" /></a>
                                        <h4 className="product-title-search">
                                            <a href=""> On Cloudflyer Men

                                            </a>
                                        </h4>
                                        <span>
                                            <p className="price-product-search mb-0">
                                                <span className="price">$179.99 USD</span>
                                                <s className="old-price">$213.00 USD</s>
                                            </p>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <ul className="prod-search">
                                    <li className="product-info-search">
                                        <a href=""><img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes2.webp" alt="" className="search-prod-img" /></a>
                                        <h4 className="product-title-search">
                                            <a href=""> On Cloudflyer Men

                                            </a>
                                        </h4>
                                        <span>
                                            <p className="price-product-search mb-0">
                                                <span className="price">$179.99 USD</span>
                                                <s className="old-price">$213.00 USD</s>
                                            </p>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <ul className="prod-search">
                                    <li className="product-info-search">
                                        <a href=""><img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes2.webp" alt="" className="search-prod-img" /></a>
                                        <h4 className="product-title-search">
                                            <a href=""> On Cloudflyer Men

                                            </a>
                                        </h4>
                                        <span>
                                            <p className="price-product-search mb-0">
                                                <span className="price">$179.99 USD</span>
                                                <s className="old-price">$213.00 USD</s>
                                            </p>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <ul className="prod-search">
                                    <li className="product-info-search">
                                        <a href=""><img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes2.webp" alt="" className="search-prod-img" /></a>
                                        <h4 className="product-title-search">
                                            <a href=""> On Cloudflyer Men

                                            </a>
                                        </h4>
                                        <span>
                                            <p className="price-product-search mb-0">
                                                <span className="price">$179.99 USD</span>
                                                <s className="old-price">$213.00 USD</s>
                                            </p>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <ul className="prod-search">
                                    <li className="product-info-search">
                                        <a href=""><img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes2.webp" alt="" className="search-prod-img" /></a>
                                        <h4 className="product-title-search">
                                            <a href=""> On Cloudflyer Men

                                            </a>
                                        </h4>
                                        <span>
                                            <p className="price-product-search mb-0">
                                                <span className="price">$179.99 USD</span>
                                                <s className="old-price">$213.00 USD</s>
                                            </p>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <ul className="prod-search">
                                    <li className="product-info-search">
                                        <a href=""><img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes2.webp" alt="" className="search-prod-img" /></a>
                                        <h4 className="product-title-search">
                                            <a href=""> On Cloudflyer Men

                                            </a>
                                        </h4>
                                        <span>
                                            <p className="price-product-search mb-0">
                                                <span className="price">$179.99 USD</span>
                                                <s className="old-price">$213.00 USD</s>
                                            </p>
                                        </span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div></>
)

}

export default SearchBar