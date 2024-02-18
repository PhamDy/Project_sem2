const method1 = document.getElementById('method-1')
const method2 = document.getElementById('method-2')
const method3 = document.getElementById('method-3')
const standard = document.getElementById('standard')
const priority = document.getElementById('priority')
const overnight = document.getElementById('overnight')


method1.addEventListener('click', methodOne)
method2.addEventListener('click', methodTwo)
method3.addEventListener('click', methodThree)

function methodOne() {
    standard.classList.add('showMethod')
    priority.classList.remove('showMethod')
    overnight.classList.remove('showMethod')
}

function methodTwo() {
    standard.classList.add('showMethod')
    priority.classList.add('showMethod')
    overnight.classList.remove('showMethod')
}

function methodThree() {
    standard.classList.add('showMethod')
    priority.classList.add('showMethod')
    overnight.classList.add('showMethod')
}

function selectMethod(selectedId) {

    var buttons = document.querySelectorAll('.choose-container button');
    buttons.forEach(function(button) {
        button.classList.remove('selected');
    });


    var selectedButton = document.getElementById(selectedId);
    selectedButton.classList.add('selected');
}


function handleShippingMethodSelection(methodName, price, button) {
    // Update the content of the "Shipping Method" section


    var shipMethods = document.querySelectorAll('.ship-method button');
    for (var i = 0; i < shipMethods.length; i++) {
        shipMethods[i].classList.remove('disabled');
        shipMethods[i].style.cursor = 'pointer';
    }

    button.classList.add('disabled');
}
