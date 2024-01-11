function toggleFormVisibility() {
    var formElements = document.querySelectorAll('#deliveryForm .form-group');
    var checkbox = document.getElementById('billingCheckbox');

    formElements.forEach(function(element) {
        element.style.display = checkbox.checked ? 'none' : 'block';
    });
}