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


function renderRecentProducts(products) {
  products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const recentProducts = products.slice(0, 9);

  recentProducts.forEach(product => {
      const { id, productName, price, img, discount } = product;
      const discountedPrice = (price * (100 - discount) / 100).toFixed(2);

      const productElement = document.createElement('div');
      productElement.classList.add('product-box');
      productElement.innerHTML = `
          <div class="product">
              <div class="img-product" style="display: flex; justify-content: center; align-items: center;">
                  <a href="">
                      <img style="max-width: 450px; max-height: 450px;" src="${img}" alt="${productName}">
                  </a>
                  <ul class="product-icon">
                      <li class="add-cart mr-0" onclick="addItemToCart(${product.id})">
                          <a href="#">
                              <i class="fa-solid fa-bag-shopping icon-1"></i>
                          </a>
                      </li>
                      <li class="view-product mr-0">
                          <button onclick="togglePopup()" href="">
                              <i class="fa-solid fa-magnifying-glass icon-2"></i>
                          </button>
                      </li>
                      <li class="add-favorite mr-0">
                          <a href="">
                              <i class="fa-regular fa-heart icon-3"></i>
                          </a>
                      </li>
                  </ul>
              </div>
              <h4 class="product-title">
                  <a href="">${productName}</a>
              </h4>
              <p class="product-price">
                  ${discount > 0 ? `<s class="">$${price}</s>` : ''}
                  <span class="">$${discountedPrice}</span>
              </p>
          </div>
      `;

      recentProductsContainer.appendChild(productElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let cartItems = [];
  const cartCountElement = document.querySelector('.cart-count span');
  const cartTotalElement = document.querySelector('.total-price');
  const cartItemsContainer = document.querySelector('.cart-items');

  updateCartUI();

  window.addItemToCart = async function(productId) {
    try {
        const response = await fetch(`https://659a6480652b843dea538305.mockapi.io/Product`);
        const product = await response.json();

        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                id: product.id,
                productName: product.productName,
                quantity: 1,
                price: parseFloat(product.price),
                imgSrc: product.img
            });
        }

        updateCartUI();
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
};
function updateCartUI() {
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = cartCount;

  const lastProduct = cartItemsContainer.lastElementChild;

  const fragment = document.createDocumentFragment();

  cartItems.forEach(item => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-cart');
      productElement.innerHTML = `
          <ol style="list-style: none;">
              <li class="d-flex">
                  <div class="img-product-cart">
                      <img src="${item.imgSrc}" alt="" style="max-width: 100%;">
                  </div>
                  <div class="product-detail-cart">
                      <h3 class="product-name-mini">
                          <a href="#">
                              ${item.productName}
                          </a>
                      </h3>
                      <div class="product-info-cart">
                          <div class="product-quantity-mini">QTY : ${item.quantity}</div>
                          <div class="product-price-mini">
                              <span>$${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                      </div>
                  </div>
                  <div class="product-remove">
                      <a href="#" onclick="removeItemFromCart(${item.id})"><i class="fa-solid fa-trash"></i></a>
                  </div>
              </li>
          </ol>
      `;

      fragment.appendChild(productElement);
  });

  cartItemsContainer.innerHTML = "";

  cartItemsContainer.appendChild(fragment);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
}


  window.removeItemFromCart = function(itemId) {
      cartItems = cartItems.filter(item => item.id !== itemId);
      updateCartUI();
  };
});
