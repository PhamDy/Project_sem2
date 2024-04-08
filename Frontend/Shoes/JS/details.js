$(window).on('load', function() {
    const initializeSliders = () => {
        var mainSlider = $('.img-thumb');
        var subSlider = $('.sub-slider');

        mainSlider.slick({
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 3000,
            arrows: false,
            fade: true
        });

        subSlider.slick({
            variableWidth: true,
            slidesToShow: 4,
            arrows: false
        });

        subSlider.on('click', '.prod-sub-details', function(){
            var index = $(this).data('index');
            mainSlider.slick('slickGoTo', index);

            subSlider.find('.prod-sub-details').removeClass('selected-sub-img');
            $(this).addClass('selected-sub-img');
        });

        mainSlider.on('afterChange', function(event, slick, currentSlide){
            subSlider.find('.prod-sub-details').removeClass('selected-sub-img');
            subSlider.find('.prod-sub-details[data-index="' + currentSlide + '"]').addClass('selected-sub-img');
        });
    };

    const initializePage = () => {
        const tabLinks = document.querySelectorAll('.bd-tab a');

        tabLinks.forEach(tab => {
            tab.addEventListener('click', function(event) {
                event.preventDefault();

                tabLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                const targetPaneId = this.getAttribute('href');
                const targetPane = document.querySelector(targetPaneId);
                const tabPanes = document.querySelectorAll('.tab-pane');

                tabPanes.forEach(pane => pane.classList.remove('active', 'show'));
                if (targetPane) {
                    targetPane.classList.add('active', 'show');
                }
            });
        });

        const starLinks = document.querySelectorAll('.review-star-select');
        const hiddenInput = document.getElementById('review-rating');

        starLinks.forEach(starLink => {
            starLink.addEventListener('click', function(event) {
                event.preventDefault();

                const value = parseInt(this.getAttribute('data-value'));
                hiddenInput.value = value;

                starLinks.forEach((star, index) => {
                    if (index < value) {
                        star.innerHTML = '<i class="fa-solid fa-star"></i>';
                    } else {
                        star.innerHTML = '<i class="fa-regular fa-star"></i>';
                    }
                });
            });
        });

        const reviewLink = document.getElementById('toggleReview');

        reviewLink.addEventListener('click', function(event) {
            event.preventDefault();

            const reviewForm = document.getElementById('pr-forms');
            reviewForm.classList.toggle('openForm');
        });

        const prSelectImage = document.querySelector('.pr-select-image');
        const prFileInput = document.getElementById('pr-file');
        const prImgArea = document.querySelector('.pr-img-area');
        const prImageSrcInput = document.getElementById('pr-image-src');

        prSelectImage.addEventListener('click', function(event) {
            event.preventDefault();
            prFileInput.click();
        });

        prFileInput.addEventListener('change', function () {
            const prImage = this.files[0];
            const prImgUrl = URL.createObjectURL(prImage);
            prImg = document.createElement('img');
            prImg.className = "review-image-pr";
            prImg.src = prImgUrl;
            prImgArea.appendChild(prImg);
            prImgArea.classList.add('active');
            prImgArea.dataset.img = prImage.name;
            prImageSrcInput.value = prImgUrl;
        });
    };

    document.getElementById('submit-pr-forms').addEventListener('click', function(event) {
        event.preventDefault();

        const rating = document.getElementById('review-rating').value;
        const productId = document.querySelector('input[name="productId"]').value;
        const reviewBody = document.getElementById('review-body').value;
        const imageFile = document.getElementById('pr-file').files[0];

        const formData = new FormData();
        formData.append('comment', reviewBody);
        formData.append('star', rating);
        formData.append('images', imageFile);

        axios.post(`http://localhost:8080/api/products/${productId}/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            window.location.reload();
          })
          .catch(error => {
            document.getElementById("login-before-submit-review").innerText = "PLEASE LOGIN BEFORE SUBMIT A REVIEW"
          });
    });


    initializeSliders();
    initializePage();

    $(window).on('resize', function(){
        initializeSliders();
    });
});



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
    Promise.all([
      axios.get(`http://localhost:8080/api/products/${productId}`),
      axios.get(`http://localhost:8080/api/products/${productId}/review`)
    ])
    .then(responses => {
      const productResponse = responses[0];
      const reviewResponse = responses[1];

      const product = productResponse.data;
      const review = reviewResponse.data;

      createProductBoxes(product);
      createProductDetails(product, review);
    })
    .catch(error => {
      console.error('Error fetching product details:', error);
    });
  }



document.body.addEventListener('click', function(event) {
    if (event.target.classList.contains('addToCartButton')) {
        event.preventDefault();
        const clickedProductId = event.target.dataset.productId;

        const urlParams = new URLSearchParams(window.location.search);
        const productIdFromUrl = urlParams.get('productId');
         const productIdFromUrls = urlParams.get('id')
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
                document.getElementById("LoginBeforeDetailsAddtoCart").innerText = "Order quantity exceeds warehouse quantity or haven't select size and color"
            });
        } else {
            document.getElementById("LoginBeforeDetailsAddtoCart").innerText = "Please log in to add items to cart."
        }
        history.replaceState(null, null, window.location.pathname + `?id=${productIdFromUrls}`);
    }
});




