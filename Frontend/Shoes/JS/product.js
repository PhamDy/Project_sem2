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


function fetchCategories() {
    Promise.all([
        axios.get("http://localhost:8080/api/category/"),
        axios.get("http://localhost:8080/api/products/getGender"),
        axios.get("http://localhost:8080/api/products/getBrand"),
        axios.get("http://localhost:8080/api/warehouse/color")
    ])
    .then(responses => {
        const categoriesResponse = responses[0];
        const genderResponse = responses[1];
        const brandResponse = responses[2];
        const colorResponse = responses[3];

        const categories1 = categoriesResponse.data;
        const gender = genderResponse.data;
        const brand = brandResponse.data;
        const color = colorResponse.data;

        renderCategories(categories1, gender, brand, color);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

fetchCategories();

const priceRanges1 = [
    { id: "1", label: "Under 50$", for: "price1" }
];

const priceRanges2 = [
    { id: "1", label: "50$ - 100$",  for: "price2"  }

];

const priceRanges3 = [
    { id: "1", label: "100$ - 250$",  for: "price3"  }

];

const priceRanges4 = [
    { id: "1", label: "Over 250$",  for: "price4"  }
];

function renderCategories(categories, gender, brand, color) {
    const categoriesrow1 = document.querySelector("#CategoryList");
    categories.forEach(category => {
        const {id, name} = category;
        const categoriesul = document.createElement('li');
        categoriesul.classList.add('clickable')
        categoriesul.innerHTML = `
            <input type="checkbox" id="${name}" class="filter-button category" onchange="filterCategory()">
            <label for="${name}" style="display: inline-flex;">${name}</label>
        `
        categoriesrow1.appendChild(categoriesul);
    });

    const categoriesgender = document.querySelector("#genderList");
    gender.forEach(genders => {
        const genderul = document.createElement('li');
        genderul.classList.add('clickable')
        genderul.innerHTML =  `
        <input type="checkbox" id="${genders}" class="filter-button gender" onchange="filterGender()">
        <label for="${genders}" style="display: inline-flex;">${genders}</label>`
        categoriesgender.appendChild(genderul);
    });

    const categoriesbrand = document.querySelector("#brandList");
    brand.forEach(brands => {
        const brandul = document.createElement('li');
        brandul.classList.add('clickable')
        brandul.innerHTML = `
        <input type="checkbox" id="${brands}" class="filter-button brand" onchange="filterBrand()">
        <label for="${brands}" style="display: inline-flex;">${brands}</label>
        `
        categoriesbrand.appendChild(brandul)
    });

    const priceListContainer1 = document.getElementById("priceList");
            priceRanges1.forEach(range => {
                const li = document.createElement("li");
                li.classList.add("clickable");
                li.innerHTML = `
                <input type="checkbox" id="${range.id}" class="filter-button price1" onchange="filterPrice1()">
                    <label for="${range.for}" style="display: inline-flex;">${range.label}</label>
                `;
                priceListContainer1.appendChild(li);
            });
            const priceListContainer2 = document.getElementById("priceList");
            priceRanges2.forEach(range => {
                const li = document.createElement("li");
                li.classList.add("clickable");
                li.innerHTML = `
                <input type="checkbox" id="${range.id}" class="filter-button price2" onchange="filterPrice2()">
                    <label for="${range.for}" style="display: inline-flex;">${range.label}</label>
                `;
                priceListContainer2.appendChild(li);
            });
            const priceListContainer3 = document.getElementById("priceList");
            priceRanges3.forEach(range => {
                const li = document.createElement("li");
                li.classList.add("clickable");
                li.innerHTML = `
                <input type="checkbox" id="${range.id}" class="filter-button price3" onchange="filterPrice3()">
                    <label for="${range.for}" style="display: inline-flex;">${range.label}</label>
                `;
                priceListContainer3.appendChild(li);
            });
            const priceListContainer4 = document.getElementById("priceList");
            priceRanges4.forEach(range => {
                const li = document.createElement("li");
                li.classList.add("clickable");
                li.innerHTML = `
                <input type="checkbox" id="${range.id}" class="filter-button price4" onchange="filterPrice4()">
                    <label for="${range.for}" style="display: inline-flex;">${range.label}</label>
                `;
                priceListContainer4.appendChild(li);
            });

            const categoriescolor = document.querySelector("#colourList");
            color.forEach(colors => {
                const colorbutton = document.createElement('button');
                colorbutton.id = colors;
                colorbutton.classList.add("color-button");
                colorbutton.setAttribute('onclick', 'toggleIcon(this); filtercolor();');
                colorbutton.id
                colorbutton.innerHTML = `
                <div class="color-choose" style="background-color: ${colors}"></div>
                <span class="color-text">${colors}</span>
                <i class="fa-solid fa-check fa-beat img-color-product"></i>
                `
                categoriescolor.appendChild(colorbutton);
            });
}


function filterCategory() {
    const selectedCategories = Array.from(document.querySelectorAll('.filter-button.category:checked')).map(checkbox => checkbox.id);
    const selectedGender = getSelectedGenderFromURL();
    const selectedBrand = getSelectedBrandFromURL();
    const selectedPrice = getSelectedPriceFromURL();
    const selectedPrice2 = getSelectedPrice2FromURL();
    const selectedPrice3 = getSelectedPrice3FromURL();
    const selectedPrice4 = getSelectedPrice4FromURL();
    const selectFeatured = getSelectedFeaturedFromURL();
    const selectNewest = getSelectedNewestFromURL();
    const selectDirection = getSelectedDirectionFromURL();
    const SelectSale = getSelectedSaleFromURL();
    const selectColor = getSelectedColorFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, SelectSale, selectColor);
}

function filterGender() {
    const selectedGender = Array.from(document.querySelectorAll('.filter-button.gender:checked')).map(checkbox => checkbox.id);
    const selectedCategories = getSelectedCategoriesFromURL();
    const selectedBrand = getSelectedBrandFromURL();
    const selectedPrice = getSelectedPriceFromURL();
    const selectedPrice2 = getSelectedPrice2FromURL();
    const selectedPrice3 = getSelectedPrice3FromURL();
    const selectedPrice4 = getSelectedPrice4FromURL();
    const selectFeatured = getSelectedFeaturedFromURL();
    const selectNewest = getSelectedNewestFromURL();
    const selectDirection = getSelectedDirectionFromURL();
    const SelectSale = getSelectedSaleFromURL();
    const selectColor = getSelectedColorFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, SelectSale, selectColor);
}

function filterBrand() {
    const selectedBrand = Array.from(document.querySelectorAll('.filter-button.brand:checked')).map(checkbox => checkbox.id);
    const selectedCategories = getSelectedCategoriesFromURL();
    const selectedGender = getSelectedGenderFromURL();
    const selectedPrice = getSelectedPriceFromURL();
    const selectedPrice2 = getSelectedPrice2FromURL();
    const selectedPrice3 = getSelectedPrice3FromURL();
    const selectedPrice4 = getSelectedPrice4FromURL();
    const selectFeatured = getSelectedFeaturedFromURL();
    const selectNewest = getSelectedNewestFromURL();
    const selectDirection = getSelectedDirectionFromURL();
    const SelectSale = getSelectedSaleFromURL();
    const selectColor = getSelectedColorFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, SelectSale, selectColor);
}

