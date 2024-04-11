document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll('.Tab-Select .nav-tab');
    const selectLine = document.querySelector('.Select-line');
    const selectedPage = document.querySelector('.selected-page');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(tab => {
          tab.querySelector('span a').classList.remove('selected');
        });

        this.querySelector('span a').classList.add('selected');

        const selectedTabText = this.querySelector('span a').textContent;
        const selectLineClass = 'selected-' + selectedTabText.replace(/\s+/g, '');

        const selectedTabWidth = this.offsetWidth;
        const selectedTabLeft = this.offsetLeft;

        selectLine.className = 'Select-line ' + selectLineClass;
        selectLine.style.width = selectedTabWidth + 'px';
        selectLine.style.left = selectedTabLeft + 'px';

        selectedPage.querySelector('h3').textContent = selectedTabText;

      });
    });
  });

  
  document.addEventListener("DOMContentLoaded", function() {
    const tabLinks = document.querySelectorAll(".nav-link");

    tabLinks.forEach(function(tabLink) {
      tabLink.addEventListener("click", function(event) {
        event.preventDefault();
        const targetTabId = this.getAttribute("href").substring(1);
        const targetTab = document.getElementById(targetTabId);

        document.querySelectorAll(".nav-link").forEach(function(link) {
          link.classList.remove("active");
        });
        document.querySelectorAll(".tab-pane").forEach(function(tabPane) {
          tabPane.classList.remove("active");
        });

        this.classList.add("active");
        targetTab.classList.add("active");
      });
    });
  });


  document.addEventListener("DOMContentLoaded", function() {
    const logoutLink = document.querySelector(".selected-page a");

    logoutLink.addEventListener("click", function(event) {
      event.preventDefault();

      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.href = "index.html";
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggleNewsletter");
    const radioBox = document.querySelector(".radio-box");

    toggleButton.addEventListener("click", function() {
        const computedStyle = window.getComputedStyle(radioBox);
        if (computedStyle.display === "none") {
            radioBox.style.display = "block";
        } else {
            radioBox.style.display = "none";
        }
    });

    const radioInputs = document.querySelectorAll(".radio-box input[type='radio']");

    radioInputs.forEach(function(input) {
        input.addEventListener("change", function() {
            if (this.checked) {
                radioInputs.forEach(function(otherInput) {
                    if (otherInput !== input) {
                        otherInput.checked = false;
                    }
                });
            }
        });
    });
});


const toggleChecked = () => {
    const button = document.querySelector('.check-same-addresss');
    button.classList.toggle('checked');

    const deliveryAddress = document.querySelector('.delivery-address');
    deliveryAddress.classList.toggle('hidden');
}

//==========================================================================================
// Function to fetch user data from the API and update HTML elements
function fetchUserData() {
  // Lấy token từ cookie có tên là authToken
  const token = getCookie('authToken');

  // Kiểm tra nếu token tồn tại
  if (token) {
      // Tạo header Authorization từ token
      const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      };

      // Tạo các thông tin của yêu cầu
      const requestOptions = {
          method: 'GET',
          headers: headers
      };

      // Gửi yêu cầu fetch với các thông tin đã được cài đặt
      fetch('http://localhost:8080/api/users/addressByUser', requestOptions)
          .then(response => response.json())
          .then(data => {
              // Lấy dữ liệu người dùng từ phản hồi JSON
            const userData = data.user;
              // Update HTML content with user data
              document.getElementById('username').textContent = userData.userName;
              document.getElementById('member-since').textContent = `Walkz Member Since ${userData.createdAt}`;
              document.getElementById('userEmail').value = userData.email;
              document.getElementById('dayOfBirth').value = data.dayOfBirth;
              document.getElementById('phone').value = data.phone;
              document.getElementById('billing_first_name').value = data.first_name ;
              document.getElementById('billing_last_name').value = data.last_name;
              document.getElementById('billing_address').value = data.address;
              document.getElementById('billing_zip').value = data.zipCode;
              document.getElementById('billing_city').value = data.city;
              document.getElementById('billing_country').value = data.country;
              document.getElementById('Optional').value = data.optional;

          })
          .catch(error => console.error('Error fetching user data:', error));
  } else {
      console.error('Token not found in cookie.');
  }
}

// Hàm để lấy giá trị của cookie bằng tên
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

// Gọi hàm fetchUserData khi trang web được tải
window.onload = fetchUserData;


//==========================================================================================
//format date
function reformatDateToDDMMYYYY(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
}



// lay du lieu tu html
function prepareAndSaveAddress() {
  const data = {
      firstName: document.getElementById('billing_first_name').value,
      lastName: document.getElementById('billing_last_name').value,
      country: document.getElementById('billing_country').value,
      address: document.getElementById('billing_address').value,
      optional: document.getElementById('Optional').value,
      zipCode: document.getElementById('billing_zip').value,
      city: document.getElementById('billing_city').value,
      email: document.getElementById('userEmail').value,
      phone: document.getElementById('phone').value,
      dayOfBirth: reformatDateToDDMMYYYY(document.getElementById('dayOfBirth').value)
  };
  saveAddress(data);
}

//save address
async function saveAddress(data) {
  try {
      const token = getCookie('authToken')
      // Gửi yêu cầu POST đến API
      const response = await axios.post("http://localhost:8080/api/users/saveAddress", data,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Kiểm tra xem yêu cầu có thành công không
      if (response) {
          console.log('Address saved successfully');
          alert('Address saved successfully');
      } else {
          console.error('Error saving address');
      }
  } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error saving address:', error);
  }
}

//====================================================================================================
//Order User
const token = getCookie('authToken');

function fetchDataAndUpdateHTML() {
  axios.get('http://localhost:8080/api/order/page/user',{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    const orders = response.data.content;

    // Lặp qua từng đơn hàng từ API và cập nhật dữ liệu vào HTML
    orders.forEach(order => {
      const orderHTML = `
        <div class="my-order-content">
          <a class="dashboard-header-container" href="#">
            <div class="dashboard-header">
              <div class="ordernumber-box dashboard-style-header">
                <span class="orderId">ORDER ID</span>
                <div>${order.id}</div>
              </div>
              <div class="order-date-box dashboard-style-header">
                <span class="order-date">DATE</span>
                <div>${order.creatAt}</div>
              </div>
              <div class="order-total-box dashboard-style-header">
                <span class="order-total">TOTAL</span>
                <div>${order.total}$</div>
              </div>
              <div class="order-method-box dashboard-style-header">
                <span>PAYMENT METHOD</span>
                <div>${order.paymentMethod}</div>
              </div>
              <div class="order-status-box dashboard-style-header">
                <span>ORDERSTATUS</span>
                <div>${order.status}</div>
              </div>
            </div>
          </a>
          <div class="dasboard-order-info" id="order-info-${order.id}">
            <!-- Thông tin sản phẩm trong đơn hàng sẽ được thêm vào đây -->
          </div>
        </div>
      `;
      // Thêm đơn hàng vào HTML
      const ordersContainer = document.getElementById('orders-container');
      ordersContainer.insertAdjacentHTML('beforeend', orderHTML);

      // Gọi hàm để lấy thông tin sản phẩm của đơn hàng và cập nhật vào HTML
      fetchOrderDetailsAndUpdateHTML(order.id);
    });
  })
  .catch(error => {
    console.error('Đã có lỗi khi gửi yêu cầu:', error);
  });
}

function fetchOrderDetailsAndUpdateHTML(orderId) {
  axios.get(`http://localhost:8080/api/order/page/orderDetails/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    const orderDetails = response.data.content;

    // Kiểm tra nếu orderDetails là một mảng và không rỗng
    if (Array.isArray(orderDetails) && orderDetails.length > 0) {
      // Tạo HTML cho các thông tin chi tiết sản phẩm và cập nhật vào phần dasboard-order-info
      const orderInfoContainer = document.getElementById(`order-info-${orderId}`);
      orderDetails.forEach(detail => {
        const productHTML = `
          <div class="dashboard-product">
            <div class="dashboard-product-content">
              <a href="">
                <img src="${detail.img}" alt="${detail.productName}">
              </a>
              <div class="product-info">
                <div class="product-info-main">
                  <div class="product-info-header">
                    <span>${detail.productName}</span>
                  </div>
                  <div class="product-info-specs">
                    <div class="product-info-block">
                      <span>Size: </span><span class="span-product-info-style-black">${detail.size}</span>
                    </div>
                    <div class="product-info-block">
                      <span>Color: </span><span class="span-product-info-style-black">${detail.color}</span>
                    </div>
                  </div>
                  <div class="product-info-price">
                    <span>Price: ${detail.price}$</span>
                    <s>Discount: ${detail.discount}$</s>
                    <span>Subtotal: ${detail.subtotal}$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        // Thêm thông tin sản phẩm vào HTML
        orderInfoContainer.insertAdjacentHTML('beforeend', productHTML);
      });
    } else {
      console.error('Không có chi tiết đơn hàng nào được trả về từ API.');
      // Có thể thêm một tin nhắn thông báo cho người dùng nếu cần
    }
  })
  .catch(error => {
    console.error('Đã có lỗi khi gửi yêu cầu:', error);
  });
}



// Gọi hàm để thực hiện yêu cầu và cập nhật HTML
fetchDataAndUpdateHTML();
