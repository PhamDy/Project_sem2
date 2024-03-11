// edit-order.js
document.addEventListener('DOMContentLoaded', () => {
    // Đảm bảo localStorage có dữ liệu
    const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
    if (currentOrder) {
        // Điền dữ liệu vào form
        document.getElementById('orderId').value = currentOrder.id;
        document.getElementById('orderCode').value = currentOrder.orderCode;
        document.getElementById('createdAt').value = currentOrder.createdAt;
        document.getElementById('customerName').value = currentOrder.customerName;
        document.getElementById('phone').value = currentOrder.phone;
        document.getElementById('address').value = currentOrder.address;
        document.getElementById('total').value = currentOrder.total;
        document.getElementById('paymentMethod').value = currentOrder.paymentMethod;
        document.getElementById('paymentStatus').value = currentOrder.paymentStatus;
        document.getElementById('status').value = currentOrder.status;
        document.getElementById('username').value = currentOrder.username;
    }
    const form = document.getElementById('editOrderForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const updatedOrder = {};
        formData.forEach((value, key) => updatedOrder[key] = value);
        
        axios.put(`http://localhost:8080/api/order/${currentOrder.id}`, updatedOrder)
            .then(() => {
                alert('Order updated successfully!');
                window.location.href = '/path/to/orders.html'; // Điều hướng về trang ban đầu
            })
            .catch(error => {
                alert('Error updating order');
                console.error('Error updating order:', error);
            });
    });
});
    