function filterPrice1() {
    const selectedPrice = Array.from(document.querySelectorAll('.filter-button.price1:checked')).map(checkbox => checkbox.id);
    const selectedCategories = getSelectedCategoriesFromURL();
    const selectedGender = getSelectedGenderFromURL();
    const selectedBrand = getSelectedBrandFromURL();
    const selectedPrice2 = getSelectedPrice2FromURL();
    const selectedPrice3 = getSelectedPrice3FromURL();
    const selectedPrice4 = getSelectedPrice4FromURL();
    const selectFeatured = getSelectedFeaturedFromURL();
    const selectNewest = getSelectedNewestFromURL();
    const selectDirection = getSelectedDirectionFromURL();
    const SelectSale = getSelectedSaleFromURL();
    const selectColor = getSelectedColorFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, SelectSale, selectColor);
}

function filterPrice2() {
    const selectedPrice2 = Array.from(document.querySelectorAll('.filter-button.price2:checked')).map(checkbox => checkbox.id);
    const selectedCategories = getSelectedCategoriesFromURL();
    const selectedGender = getSelectedGenderFromURL();
    const selectedBrand = getSelectedBrandFromURL();
    const selectedPrice = getSelectedPriceFromURL();
    const selectedPrice3 = getSelectedPrice3FromURL();
    const selectedPrice4 = getSelectedPrice4FromURL();
    const selectFeatured = getSelectedFeaturedFromURL();
    const selectNewest = getSelectedNewestFromURL();
    const selectDirection = getSelectedDirectionFromURL();
    const SelectSale = getSelectedSaleFromURL();
    const selectColor = getSelectedColorFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, SelectSale, selectColor);
}

