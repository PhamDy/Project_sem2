// const dataTable = $('#dataTable').DataTable({
//     createdRow: function (row, data, dataIndex) {
//         $(row).find('td:last').addClass('btn-actions');
//     }
// });


// async function getProducts() {
//     try {
//         const response = await axios.get('http://localhost:8080/api/products/');
//         const data = response.data;
//         const dataTable = $('#dataTable').DataTable(); // Initialize DataTables
        
//         // Clear existing rows in the table
//         dataTable.clear().draw();
        
//         // Add new data rows
//         data.forEach(item => {
//             dataTable.row.add([
//                 item.id,
//                 `<img src="${item.img}" alt="Product Image" class="product-image">`,
//                 item.name,
//                 item.categoryName,
//                 item.brand,
//                 item.price,
//                 item.discount,
//                 `<td>
//                     <button class="btn btn-primary" onclick="openDetailsModal('${item.id}')">Details</button>
//                     <button class="btn btn-warning" onclick="openEditProductPopup('${item.id}')">Edit</button>
//                     <button class="btn btn-warning" onclick="openUpdateModal('${item.id}')">Update</button>
//                     <button class="btn btn-danger" onclick="remove('${item._id}')">Delete</button>
//                 </td>`
//             ]).draw(false);
//         });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// getProducts();

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
function openUpdateModal(productId) {
    axios.get(`http://localhost:8080/api/products/${productId}`)
        .then(response => {
            const product = response.data;
            document.getElementById('editProductId').value = product.id;
          
            if (product && product.color) {
                const colors = product.color;
                const sizes = product.size;

                // Hiển thị size dưới dạng select
                const sizeSelect = document.getElementById('editProductSize');
                sizeSelect.innerHTML = '';
                sizes.forEach(size => {
                    const option = document.createElement('option');
                    option.text = size;
                    option.value = size;
                    sizeSelect.add(option);
                });

                // Hiển thị color dưới dạng select
                const colorSelect = document.getElementById('editProductColor');
                colorSelect.innerHTML = '';
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

                updateQuantity();

                const modal = new bootstrap.Modal(document.getElementById('updateProductModal'));
                modal.show();
            } else {
                console.error('Product colors are undefined');
            }
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
}




// Update quantity or color and size
function updateQuantityProduct(productId, color, size, quantity) {

    // Gửi yêu cầu API để cập nhật quantity
    axios.post(`http://localhost:8080/api/warehouse/${productId}?color=${color}&size=${size}&quantity=${quantity}`)
    .then(response => {
        console.log('Quantity updated successfully:', response.data);
        const modal = bootstrap.Modal.getInstance(document.getElementById('updateProductModal'));
        alert("updated successfully");
        modal.hide();
        refreshTableData()
    })
    .catch(error => {
        console.error('Error updating quantity:', error);
    });
}

document.getElementById('updateProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const productId = document.getElementById('editProductId').value;
    let color = document.getElementById('editProductColor').value;
    let size = document.getElementById('editProductSize').value;
    const quantity = document.getElementById('editProductQuantity').value;

    // Lấy giá trị từ trường editProductCustomColor nếu có giá trị
    const customColor = document.getElementById('editProductCustomColor').value.trim();
    if (customColor) {
        color = customColor;
    }

    // Lấy giá trị từ trường editProductCustomSize nếu có giá trị
    const customSize = document.getElementById('editProductCustomSize').value.trim();
    if (customSize) {
        size = customSize; // Sử dụng giá trị customSize nếu có
    }

    // Gọi hàm cập nhật quantity
    updateQuantityProduct(productId, color, size, quantity);

    //reset form
    document.getElementById('updateProductForm').reset();
});


// Function to open popup
function openPopup() {
    var modal = new bootstrap.Modal(document.getElementById('addProductModal'));
    modal.show();
}

// Function to add product
function addProduct(event) {
    event.preventDefault();
    // Hiển thị hiệu ứng loading
    var loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.classList.remove('d-none');

    // Lấy dữ liệu từ form
    var formData = new FormData();
    formData.append('name', document.getElementById("productName").value);
    formData.append('description', document.getElementById("productDescription").value);
    formData.append('gender', document.getElementById("productGender").value);
    formData.append('brand', document.getElementById("productBrand").value);
    formData.append('price', parseFloat(document.getElementById("productPrice").value));
    formData.append('discount', parseFloat(document.getElementById("productDiscount").value));
    formData.append('categoryName', document.getElementById("productCategory").value);
    
    // Thêm các giá trị của size và color một cách riêng biệt
    var size = document.getElementById("productSize").value.split(",").map(item => item.trim());
    size.forEach(item => formData.append('size[]', item));

    var color = document.getElementById("productColor").value.split(",").map(item => item.trim());
    color.forEach(item => formData.append('color[]', item));

    // Thêm các tệp hình ảnh
    formData.append('img', document.getElementById("productImg").files[0]);
    formData.append('img1', document.getElementById("productImg1").files[0]);
    formData.append('img2', document.getElementById("productImg2").files[0]);
    formData.append('img3', document.getElementById("productImg3").files[0]);

    // Gửi yêu cầu POST để thêm sản phẩm
    axios.post("http://localhost:8080/api/products/addProduct", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(function(response) {
        console.log(response.data);
        loadingSpinner.classList.add('d-none');
        alert("Product added successfully!");
        $('#addProductModal').modal('hide');
    })
    .catch(function(error) {
        console.error(error);
        loadingSpinner.classList.add('d-none');
        alert("Failed to add product. Please try again later.");
    });
}



document.getElementById("addProductForm").addEventListener("submit", addProduct);




// Function to open edit product popup and populate form fields
function openEditProductPopup(productId) {
    axios.get(`http://localhost:8080/api/products/${productId}`)
        .then(response => {
            const product = response.data;

            document.getElementById('productId').value = product.id;
            document.getElementById('editProductName').value = product.name;
            document.getElementById('editProductDescription').value = product.desc;
            document.getElementById('editProductGender').value = product.gender;
            document.getElementById('editProductBrand').value = product.brand;
            document.getElementById('editProductPrice').value = product.price;
            document.getElementById('editProductDiscount').value = product.discount;
            document.getElementById('editProductCategoryName').value = product.categoryName;

            // Show the edit product modal
            const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
            modal.show();
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
}


// Function to update product
function editProduct(event) {
    event.preventDefault();

    // Hiển thị hiệu ứng loading
    var loadingSpinner = document.getElementById('loadingSpinner1');
    loadingSpinner.classList.remove('d-none');
    
    // Retrieve form data
    const productId = document.getElementById('productId').value;
    const name = document.getElementById('editProductName').value;
    const imgFile = document.getElementById('editProductImg').files[0];
    const img1File = document.getElementById('editProductImg1').files[0];
    const img2File = document.getElementById('editProductImg2').files[0];
    const img3File = document.getElementById('editProductImg3').files[0];
    const description = document.getElementById('editProductDescription').value;
    const gender = document.getElementById('editProductGender').value;
    const brand = document.getElementById('editProductBrand').value;
    const price = parseFloat(document.getElementById('editProductPrice').value);
    const discount = parseFloat(document.getElementById('editProductDiscount').value);
    const categoryName = document.getElementById('editProductCategoryName').value;

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('gender', gender);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('discount', discount);
    formData.append('categoryName', categoryName);
    if (imgFile) {
        formData.append('img', imgFile);
    }
    if (img1File) {
        formData.append('img1', img1File);
    }
    if (img2File) {
        formData.append('img2', img2File);
    }
    if (img3File) {
        formData.append('img3', img3File);
    }

    axios.patch(`http://localhost:8080/api/products/${productId}`, formData)
        .then(response => {
            console.log('Product updated successfully:', response.data);
            loadingSpinner.classList.add('d-none');
            alert("Product updated successfully!");
            $('#editProductModal').modal('hide');
            getProducts();
        })
        .catch(error => {
            console.error('Error updating product:', error);
            loadingSpinner.classList.add('d-none');
            alert("Failed to update product. Please try again later.");
        });
}



document.getElementById("editProductForm").addEventListener("submit", editProduct);
