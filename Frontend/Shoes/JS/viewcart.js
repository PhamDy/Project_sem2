const authTokens = getCookie('authToken');

if (authTokens) {
    axios.get('http://localhost:8080/api/cart/showCart', {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        const viewcartProduct = response.data;
        renderViewCartProduct(viewcartProduct);

        const viewCartTotal = document.querySelector('.cart-amount strong span');
        if (viewCartTotal) {
            viewCartTotal.textContent = '$' + viewcartProduct.totalPrice.toString();
        }
    }) 
    .catch(error => {
        console.log('Error Fetching ShowviewcartProduct', error);
    });
} else {
}

function renderViewCartProduct(viewcartProduct) {
    const prod = document.querySelector(".view-cart-body-product");
    const viewCartItem = viewcartProduct.cartItemList;
    let totalPrice = 0;

    viewCartItem.forEach(item => {
        const { id, productId, productName, img, quantity, price, color, size } = item;
        const productCart = document.createElement('tr');
        productCart.classList.add('cart-item');
        const subTotal = price * quantity;
        totalPrice += subTotal;
        productCart.innerHTML = `
             <td data-label="Product name" class="product-thumbnail">
                                            <a href="">
                                                <img src="${img}" alt="${productName}">
                                            </a>
                                        </td>
                                        <td class="product-name-thumb">
                                            <a href="">${productName}</a>
                                            <small style="display: block; color: #959595;">${size} / ${color}</small>
                                        </td>
                                        <td data-label="Price" class="product-prices">
                                            <span class="amount">$${price}</span>
                                        </td>
                                        <td data-label="Quantity" class="product-quantity">
                                            <div class="product-quantity">
                                                <div class="quantity-option-container">
                                                    <div class="font-quantity-arrow-down">
                                                        <i id="caretdown" class="fa-solid fa-caret-down"></i>
                                                    </div>
                                                    <select name="quantitySelect" id="quantitySelect" class="select-quantity">
                                                    <option value="${quantity}" selected>${quantity}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Total" class="product-subtotal">
                                            <span class="amount">$${subTotal}</span>
                                        </td>
                                        <td class="product-removes">
                                            <a href="">
                                                <i class="fa-solid fa-trash"></i>
                                            </a>
                                        </td>`;
        prod.appendChild(productCart);
    });

    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
    }
}