function filterPrice3() {
    const selectedPrice3 = Array.from(document.querySelectorAll('.filter-button.price3:checked')).map(checkbox => checkbox.id);
    const selectedCategories = getSelectedCategoriesFromURL();
    const selectedGender = getSelectedGenderFromURL();
    const selectedBrand = getSelectedBrandFromURL();
    const selectedPrice = getSelectedPriceFromURL();
    const selectedPrice2 = getSelectedPrice2FromURL();
    const selectedPrice4 = getSelectedPrice4FromURL();
    const selectFeatured = getSelectedFeaturedFromURL();
    const selectNewest = getSelectedNewestFromURL();
    const selectDirection = getSelectedDirectionFromURL();
    const SelectSale = getSelectedSaleFromURL();
    const selectColor = getSelectedColorFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, SelectSale, selectColor);
}

function filterPrice4() {
    const selectedPrice4 = Array.from(document.querySelectorAll('.filter-button.price4:checked')).map(checkbox => checkbox.id);
    const selectedCategories = getSelectedCategoriesFromURL();
    const selectedGender = getSelectedGenderFromURL();
    const selectedBrand = getSelectedBrandFromURL();
    const selectedPrice = getSelectedPriceFromURL();
    const selectedPrice2 = getSelectedPrice2FromURL();
    const selectedPrice3 = getSelectedPrice3FromURL();
    const selectFeatured = getSelectedFeaturedFromURL();
    const selectNewest = getSelectedNewestFromURL();
    const selectDirection = getSelectedDirectionFromURL();
    const SelectSale = getSelectedSaleFromURL();
    const selectColor = getSelectedColorFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, SelectSale, selectColor);
}

function SortFeatured() {
    const selectFeatured = Array.from(document.querySelectorAll('.sortFeatured')).map(button => button.id);
    const selectedCategories = getSelectedCategoriesFromURL();
    const selectedGender = getSelectedGenderFromURL();
    const selectedBrand = getSelectedBrandFromURL();
    const selectedPrice = getSelectedPriceFromURL();
    const selectedPrice2 = getSelectedPrice2FromURL();
    const selectedPrice3 = getSelectedPrice3FromURL();
    const selectedPrice4 = getSelectedPrice4FromURL();
    const selectNewest = getSelectedNewestFromURL();
    const selectDirection = getSelectedDirectionFromURL();
    const SelectSale = getSelectedSaleFromURL();
    const selectColor = getSelectedColorFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, SelectSale, selectColor);
}

function SortNewest() {
    const selectNewest = Array.from(document.querySelectorAll('.sortNewest')).map(button => button.id);
    const selectedCategories = getSelectedCategoriesFromURL();
    const selectedGender = getSelectedGenderFromURL();
    const selectedBrand = getSelectedBrandFromURL();
    const selectedPrice = getSelectedPriceFromURL();
    const selectedPrice2 = getSelectedPrice2FromURL();
    const selectedPrice3 = getSelectedPrice3FromURL();
    const selectedPrice4 = getSelectedPrice4FromURL();
    const selectFeatured = getSelectedFeaturedFromURL();
    const selectDirection = getSelectedDirectionFromURL();
    const SelectSale = getSelectedSaleFromURL();
    const selectColor = getSelectedColorFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, SelectSale, selectColor);
}

