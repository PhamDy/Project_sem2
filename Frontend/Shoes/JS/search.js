const searchInput = document.getElementById('searchInput');
const searchResultContainer = document.querySelector('.the-result.row');
const searchResultMessage = document.querySelector('.text-uppercase.h5');
const searchForm = document.getElementById('search-form');

searchInput.addEventListener('input', async function(event) {
  const query = searchInput.value.trim();
  if (query) {
    const products = await searchProducts(query);
    displaySearchResults(products, query);
    updateSearchResultMessage(query);
  } else {
    searchResultContainer.innerHTML = '';
    updateSearchResultMessage('', false);
  }
});

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = `SearchResult.html?type=product&q=${query}`;
    }
});

async function searchProducts(query) {
  try {
    const response = await axios.get(`https://659a6480652b843dea538305.mockapi.io/Product`);
    const products = response.data;
    const filteredProducts = products.filter(product =>
      (product.name && product.name.toLowerCase().includes(query.toLowerCase())) ||
      (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
    );
    return filteredProducts;
  } catch (error) {
    return [];
  }
}

function displaySearchResults(products, query) {
  searchResultContainer.innerHTML = '';

  if (products.length === 0) {
    updateSearchResultMessage(query, false);
  } else {
    products.forEach(product => {
      const productTitle = product.name;
      const productPrice = product.price;
      const productImage = product.img;

      const productElement = document.createElement('div');
      productElement.classList.add('col-md-4');
      productElement.innerHTML = `
        <ul class="prod-search">
          <li class="product-info-search">
            <a href=""><img style="width: 100%;" src="${productImage}" alt="" class="search-prod-img"></a>
            <h4 class="product-title-search">
              <a href="">${highlightSearchTerm(productTitle, query)}</a>
            </h4>
            <span>
              <p class="price-product-search mb-0">
                <span class="price">${productPrice} USD</span>
              </p>
            </span>
          </li>
        </ul>
      `;
      searchResultContainer.appendChild(productElement);
    });
  }
}

function highlightSearchTerm(text, searchTerm) {
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

