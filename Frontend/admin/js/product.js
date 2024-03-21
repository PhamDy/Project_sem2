
// Function to open details modal and populate details
function openDetailsModal(productId) {
    axios.get(`http://localhost:8080/api/products/${productId}`)
        .then(response => {
            const product = response.data;
            document.getElementById('productDetailsId').textContent = product.id;
            document.getElementById('productDetailsName').textContent = product.name;
            document.getElementById('productDetailsCategory').textContent = product.categoryName;
            document.getElementById('productDetailsDesc').textContent = product.desc;
            document.getElementById('productDetailsAvatar').src = product.avatar;
            document.getElementById('productDetailsImg1').src = product.img1;
            document.getElementById('productDetailsImg2').src = product.img2;
            document.getElementById('productDetailsImg3').src = product.img3;
            document.getElementById('productDetailsGender').textContent = product.gender;
            document.getElementById('productDetailsBrand').textContent = product.brand;
            document.getElementById('productDetailsPrice').textContent = product.price;
            document.getElementById('productDetailsDiscount').textContent = product.discount;
            document.getElementById('productDetailsSize').textContent = product.size;
            document.getElementById('productDetailsColor').textContent = product.color;

            const modal = new bootstrap.Modal(document.getElementById('productDetailsModal'));
            modal.show();
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
}





// Function to open edit modal and populate form fields
function openEditModal(productId) {
    axios.get(`http://localhost:8080/api/products/${productId}`)
        .then(response => {
            const product = response.data;
            document.getElementById('editProductId').value = product.id;
            document.getElementById('editProductName').value = product.name;
            document.getElementById('editProductCategory').value = product.categoryName;
            document.getElementById('editProductBrand').value = product.brand;
            document.getElementById('editProductPrice').value = product.price;
            document.getElementById('editProductDiscount').value = product.discount;

            if (product && product.color) {
                const colors = product.color;
                const sizes = product.size;

                // Hiển thị size dưới dạng select
                const sizeSelect = document.getElementById('editProductSize');
                sizes.forEach(size => {
                    const option = document.createElement('option');
                    option.text = size;
                    option.value = size;
                    sizeSelect.add(option);
                });

                // Hiển thị color dưới dạng select
                const colorSelect = document.getElementById('editProductColor');
                colors.forEach(color => {
                    const option = document.createElement('option');
                    option.text = color;
                    option.value = color;
                    colorSelect.add(option);
                });

                sizeSelect.addEventListener('change', updateQuantity);
                colorSelect.addEventListener('change', updateQuantity);

                // Hàm cập nhật quantity
                function updateQuantity() {
                    const selectedSize = sizeSelect.value;
                    const selectedColor = colorSelect.value;

                    // Gửi yêu cầu API để lấy quantity
                    axios.get(`http://localhost:8080/api/warehouse/quantityProduct/${productId}?color=${selectedColor}&size=${selectedSize}`)
                        .then(response => {
                            const quantity = response.data;
                            document.getElementById('editProductQuantity').value = quantity;
                        })
                        .catch(error => {
                            console.error('Error fetching quantity data:', error);
                        });
                }

                // Gọi hàm cập nhật quantity ban đầu
                updateQuantity();

                const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
                modal.show();
            } else {
                console.error('Product colors are undefined');
            }
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
}




// Hàm cập nhật quantity
function updateQuantityProduct(productId, color, size, quantity) {

    // Gửi yêu cầu API để cập nhật quantity
    axios.post(`http://localhost:8080/api/warehouse/${productId}?color=${color}&size=${size}&quantity=${quantity}`)
    .then(response => {
        console.log('Quantity updated successfully:', response.data);
        const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
        modal.hide();
    })
    .catch(error => {
        console.error('Error updating quantity:', error);
    });
}

// Function to handle form submission for updating product
document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const productId = document.getElementById('editProductId').value;
    const name = document.getElementById('editProductName').value; // This variable seems unused
    const categoryName = document.getElementById('editProductCategory').value; // This variable seems unused
    const brand = document.getElementById('editProductBrand').value; // This variable seems unused
    const price = document.getElementById('editProductPrice').value; // This variable seems unused
    const discount = document.getElementById('editProductDiscount').value; // This variable seems unused
    const size = document.getElementById('editProductSize').value;
    const color = document.getElementById('editProductColor').value;
    const quantity = document.getElementById('editProductQuantity').value;

    // Call the updateQuantityProduct function to update quantity
    updateQuantityProduct(productId, color, size, quantity);


});