function SortDirection() {
    const selectDirection = Array.from(document.querySelectorAll('.sortDirection')).map(button => button.id);
    const selectedCategories = getSelectedCategoriesFromURL();
    const selectedGender = getSelectedGenderFromURL();
    const selectedBrand = getSelectedBrandFromURL();
    const selectedPrice = getSelectedPriceFromURL();
    const selectedPrice2 = getSelectedPrice2FromURL();
    const selectedPrice3 = getSelectedPrice3FromURL();
    const selectedPrice4 = getSelectedPrice4FromURL();
    const selectFeatured = getSelectedFeaturedFromURL();
    const selectNewest = getSelectedNewestFromURL();
    const SelectSale = getSelectedSaleFromURL();
    const selectColor = getSelectedColorFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, SelectSale, selectColor);
}

function filterSale() {
    const selectSale = Array.from(document.querySelectorAll('.filter-button.sale:checked')).map(checkbox => checkbox.id);
    const selectedCategories = getSelectedCategoriesFromURL();
    const selectedGender = getSelectedGenderFromURL();
    const selectedBrand = getSelectedBrandFromURL();
    const selectedPrice = getSelectedPriceFromURL();
    const selectedPrice2 = getSelectedPrice2FromURL();
    const selectedPrice3 = getSelectedPrice3FromURL();
    const selectedPrice4 = getSelectedPrice4FromURL();
    const selectFeatured = getSelectedFeaturedFromURL();
    const selectNewest = getSelectedNewestFromURL();
    const selectDirection = getSelectedDirectionFromURL();
    const selectColor = getSelectedColorFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, selectSale, selectColor);
}

function filtercolor() {
    const selectedColorButtons = Array.from(document.querySelectorAll('.color-button.clicked'));
    const selectedColors = selectedColorButtons.map(button => button.id);
    const selectedCategories = getSelectedCategoriesFromURL();
    const selectedGender = getSelectedGenderFromURL();
    const selectedBrand = getSelectedBrandFromURL();
    const selectedPrice = getSelectedPriceFromURL();
    const selectedPrice2 = getSelectedPrice2FromURL();
    const selectedPrice3 = getSelectedPrice3FromURL();
    const selectedPrice4 = getSelectedPrice4FromURL();
    const selectFeatured = getSelectedFeaturedFromURL();
    const selectNewest = getSelectedNewestFromURL();
    const selectDirection = getSelectedDirectionFromURL();
    const SelectSale = getSelectedSaleFromURL();
    showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, SelectSale, selectedColors);
}


function getSelectedCategoriesFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('category');
}

function getSelectedGenderFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('gender');
}

function getSelectedBrandFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('brand');
}

function getSelectedPriceFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('price1');
}

function getSelectedPrice2FromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('price2');
}

function getSelectedPrice3FromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('price3');
}

function getSelectedPrice4FromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('price4');
}

function getSelectedFeaturedFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('sortFeatured');
}

function getSelectedNewestFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('sortNewest');
}

function getSelectedDirectionFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('sortDirection');
}

function getSelectedSaleFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('discount');
}

function getSelectedColorFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('color');
}

function updateURLParams(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, selectSale, selectColor) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('category');
    urlParams.delete('gender');
    urlParams.delete('brand');
    urlParams.delete('price1');
    urlParams.delete('price2');
    urlParams.delete('price3');
    urlParams.delete('price4');
    urlParams.delete('sortFeatured');
    urlParams.delete('sortNewest');
    urlParams.delete('sortDirection');
    urlParams.delete('discount');
    urlParams.delete('color');

    selectedCategories.forEach(category => urlParams.append('category', category));
    selectedGender.forEach(gender => urlParams.append('gender', gender));
    selectedBrand.forEach(brand => urlParams.append('brand', brand));
    selectedPrice.forEach(price => urlParams.append('price1', price));
    selectedPrice2.forEach(price => urlParams.append('price2', price));
    selectedPrice3.forEach(price => urlParams.append('price3', price));
    selectedPrice4.forEach(price => urlParams.append('price4', price));
    selectSale.forEach(sale => urlParams.append('discount', sale));
    selectColor.forEach(colors => urlParams.append('color', colors));

    if (selectFeatured.length > 0) {
        urlParams.append('sortFeatured', selectFeatured[0]);
        urlParams.delete('sortNewest');
        urlParams.delete('sortDirection');
    }
    if (selectNewest.length > 0) {
        urlParams.append('sortNewest', selectNewest[0]);
        urlParams.delete('sortFeatured');
        urlParams.delete('sortDirection');
    }
    if (selectDirection.length > 0) {
        urlParams.append('sortDirection', selectDirection[0]);
        urlParams.delete('sortFeatured');
        urlParams.delete('sortNewest');
    }

    const newURL = window.location.pathname + '?' + urlParams.toString();
    window.history.pushState({}, '', newURL);
}

