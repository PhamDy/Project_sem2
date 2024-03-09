

axios.get("http://localhost:8080/api/order/showDelivery")
    .then(response => {
        const deliveryMethods = response.data;
        renderDeliveryMethods(deliveryMethods);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

function renderDeliveryMethods(deliveryMethods) {
    const methodRow = document.querySelector('.ship-method-content');
    deliveryMethods.forEach(method => {
        const { id, img, name, price } = method;
        const methodBox = document.createElement('div');
        methodBox.classList.add('ship-method');
        methodBox.dataset.methodId = id;
        methodBox.innerHTML = `
            <div class="ship-box" style="display: inline-flex;">
                <div class="ship-img">
                    <img src="${img}" alt="${name}" style="width: 40%;">
                </div>
                <div class="ship-name">
                    <span>${name}</span>
                </div>
                <div class="ship-price">
                    <span>$${price}</span>
                </div>
            </div>
        `;
        methodBox.addEventListener('click', () => selectMethod(methodBox, deliveryMethods));
        methodRow.appendChild(methodBox);
    });
}

function selectMethod(selectedMethodBox, deliveryMethods) {
    const methodId = selectedMethodBox.dataset.methodId;
    document.querySelectorAll('.ship-method').forEach(methodBox => {
        methodBox.classList.remove('selected');
    });
    selectedMethodBox.classList.add('selected');

    const selectedMethod = deliveryMethods.find(method => method.id === methodId);
    console.log("Selected method:", selectedMethod);
}

function displayLoggedInContent() {

    document.querySelector(".user-icon").classList.add("hide-guest");
    document.querySelector(".profile").classList.remove("hide-user");
}

function displayGuestContent() {


    document.querySelector(".user-icon").classList.remove("hide-guest");
    document.querySelector(".profile").classList.add("hide-user");
}

checkAuthToken();

const authTokensOrders = getCookie('authToken');

if (authTokensOrders) {
    axios.get('http://localhost:8080/api/cart/showCart', {
        headers: {
            'Authorization': `Bearer ${authTokensOrders}`
        }
    })
    .then(response => {
        const OrderProductShipping = response.data;
        renderViewProductOrderShipping(OrderProductShipping);

        const viewOrderTotalShipping = document.querySelector('.order-summary .total .total-price-in-order');
        if (viewOrderTotalShipping) {
            viewOrderTotalShipping.textContent = '$' + OrderProductShipping.totalPrice.toString();
        }
    }) 
    .catch(error => {
        console.log('Error Fetching ShowOrderProductShipping', error);
    });
} else {
}

function renderViewProductOrderShipping(OrderProductShipping) {
    const prod = document.querySelector(".product-content");
    const viewOrderProductShipping = OrderProductShipping.cartItemList;
    let totalPrice = 0;

    viewOrderProductShipping.forEach(item => {
        const { id, productId, productName, img, quantity, price, color, size, subTotal } = item;
        const productCart = document.createElement('div');
        productCart.classList.add('product-order');
        totalPrice += subTotal;
        productCart.innerHTML = `
        <ol style="list-style: none; padding: 0;">
        <li class="d-flex">
            <div class="img-product-order">
                <a href="">
                    <img src="${img}" alt="${productName}" style="max-width: 100%;">
                </a>
            </div>
            <div class="product-detail-order">
                <h3 class="mini-name">
                    <a href="">${productName}</a>
                </h3>
                <div class="quantity-container">
                    <div class="price-update">
                        <span>Size: ${size}</span>
                    </div>
                </div>
                <div class="quantity-container">
                    <div class="price-update">
                        <span>Color: ${color}</span>
                    </div>
                </div>
                <div class="quantity-container">
                     <div class="price-update">
                        <span>Qty: ${quantity}</span>
                    </div>
                </div>

                <div class="quantity-container">
                    <div class="price-update">
                        <span>$${subTotal}</span>
                    </div>
                </div>
            </div>
            <div class="remove-product-order">
                <a href="" onclick="deleteProduct(${id})">
                    <i class="fa-solid fa-trash"></i>
                </a>
            </div>
        </li>
    </ol>`;
        prod.appendChild(productCart);
    });

    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
    }
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