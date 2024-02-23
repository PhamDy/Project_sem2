document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting via HTTP
  
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
  
    const url = "https://659a6480652b843dea538305.mockapi.io/users";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formDataObject)
    };
  
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        document.getElementById("message").innerText = "Sign up successful!";
        console.log(data); // You can do something with the response data if needed
      })
      .catch(error => {
        document.getElementById("message").innerText = "An error occurred while signing up.";
        console.error("There was an error!", error);
      });
  });
  