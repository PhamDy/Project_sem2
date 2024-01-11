import '../../App.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './aboutus.css'

function AboutUs () {
    return (
        <><Header />
        <div id="aboutus-section">
            <div class="aboutus-top hidden">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1>Unique & Stylist Fashion
                                <br />We Are An Awesome Agency.</h1>
                            <p>We guarantee them to provide superior support, cushioning, structure, and durability. Recent changes in the footwear industry involve footwear technology and the correct methods to properly fit a customer. Yikan Store is at the forefront of utilizing this knowledge to better help our customers. Traditionally, there were “Neutral” and “Stability” categories of shoes. We based these footwear categories on different levels of pronation of the foot. However, pronation is just one tiny piece in the shoe fitting puzzle, and manufacturers no longer build their shoes solely around levels of pronation.</p>
                            <a href="">EXPLORE MORE</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aboutus-video hidden">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">

                            <a class="" href="#">
                                <img src="Shoes/IMAGES/about_Us_Picture/about2-bannervideo.webp" alt="" />
                                <div class="play-container">
                                    <i id="btns" class="fa fa-solid fa-play"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="aboutus-team" class="container">
                <div class="text-center team-title hidden">
                    <h1>Meet Our Teams</h1>
                    <p>Shoe companies have developed signature foams that not only enhance softness but also put a little more spring into your step.</p>
                </div>
                <div class="row image-slider">

                    <div class="team-box ">
                        <div class="team-img">
                            <a href="">
                                <img src="Shoes/IMAGES/about_Us_Picture/about2-1.webp" alt="" style={{ width: '100%' }} />
                            </a>
                        </div>
                        <div class="team-text">
                            <h2 class="text-center">Karen Ryan</h2>
                            <p class="text-center">Developer</p>
                        </div>
                    </div>

                    <div class="team-box ">
                        <div class="team-img">
                            <a href="">
                                <img src="Shoes/IMAGES/about_Us_Picture/about2-2.webp" alt="" style={{ width: '100%' }} />
                            </a>
                        </div>
                        <div class="team-text">
                            <h2 class="text-center">Deez Nut</h2>
                            <p class="text-center">Developer</p>
                        </div>
                    </div>

                    <div class="team-box ">
                        <div class="team-img">
                            <a href="">
                                <img src="Shoes/IMAGES/about_Us_Picture/about2-3.webp" alt="" style={{ width: '100%' }} />
                            </a>
                        </div>
                        <div class="team-text">
                            <h2 class="text-center"></h2>
                            <p class="text-center">Developer</p>
                        </div>
                    </div>

                    <div class="team-box ">
                        <div class="team-img">
                            <a href="">
                                <img src="Shoes/IMAGES/about_Us_Picture/about2-4.webp" alt="" style={{ width: '100%' }} />
                            </a>
                        </div>
                        <div class="team-text">
                            <h2 class="text-center">Joe Mama</h2>
                            <p class="text-center">Developer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="aboutus-story" class="container hidden">
                <div class="text-center story-title">
                    <h1>Store In The World</h1>
                    <p>It is different than anything you have experienced before! In the store we help you find the proper pair of shoes through our stride analysis, fitting you for your<br /> biomechanics. We take care of every customer by analyzing their stride, measuring their feet, and providing recommendations. Contrary to popular belief, every shoe is<br /> not the same.</p>
                </div>
                <div class="row">
                    <div class="col-md-6 banner-1 hidden">
                        <a href="">
                            <img src="Shoes/IMAGES/about_Us_Picture/about2-banner-l.webp" alt="" style={{ width: '100%' }} />
                        </a>

                    </div>
                    <div class="col-md-6 banner-2-3 hidden">
                        <a href="">
                            <img id="banner-2" src="Shoes/IMAGES/about_Us_Picture/about2-banner-rt.webp" alt="" style={{ width: '100%' }} />
                        </a>
                        <a href="">
                            <img src="Shoes/IMAGES/about_Us_Picture/about2-banner-rb.webp" alt="" style={{ width: '100%' }} />
                        </a>
                    </div>


                </div>

                <div id="aboutus-info" class="container hidden">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="store-title hidden">
                                <h5>Hanoi STORE</h5>
                            </div>
                            <div class="store-detail hidden">
                                <p>Số 8 Tôn Thất Thuyết, Hà Nội</p>
                                <p>Monday to Friday : 9am to 8pm</p>
                                <p>creativewithjoy@gmail.com</p>
                            </div>

                        </div>

                        <div class="col-md-4">
                            <div class="store-title hidden">
                                <h5>TP. HCM STORE</h5>
                            </div>
                            <div class="store-detail hidden">
                                <p>590 Cách Mạng Tháng Tám, TP. HCM</p>
                                <p>Monday to Friday : 8am to 5pm</p>
                                <p>creativewithjoy@gmail.com</p>
                            </div>

                        </div>

                        <div class="col-md-4">
                            <div class="store-title hidden">
                                <h5>TP. HCM STORE</h5>
                            </div>
                            <div class="store-detail hidden">
                                <p>391A, Nam Kỳ Khởi Nghĩa, TP. HCM</p>
                                <p>Monday to Friday : 9am to 8pm</p>
                                <p>creativewithjoy@gmail.com</p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
        <Footer />
        </>
    );
}

export default AboutUs;