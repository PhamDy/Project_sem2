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
        const { name, img, price, discount, description } = product;
        productRow.innerHTML += `
            <div class="product-box">
                <div class="product">
                    <div class="img-product">
                        <a href="">
                            <img style="width: 100%;" src="${img}" alt="${name}">
                        </a>
                        ${discount > 0 ? `<figure style="background: #e12c43; color: #ffffff;" class="label-sale">
                            <span>-${discount}%</span>
                        </figure>` : ''}
                        <ul class="product-icon">
                            <li class="add-cart mr-0">
                                <a href="">
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
                        <a href="">${name}</a>
                    </h4>
                    <p class="product-price">
                        ${discount > 0 ? `<s class="">$${price.toFixed(2)}</s>` : ''}
                        <span class="">$${(price - (price * discount / 100)).toFixed(2)}</span>
                    </p>
                </div>  
            </div>
        `;
    });
}