
const authTokens = getCookie('authToken');

if (authTokens) {
    axios.get('http://localhost:8080/api/cart/showCart', {
        headers: {
            'Authorization': `Bearer ${authTokens}`
        }
    })
    .then(response => {
        const viewCartProduct = response.data;
        renderViewCartProduct(viewCartProduct);

        const viewCartTotal = document.querySelector('.cart-amount strong span');
        if (viewCartTotal) {
            viewCartTotal.textContent = '$' + viewCartProduct.totalPrice.toFixed(2);
        }
    }) 
    .catch(error => {
        console.log('Error Fetching ShowviewcartProduct:', error);
    });
}

function renderViewCartProduct(viewCartProduct) {
    const prod = document.querySelector(".view-cart-body-product");
    const viewCartItems = viewCartProduct.cartItemList;
    let totalPrice = 0;

    viewCartItems.forEach(item => {
        const { id, productId, productName, img, quantity: cartQuantity, quantity, price, color, size, subTotal } = item;

        axios.get(`http://localhost:8080/api/warehouse/quantityProduct/${productId}`, {
            params: {
                size: size,
                color: color
            }
        })
        .then(response => {
            const warehouseQuantity = response.data;

            const productCart = document.createElement('tr');
            productCart.classList.add('cart-item');
            totalPrice += subTotal;
            productCart.innerHTML = `
                <td data-label="Product name" class="product-thumbnail">
                    <a href="#">
                        <img src="${img}" alt="${productName}">
                    </a>
                </td>
                <td class="product-name-thumb">
                    <p id="cartItemId">${id}</p>
                    <a href="#">${productName}</a>
                    <small style="display: block; color: #959595;">${size} / ${color}</small>
                </td>
                <td data-label="Price" class="product-prices">
                    <span class="amount">$${price}</span>
                </td>
                <td data-label="Quantity" class="product-quantity">
                    <select id="quantitySelect_${id}" class="select-quantity">
                        ${generateQuantityOptions(cartQuantity, warehouseQuantity)}
                    </select>
                </td>
                <td data-label="Total" class="product-subtotal">
                    <span class="amount">$${subTotal}</span>
                </td>
                <td class="product-removes">
                    <a href="#" onclick="deleteProduct(${id})">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                </td>`;
            prod.appendChild(productCart);
        })
        .catch(error => {
            console.error('Error fetching quantity:', error);
        });
    });

    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
    }
}

function generateQuantityOptions(cartQuantity, warehouseQuantity) {
    let options = '';
    const maxQuantity = Math.min(10, warehouseQuantity);
    for (let i = 1; i <= maxQuantity; i++) {
        options += `<option value="${i}" ${cartQuantity === i ? 'selected' : ''}>${i}</option>`;
    }
    return options;
}

function deleteProduct(id) {
    axios.delete(`http://localhost:8080/api/cart/deleteItem/${id}`)
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with your Axios request:', error);
        });
}

function updateCart() {
    const tbody = document.querySelector('.view-cart-body-product');
    const cartItems = tbody.querySelectorAll('.cart-item');
    const requestData = [];

    cartItems.forEach(cartItem => {
        const cartItemId = cartItem.querySelector('.product-name-thumb #cartItemId').textContent;
        const quantitySelect = cartItem.querySelector('.product-quantity .select-quantity');
        const cartQuantity = quantitySelect.value;

        requestData.push({
            cartItemId: cartItemId,
            quantityItem: cartQuantity
        });
    });

    axios.patch('http://localhost:8080/api/cart/updateQuantity', requestData)
        .then(response => {
            alert('Quantity updated successfully:', response.data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error updating quantity:', error);
        });
}

