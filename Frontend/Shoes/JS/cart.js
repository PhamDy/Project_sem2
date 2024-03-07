const authToken = getCookie('authToken');

if (authToken) {
    axios.get('http://localhost:8080/api/cart/showCart', {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        const CartProduct = response.data;
        renderShowcart(CartProduct);
        
        const cartCountSpan = document.querySelector('.cart-count span');
        if (cartCountSpan) {
            cartCountSpan.textContent = CartProduct.quantityItem.toString();
        }

        const CartCountNavbar = document.querySelector('.nav-icon span');
        if (CartCountNavbar) {
            CartCountNavbar.textContent = CartProduct.quantityItem.toString();
        }
        const cartTotalPrice = document.querySelector('.sub-total .total-price');
        if (cartTotalPrice) {
    cartTotalPrice.textContent = '$' + CartProduct.totalPrice.toString();
        }
    }) 
    .catch(error => {
        console.log('Error Fetching ShowCartProduct', error);
    });
} else {
}

function renderShowcart(CartProduct) {
    const prod = document.querySelector(".prod");
    const cartItemList = CartProduct.cartItemList;

    cartItemList.forEach(item => {
        const {id, productId, productName, img, quantity, subTotal, color, size} = item;
        const productCart = document.createElement('div');
        productCart.classList.add('product-cart');
        productCart.innerHTML = `
            <ol style="list-style: none;">
                <li class="d-flex">
                    <div class="img-product-cart">
                        <a href="">
                            <img src="${img}" alt="${productName}" style="max-width: 100%;">
                        </a>
                    </div>
                    <div class="product-detail-cart">
                        <h3 class="product-name-mini">
                            <a href="">
                                <span class="">${productName}</span>
                            </a>
                        </h3>
                        <div class="product-info-cart">
                            <div class="product-quantity-mini">Size : ${size}</div>
                            <div class="product-quantity-mini">Color : ${color}</div>
                            <div class="product-quantity-mini">QTY : ${quantity}</div>
                            <div class="product-price-mini">
                                <span>$${subTotal}</span>
                            </div>
                        </div>
                    </div>
                    <div class="product-remove">
                        <a href="#" class="delete-item" data-item-id="${id}"><i class="fa-solid fa-trash"></i></a>
                    </div>
                </li>
            </ol>`;
        prod.appendChild(productCart);
    });
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-item')) {
        event.preventDefault();

        const itemId = event.target.dataset.itemId;

        const deleteUrl = `http://localhost:8080/api/cart/deleteItem/${itemId}`;

        axios.delete(deleteUrl, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            console.log('Item deleted from cart:', response.data);
            

        })
        .catch(error => {
            console.error('Error deleting item from cart:', error);
        });
    }
});