function showfilterProduct(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, selectSale, selectColor) {
    updateURLParams(selectedCategories, selectedGender, selectedBrand, selectedPrice, selectedPrice2, selectedPrice3, selectedPrice4, selectFeatured, selectNewest, selectDirection, selectSale, selectColor);
    axios.get("http://localhost:8080/api/products/filter", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
        },
        params: {
            category: selectedCategories.join(','),
            gender: selectedGender.join(','),
            brand: selectedBrand.join(','),
            price1: selectedPrice.join(','),
            price2: selectedPrice2.join(','),
            price3: selectedPrice3.join(','),
            price4: selectedPrice4.join(','),
            sortFeatured: selectFeatured.join(','),
            sortNewest: selectNewest.join(','),
            sortDirection: selectDirection.join(','),
            discount:  selectSale.join(','),
            color: selectColor.join(',')
        }
    })
    .then(response => {
        const filterProduct = response.data;
        console.log(filterProduct)
        const productRow = document.querySelector(".product-row");
        productRow.innerHTML = '';
        if (filterProduct.length > 0) {
            renderFilterProduct(filterProduct);
            hideLoadMoreButton();
        } else {
            currentPage = 1;
            fetchProducts(currentPage);
        }
    })
    .catch(error => {
        console.log('error', error);
    });
}

function renderFilterProduct(filterProduct) {
    const productRowFilter = document.querySelector(".product-row");
    filterProduct.forEach(filterProduct => {
        const { id, name, img, price, discount, description } =  filterProduct;
        const FilterProductBox = document.createElement('div');
        FilterProductBox.classList.add('product-box');
        FilterProductBox.innerHTML = `
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
    productRowFilter.appendChild(FilterProductBox);
    })
}

const apiUrl = "http://localhost:8080/api/products/";
let currentPage = 1;
const productsPerPage = 21;

function fetchProducts(page) {
    axios.get(apiUrl)
        .then(response => {
            const products = response.data;
            const startIndex = (page - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const productsToShow = products.slice(startIndex, endIndex);
            renderProducts(productsToShow);
            if (endIndex < products.length) {
                showLoadMoreButton();
            } else {
                hideLoadMoreButton();
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function renderProducts(products) {
    const productRow = document.querySelector(".product-row");
    products.forEach(product => {
        const { id, name, img, price, discount, description } = product;
        const productBox = document.createElement('div');
        productBox.classList.add('product-box');
        productBox.innerHTML = `
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
        productRow.appendChild(productBox);
    });
}



function loadMoreProducts() {
    currentPage++;
    fetchProducts(currentPage);
}

function showLoadMoreButton() {
    const loadMoreButton = document.getElementById('load-more-button');
    loadMoreButton.style.display = 'block';
}

function hideLoadMoreButton() {
    const loadMoreButton = document.getElementById('load-more-button');
    loadMoreButton.style.display = 'none';
}

fetchProducts(currentPage);


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
    
        if (!popupTrigger.classList.contains('active')) {
            const scrollPosition = window.scrollY;

            removeURLParameters();
    
            window.location.reload();
    
            window.scrollTo(0, scrollPosition);
        }
    }
    function removeURLParameters() {
        const currentURL = new URL(window.location.href);
        currentURL.searchParams.delete('');
        currentURL.searchParams.delete('color');
        currentURL.searchParams.delete('size');
        currentURL.searchParams.delete('quantity');
        window.history.replaceState({}, '', currentURL);
    }

function stopPropagation(event) {
    event.stopPropagation();
}
