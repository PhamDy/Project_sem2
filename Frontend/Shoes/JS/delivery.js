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

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const numElement = document.querySelector('.num');
const priceElement = document.querySelector('.price-update span');

let unitPrice = parseFloat(priceElement.innerText.replace('$ ', ''));

let quantity = parseInt(numElement.innerText, 10);

function updatePrice() {
    const totalPrice = unitPrice * quantity;
    priceElement.innerText = `$ ${totalPrice.toFixed()}`;
}

plus.addEventListener('click', () => {
    quantity++;
    quantity = (quantity < 10) ? '0' + quantity : quantity;
    numElement.innerText = quantity;
    updatePrice();
    console.log(quantity);
});

minus.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantity = (quantity >= 0) ? '0' + quantity : '00';
        numElement.innerText = quantity;
        updatePrice();
        console.log(quantity);
    }
});


function validateForm(form) {
    var requiredInputs = form.querySelectorAll('[required]');
    for (var i = 0; i < requiredInputs.length; i++) {
        if (!requiredInputs[i].checkValidity()) {
            alert("Please fill in all required fields.");
            return false;
        }
    }

    // If all validations pass, you can proceed to the next page
    // For example, uncomment the line below to navigate to shipping.html
    // window.location.href = 'shipping.html';

    return true;
}