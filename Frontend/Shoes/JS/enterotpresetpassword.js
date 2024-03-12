const otpInputs = document.querySelectorAll(".otp-input");

otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        const currentInput = e.target,
            nextInput = currentInput.nextElementSibling,
            prevInput = currentInput.previousElementSibling;

        if (currentInput.value.length > 1) {
            currentInput.value = currentInput.value.slice(0, 1);
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
    const otpReset = otp1 + otp2 + otp3 + otp4 + otp5;

    const resetPassword = document.getElementById("resetPassword").value;
    const reenterPassword = document.getElementById("re-enterPassword").value;

    if (resetPassword.length < 5 || resetPassword.length > 30) {
        document.getElementById("reset-password-message").innerText = "Password must be between 5 and 30 characters.";
        document.getElementById("reset-password-message").style.color = "red";
        return;
    }

    if (resetPassword !== reenterPassword) {
        document.getElementById("reset-password-message").innerText = "Passwords do not match.";
        document.getElementById("reset-password-message").style.color = "red";
        return;
    }

    axios.patch("http://localhost:8080/api/users/check-otpReset", {
        otpReset: otpReset,
        passwordNew: resetPassword
    })
    .then(response => {
        document.getElementById("reset-password-message").innerText = "Password reset successful.";
        document.getElementById("reset-password-message").style.color = "green";
        setTimeout(() => {
            window.location.href = "login.html";
        }, 3000);
    })
    .catch(error => {
        document.getElementById("reset-password-message").innerText = "Invalid OTP. Please try again.";
        document.getElementById("reset-password-message").style.color = "red";
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("reset-password").addEventListener("click", function(event) {
        event.preventDefault();
        verifyOtp();
    });
});
