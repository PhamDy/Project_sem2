document.addEventListener('DOMContentLoaded', function () {
    var checkboxes = document.querySelectorAll('.clickable input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', function (event) {

            event.stopPropagation();
        });
    });

    var lis = document.querySelectorAll('.clickable');

    lis.forEach(function (li) {
        li.addEventListener('click', function () {
            var checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
        });

        var label = li.querySelector('label');
        if (label) {
            label.addEventListener('click', function () {
                var checkbox = li.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
            });
        }
    });
});

function toggleIcon(button) {
    button.classList.toggle('clicked');
}

function toggleSortList() {
    var sortList = document.getElementById("sortList");
    sortList.style.display = (sortList.style.display === "none" || sortList.style.display === "") ? "block" : "none";
}

function toggleCategoryList() {
    var CategoryList = document.getElementById("CategoryList");
    CategoryList.style.display = (CategoryList.style.display === "none" || CategoryList.style.display === "") ? "block" : "none";
}

function toggleGenderList() {
    var genderList = document.getElementById("genderList");
    genderList.style.display = (genderList.style.display === "none" || genderList.style.display === "") ? "block" : "none";
}

function togglePriceList() {
    var priceList = document.getElementById("priceList");
    priceList.style.display = (priceList.style.display === "none" || priceList.style.display === "") ? "block" : "none";
}

function toggleSaleList() {
    var saleList = document.getElementById("saleList");
    saleList.style.display = (saleList.style.display === "none" || saleList.style.display === "") ? "block" : "none";
}

function toggleColorList() {
    var colorList = document.getElementById("colourList");
    colorList.style.display = (colorList.style.display === "none" || colorList.style.display === "") ? "block" : "none";
}

function toggleBrandList() {
    var brandList = document.getElementById("brandList");
    brandList.style.display = (brandList.style.display === "none" || brandList.style.display === "") ? "block" : "none";
}

function toggleSportsList() {
    var sportsList = document.getElementById("sportsList");
    sportsList.style.display = (sportsList.style.display === "none" || sportsList.style.display === "") ? "block" : "none";
}

function toggleAthletesList() {
    var athletesList = document.getElementById("athletesList");
    athletesList.style.display = (athletesList.style.display === "none" || athletesList.style.display === "") ? "block" : "none";
}

const menuBar = document.querySelector('.filter-content .hide-show');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
})




function toggleColumns() {
    var sidebarContainer = document.getElementById('sidebar-container');
    var mainContent = document.getElementById('main-content');
    var sidebarContent = document.getElementById('sidebar')

    sidebarContainer.classList.toggle('col-md-3');
    sidebarContainer.classList.toggle('col-md-0');

    mainContent.classList.toggle('col-md-12');
    mainContent.classList.toggle('col-md-9');

    sidebarContent.classList.toggle('sidebar');
    sidebarContent.classList.toggle('showsidebar');
}

function toggleSortOption() {
    var sortOption = document.getElementById('sort-option');
    sortOption.classList.toggle('active');
}

function updateSortBy(value, button) {
    var sortByText = document.getElementById('sort-by-text');
    var buttons = document.querySelectorAll('.dropdown-option');


    buttons.forEach(function(btn) {
        btn.classList.remove('selected');
        btn.classList.remove('disabled');
        btn.removeAttribute('disabled');
    });


    button.classList.add('selected');


    button.classList.add('disabled');
    button.setAttribute('disabled', 'true');


    buttons.forEach(function(btn) {
        if (btn.classList.contains('selected')) {
            btn.style.color = '#707072';
        } else {
            btn.style.color = ''; 
        }
    });


    sortByText.innerHTML = 'Sort By: ' + value;

    toggleSortOption();
}

const openFilter = document.getElementById('filter-button-mobile')
const productSideBar = document.getElementById('sidebar')
const closeFilter = document.getElementById('close-filters')
const applyFilter = document.getElementById('apply-container')




openFilter.addEventListener('click', openFilters)
closeFilter.addEventListener('click', closeFilters)
applyFilter.addEventListener('click', closeFilters)

function openFilters() {
    productSideBar.classList.add('showfiltermobile')
    applyFilter.classList.add('applyfiltermobile')
    closeFilter.classList.add('filterclose-button')
}

function closeFilters () {
    productSideBar.classList.remove('showfiltermobile')
    applyFilter.classList.remove('applyfiltermobile')
    closeFilter.classList.remove('filterclose-button')
}




const apiUrl = "http://localhost:8080/api/products/";

