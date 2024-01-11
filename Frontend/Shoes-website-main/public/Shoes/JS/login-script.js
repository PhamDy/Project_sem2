const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
// Get form elements
var signUpForm = document.querySelector('.sign-up form');
var signInForm = document.querySelector('.sign-in form');
s
// Add event listeners for form submissions
signUpForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');

  // Validate inputs
  var isNameValid = validateName(nameInput.value);
  var isEmailValid = validateEmail(emailInput.value);
  var isPasswordValid = validatePassword(passwordInput.value);

  // Show error messages and prevent form submission if any input is invalid
  if (!isNameValid) {
    showError(nameInput, 'Name must be at least 2 characters long.');
    return;
  }

  if (!isEmailValid) {
    showError(emailInput, 'Invalid email address.');
    return;
  }

  if (!isPasswordValid) {
    showError(passwordInput, 'Password must be at least 8 characters long.');
    return;
  }

  // All inputs are valid, proceed with form submission
  signUpForm.submit();
});

signInForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');

  // Validate inputs
  var isEmailValid = validateEmail(emailInput.value);
  var isPasswordValid = validatePassword(passwordInput.value);

  // Show error messages and prevent form submission if any input is invalid
  if (!isEmailValid) {
    showError(emailInput, 'Invalid email address.');
    return;
  }

  if (!isPasswordValid) {
    showError(passwordInput, 'Password must be at least 8 characters long.');
    return;
  }

  // All inputs are valid, proceed with form submission
  signInForm.submit();
});

// Function to validate name
function validateName(name) {
  return name.length >= 2;
}

// Function to validate email
function validateEmail(email) {
  var pattern = /^[\w\.-]+@[\w\.-]+\.\w+$/;
  return pattern.test(email);
}

// Function to validate password
function validatePassword(password) {
  return password.length >= 8;
}

// Function to show error message
function showError(inputElement, errorMessage) {
  var errorElement = document.createElement('p');
  errorElement.className = 'error-message';
  errorElement.textContent = errorMessage;

  var containerElement = inputElement.parentElement;
  containerElement.appendChild(errorElement);
}

// Clear error messages when input value changes
var inputElements = document.querySelectorAll('input');
inputElements.forEach(function(inputElement) {
  inputElement.addEventListener('input', function() {
    var containerElement = inputElement.parentElement;
    var errorElement = containerElement.querySelector('.error-message');
    if (errorElement) {
      containerElement.removeChild(errorElement);
    }
  });
});
