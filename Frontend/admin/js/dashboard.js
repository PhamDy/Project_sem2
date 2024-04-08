// Function to update card data
function updateCardData(endpoint, targetId) {
    axios.get(`http://localhost:8080/api/order/${endpoint}`)
        .then(response => {
            const data = response.data;
            document.getElementById(targetId).textContent = data;
        })
        .catch(error => {
            console.error(`Error fetching data for ${targetId}:`, error);
        });
}

// Call the function for each card
updateCardData('toalByMonth', 'monthlyEarnings');
updateCardData('toalByYear', 'annualEarnings');
updateCardData('orderPending', 'pendingRequests');

//===================================================================================================================================================================




