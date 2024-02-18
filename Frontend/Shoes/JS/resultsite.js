document.addEventListener('DOMContentLoaded', function() {
    // Function to parse query parameter from URL
    function getSearchQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('q');
    }

    // Retrieve search query
    const searchQuery = getSearchQuery();
    const searchResultContainer = document.getElementById('resultRow');
    const searchResultMessage = document.getElementById('searchResultMessage');
    const pageTitle = document.getElementById('update-search-title');

    // Function to fetch search results based on query
    async function fetchSearchResults(query) {
        try {
            const response = await axios.get(`https://659a6480652b843dea538305.mockapi.io/Product`);
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

    // Function to display search results
    function displaySearchResults(products) {
        searchResultContainer.innerHTML = '';

        if (products.length > 0) {
            searchResultMessage.textContent = `YOUR SEARCH FOR "${searchQuery}" REVEALED THE FOLLOWING:`;
            updatePageTitle(products.length, searchQuery);
            products.forEach(product => {

                const productTitle = product.name;
                const productPrice = product.price;
                const productImage = product.img;

                const productElement = document.createElement('div');
                productElement.classList.add('product-box');
                productElement.innerHTML = `
                <div class="product">
                    <div class="img-product">
                        <a href="">
                            <img style="width: 100%;" src="${productImage}" alt="">
                        </a>

                        <figure style="background: #e12c43; color: #ffffff;" class="label-sale">
                            <span>-34%</span>
                        </figure>

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

    // Update website title
    function updatePageTitle(count, query) {
        const resultString = count === 1 ? 'result' : 'results';
        pageTitle.textContent = `Search: ${count} ${resultString} found for "${query}"`;
    }

    // Display search result message
    if (searchQuery) {
        fetchSearchResults(searchQuery);
    } else {
        searchResultMessage.textContent = `NO SEARCH QUERY PROVIDED.`;
    }
});
