$('.image-slider').slick({
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
        dots: true
      }
    },
    {
      breakpoint: 1230,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }, 
    {
    breakpoint: 800,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      autoplay: true,
      autoplaySpeed: 2000
    }
  }
  ]
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    } 
  });
  });
  
  const hiddenElements = document.querySelectorAll('.hidden')
  hiddenElements.forEach((el) => observer.observe(el));
  
  
  function togglePopup() {
  document.getElementById("popup-1").classList.toggle("active")
  }
  
  
  document.addEventListener('DOMContentLoaded', function () {
  const quantityInput = document.getElementById('quantityInput');
  const qtyMinus = document.querySelector('.qty-minus');
  const qtyPlus = document.querySelector('.qty-plus');
  
  qtyMinus.addEventListener('click', function () {
  
      let currentValue = parseInt(quantityInput.value);
      
  
      if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
      }
  });
  
  qtyPlus.addEventListener('click', function () {
      let currentValue = parseInt(quantityInput.value);
      
      quantityInput.value = currentValue + 1;
  });
  });
  
const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;
imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});
function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}
window.addEventListener('resize', slideImage);

function getProductIDFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  return productId;
}

const productId = getProductIDFromURL();
if (productId) {
  callProductInDetail(productId);
} else {
  console.error('Product ID not found in URL');
}

function callProductInDetail(productId) {
  axios.get("http://localhost:8080/api/products/" + productId)
      .then(response => {
          const product = response.data;
          createProductBoxes(product);
          createProductDetails(product);
          console.log("product", product); 
      })
      .catch(error => {
          console.error('Error fetching product details:', error);
      });
}

function createProductBoxes(product) {
  const productContainer = document.getElementById('product-container-main');

  const { id, name, img1, price, desc, avatar} = product;

  const productBox = document.createElement('div');
  productBox.classList.add('container-fluid');
  productBox.id = 'product-container';

  productBox.innerHTML = `
      <div class="row move-to-index">
          <span><a href="#">Home</a></span><span>&rarr;</span><span>${name}</span>
      </div>  
      <div class="row product-detail">
          <div class="col-sm-8 product-slide">
              <div class="product-imgs">
                  <div class="img-display">
                      <div class="img-showcase">
                          <img src="${avatar}" alt="${name}" style="width: 80%; display: block">
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-sm-4 product-detail">
              <h3 class="name">${name}</h3>
              <h5 class="price">$${price}</h5>
              <hr class="solid">
              <p class="product-detail-p">${desc}</p>
              <div class="jumbotron special-offer">
              <h5>Special Offer</h5>
              <ul>
                  <li>In Stock  <span class="badge badge-success">New</span></li>
                  <li>Free Delivery Available*</li>
              </ul>
          </div>
          <div class="size-header">
          <div class="header">Size</div>
          <div class="size-content">
              ${product.size.map(size => `
                  <div class="${size}-available">
                      <input type="radio" name="option-size-${product.id}" id="option-${size}-${product.id}" value="${size}" onchange="updateURL(${product.id})">
                      <label class="variant-other" for="option-${size}-${product.id}">${size}</label>
                  </div>
              `).join('')}
          </div>
      </div>
      <div class="color-header">
      <div class="header">Color</div>
      ${product.color.map(color => `
          <div class="${color.toLowerCase()}-color">
              <input type="radio" name="option-color-${product.id}" id="option-${color.toLowerCase()}-${product.id}" value="${color}" onchange="updateURL(${product.id})">
              <label class="link-color" for="option-${color.toLowerCase()}-${product.id}" style="background-color: ${color.toLowerCase()}"></label>
          </div>
      `).join('')}
  </div>
  <div class="product-action">
  <div class="product-quantity">
      <label for="">Quantity</label>
      <div class="quantity-option-container">
          <div class="font-quantity-arrow-down">
              <i id="caretdown" class="fa-solid fa-caret-down"></i>
          </div>
          <select name="quantitySelect" id="quantitySelect" class="select-quantity">
          <option value="1">1</option>
          </select>
      </div>
  </div>
  <div class="btn-addtocart">
  <button class="btn-addtocart addToCartButtons" data-product-id="${product.id}" type="button">Add To Cart</button>
  </div>
</div>
<p id="LoginBeforeDetailsAddtoCart"></p>
</div>
          </div>
      </div>
      <div id="details">
          <!-- Product details tabs content -->
      </div>
  `;

  productContainer.appendChild(productBox);
}

