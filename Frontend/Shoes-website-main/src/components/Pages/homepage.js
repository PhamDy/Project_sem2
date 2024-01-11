//import logo from './logo.svg';
import '../../App.css';
import './homepage.css';
import SlickSlider from '../animation/slickslider';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function HomePage() {
  return (
    <div>
        <Header />

    <div className="section">
        
    <SlickSlider />


        <div style={{ marginTop: '150px' }} className="sport-banner-section hidden">
            <div className="container container-homepage">
                <div className="row">
                    <div className="col-md-4">
                        <div className="banner-box">
                            <div className="banner-items">
                                 <a href="" className="box-img">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/h1-banner-c.webp" alt=""/>
                                </a>
                                <div className="banner-content">
                                    <h3 style={{ color: '#e12c43' }}>$12</h3>
                                    <h3 style={{ color: '#2786b6' }}>Basketball Shoes <br/> The Shadow</h3>
                                    <a href="basketball.html" style={{ color: '#e12c43', fontWeight: 'bold' }}>View More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="banner-box">
                            <div className="banner-items">
                                 <a href="" className="box-img">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/h1-banner-b.webp" alt=""/>
                                </a>
                                <div className="banner-content">
                                    <h3 style={{ color: '#e12c43' }}>From $11</h3>
                                    <h3 style={{ color: '#2786b6' }}>NCAA Volleyball <br/> Selection Show</h3>
                                    <a href="volleyball.html" style={{ color: '#e12c43', fontWeight: 'bold' }}>View More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="banner-box">
                            <div className="banner-items">
                                 <a href="" className="box-img">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/h1-banner-d.webp" alt=""/>
                                </a>
                                <div className="banner-content">
                                    <h3 style={{ color: '#e12c43' }}>From $19</h3>
                                    <h3 style={{ color: '#2786b6' }}>The Best Tennis <br/> Shoes On Twitter</h3>
                                    <a href="tennisShoes.html" style={{ color: '#e12c43', fontWeight: 'bold' }}>View More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div className="your-choice-product hidden">
            <div className="container container-choiceproduct">
                
                    <h3 className="product-slider-heading">IT'S YOUR CHOICE</h3>
                    <a href="">
                        <button className="new-arrivals">NEW ARRIVALS</button>
                    </a>

                <div className="row product-row">
                    
                    <div className="product-box">
                        <div className="product">
                            <div className="img-product">
                                <a href="">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/cap 1.webp" alt=""/>
                                </a>

                              

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
                                <a href="">Ultralight Flash</a>
                            </h4>
                            <p className="product-price">
                                <s className=""></s>
                                <span className="">$35.00</span>
                            </p>
                        </div>  
                    </div>
                    <div className="product-box">
                        <div className="product">
                            <div className="img-product">
                                <a href="">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shirt 1.webp" alt=""/>
                                </a>

                                <figure style={{ background: '#e12c43', color: '#ffffff' }} className="absolute uppercase label-sale">
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
                                <a href="">TOP CREW MEN</a>
                            </h4>
                            <p className="product-price">
                                <s className="">$67.00</s>
                                <span className="">$54.00</span>
                            </p>
                        </div>  
                    </div>
                    <div className="product-box">
                        <div className="product">
                            <div className="img-product">
                                <a href="">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shirt 2.webp" alt=""/>
                                </a>

                              

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
                                <a href="">RONHILL Core Tee</a>
                            </h4>
                            <p className="product-price">
                                <s className=""></s>
                                <span className="">$25.00</span>
                            </p>
                        </div>  
                    </div>
                    <div className="product-box">
                        <div className="product">
                            <div className="img-product">
                                <a href="">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shirt 3.webp" alt=""/>
                                </a>

                                <figure style={{ background: '#e12c43', color: '#ffffff' }} className="absolute uppercase label-sale">
                                    <span>-27%</span>
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
                                <a href="">ODLO Active Spine</a>
                            </h4>
                            <p className="product-price">
                                <s className="">$67.00</s>
                                <span className="">$49.00</span>
                            </p>
                        </div>  
                    </div>
                    <div className="product-box">
                        <div className="product">
                            <div className="img-product">
                                <a href="">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes 4.webp" alt=""/>
                                </a>

                                <figure style={{ background: '#e12c43', color: '#ffffff' }} className="absolute uppercase label-sale">
                                    <span>-25%</span>
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
                                <a href="">INOV-8 Women</a>
                            </h4>
                            <p className="product-price">
                                <s className="">$74.95</s>
                                <span className="">$56.21</span>
                            </p>
                        </div>  
                    </div>
                    <div className="product-box">
                        <div className="product">
                            <div className="img-product">
                                <a href="">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/cap 2.webp" alt=""/>
                                </a>

                                <figure style={{ background: '#e12c43', color: '#ffffff' }} className="absolute uppercase label-sale">
                                    <span>-23%</span>
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
                                <a href="">Ciele Athletics</a>
                            </h4>
                            <p className="product-price">
                                <s className="">$45.00</s>
                                <span className="">$34.95</span>
                            </p>
                        </div>  
                    </div>
                    <div className="product-box">
                        <div className="product">
                            <div className="img-product">
                                <a href="">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/short 1.webp" alt=""/>
                                </a>

                                <figure style={{ background: '#e12c43', color: '#ffffff' }} className="absolute uppercase label-sale">
                                    <span>-15%</span>
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
                                <a href="">2IN1 Short Women</a>
                            </h4>
                            <p className="product-price">
                                <s className="">$28.00</s>
                                <span className="">$24.00 </span>
                            </p>
                        </div>  
                    </div><div className="product-box">
                        <div className="product">
                            <div className="img-product">
                                <a href="">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/short 2.webp" alt=""/>
                                </a>

                              

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
                                <a href="">2IN1 Short Men</a>
                            </h4>
                            <p className="product-price">
                                <s className=""></s>
                                <span className="">$67.00</span>
                            </p>
                        </div>  
                    </div>

    
                </div>
            </div>
        </div>


        <div style={{ marginBottom: '120px' }} className="brand-logo hidden">
            <div className="container container-brand">
                <div className="row">
                    <div className="col-md-12 brand-box">
                        <a href="">
                            <img className="logo" src="Shoes/IMAGES/Home_Page_Picture/brand 1.webp" alt=""/>
                        </a>
                  
                        <a href="">
                            <img className="logo" src="Shoes/IMAGES/Home_Page_Picture/brand 2.webp" alt=""/>
                        </a>
        
                        <a href="">
                            <img className="logo" src="Shoes/IMAGES/Home_Page_Picture/brand 3.webp" alt=""/>
                        </a>
                
                        <a href="">
                            <img className="logo" src="Shoes/IMAGES/Home_Page_Picture/brand 4.webp" alt=""/>
                        </a>
               
                        <a href="">
                            <img className="logo" src="Shoes/IMAGES/Home_Page_Picture/brand 5.jpg" alt=""/>
                        </a>
                
                        <a href="">
                            <img className="logo" src="Shoes/IMAGES/Home_Page_Picture/brand 6.webp" alt=""/>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div className="banner-run hidden">
            <div className="container container-homepage">
                    <div className="banner-run-box">
                            <div className="run-img">
                                <a href="">
                                    <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/h1-banner-bg.webp" alt=""/>
                                </a>
                            </div>
                            <div className="run-button">
                                <h1>THE PUREST FORM OF MOVEMENT</h1>
                                <a href="">SHOP NOW</a>
                            </div>
                           
                            
                    </div>
            </div>
        </div>

        <div className="blog-section hidden">
            <div className="container container-homepage">
                <h3 className="blog-title" style={{ marginBottom: '50px' }}>OUR BLOGS</h3>
                <div className="row">
                    <div className="col-md-4">
                        <div className="relative-blog-homepage">
                        <a href="Shoes/Running.html" className="homepage-blog-img">
                            <img style={{ width: '100%', marginBottom: '20px' }} src="Shoes/IMAGES/Home_Page_Picture/blog1.webp" alt=""/>
                        </a>
                        <div className="blog-date">
                            <span className="day">10</span>
                            <hr/>
                            <span className="month">AUG</span>
                        </div>
                        </div>

                        <div className="homepage-blog-content">
                                <a href="Shoes/blog.html" className="blog-cate">
                                    <h5>News</h5>
                                </a>
                        
                                <a href="Shoes/Running.html" className="homepage-blog-title">
                                    <h4 className="homepage-title-border" style={{ fontSize: '22px' }}>RUNNING SPEED AND ITS CONNECTION TO SHOES</h4>
                                </a>
                            <p className="blog-short">Competitive runners have always wanted lightweight running shoes and manufacturers have always fulfilled that desire. There is some evidence that heavier shoes...</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="relative-blog-homepage">
                        <a href="Shoes/basketball.html" className="homepage-blog-img">
                            <img style={{ width: '100%', marginBottom: '20px' }} src="Shoes/IMAGES/Home_Page_Picture/blog2.webp" alt="" />
                        </a>
                        <div className="blog-date" >
                            <span className="day">10</span>
                            <hr/>
                            <span className="month">AUG</span>
                        </div>
                        </div>
                        
                        <div className="homepage-blog-content">
                            <a href="Shoes/blog.html" className="blog-cate">
                                <h5>News</h5>
                            </a>
                    
                            <a href="Shoes/basketball.html" className="homepage-blog-title">
                                <h4 style={{ fontSize: '22px' }}>DO BASKETBALL SHOES MAKE YOU JUMP HIGHER?</h4>
                            </a>
                
                        <p className="blog-short">Today I want to talk about a topic that some people bring up from time to time. I want to explain something...</p>
                    </div>
                    </div>

                    <div className="col-md-4">
                        <div className="relative-blog-homepage">
                        <a href="Shoes/basketball.html" className="homepage-blog-img">
                            <img style={{ width: '100%', marginBottom: '20px' }} src="Shoes/IMAGES/Home_Page_Picture/blog3.webp" alt="" />
                        </a>
                        <div className="blog-date" >
                            <span className="day">04</span>
                            <hr/>
                            <span className="month">AUG</span>
                        </div>
                        </div>
                        
                        <div className="homepage-blog-content">
                            <a href="Shoes/blog.html" className="blog-cate">
                                <h5>News</h5>
                            </a>
                    
                            <a href="Shoes/basketball.html" className="homepage-blog-title">
                                <h4 style={{ fontSize: '22px' }}>DO BASKETBALL SHOES MAKE YOU JUMP HIGHER?</h4>
                            </a>
                
                        <p className="blog-short">Today I want to talk about a topic that some people bring up from time to time. I want to explain something...</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="popup-trigger" id="popup-1">
        <div className="overview-overlay" onclick="togglePopup('popup-1')"></div>
             <div className="popup-content">
                   <span className="popup-close" onclick="togglePopup('popup-1')">&times;</span>
                   <div className="row">
                         <div className="col-md-6">
                                 <a href="">
                                      <img style={{ width: '100%' }} src="Shoes/IMAGES/Home_Page_Picture/shoes 3.webp" alt=""/>
                                 </a>
                        
                         </div>
                     <div className="col-md-6 popup-detail">
                        <a className="product-name" href=""><h2>On Cloudflyer Men</h2></a>
                        <span>$169.95 USD</span>
                        <hr/>
                        <p className="product-info">Do you walk on paved and asphalted roads, on<br/> forest paths or do you regularly train or compete on the...</p>
                        <div>
                            <div className="size-header">
                                <div className="header">Size</div>
                                <div className="size-content">
                                <div className="XXS-available">
                                    <input type="radio" name="option-0" id="option-XXS" value="XSS" checked/>
                                    <label className="variant-other" for="option-XXS">XXS</label>
                                </div>
                                <div className="XS-available">
                                    <input type="radio" name="option-0" id="option-XS" value="XS"/>
                                    <label className="variant-other" for="option-XS">XS</label>
                                </div>
                                <div className="S-available">
                                    <input type="radio" name="option-0" id="option-S" value="S"/>
                                    <label className="variant-other" for="option-S">S</label>
                                </div>
                                <div className="M-available">
                                    <input type="radio" name="option-0" id="option-M" value="L"/>
                                    <label className="variant-other" for="option-M">M</label>
                                </div>
                                <div className="L-available">
                                    <input type="radio" name="option-0" id="option-L" value="L"/>
                                    <label className="variant-other" for="option-L">L</label>
                                </div>
                                <div className="XL-available">
                                    <input type="radio" name="option-0" id="option-XL" value="XL"/>
                                    <label className="variant-other" for="option-XL">XL</label>
                                </div>
                                <div className="XXL-available">
                                    <input type="radio" name="option-0" id="option-XXL" value="XXL"/>
                                    <label className="variant-other" for="option-XXL">XXL</label>
                                </div>
                                
                                
                            </div>
                            </div>
                            <div className="color-header">
                                <div className="header">Color</div>
                                <div className="orange-color">
                                    <input type="radio" name="option-1" id="option-orange" value="DarkOrange" checked/>
                                    <label className="link-color" for="option-orange" style={{ backgroundColor: 'darkorange' }}></label>
                                </div>
                                <div className="lightblue-color">
                                    <input type="radio" name="option-1" id="option-lightblue" value="LightBlue"/>
                                    <label className="link-color" for="option-lightblue" style={{ backgroundColor: 'lightblue' }}></label>
                                </div>
                                <div className="grayorange-color">
                                    <input type="radio" name="option-1" id="option-grayorange" value="GrayOrange"/>
                                    <label className="link-color" for="option-grayorange" style={{ backgroundColor: 'gray' }}></label>
                                </div>
                            </div>

                            <div className="product-action">
                                <div className="product-quantity">
                                    <div className="quantity-all">
                                        <span className="qty-minus">
                                            <i className="fa fa-caret-down"></i>
                                        </span>
                                        <input type="text" name="quantity" value="1" id="quantityInput"/>
                                        <span className="qty-plus">
                                            <i className="fa fa-caret-up"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="btn-addtocart">
                                    <button type="button" className="btn-addtocart">Add To Cart</button>
                                </div>
                            </div>
                            
                        </div>
                     </div>
                    </div>
             </div>
            </div>
    </div>
 <div id="backtop">
          <i className="fa-solid fa-arrow-up"></i>
        </div>

        <Footer />
</div>
  );
}

export default HomePage;
