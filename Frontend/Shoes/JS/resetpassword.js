document.getElementById("btn-reset").addEventListener("click", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("reset-email-input").value;

    axios.post("http://localhost:8080/api/users/create-otpReset?email=" + email)
    .then(response => {
        document.getElementById("reset-succ").innerText = "OTP created successfully.";
        document.getElementById("reset-succ").style.color = "green";
        setTimeout(() => {
            window.location.href = "enterotpresetpassword.html";
        }, 3000);
    })
    .catch(error => {
        document.getElementById("reset-succ").innerText = "Email Not Found";
        document.getElementById("reset-succ").style.color = "red";
    });
});