function createProductDetails(product) {
  const productContainerDetails = document.getElementById('container-details');

  const { id, name, img1, img2, img3, price, desc ,avatar, brand} = product;

  const productBox = document.createElement('div');
  productBox.classList.add('row');
  productBox.id = 'details';

  productBox.innerHTML = `    <div class="row">
  <div class="icon-contain">
      <div class="icons">
          <img width="50" height="50" src="https://img.icons8.com/wired/64/airport.png" alt="airport"/>
          <p class="icon-tittle">Worldwide shipping</p>
      </div>
      <div class="icons">
          <img width="50" height="50" src="https://img.icons8.com/external-ddara-lineal-ddara/64/external-refund-delivery-services-ddara-lineal-ddara.png" alt="external-refund-delivery-services-ddara-lineal-ddara"/>
          <p class="icon-tittle">Free 50 - day returns</p>
      </div>
      <div class="icons">
          <img width="50" height="50" src="https://img.icons8.com/dotty/80/certificate.png" alt="certificate"/>
          <p class="icon-tittle">24 MONTH WARRANTY</p>
      </div>
      <div class="icons">
          <img width="50" height="50" src="https://img.icons8.com/ios/50/security-checked--v1.png" alt="security-checked--v1"/>
          <p class="icon-tittle">100% SECRUE CHECKOUT</p>
      </div>
  </div>
</div>
<hr>
<div class="container">
  <nav class="nav">
      <button data-target="#description" class="nav-link" data-toggle="tab">description</button>
       <button data-target="#additonal" class="nav-link" data-toggle="tab">Additonal Information</button>
       <button data-target="#review" class="nav-link" data-toggle="tab">Review</button>
  </nav>
  <hr>
  <div class="tab-content py-5">
      <div class="tab-pane active" id="description">
          <div class="row">
              <div class="col-md-6">
                  <img src="${img2}" alt="" width="100%">
              </div>
              <div class="col-md-6">
                  <div class="desc-content"> 
                      <h2><b>Thing you need to know</b></h2>
                      <h3>Brand: <span style="font-weight: 400; font-size: 14px; color: #333;">${brand}</span></h3>
                      <h3></h3>
                      <p style="font-weight: 400; font-size: 14px; color: #333;">

                      </p>
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-6">
                  <div class="desc-content"> 
                      <h2><b></b></h2>
                      <h3></h3>
                      <p>

                      </p>
                      <h3></h3>
                      <p>

                      </p>
                  </div>
              </div>
              <div class="col-md-6">
                  <img src="${img3}" alt="" width="100%">
              </div>
          </div>
      </div>
      <div class="tab-pane" id="additonal">
          <div class="row">
              <div class="col-md-8">
                  <div class="title-content">
                      <p></p>
                      <h3></h3>
                  </div>
                  <div class="row">
                      <div class="col-md-6 content1">
                          <p>We use industry standard SSL encryption to protect your details. Potentially sensitive information such as your name, address and card details are encoded so they can only be read on the secure server.</p>
                          <ul class="px-0 list-unstyled">
                              <li>Safe Payments</li>
                              <li>Accept Credit Cart</li>
                              <li>Different Payment Method</li>
                              <li>Price Include VAT</li>
                              <li>Easy To Order</li>
                            </ul>
                      </div>
                      <div class="col-md-6 content2">
                          <div class="infor2">
                            <h3>Express Delivery</h3>
                            <ul class="px-0 list-unstyled">
                              <li>Europe &amp; USA within 2-4 days</li>
                              <li>Rest of the world within 3-7 days</li>
                              <li>Selected locations</li>
                            </ul>
                          </div>
                          <div class="infor2">
                            <h3>Need more information</h3>
                            <ul class="px-0 list-unstyled">
                              <li><a href="">Orders &amp; Shipping</a></li>
                              <li><a href="">Returns &amp; Refunds</a></li>
                              <li><a href="">Payments</a></li>
                              <li><a href="">Your Orders</a></li>
                            </ul>
                          </div>
                        </div>
                  </div>
              </div>
              <div class="col-md-4">
                  <img src='${img1}' back-ground-color="#e5e5e5" width="100%">
              </div>
          </div>
      </div>
      <div class="tab-pane" id="review">
          <div class="cus">
          
          <hr>
          <h1>Feedback</h1>
          <div class="wrapper">
              <h3>Send Feedback</h3>
              <form  name="comForm" ng-submit="submitForm1()">
                  <div class="rating">
                      <input type="number" name="rating" hidden>
                      <i class="bx bx-star star" style="--i: 0;"></i>
                      <i class="bx bx-star star" style="--i: 1;"></i>
                      <i class="bx bx-star star" style="--i: 2;"></i>
                      <i class="bx bx-star star" style="--i: 3;"></i>
                      <i class="bx bx-star star" style="--i: 4;"></i>
                  </div>
                  <input type="text" id="username" name="username" ng-model="username"  placeholder="Name">
                  <div id="nameError1" class="error-message" ng-show="nameError1" style="color: red;">Name is required</div>
                  <textarea id="message1" name="opinion"  ng-model="message1" cols="30" rows="5" placeholder="Your opinion..."></textarea>
  
                  <div id="messageError1" class="error-message1" ng-show="messageError1" style="color: red;">Message is required</div>
                  
                  <div class="btn-group">
                      <button type="submit" class="btn submit">Submit</button>
                      <button class="btn cancel">Cancel</button>
                  </div>
              </form>
          </div>
      </div>
  </div>
<hr>
</div>`
productContainerDetails.appendChild(productBox);
}
