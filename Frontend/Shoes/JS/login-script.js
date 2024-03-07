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
var signUpForm = document.getElementById('signup-form');
var signInForm = document.querySelector('.sign-in form');
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


let userEmail;

document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const username = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (password.length < 8) {
    return;
  }

  if (username.length < 2) {
    return;
  }

  if (!email.endsWith("@gmail.com") && !email.endsWith("@hotmail.com") && !email.endsWith("@fpt.edu.vn")) {
    return;
  }

  localStorage.setItem("userEmail", email);

  axios.post("http://localhost:8080/api/users/register", {
    username: username,
    email: email,
    password: password
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    }
  })
  .then(response => {
    if (response.status === 201) {
      showSuccess(document.getElementById("email"), "Account created successfully!");
      setTimeout(() => {
        window.location.href = `verifyaccount.html`;
    }, 3000);
    } else {
      throw new Error("Network response was not ok");
    }
  })
  .catch(error => {
    console.error("There was a problem creating the user:", error);
  });
});




function showError(inputElement, errorMessage) {
  clearMessages();

  var errorElement = document.createElement('p');
  errorElement.className = 'error-message';
  errorElement.textContent = errorMessage;

  var containerElement = inputElement.parentElement;
  containerElement.appendChild(errorElement);
}

function showSuccess(inputElement, successMessage) {
  clearMessages();

  var successElement = document.createElement('p');
  successElement.className = 'success-message';
  successElement.textContent = successMessage;

  var containerElement = inputElement.parentElement;
  containerElement.appendChild(successElement);
}



function clearMessages() {
  var existingMessages = document.querySelectorAll('.error-message, .success-message');
  existingMessages.forEach(function(message) {
      message.remove();
  });
}

function setCookie(name, value) {
  document.cookie = name + "=" + value + "; path=/";
}

document.getElementById("sign-in-button").addEventListener("click", function(event) {
  event.preventDefault();
  
  const email = document.getElementById("emails").value;
  const password = document.getElementById("passwords").value;

  axios.post("http://localhost:8080/api/users/login", {
      usernameOrEmail: email,
      password: password
  })
  .then(response => {
      const token = response.data.accessToken;
      setCookie('authToken', token);
      window.location.href = "index.html";

  })
  .catch(error => {
    document.getElementById("wrongpassword").innerText = "Wrong email or password.";
  });
});
