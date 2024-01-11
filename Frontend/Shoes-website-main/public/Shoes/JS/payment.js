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
