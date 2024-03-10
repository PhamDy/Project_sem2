const card1 = document.getElementById('card-1')
const paypal2 = document.getElementById('paypal-2')
const momo3 = document.getElementById('momo-3')
const card = document.getElementById('card')
const paypal = document.getElementById('paypal')
const momo = document.getElementById('momo')


card1.addEventListener('click', cardOne)
paypal2.addEventListener('click', paypalTwo)
momo3.addEventListener('click', momoThree)

function cardOne() {
    card.classList.add('showPayment')
    paypal.classList.remove('showPayment')
    momo.classList.remove('showPayment')

}

function paypalTwo() {
    card.classList.remove('showPayment')
    paypal.classList.add('showPayment')
    momo.classList.remove('showPayment')
}

function momoThree() {
    card.classList.remove('showPayment')
    paypal.classList.remove('showPayment')
    momo.classList.add('showPayment')
}


function selectMethod(selectedId) {
    var buttons = document.querySelectorAll('.choose-box button');
    buttons.forEach(function(button) {
        button.classList.remove('selectedPayment');
    });

    var selectedButton = document.getElementById(selectedId);
    selectedButton.classList.add('selectedPayment');

}

document.getElementById('card-1').addEventListener('click', function() {
    selectMethod('card-1');
});

document.getElementById('paypal-2').addEventListener('click', function() {
    selectMethod('paypal-2');
});

document.getElementById('momo-3').addEventListener('click', function() {
    selectMethod('momo-3');
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



document.getElementById("paypal").addEventListener("click", function(event) {
    event.preventDefault();

    const deliveryData = JSON.parse(sessionStorage.getItem('deliveryData'));
    const selectedShippingMethod = JSON.parse(sessionStorage.getItem('selectedShippingMethod'));
    const billingData = JSON.parse(sessionStorage.getItem('billingData'));
    const authTokensOrderspayment = getCookie('authToken');

    if (authTokensOrderspayment && deliveryData) {
        const payload = {
            firstName: deliveryData.firstName,
            lastName: deliveryData.lastName,
            country: deliveryData.country,
            city: deliveryData.city,
            address: deliveryData.address,
            optional: deliveryData.optional,
            zipCode: deliveryData.zipCode,
            email: deliveryData.email,
            phone: deliveryData.phone,
            deliveryId: selectedShippingMethod,
            paymentMethod: "paypal",
            biilingAddress: {
                firstName: billingData.firstName,
                lastName: billingData.lastName,
                country: billingData.country,
                city: billingData.city,
                address: billingData.address,
                optional: billingData.optional,
                zipCode: billingData.zipCode,
                email: billingData.email,
                phone: billingData.phone
            }
        };

        axios.post("http://localhost:8080/api/order/paypal", payload, {
            headers: {
                'Authorization': `Bearer ${authTokensOrderspayment}`
            }
        })
        .then(response => {
            const paypalUrl = response.data;

            window.location.href = paypalUrl;

            sessionStorage.clear();
        })
        .catch(error => {
            console.error("There was a problem creating the user:", error);
        });
    } else {
        console.error("No authentication token found or delivery data is missing.");
    }

    const missingInfoElement = document.getElementById("Misssing-info");
    if (deliveryData) {
    } else {
        missingInfoElement.textContent = "Shipping Info is missing.";
    }
});