axios.get(apiUrl)
    .then(response => {
        const products = response.data;
        renderProducts(products);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

    function renderProducts(products) {
        const productRow = document.querySelector(".product-row");
        products.forEach(product => {
            const { id, name, img, price, discount, description } = product;
            const productBox = document.createElement('div');
            productBox.classList.add('product-box');
            productBox.innerHTML = `
                <div class="product">
                    <div class="img-product">
                        <a href="#">
                            <img style="width: 100%;" src="${img}" alt="${name}">
                        </a>
                        ${discount > 0 ? `<figure style="background: #e12c43; color: #ffffff;" class="label-sale">
                            <span>-${discount}%</span>
                        </figure>` : ''}
                        <ul class="product-icon">
                            <li class="add-cart mr-0">
                                <a href="#">
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
                        <a href="#">${name}</a>
                    </h4>
                    <p class="product-price">
                        ${discount > 0 ? `<s class="">$${price.toFixed(2)}</s>` : ''}
                        <span class="">$${(price - (price * discount / 100)).toFixed(2)}</span>
                    </p>
                </div>  
            `;
            productRow.appendChild(productBox);
        });
    }

    function openQuickView(productId) {
        axios.get(apiUrl + productId)
            .then(response => {
                const product = response.data;
                renderPopup(product);
                togglePopup(`popup-${product.id}`);
                console.log(product)
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }

    function updateQuantity(productId, selectedColor, selectedSize) {
        return axios.get(`http://localhost:8080/api/warehouse/quantityProduct/${productId}?color=${selectedColor}&size=${selectedSize}`)
            .then(response => {
                const quantity = response.data;
                quantityInput.value = 1;
                quantityInput.max = quantity;
            })
            .catch(error => {
                console.error('Error fetching quantity:', error);
                throw error;
            });
    }

    function addToCart(productId, selectedColor, selectedSize, selectedQuantity) {
        return axios.post(`http://localhost:8080/api/cart/${productId}?color=${selectedColor}&size=${selectedSize}&quantity=${selectedQuantity}`)
            .then(response =>  {
                const addtocart = response.data;
            })
            .catch(error => {
                console.error('error fetching addtocart: ', error)
                throw error
            })
    }
    
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
                                <div class="quantity-all">
                                    <span class="qty-minus" onclick="decreaseQuantity()">
                                        <i class="fa fa-caret-down"></i>
                                    </span>
                                    <input type="number" name="quantity" id="quantityInput" pattern="[0-9]*">
                                    <span class="qty-plus" onclick="increaseQuantity()">
                                        <i class="fa fa-caret-up"></i>
                                    </span>
                                </div>
                                <p id="quantityErrorMessage" style="color: red; display: none;">Quantity must be less than maxQuantity</p>
                            </div>
                                <div class="btn-addtocart">
                                    <button type="button" class="btn-addtocart" onclick="updateUrlAddToCart(productId)">Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        document.body.insertAdjacentHTML('beforeend', popupContent);
    }
    
    document.getElementById('quantityInput').addEventListener('input', function() {
        updateURL(productId);
    });

    function updateURL(productId) {
        try {
            const selectedSize = document.querySelector('input[name^="option-size"]:checked').value;
            const selectedColor = document.querySelector('input[name^="option-color"]:checked').value;
            const selectedQuantity = document.getElementById('quantityInput').value;
    
            const currentURL = new URL(window.location.href);
            currentURL.searchParams.set('productId', productId);
            currentURL.searchParams.set('color', selectedColor);
            currentURL.searchParams.set('size', selectedSize);
            currentURL.searchParams.set('quantity', selectedQuantity);
    
            window.history.replaceState({}, '', currentURL);
    
            updateQuantity(productId, selectedColor, selectedSize);
            addToCart(productId, selectedColor, selectedSize, selectedQuantity);
        } catch (error) {
            console.error('Error updating URL:', error);
        }
    }

    function togglePopup(popupId) {
        const popupTrigger = document.getElementById(popupId);
        popupTrigger.classList.toggle('active');
    }

function stopPropagation(event) {
    event.stopPropagation();
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantityInput');
    let quantity = parseInt(quantityInput.value);
    const maxQuantity = parseInt(quantityInput.max); 

    if (quantity < maxQuantity) {
        quantity++;
        quantityInput.value = quantity;
        updateURL(productId);
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantityInput');
    let quantity = parseInt(quantityInput.value) || 0;

    if (quantity > 0) { 
        quantity--;
        quantityInput.value = quantity; 
        updateURL(productId);
    }
}