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
updateCardData('totalOrders', 'totalOrders');
updateCardData('orderCancel', 'orderCancel');
updateCardData('orderPending', 'pendingRequests');
updateCardData('orderSuccess', 'orderSuccess');

//===================================================================================================================================================================

document.addEventListener("DOMContentLoaded", function() {
    var filterLinks = document.querySelectorAll(".filter-link");
    filterLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            var status = this.getAttribute("data-status");
            filterTableByStatus(status);
        });
    });
});
function filterTableByStatus(status) {
    window.location.href = "order_management.html?status=" + status + "&fromPage=a";
}
