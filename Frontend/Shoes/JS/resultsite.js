document.addEventListener('DOMContentLoaded', function() {
    function getSearchQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('q');
    }

    const searchQuery = getSearchQuery();
    const searchResultContainer = document.getElementById('resultRow');
    const searchResultMessage = document.getElementById('searchResultMessage');
    const pageTitle = document.getElementById('update-search-title');

    async function fetchSearchResults(query) {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/`);
            const products = response.data;
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
            );
            displaySearchResults(filteredProducts);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    function displaySearchResults(products) {
        searchResultContainer.innerHTML = '';

        if (products.length > 0) {
            searchResultMessage.textContent = `YOUR SEARCH FOR "${searchQuery}" REVEALED THE FOLLOWING:`;
            updatePageTitle(products.length, searchQuery);
            products.forEach(product => {

                const productId = product.id;
                const productTitle = product.name;
                const productPrice = product.price;
                const productImage = product.img;

                const productElement = document.createElement('div');
                productElement.classList.add('product-box');
                productElement.innerHTML = `
                <div class="product">
                    <div class="img-product">
                        <a href="#" onclick="openProductDetails(${productId}); return false;">
                            <img style="width: 100%;" src="${productImage}" alt="">
                        </a>

                        <figure style="background: #e12c43; color: #ffffff;" class="label-sale">
                            <span>-34%</span>
                        </figure>
                    </div>
                    <h4 class="product-title">
                        <a href="">${productTitle}</a>
                    </h4>
                    <p class="product-price">
                        <s class="">$135.00</s>
                        <span class="">$${productPrice}</span>
                    </p>
                </div>  
                `;
                searchResultContainer.appendChild(productElement);
            });
        } else {
        searchResultMessage.textContent = `YOUR SEARCH FOR "${searchQuery}" DID NOT YIELD ANY RESULTS.`;
        updatePageTitle(0, searchQuery);
    }
    }

    function updatePageTitle(count, query) {
        const resultString = count === 1 ? 'result' : 'results';
        pageTitle.textContent = `Search: ${count} ${resultString} found for "${query}"`;
    }

    if (searchQuery) {
        fetchSearchResults(searchQuery);
    } else {
        searchResultMessage.textContent = `NO SEARCH QUERY PROVIDED.`;
    }
});

function openProductDetails(productId) {
    window.location.href = `details.html?id=${productId}`;
  }
