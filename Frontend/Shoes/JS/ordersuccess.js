function fetchOrderSuccess() {
    const authToken = getCookie('authToken');
    if (authToken) {
        axios.get('http://localhost:8080/api/order/orderSummary', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${authToken}`
            }
        })
        .then(response => {
            const orderProduct = response.data;
            console.log("Order Summary:", response.data);
            renderOrderSuccess(orderProduct);
            const orderID = document.getElementById("orderID");
            if (orderProduct.length > 0) {
                orderID.textContent = orderProduct[0].id;
            } else {
                orderID.textContent = "N/A";
            }
        })
        .catch(error => {
            console.error("Error fetching order summary:", error);
        });
    } else {
        console.error("Authentication token not found in cookies.");
    }
}

fetchOrderSuccess();

function renderOrderSuccess(orderProduct) {
    const OrderContainer = document.querySelector(".dashboard-product")
    orderProduct.forEach(product => {
        const { id, color, productName, price, discount, subtotal, size, quantity, img } = product
        const OrderDashboard = document.createElement('div');
        OrderDashboard.classList.add('dashboard-product-content')
        OrderDashboard.innerHTML = `
        <a href="">
        <img src="${img}" alt="">
      </a>
      <div class="product-info">
        <div class="product-info-main">
          <div class="product-info-header">
            <span>${productName}</span>
          </div>
          <div class="product-info-specs">
            <div class="product-info-specs-main">
              <div class="product-info-block">
                <span>Size: </span><span class="span-product-info-style-black">${size}</span>
              </div>
              <div class="product-info-block">
                <span>Color: </span><span class="span-product-info-style-black">${color}</span>
              </div>
              <div class="product-info-block">
                <span>Quantity: </span><span class="span-product-info-style-black">${quantity}</span>
              </div>
            </div>
          </div>
          <div class="product-info-price">
          ${discount > 0 ? `<s class="">$${price.toFixed(2)}</s>` : ''}
          <span class="">$${(price - (price * discount / 100)).toFixed(2)}</span>
          </div>
        </div>
      </div>
        `;
        OrderContainer.appendChild(OrderDashboard);
    });
}