import React from "react";
import './sidecart.css'

const Sidecart = ({ isOpen, onClose }) => {
    const handleOverlayClick = () => {
        if (isOpen) {
            onClose();
        }
    };
    return (
        <><div id="backdrop" className={`backdrop ${isOpen ? 'show' : ''}`} onClick={handleOverlayClick}></div><div className={`side-cart-container ${isOpen ? 'open' : ''}`}>
            <div id="sidecart" className={`sidecart ${isOpen ? 'open' : ''}`}>

                <div className="cart-header">
                    <span onClick={onClose} id="close-btn">&times;</span>
                    <h3 className="cart-title">Shopping Cart</h3>
                    <div className="cart-count">
                        <span>1</span>
                    </div>
                </div>
                <div className="cart-items">
                    <div className="prod">


                        <div className="product-cart">
                            <ol style={{ listStyle: 'none' }}>
                                <li className="d-flex">
                                    <div className="img-product-cart">
                                        <a href="">
                                            <img src="Shoes/IMAGES/Home_Page_Picture/cap 1.webp" alt="" style={{ maxWidth: '100%' }} />
                                        </a>
                                    </div>
                                    <div className="product-detail-cart">
                                        <h3 className="product-name-mini">
                                            <a href="">
                                                Ciele Athletics - <br />
                                                <span className="">M / White</span>
                                            </a>
                                        </h3>
                                        <div className="product-info-cart">
                                            <div className="product-quantity-mini">QTY : 1</div>
                                            <div className="product-price-mini">
                                                <span>$34.95</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-remove">
                                        <a href=""><i className="fa-solid fa-trash"></i></a>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div className="product-cart">
                            <ol style={{ listStyle: 'none' }}>
                                <li className="d-flex">
                                    <div className="img-product-cart">
                                        <a href="">
                                            <img src="Shoes/IMAGES/Home_Page_Picture/cap 1.webp" alt="" style={{ maxWidth: '100%' }} />
                                        </a>
                                    </div>
                                    <div className="product-detail-cart">
                                        <h3 className="product-name-mini">
                                            <a href="">
                                                Ciele Athletics - <br />
                                                <span className="">M / White</span>
                                            </a>
                                        </h3>
                                        <div className="product-info-cart">
                                            <div className="product-quantity-mini">QTY : 1</div>
                                            <div className="product-price-mini">
                                                <span>$34.95</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-remove">
                                        <a href=""><i className="fa-solid fa-trash"></i></a>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="product-cart">
                            <ol style={{ listStyle: 'none' }}>
                                <li className="d-flex">
                                    <div className="img-product-cart">
                                        <a href="">
                                            <img src="Shoes/IMAGES/Home_Page_Picture/cap 1.webp" alt="" style={{ maxWidth: '100%' }} />
                                        </a>
                                    </div>
                                    <div className="product-detail-cart">
                                        <h3 className="product-name-mini">
                                            <a href="">
                                                Ciele Athletics - <br />
                                                <span className="">M / White</span>
                                            </a>
                                        </h3>
                                        <div className="product-info-cart">
                                            <div className="product-quantity-mini">QTY : 1</div>
                                            <div className="product-price-mini">
                                                <span>$34.95</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-remove">
                                        <a href=""><i className="fa-solid fa-trash"></i></a>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="product-cart">
                            <ol style={{ listStyle: 'none' }}>
                                <li className="d-flex">
                                    <div className="img-product-cart">
                                        <a href="">
                                            <img src="Shoes/IMAGES/Home_Page_Picture/cap 1.webp" alt="" style={{ maxWidth: '100%' }} />
                                        </a>
                                    </div>
                                    <div className="product-detail-cart">
                                        <h3 className="product-name-mini">
                                            <a href="">
                                                Ciele Athletics - <br />
                                                <span className="">M / White</span>
                                            </a>
                                        </h3>
                                        <div className="product-info-cart">
                                            <div className="product-quantity-mini">QTY : 1</div>
                                            <div className="product-price-mini">
                                                <span>$34.95</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-remove">
                                        <a href=""><i className="fa-solid fa-trash"></i></a>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="product-cart">
                            <ol style={{ listStyle: 'none' }}>
                                <li className="d-flex">
                                    <div className="img-product-cart">
                                        <a href="">
                                            <img src="Shoes/IMAGES/Home_Page_Picture/cap 1.webp" alt="" style={{ maxWidth: '100%' }} />
                                        </a>
                                    </div>
                                    <div className="product-detail-cart">
                                        <h3 className="product-name-mini">
                                            <a href="">
                                                Ciele Athletics - <br />
                                                <span className="">M / White</span>
                                            </a>
                                        </h3>
                                        <div className="product-info-cart">
                                            <div className="product-quantity-mini">QTY : 1</div>
                                            <div className="product-price-mini">
                                                <span>$34.95</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-remove">
                                        <a href=""><i className="fa-solid fa-trash"></i></a>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="product-cart">
                            <ol style={{ listStyle: 'none' }}>
                                <li className="d-flex">
                                    <div className="img-product-cart">
                                        <a href="">
                                            <img src="Shoes/IMAGES/Home_Page_Picture/cap 1.webp" alt="" style={{ maxWidth: '100%' }} />
                                        </a>
                                    </div>
                                    <div className="product-detail-cart">
                                        <h3 className="product-name-mini">
                                            <a href="">
                                                Ciele Athletics - <br />
                                                <span className="">M / White</span>
                                            </a>
                                        </h3>
                                        <div className="product-info-cart">
                                            <div className="product-quantity-mini">QTY : 1</div>
                                            <div className="product-price-mini">
                                                <span>$34.95</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-remove">
                                        <a href=""><i className="fa-solid fa-trash"></i></a>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="product-cart">
                            <ol style={{ listStyle: 'none' }}>
                                <li className="d-flex">
                                    <div className="img-product-cart">
                                        <a href="">
                                            <img src="Shoes/IMAGES/Home_Page_Picture/cap 1.webp" alt="" style={{ maxWidth: '100%' }} />
                                        </a>
                                    </div>
                                    <div className="product-detail-cart">
                                        <h3 className="product-name-mini">
                                            <a href="">
                                                Ciele Athletics - <br />
                                                <span className="">M / White</span>
                                            </a>
                                        </h3>
                                        <div className="product-info-cart">
                                            <div className="product-quantity-mini">QTY : 1</div>
                                            <div className="product-price-mini">
                                                <span>$34.95</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-remove">
                                        <a href=""><i className="fa-solid fa-trash"></i></a>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="product-cart">
                            <ol style={{ listStyle: 'none' }}>
                                <li className="d-flex">
                                    <div className="img-product-cart">
                                        <a href="">
                                            <img src="Shoes/IMAGES/Home_Page_Picture/cap 1.webp" alt="" style={{ maxWidth: '100%' }} />
                                        </a>
                                    </div>
                                    <div className="product-detail-cart">
                                        <h3 className="product-name-mini">
                                            <a href="">
                                                Ciele Athletics - <br />
                                                <span className="">M / White</span>
                                            </a>
                                        </h3>
                                        <div className="product-info-cart">
                                            <div className="product-quantity-mini">QTY : 1</div>
                                            <div className="product-price-mini">
                                                <span>$34.95</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-remove">
                                        <a href=""><i className="fa-solid fa-trash"></i></a>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="product-cart">
                            <ol style={{ listStyle: 'none' }}>
                                <li className="d-flex">
                                    <div className="img-product-cart">
                                        <a href="">
                                            <img src="Shoes/IMAGES/Home_Page_Picture/cap 1.webp" alt="" style={{ maxWidth: '100%' }} />
                                        </a>
                                    </div>
                                    <div className="product-detail-cart">
                                        <h3 className="product-name-mini">
                                            <a href="">
                                                Ciele Athletics - <br />
                                                <span className="">M / White</span>
                                            </a>
                                        </h3>
                                        <div className="product-info-cart">
                                            <div className="product-quantity-mini">QTY : 1</div>
                                            <div className="product-price-mini">
                                                <span>$34.95</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-remove">
                                        <a href=""><i className="fa-solid fa-trash"></i></a>
                                    </div>
                                </li>
                            </ol>
                        </div>



                    </div>
                </div>

                <div className="side-cart-bottom">
                    <div className="sub-total">
                        <span className="total-title float-left">Total:</span>
                        <span className="total-price float-right">$34.95</span>
                    </div>
                    <div className="cart-actions">
                        <a href="viewcart.html" className="button-viewcart">
                            <span>View Cart</span>
                        </a>
                        <a href="delivery.html" className="button-checkout">
                            <span>Check Out</span>
                        </a>
                    </div>
                </div>
            </div>

        </div></>
    )
}

export default Sidecart