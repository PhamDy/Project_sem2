function toggleFormVisibility() {
    var formElements = document.querySelectorAll('#billingForm .form-group');
    var checkbox = document.getElementById('billingCheckbox');

    formElements.forEach(function(element) {
        element.style.display = checkbox.checked ? 'none' : 'block';
    });
}

function synchronizeBillingWithDelivery() {
    const deliveryDataString = sessionStorage.getItem('deliveryData');
    if (deliveryDataString) {
        const deliveryData = JSON.parse(deliveryDataString);
        sessionStorage.setItem('billingData', JSON.stringify(deliveryData));
    }
}

function validateForm(form) {
    let isValid = true;

    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());

    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        if (input.offsetParent === null) {
            return;
        }

        if (!input.value) {
            isValid = false;
            const errorMessage = document.createElement('span');
            errorMessage.textContent = 'Please fill out this field.';
            errorMessage.classList.add('error-message');
            input.parentNode.appendChild(errorMessage);
        }
    });

    return isValid;
}

document.querySelector('.header-logos').addEventListener('click', function(event) {
    sessionStorage.clear();
});

function saveBillingInformation() {
    event.preventDefault();

    const isValid = validateForm(document.getElementById('billingForm'));

    if (!isValid) {
        return false;
    }

    const billingCheckbox = document.getElementById('billingCheckbox');
    if (!billingCheckbox.checked) {
        const billingData = {
            firstName: document.querySelector('input[name="firstName"]').value,
            lastName: document.querySelector('input[name="lastName"]').value,
            country: document.querySelector('select[name="country"]').value,
            city: document.querySelector('input[name="city"]').value,
            address: document.querySelector('input[name="address"]').value,
            optional: document.querySelector('#apartmentName input[name="optional"]').value,
            zipCode: document.querySelector('input[name="zipCode"]').value,
            email: document.querySelector('input[name="email"]').value,
            phone: document.querySelector('input[name="phone"]').value,
        };

        sessionStorage.setItem('billingData', JSON.stringify(billingData));
    }

    window.location.href = "total.html";
}

window.onload = function() {
    const billingDataString = sessionStorage.getItem('billingData');
    if (billingDataString) {
        const billingData = JSON.parse(billingDataString);
        document.querySelector('input[name="firstName"]').value = billingData.firstName;
        document.querySelector('input[name="lastName"]').value = billingData.lastName;
        document.querySelector('select[name="country"]').value = billingData.country;
        document.querySelector('input[name="city"]').value = billingData.city;
        document.querySelector('input[name="address"]').value = billingData.address;
        document.querySelector('#apartmentName input[name="optional"]').value = billingData.optional;
        document.querySelector('input[name="zipCode"]').value = billingData.zipCode;
        document.querySelector('input[name="email"]').value = billingData.email;
        document.querySelector('input[name="phone"]').value = billingData.phone;
    }

    const billingCheckbox = document.getElementById('billingCheckbox');
    if (billingCheckbox.checked) {
        synchronizeBillingWithDelivery();
    }
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

        const tax = calculateTax(OrderProductShipping.totalPrice);
        const taxElement = document.querySelector('.price-order-tax');
        if (taxElement) {
            taxElement.textContent = '$' + tax.toFixed(2);
        }

        const viewOrderTotalShipping = document.querySelector('.order-summary .summary-content .content-order .price-order-subtotal');
        if (viewOrderTotalShipping) {
            viewOrderTotalShipping.textContent = '$' + OrderProductShipping.totalPrice.toFixed(2);
        }

        const viewShippingPrice = document.querySelector('.order-summary .summary-content .content-order .price-order-shipping');
        let shipPrice = sessionStorage.getItem('shipPrice');

        if (viewShippingPrice && shipPrice) {
            shipPrice = parseFloat(shipPrice.replace(/"/g, ''));
            viewShippingPrice.textContent = '$' + shipPrice.toFixed(2);
        }

        const totalPrice = OrderProductShipping.totalPrice + tax + shipPrice;
        const totalPriceElement = document.querySelector('.total-price-in-order');
        if (totalPriceElement) {
            totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
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

function calculateTax(total) {
    if (total <= 100 && total > 0) {
        return total * 0.1;
    } else if (total > 100 && total <= 500) {
        return total * 0.08;
    } else {
        return total * 0.05;
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