function updateCharacterCount() {
    const textarea = document.querySelector('.pr-form-input-body');
    const maxLength = 1500;
    const remaining = maxLength - textarea.value.length;
    const characterCountElement = document.querySelector('.character-remaining');

    characterCountElement.textContent = '(' + remaining + ')';

    if (remaining < 0) {
        textarea.value = textarea.value.slice(0, maxLength);
    }
}

document.querySelector('.pr-form-input-body').addEventListener('input', updateCharacterCount);

updateCharacterCount();


function createProductBoxes(product) {
    const productContainer = document.getElementById('container-details-id-page');

    const { id, name, img1, img2, img3, price, desc, avatar, discount } = product;

    const discountedPrice = price - (price * discount / 100);

    const productBox = document.createElement('div');
    productBox.classList.add('the-second-container');
    productBox.id = 'product-container';

    productBox.innerHTML = `
    <div class="content-page-details">
        <div class="row">
            <div class="col-md-7">
                <div class="gallery-control">
                    <div class="relative">
                        <div class="img-thumb slick-slider">
                            <div class="slick-slide">
                                <img src="${avatar}" alt="${name}" style="max-width: 800px; width: 800px">
                            </div>
                            <div class="slick-slide">
                                <img src="${img1}" alt="${name}" style="max-width: 800px; width: 800px">
                            </div>
                            <div class="slick-slide">
                                <img src="${img2}" alt="${name}" style="max-width: 800px; width: 800px">
                            </div>
                            <div class="slick-slide">
                                <img src="${img3}" alt="${name}" style="max-width: 800px; width: 800px">
                            </div>
                        </div>
                    </div>
                    <div class="sub-img">
                        <div class="sub-slider slick-slider">
                            <div class="prod-sub-details selected-sub-img" data-index="0" style="width: 164px;">
                                <img src="${avatar}" alt="${name}" style="max-width: 100%;">
                            </div>
                            <div class="prod-sub-details" data-index="1" style="width: 164px;">
                                <img src="${img1}" alt="${name}" style="max-width: 100%;">
                            </div>
                            <div class="prod-sub-details" data-index="2" style="width: 164px;">
                                <img src="${img2}" alt="${name}" style="max-width: 100%;">
                            </div>
                            <div class="prod-sub-details" data-index="3" style="width: 164px;">
                                <img src="${img3}" alt="${name}" style="max-width: 100%;">
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            <div class="col-md-5">
                <div class="detail-info">
                    <div class="relative">
                        <h2 class="product-titles">${name}</h2>
                        <div class="product-prices">
                            <del class="product-price-compare">$${price.toFixed(2)}</del>
                            <ins class="product-price price_main">$${discountedPrice.toFixed(2)}</ins>
                        </div>
                        <div class="wrap-rating">
                          <span class="star-rating-container" id="" data-rating="3.0">
                            <span class="start-rating-box">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </span>
                            <span class="start-rating-caption">1 review</span>
                        </span>
                        </div>
                        <div class="pd_summary">
                          <p class=" mb-0">${desc}</p>
                        </div>
                        <div class="list_ul_full">
                          <h4 class="title-list">
                                Special Offer
                              </h4>
                              <ul>
                                <li>In Stock</li>
                                <li>Sale OFF!!!!!</li>
                              </ul>
                        </div>
                        <div class="count-down">
                          <p class="text">HURRY! ONLY <span id="random_sold_prod">PLS SELECT SIZE AND COLOR FOR</span> LEFT IN STOCK</p>
                          <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 0%;"></div>
                          </div>
                        </div>
                        <div class="size-guide relative">
                        <div class="extra-link">
                            <a href="" class="btn_size_guide">Size guide</a>
                            <a href="" class="btn_delivery">Delivery &amp; Return</a>
                            <a href="" class="btn_question">Ask a Question</a>
                        </div>
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
                        <button class="btn-addtocart addToCartButton" data-product-id="${product.id}" type="button">Add To Cart</button>
                        <p id="LoginBeforeDetailsAddtoCart" style="color:red;"></p>
                        </div>
                    </div>
                        <ul class="product-meta-info">
                            <li>
                              <div class="product-categoryinfo">
                                <label>Categories :</label>
                                <a href="">Home page,</a>
                                <a href="">New Arrivals,</a>
                                <a href="">New Product,</a>
                                <a href="">Women</a>
                              </div>
                            </li>
                          </ul>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="featured-icon">
        <div class="block-top-link">
            <div class="textwidget">
                <div class="icon-featured">
                    <div class="iconbox-inner">
                        <div class="icon">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
                                    <g>
                                        <path d="M501.905,10.593C489.743-1.57,468.721-2.766,441.099,7.133c-18.995,6.81-38.919,18.222-48.451,27.754l-76.55,76.55
                                            L64.116,71.859L0,135.975l209.501,82.059l-67.266,67.266l-95.472,5.591L0.984,336.67l103.609,49.994L75.567,415.69l21.24,21.24
                                            l28.987-28.987l50.043,103.56l45.768-45.769l5.592-95.472l68.395-68.395l82.043,209.459l64.115-64.116l-39.57-251.933
                                            l75.43-75.431c9.532-9.531,20.945-29.455,27.755-48.451C515.264,43.781,514.068,22.754,501.905,10.593z M53.706,124.751
                                            l20.846-20.846l215.268,33.811l-57.136,57.136L53.706,124.751z M409.705,436.776l-20.845,20.846l-70.087-178.935l57.128-57.128
                                            L409.705,436.776z M477.088,61.262c-5.739,16.012-15.224,31.853-20.718,37.347L197.88,357.101l-5.592,95.472l-7.797,7.797
                                            l-36.202-74.918l26.113-26.113l-21.24-21.24l-26.07,26.068L52.137,328l7.788-7.788l95.472-5.591L413.888,56.128
                                            c5.495-5.495,21.336-14.977,37.348-20.718c18.176-6.516,27.82-5.186,29.429-3.577C482.272,33.441,483.604,43.083,477.088,61.262z"></path>
                                    </g>
                                </svg>
                        </div>
                        <div class="content">
                            <p class="title">WORLDWIDE SHIPPING</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="textwidget">
                <div class="icon-featured">
                    <div class="iconbox-inner">
                        <div class="icon">
                            <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                                <path d="m410 0c8.285156 0 15 6.714844 15 15v199.027344c52.363281 26.195312 87 79.976562 87 140.722656 0 86.84375-70.40625 157.25-157.25 157.25-60.746094
                                0-114.527344-34.636719-140.722656-87h-199.027344c-8.285156 0-15-6.714844-15-15v-395c0-8.285156 6.714844-15 15-15zm-126 30v84.0625c0 10.785156-11.507812
                                19.085938-22.746094 12.84375l-48.753906-24.773438-49.761719 25.289063c-9.988281
                                5.058594-21.710937-2.324219-21.703125-13.359375l-.035156-84.0625h-111v365h172.703125c-14.519531-54.976562 1.808594-112.394531
                                40.855469-151.441406s96.464844-55.375 151.441406-40.855469v-172.703125zm23 391h69.996094c15.984375 0 30.488281-6.511719 40.988281-17.015625
                                11.039063-11.035156 17.015625-25.332031 17.015625-41.980469
                                0-31.96875-26.035156-58.003906-58.003906-58.003906h-41.683594l8.804688-8.820312c13.871093-13.953126-7.339844-35.042969-21.210938-21.09375l-34.402344
                                34.464843c-5.824218 5.855469-5.800781 15.328125.058594 21.152344l34.46875
                                34.402344c13.949219 13.871093 35.042969-7.339844 21.09375-21.210938l-8.914062-8.894531h41.785156c16.242187 0 28.003906 12.984375 28.003906 28.996094 0
                                15.40625-12.597656 28.003906-28.003906 28.003906h-69.996094c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm-42.230469-156.230469c-49.691406
                                49.695313-49.691406 130.269531 0 179.960938 49.695313 49.695312 130.269531 49.695312 179.960938 0 49.695312-49.691407 49.695312-130.265625
                                0-179.960938-49.691407-49.691406-130.269531-49.691406-179.960938 0zm-10.769531-234.769531h-83v59.65625l34.726562-17.648438c4.097657-2.078124
                                9.09375-2.246093 13.511719-.019531l34.761719 17.667969zm0 0" fill-rule="evenodd">

                                </path></svg>
                        </div>
                        <div class="content">
                            <p class="title">FREE 60-DAY RETURNS</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="textwidget">
                <div class="icon-featured">
                    <div class="iconbox-inner">
                        <div class="icon">
                         <svg id="Layer_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" class=""><g><path d="m507.606 395.512-81.129-81.138-1.671-20.564 22.359-13.626c6.324-3.854 8.889-11.746 6.039-18.582l-10.075-24.166 17.052-19.868c4.823-5.619 4.824-13.917.002-19.538l-17.055-19.875 10.076-24.167c2.85-6.835.285-14.728-6.039-18.582l-22.359-13.626 2.12-26.094c.6-7.382-4.279-14.097-11.484-15.809l-25.472-6.049-6.051-25.479c-1.711-7.207-8.44-12.082-15.808-11.485l-26.102
                            2.12-13.627-22.36c-3.854-6.326-11.751-8.887-18.584-6.038l-24.164 10.082-19.864-17.051c-5.619-4.823-13.92-4.823-19.539
                            0l-19.866 17.051-24.165-10.081c-6.837-2.851-14.729-.287-18.584 6.038l-13.627 22.36-26.102-2.12c-7.382-.591-14.096 4.278-15.808 11.485l-6.051 25.479-25.472
                            6.049c-7.205 1.712-12.084 8.427-11.484 15.809l2.12 26.094-22.359 13.626c-6.324 3.854-8.889 11.746-6.039 18.582l10.076 24.167-17.055 19.875c-4.822 5.62-4.821
                            13.918.002 19.538l17.052 19.868-10.075 24.166c-2.85 6.835-.285 14.728 6.039 18.582l22.359 13.626-1.671 20.564-81.127 81.137c-3.676 3.676-5.187 8.993-3.992
                            14.053 1.194 5.06 4.924 9.14 9.855 10.784l61.048 20.347 20.347 61.048c1.644
                            4.932 5.724 8.661 10.784 9.855s10.377-.316 14.053-3.992l111.391-111.382 18.349 15.755c5.592 4.801 13.893 4.851 19.543 0l18.349-15.755 111.391 111.381c3.676
                            3.676 8.993 5.187 14.053 3.992 5.06-1.194 9.14-4.924 10.784-9.855l20.347-61.048 61.048-20.347c4.932-1.644 8.661-5.724 9.855-10.784
                            1.194-5.059-.317-10.377-3.993-14.052zm-395.163 73.72-15.05-45.146c-1.493-4.479-5.009-7.994-9.487-9.487l-45.136-15.044 61.912-61.913 17.347 4.121 6.052
                            25.479c1.712 7.207 8.447 12.082 15.808 11.485l26.102-2.12 13.283 21.797zm208.76-116.13-11.736 19.258-20.812-8.683c-5.229-2.182-11.245-1.23-15.547
                            2.463l-17.108 14.689-17.108-14.689c-6.015-5.165-12.781-3.617-15.547-2.463l-20.812 8.683-11.736-19.258c-2.948-4.838-8.362-7.601-14.022-7.145l-22.481
                            1.826-5.212-21.944c-1.309-5.514-5.614-9.818-11.127-11.128l-21.937-5.211 1.826-22.474c.459-5.649-2.306-11.074-7.146-14.023l-19.26-11.737 8.678-20.813c2.181-5.23
                            1.229-11.242-2.463-15.542l-14.687-17.112 14.688-17.118c3.689-4.3 4.642-10.311 2.461-15.541l-8.678-20.813 19.26-11.737c4.84-2.95 7.604-8.375
                            7.146-14.023l-1.826-22.474 21.937-5.21c5.513-1.309 9.818-5.614 11.127-11.128l5.212-21.944 22.481 1.825c5.649.463 11.073-2.305 14.022-7.145l11.736-19.258
                            20.812 8.683c5.228 2.181 11.244 1.23 15.545-2.461l17.111-14.687 17.11 14.687c4.302 3.692 10.315 4.642 15.545 2.461l20.812-8.683 11.736 19.258c2.949 4.839 8.366
                            7.61 14.022 7.145l22.481-1.825 5.212 21.944c1.309 5.514 5.614 9.819 11.127 11.128l21.937 5.21-1.826 22.474c-.459 5.649 2.306 11.074 7.146 14.023l19.26
                            11.737-8.678 20.813c-2.181 5.229-1.229 11.241 2.461 15.541l14.688 17.118-14.687 17.112c-3.691 4.3-4.644 10.312-2.463 15.542l8.678 20.813-19.26 11.737c-4.84
                            2.95-7.604 8.375-7.146 14.023l1.826 22.474-21.937 5.211c-5.513 1.31-9.818 5.614-11.127 11.128l-5.212 21.944-22.481-1.826c-5.648-.459-11.072 2.305-14.021
                            7.145zm102.891 61.497c-4.479 1.493-7.994 5.008-9.487 9.487l-15.05 45.146-70.829-70.829 13.283-21.797 26.102 2.12c7.36.597 14.096-4.278 15.808-11.485l6.052-25.479
                            17.347-4.121 61.912 61.913z"></path><path d="m379.073 165.06-45.444-45.444c-5.857-5.858-15.355-5.858-21.213 0l-72.482
                            72.482-32.316-32.315c-5.857-5.858-15.355-5.858-21.213 0l-45.444 45.445c-5.858 5.858-5.858 15.355 0 21.213l88.367 88.367c5.858 5.859 15.357 5.857 21.213
                            0l128.533-128.534c5.858-5.859 5.858-15.356-.001-21.214zm-139.139 117.927-67.154-67.153 24.231-24.231 32.316 32.315c5.857 5.858 15.355 5.858 21.213
                            0l72.482-72.482 24.231 24.231z"></path></g></svg>
                        </div>
                        <div class="content">
                            <p class="title">24 MONTH WARRANTY</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="textwidget">
                <div class="icon-featured">
                    <div class="iconbox-inner">
                        <div class="icon">
                            <svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g>
                                <path d="m459.669 82.906-196-81.377c-4.91-2.038-10.429-2.039-15.338 0l-196 81.377c-7.465 3.1-12.331 10.388-12.331 18.471v98.925c0 136.213 82.329 258.74
                                208.442 310.215 4.844 1.977 10.271 1.977 15.116 0 126.111-51.474 208.442-174.001 208.442-310.215v-98.925c0-8.083-4.865-15.371-12.331-18.471zm-27.669
                                117.396c0 115.795-68 222.392-176 269.974-105.114-46.311-176-151.041-176-269.974v-85.573l176-73.074 176 73.074zm-198.106 67.414 85.964-85.963c7.81-7.81
                                20.473-7.811 28.284 0s7.81 20.474-.001 28.284l-100.105 100.105c-7.812 7.812-20.475 7.809-28.284 0l-55.894-55.894c-7.811-7.811-7.811-20.474
                                0-28.284s20.474-7.811 28.284 0z"></path></g></svg>
                        </div>
                        <div class="content">
                            <p class="title">100% SECRUE CHECKOUT</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    productContainer.appendChild(productBox);
  }

  function createProductDetails(product, reviews) {
    const productContainerDetails = document.getElementById('tab-pd-details');

    const { id, name, img1, img2, img3, price, desc ,avatar, brand, color, size, categoryName } = product;

    const productBoxs = document.createElement('div');
    productBoxs.classList.add('tab-pd-details-second');
    productBoxs.id = 'details';

    productBoxs.innerHTML = `
      <div class="bd-tab">
        <div class="container container-details-page">
          <ul class="tab-prod">
            <li class="relative" style="list-style: none;">
              <a href="#des" class="underline_scale active show">DESCRIPTION</a>
            </li>
            <li class="relative" style="list-style: none;">
              <a href="#add" class="underline_scale">
                ADDITIONAL INFORMATION</a>
            </li>
            <li class="relative" style="list-style: none;">
              <a href="#rev" class="underline_scale">
                REVIEW</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content container" style="max-width: 1170px!important;">
        <div class="tab-pane fade active show" id="des">
          <div class="desc product-desc">
            <div style="all: unset;" class="" id="">
              <p><span>${desc}</span></p>
              <p><span>Model:&nbsp;${name} - ${color}<br>Color: ${color}<br>Size:&nbsp;${size}<br>SKU:&nbsp;${id}<br>Category: ${categoryName}<br>Release Date: Unknown<br>Condition: Brand New and 100% Authentic</span><span><br></span></p>
            </div>
          </div>
        </div>
        <div class="tab-pane fade tab-addition" id="add">
        <div class="">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-6">
            <div class="title_content">
              <p class="more_info">More Infomation To You</p>
              <h3 class="">Things you need to know</h3>
            </div>
            <div class="row">
              <div class="col-lg-6 content1">
                <p class="info_1">We use industry standard SSL encryption to protect your details. Potentially sensitive information such as your name, address and card details are encoded so they can only be read on the secure server.</p>
                <ul class="px-0 list-unstyled">
                  <li>Safe Payments</li>
                  <li>Accept Credit Cart</li>
                  <li>Different Payment Method</li>
                  <li>Price Include VAT</li>
                  <li>Easy To Order</li>
                </ul>
              </div>
              <div class="col-lg-6 content2">
                <div class="info2">
                  <h3>Express Delivery</h3>
                  <ul class="px-0 list-unstyled">
                    <li>Europe &amp; USA within 2-4 days</li>
                    <li>Rest of the world within 3-7 days</li>
                    <li>Selected locations</li>
                  </ul>
                </div>
                <div class="info2">
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
          <div class="col-lg-4 col-md-6">
            <img class=" ls-is-cached lazyloaded" alt="" src="${avatar}" style="max-width: 360px; max-height: 360px;">
          </div>
        </div>
      </div>
        </div>
        <div class="tab-pane" id="rev">
          <div id="product-review" class="pr-reviews">
          <div class="pr-header">
          <h2 class="pr-header-title">Customer Reviews</h2>
          <div class="pr-summary">
              <span class="pr-starrating">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-regular fa-star"></i>
              </span>
              <span class="pr-summary-caption">
                  <span>Based on 1 review</span>
              </span>
              <span class="pr-summary-actions">
              <a href="#" id="toggleReview">Write a review</a>
            </span>
          </div>
      </div>
      <div class="pr-form" id="pr-forms">
      <form id="review-form" enctype="multipart/form-data">
      <input type="hidden" name="review[rating]" id="review-rating" value="">
          <input type="hidden" name="productId" value="${id}">
          <input type="hidden" name="pr-image-src" id="pr-image-src" value="">


          <fieldset class="pr-form-review">
              <div class="pr-form-review-rating">
                  <label class="pr-form-label">Rating</label>
                  <div class="pr-form-input-star" id="star-rating">
                          <a href="#" class="review-star-select" data-value="1" aria-label="1 of 5 stars"><i class="fa-regular fa-star"></i></a>
                          <a href="#" class="review-star-select" data-value="2" aria-label="2 of 5 stars"><i class="fa-regular fa-star"></i></a>
                          <a href="#" class="review-star-select" data-value="3" aria-label="3 of 5 stars"><i class="fa-regular fa-star"></i></a>
                          <a href="#" class="review-star-select" data-value="4" aria-label="4 of 5 stars"><i class="fa-regular fa-star"></i></a>
                          <a href="#" class="review-star-select" data-value="5" aria-label="5 of 5 stars"><i class="fa-regular fa-star"></i></a>
                  </div>
              </div>
              <div class="pr-form-review-body">
                  <label class="pr-form-label" for="review-body">Body of Review</label>
                  <textarea class="pr-form-input-body" id="review-body" name="reviewBody" rows="10" placeholder="Write your comments here" style="height: 256px;"></textarea>
              </div>
          </fieldset>

          <fieldset class="pr-form-image">
              <input type="file" id="pr-file" accept="image/" hidden>
              <div class="pr-img-area active" data-img="">
                  <i class='bx bxs-cloud-upload'></i>
                  <h3>Upload Image</h3>
                  <p>Image Size</p>
              </div>
              <button class="pr-select-image" id="submit-pr-form">Select Image</button>
          </fieldset>

          <fieldset class="pr-form-actions">
          <button class="pr-button" id="submit-pr-forms">Submit Review</button>
      </fieldset>
      <fieldset>
      <p id="login-before-submit-review" style="color: red; float: right; margin-top: 20px; margin-bottom: 20px;"></p>
      </fieldset>
      </form>
      </div>
          </div>
        </div>
      </div>
    `;

    productContainerDetails.appendChild(productBoxs);

    const prReviews = productBoxs.querySelector('.pr-reviews');
    reviews.forEach(review => {
      const { comment, star, status, image, user, createdAt } = review;
      const { userName } = user;

      console.log(review)

      const starRatingContainer = document.createElement('span');
      const starRemainingContainer = document.createElement('span');
      starRatingContainer.classList.add('pr-starrating');
      starRemainingContainer.classList.add('pr-starrating');

      const totalStars = 5;
      const solidStars = Math.min(Math.floor(star), 5);
      const remainder = Math.max(totalStars - solidStars, 0);

      for (let i = 0; i < solidStars; i++) {
          const solidStarIcon = document.createElement('i');
          solidStarIcon.classList.add('fa-solid', 'fa-star');
          starRatingContainer.appendChild(solidStarIcon);
      }

      for (let i = 0; i < remainder; i++) {
          const regularStarIcon = document.createElement('i');
          regularStarIcon.classList.add('fa-regular', 'fa-star');
          starRemainingContainer.appendChild(regularStarIcon);
      }


      const reviewContainer = document.createElement('div');
      reviewContainer.classList.add('pr-review');

      reviewContainer.innerHTML = `
      <div class="container">
      <div class="row">
        <div class="col-md-9">
      <div class="pr-review-header">
        <span class="pr-starrating">
          ${starRatingContainer.outerHTML}
          ${starRemainingContainer.outerHTML}
        </span>
        <h3 class="pr-review-header-title"></h3>
        <span class="pr-review-header-created">
          <strong>${userName}</strong> on <strong>${createdAt}</strong>
        </span>
      </div>
      <div class="pr-review-content">
        <p class="pr-review-content-body">${comment}</p>
      </div>
      </div>
      <div class="col-md-3">
        <div class="pr-image-container">
          <img style="max-width: 400px; max-height:250px; heigth:250px;" src="${image}" alt="">
        </div>
        <div class="pr-review-footer">
        <a class="pr-report-button" href="">Report as inappropriate</a>
      </div>
      </div>
      </div>
      </div>
      `;

      prReviews.appendChild(reviewContainer);
    });
  }

