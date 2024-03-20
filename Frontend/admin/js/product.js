
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
            document.getElementById('editProductSize').value = product.size;
            document.getElementById('editProductColor').value = product.color;
            const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
            modal.show();
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
}

// Function to handle form submission for editing product
document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(this);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    
    axios.patch(`http://localhost:8080/api/products/${jsonData.id}`, jsonData)
        .then(response => {
            console.log('Product updated successfully:', response.data);
            const modal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
            modal.hide();
            getProducts(); // Refresh the table after updating
        })
        .catch(error => {
            console.error('Error updating product:', error);
        });
});
