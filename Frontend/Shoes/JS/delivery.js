const addApartment = document.getElementById('addApartmentBtn')
const apartment = document.getElementById('apartmentName')

addApartment.addEventListener('click', addApart)

function addApart() {
    apartment.classList.add('add')
    addApartment.classList.add('remove')
}

document.getElementById('addApartmentBtn').addEventListener('click', function(event) {
    event.preventDefault();
});

function validateForm(form) {
    let isValid = true;

    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());


    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
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

function displayLoggedInContent() {

    document.querySelector(".user-icon").classList.add("hide-guest");
    document.querySelector(".profile").classList.remove("hide-user");
}

function displayGuestContent() {


    document.querySelector(".user-icon").classList.remove("hide-guest");
    document.querySelector(".profile").classList.add("hide-user");
}

checkAuthToken();



function saveDeliveryInformation() {
    event.preventDefault();

    const isValid = validateForm(document.getElementById('deliveryForm'));

    if (!isValid) {
        return false;
    }

    const optional = document.querySelector('#apartmentName input[name="optional"]').value;
    const deliveryData = {
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

    sessionStorage.setItem('deliveryData', JSON.stringify(deliveryData));

    window.location.href = "shipping.html";
}

window.onload = function() {
    const deliveryDataString = sessionStorage.getItem('deliveryData');

    if (deliveryDataString) {
        const deliveryData = JSON.parse(deliveryDataString);

        document.querySelector('input[name="firstName"]').value = deliveryData.firstName;
        document.querySelector('input[name="lastName"]').value = deliveryData.lastName;
        document.querySelector('select[name="country"]').value = deliveryData.country;
        document.querySelector('input[name="city"]').value = deliveryData.city;
        document.querySelector('input[name="address"]').value = deliveryData.address;
        document.querySelector('#apartmentName input[name="optional"]').value = deliveryData.optional;
        document.querySelector('input[name="zipCode"]').value = deliveryData.zipCode;
        document.querySelector('input[name="email"]').value = deliveryData.email;
        document.querySelector('input[name="phone"]').value = deliveryData.phone;
    }
}