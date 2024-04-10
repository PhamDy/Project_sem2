

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('show')
  }
});
});

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el));


const apiUrl = "http://localhost:8080/api/products/";

function fetchProducts() {
  axios.get(apiUrl)
      .then(response => {
          const products = response.data;
          products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          const recentProductss = products.slice(0, 9);
          renderProductss(recentProductss);
      })
      .catch(error => {
          console.error('Error fetching products:', error);
      });
}

fetchProducts();


function renderProductss(products) {
  const productRows = document.querySelector("#recentProductsContainer");
  products.forEach(product => {
      const { id, name, img, price, discount, description, created_at } = product;
      const productBoxx = document.createElement('div');
      productBoxx.classList.add('product-box');
      productBoxx.innerHTML = `
          <div class="product">
              <div class="img-product">
                  <a href="#" onclick="openProductDetails(${id}); return false;">
                      <img style="width: 100%;" src="${img}" alt="${name}">
                  </a>
                  ${discount > 0 ? `<figure style="background: #e12c43; color: #ffffff;" class="label-sale">
                      <span>-${discount}%</span>
                  </figure>` : ''}
                  <ul class="product-icon">
                      <li class="add-cart mr-0">
                          <a href="#" onclick="openProductDetails(${id}); return false;">
                              <i class="fa-solid fa-bag-shopping icon-1"></i>
                          </a>
                      </li>
                      <li class="view-product mr-0">
                          <button onclick="openQuickView(${id})">
                              <i class="fa-solid fa-magnifying-glass icon-2"></i>
                          </button>
                      </li>
                      <li class="add-favorite mr-0">
                          <a href="#">
                              <i class="fa-regular fa-heart icon-3"></i>
                          </a>
                      </li>
                  </ul>
              </div>
              <h4 class="product-title">
                  <a href="#" onclick="openProductDetails(${id}); return false;">${name}</a>
              </h4>
              <p class="product-price">
                  ${discount > 0 ? `<s class="">$${price.toFixed(2)}</s>` : ''}
                  <span class="">$${(price - (price * discount / 100)).toFixed(2)}</span>
              </p>
          </div>
      `;
      productRows.appendChild(productBoxx);
  });
}


function openQuickView(productId) {
  axios.get(apiUrl + productId)
      .then(response => {
          const product = response.data;
          renderPopup(product);
          togglePopup(`popup-${product.id}`);
      })
      .catch(error => {
          console.error('Error fetching product details:', error);
      });
}

function openProductDetails(productId) {
  window.location.href = `details.html?id=${productId}`;
}

function updateQuantity(productId, selectedColor, selectedSize) {
  axios.get(`http://localhost:8080/api/warehouse/quantityProduct/${productId}?color=${selectedColor}&size=${selectedSize}`)
      .then(quantityResponse => {
          const quantity = quantityResponse.data;
          const selectQuantity = document.getElementById('quantitySelect');
          const selectedQuantity = selectQuantity.value;
          selectQuantity.innerHTML = '';

          const maxQuantity = Math.min(quantity, 10);
          selectQuantity.setAttribute('max', maxQuantity);

          for (let optionValue = 1; optionValue <= maxQuantity; optionValue++) {
              const option = document.createElement('option');
              option.text = optionValue;
              option.value = optionValue;
              if (optionValue == selectedQuantity) {
                  option.selected = true;
              }
              selectQuantity.appendChild(option);
          }


          selectQuantity.addEventListener('change', function() {
              const selectedQuantity = this.value;
              updateURL(productId, selectedColor, selectedSize, selectedQuantity);
          });
      })
      .then(cartResponse => {
      })
      .catch(error => {
          throw error;
      });
}


document.body.addEventListener('click', function(event) {

  if (event.target.classList.contains('addToCartButton')) {

      const clickedProductId = event.target.dataset.productId;

      const urlParams = new URLSearchParams(window.location.search);
      const productIdFromUrl = urlParams.get('productId');
      const color = urlParams.get('color');
      const size = urlParams.get('size');
      const quantity = urlParams.get('quantity');

      const authToken = getCookie('authToken');

      if (authToken) {
          const url = `http://localhost:8080/api/cart/${clickedProductId}?&color=${color}&size=${size}&quantity=${quantity}`;

          axios.post(url, null, {
              headers: {
                  Authorization: `Bearer ${authToken}`
              }
          })
          .then(response => {
              if (response.status === 201) {
                  console.log('Item added to cart successfully.');

                  updateQuantity(clickedProductId, color, size);
                  window.location.reload();
              } else {
                  console.log('Failed to add item to cart. Status:', response.status);
              }
          })
          .catch(error => {
              document.getElementById("LoginBeforeAddToCart").innerText = "Order quantity exceeds warehouse quantity or haven't select size and color"
          });
      } else {
          document.getElementById("LoginBeforeAddToCart").innerText = "Please log in to add items to cart."
      }
      history.replaceState(null, null, window.location.pathname);
  }
});


function renderPopup(product) {
  const popupContent = `
      <div class="popup-trigger" id="popup-${product.id}">
          <div class="overview-overlay" onclick="togglePopup('popup-${product.id}')"></div>
          <div class="popup-content">
              <span class="popup-close" onclick="togglePopup('popup-${product.id}')">&times;</span>
              <div class="row">
                  <div class="col-md-6">
                      <img style="width: 100%;" src="${product.avatar}" alt="${product.name}">
                  </div>
                  <div class="col-md-6 popup-detail">
                      <a class="product-name" href="#"><h2>${product.name}</h2></a>
                      <span>$${product.price.toFixed(2)} USD</span>
                      <hr>
                      <p class="product-info">${product.desc}</p>
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
                      <button class="btn-addtocart addToCartButton" data-product-id="${product.id}" type="button">Add To Cart</button>
                      </div>
                  </div>
                  <p id="LoginBeforeAddToCart"></p>
              </div>
          </div>
      </div>
  `;

  document.body.insertAdjacentHTML('beforeend', popupContent);
}


function updateURL(productId) {
  try {
      const selectedSize = document.querySelector('input[name^="option-size"]:checked').value;
      const selectedColor = document.querySelector('input[name^="option-color"]:checked').value;

      const selectedQuantity = document.getElementById('quantitySelect').value;

      const currentURL = new URL(window.location.href);
      currentURL.searchParams.set('', productId);
      currentURL.searchParams.set('color', selectedColor);
      currentURL.searchParams.set('size', selectedSize);
      currentURL.searchParams.set('quantity', selectedQuantity);

      window.history.replaceState({}, '', currentURL);

      updateQuantity(productId, selectedColor, selectedSize);
  } catch (error) {
  }
}



function togglePopup(popupId) {
  const popupTrigger = document.getElementById(popupId);
  popupTrigger.classList.toggle('active');
}

function stopPropagation(event) {
event.stopPropagation();
}