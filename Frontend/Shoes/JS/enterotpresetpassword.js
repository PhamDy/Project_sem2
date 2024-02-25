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

document.getElementById("reset-password").addEventListener("click", function(event) {
    event.preventDefault();
    
    const otp1 = document.getElementById("opt1").value;
    const otp2 = document.getElementById("opt2").value;
    const otp3 = document.getElementById("opt3").value;
    const otp4 = document.getElementById("opt4").value;
    const otp5 = document.getElementById("opt5").value;
    const otp = otp1 + otp2 + otp3 + otp4 + otp5;

    axios.patch("http://localhost:8080/api/users/check-otpReset", {
        otp: otp
    })
    .then(response => {
        document.getElementById("reset-password-message").innerText = "OTP verified successfully.";
        document.getElementById("reset-password-message").style.color = "green";
    })
    .catch(error => {
        document.getElementById("reset-password-message").innerText = "Invalid OTP. Please try again.";
        document.getElementById("reset-password-message").style.color = "red";
    });
});