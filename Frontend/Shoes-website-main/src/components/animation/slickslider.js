import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick.css'


const SlickSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
          {
            breakpoint: 1446,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 1230,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              autoplay: true,
              autoplaySpeed: 2000,
            },
          },
        ],
      };

    return (
       
        <div className="motivation-product hidden">
        <div className="container  ">
            <h3 className="motivation-title">MOTIVATION</h3>

             <Slider {...settings} className="row product-row image-slider"> 

                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                                <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes1.webp" alt=""/>
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-20%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                              <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">Aero Wave 19</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$156.00</s>
                            <span className="">$124.95</span>
                        </p>
                    </div>  
                </div>

                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                                <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes 3.webp" alt=""/>
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-21%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                                <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">On Cloudflyer Men</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$213.00</s>
                            <span className="">$169.95</span>
                        </p>
                    </div>  
                </div>
                
                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                            <img style={{ width: '100%' }} src="./Shoes/IMAGES/Home_Page_Picture/Shoes 4.webp" alt="" />
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-20%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                                <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">Triumph 19 Women</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$215.00</s>
                            <span className="">$169.95</span>
                        </p>
                    </div>  
                </div>
                
                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                                <img style={{ width: '100%' }}src="Shoes/IMAGES/Home_Page_Picture/shoes2.webp" alt=""/>
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-34%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                                <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">Vapor Cage 4</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$135.00</s>
                            <span className="">$90.00</span>
                        </p>
                    </div>  
                </div>

                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                                <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes1.webp" alt=""/>
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-20%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                                <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">Aero Wave 19</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$156.00</s>
                            <span className="">$124.95</span>
                        </p>
                    </div>  
                </div>

                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                                <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes 3.webp" alt=""/>
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-21%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                                <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">On Cloudflyer Men</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$213.00</s>
                            <span className="">$169.95</span>
                        </p>
                    </div>  
                </div>
                
                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                                <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes1.webp" alt=""/>
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-20%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                              <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">Aero Wave 19</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$156.00</s>
                            <span className="">$124.95</span>
                        </p>
                    </div>  
                </div>

                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                                <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes 3.webp" alt=""/>
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-21%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                                <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">On Cloudflyer Men</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$213.00</s>
                            <span className="">$169.95</span>
                        </p>
                    </div>  
                </div>
                
                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                                <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes 4.webp" alt=""/>
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-20%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                                <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">Triumph 19 Women</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$215.00</s>
                            <span className="">$169.95</span>
                        </p>
                    </div>  
                </div>
                
                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                                <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes2.webp" alt=""/>
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-34%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                                <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">Vapor Cage 4</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$135.00</s>
                            <span className="">$90.00</span>
                        </p>
                    </div>  
                </div>

                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                                <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes1.webp" alt=""/>
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-20%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                                <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">Aero Wave 19</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$156.00</s>
                            <span className="">$124.95</span>
                        </p>
                    </div>  
                </div>

                <div className="product-box">
                    <div className="product">
                        <div className="img-product">
                            <a href="">
                                <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes 3.webp" alt=""/>
                            </a>

                            <figure style={{ background: '#e12c43', color: '#ffffff' }} className="label-sale">
                                <span>-21%</span>
                            </figure>

                            <ul className="product-icon">
                                <li className="add-cart mr-0">
                                    <a href="">
                                        <i className="fa-solid fa-bag-shopping icon-1"></i>
                                    </a>
                                </li>
                                <li className="view-product mr-0">
                                    <button onclick="togglePopup()" href="">
                                        <i className="fa-solid fa-magnifying-glass icon-2"></i>
                                    </button>
                                </li>
                                <li className="add-favorite mr-0">
                                    <a href="">
                                        <i className="fa-regular fa-heart icon-3"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h4 className="product-title">
                            <a href="">On Cloudflyer Men</a>
                        </h4>
                        <p className="product-price">
                            <s className="">$213.00</s>
                            <span className="">$169.95</span>
                        </p>
                    </div>  
                </div>

                
                


                </Slider>
        </div>
    </div>

    )
}


export default SlickSlider;