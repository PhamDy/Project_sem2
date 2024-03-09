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
    var requiredInputs = form.querySelectorAll('[required]');
    for (var i = 0; i < requiredInputs.length; i++) {
        if (!requiredInputs[i].checkValidity()) {
            alert("Please fill in all required fields.");
            return false;
        }
    }
    return true;
}

const authTokensOrder = getCookie('authToken');

if (authTokensOrder) {
    axios.get('http://localhost:8080/api/cart/showCart', {
        headers: {
            'Authorization': `Bearer ${authTokensOrder}`
        }
    })
    .then(response => {
        const OrderProduct = response.data;
        renderViewProductOrder(OrderProduct);

        const viewOrderTotal = document.querySelector('.order-summary .total .total-price-in-order');
        if (viewOrderTotal) {
            viewOrderTotal.textContent = '$' + OrderProduct.totalPrice.toString();
        }
    }) 
    .catch(error => {
        console.log('Error Fetching ShowOrderProduct', error);
    });
} else {
}

function renderViewProductOrder(OrderProduct) {
    const prod = document.querySelector(".product-content");
    const viewOrderProduct = OrderProduct.cartItemList;
    let totalPrice = 0;

    viewOrderProduct.forEach(item => {
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
    const optional = document.querySelector('#apartmentName input[name="optional"]').value;
    console.log("saveDeliveryInformation function called");
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