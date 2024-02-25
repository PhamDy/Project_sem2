const inputs = document.querySelectorAll("input");

inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        const currentInput = e.target,
            nextInput = currentInput.nextElementSibling,
            prevInput = currentInput.previousElementSibling;

        if (currentInput.value.length > 1) {
            currentInput.value = currentInput.value.slice(0, 1); // Keep only the first digit
        }

        if (currentInput.value !== "") {
            if (nextInput) {
                nextInput.focus();
            }
        }
    });

    input.addEventListener("keydown", (e) => {
        const currentInput = e.target,
            nextInput = currentInput.nextElementSibling,
            prevInput = currentInput.previousElementSibling;

        if (e.key === "ArrowRight" && nextInput) {
            nextInput.focus();
        } else if (e.key === "ArrowLeft" && prevInput) {
            prevInput.focus();
        } else if (e.key === "Backspace" && currentInput.value === "" && prevInput) {
            prevInput.focus();
        }
    });
});

window.addEventListener("load", () => inputs[0].focus());

function verifyOtp() {
    const otp1 = document.getElementById("opt1").value;
    const otp2 = document.getElementById("opt2").value;
    const otp3 = document.getElementById("opt3").value;
    const otp4 = document.getElementById("opt4").value;
    const otp5 = document.getElementById("opt5").value;
    const otp = otp1 + otp2 + otp3 + otp4 + otp5;

    axios.patch("http://localhost:8080/api/users/verify?otp=" + otp)
        .then(response => {
            document.getElementById("verification-message").innerText = "Account verified successfully";
            document.getElementById("verification-message").style.color = "green";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 3000);
        })
        .catch(error => {
            console.error("Error verifying OTP:", error.response.data.error);
            document.getElementById("verification-message").innerText = "Wrong OTP CODE!!";
            document.getElementById("verification-message").style.color = "red";
        });
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("button").addEventListener("click", function(event) {
        event.preventDefault();
        verifyOtp();
    });
});

function resendOTP() {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      axios.post("http://localhost:8080/api/users/verify/regenerateOtp?email=" + userEmail)
        .then(response => {
          document.getElementById("verification-message").innerText = "OTP resent successfully";
          document.getElementById("verification-message").style.color = "black";
        })
        .catch(error => {
          document.getElementById("verification-message").innerText = "Error resending OTP:";
          document.getElementById("verification-message").style.color = "red";
        });
    } else {
      console.error("User email is not stored.");
    }
  }
  
  document.getElementById("resendotp").addEventListener("click", function(event) {
    event.preventDefault();
    resendOTP();
  });