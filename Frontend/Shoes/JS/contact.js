document.getElementById('openLiveChatBtn').addEventListener('click', function() {
    if (window.HubSpotConversations) {
      window.HubSpotConversations.widget.open();
    }
  });

  function validateForm() {
    resetErrors();

    let hasErrors = false;

    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (!nameInput.value.trim()) {
        hasErrors = true;
        markAsError(nameInput);
        nameError.textContent = 'Please fill out this field.';
    }

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        hasErrors = true;
        markAsError(emailInput);
        emailError.textContent = 'Please fill out this field with a valid email address.';
    }

    const messageInput = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (!messageInput.value.trim()) {
        hasErrors = true;
        markAsError(messageInput);
        messageError.textContent = 'Please fill out this field.';
    }

    const generalError = document.getElementById('generalError');
    if (hasErrors) {
        generalError.textContent = 'One or more fields have an error. Please check and try again.';
        return false;
    }

    return true;
}

function markAsError(inputElement) {
    inputElement.classList.add('error');
}

function resetErrors() {
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
        message.textContent = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}