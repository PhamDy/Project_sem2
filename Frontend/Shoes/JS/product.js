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

document.addEventListener('DOMContentLoaded', () => {
    let cartItems = [];
    const cartCountElement = document.querySelector('.cart-count span');
    const cartTotalElement = document.querySelector('.total-price');
    const cartItemsContainer = document.querySelector('.cart-items');

    updateCartUI();

    window.addItemToCart = function(product) {
        try {
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
            console.error('Error adding item to cart:', error);
        }
    };


    function updateCartUI() {
        const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = cartCount;

        cartItemsContainer.innerHTML = "";
        cartItems.forEach(item => {
            const productElement = createProductElement(item);
            cartItemsContainer.appendChild(productElement);
        });

        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    window.removeItemFromCart = function(itemId) {
        cartItems = cartItems.filter(item => item.id !== itemId);
        updateCartUI();
    };

    function createProductElement(item) {
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
                            <a href="#">${item.productName}</a>
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
        return productElement;
    }

});