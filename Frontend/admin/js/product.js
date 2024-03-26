const dataTable = $('#dataTable').DataTable({
    createdRow: function (row, data, dataIndex) {
        $(row).find('td:last').addClass('btn-actions');
    }
});


async function getProducts() {
    try {
        const response = await axios.get('http://localhost:8080/api/products/');
        const data = response.data;
        const dataTable = $('#dataTable').DataTable(); // Initialize DataTables
        
        // Clear existing rows in the table
        dataTable.clear().draw();
        
        // Add new data rows
        data.forEach(item => {
            dataTable.row.add([
                item.id,
                `<img src="${item.img}" alt="Product Image" class="product-image">`,
                item.name,
                item.categoryName,
                item.brand,
                item.price,
                item.discount,
                `<td class="btn-actions">
                    <button class="btn btn-primary" onclick="openDetailsModal('${item.id}')">Details</button>
                    <button class="btn btn-warning" onclick="openEditProductPopup('${item.id}')">Edit</button>
                    <button class="btn btn-warning" onclick="openUpdateModal('${item.id}')">Update</button>
                    <button class="btn btn-danger" onclick="remove('${item._id}')">Delete</button>
                </td>`
            ]).draw(false);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getProducts();

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

    // Retrieve form data
    var name = document.getElementById("productName").value;
    var img = document.getElementById("productImg").value;
    var img1 = document.getElementById("productImg1").value;
    var img2 = document.getElementById("productImg2").value;
    var img3 = document.getElementById("productImg3").value;
    var description = document.getElementById("productDescription").value;
    var gender = document.getElementById("productGender").value;
    var brand = document.getElementById("productBrand").value;
    var price = parseFloat(document.getElementById("productPrice").value);
    var discount = parseFloat(document.getElementById("productDiscount").value);
    var categoryName = document.getElementById("productCategory").value;
    var size = document.getElementById("productSize").value.split(",").map(item => item.trim());
    var color = document.getElementById("productColor").value.split(",").map(item => item.trim());

    var productData = {
        "name": name,
        "img": img,
        "img1": img1,
        "img2": img2,
        "img3": img3,
        "description": description,
        "gender": gender,
        "brand": brand,
        "price": price,
        "discount": discount,
        "categoryName": categoryName,
        "size": size,
        "color": color
    };

    // Send POST request to add product
    axios.post("http://localhost:8080/api/products/addProduct", productData)
        .then(function(response) {
            console.log(response.data);
            alert("Product added successfully!");
            var modal = new bootstrap.Modal(document.getElementById('addProductModal'));
            modal.hide();
        })
        .catch(function(error) {
            console.error(error);
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
            document.getElementById('editProductImg').value = product.avatar;
            document.getElementById('editProductImg1').value = product.img1;
            document.getElementById('editProductImg2').value = product.img2;
            document.getElementById('editProductImg3').value = product.img3;
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

    // Retrieve form data
    const productId = document.getElementById('productId').value;
    const name = document.getElementById('editProductName').value;
    const img = document.getElementById('editProductImg').value;
    const img1 = document.getElementById('editProductImg1').value;
    const img2 = document.getElementById('editProductImg2').value;
    const img3 = document.getElementById('editProductImg3').value;
    const description = document.getElementById('editProductDescription').value;
    const gender = document.getElementById('editProductGender').value;
    const brand = document.getElementById('editProductBrand').value;
    const price = parseFloat(document.getElementById('editProductPrice').value);
    const discount = parseFloat(document.getElementById('editProductDiscount').value);
    const categoryName = document.getElementById('editProductCategoryName').value;

    // Prepare product data
    const productData = {
        name: name,
        img: img,
        img1: img1,
        img2: img2,
        img3: img3,
        description: description,
        gender: gender,
        brand: brand,
        price: price,
        discount: discount,
        categoryName: categoryName
    };

    axios.patch(`http://localhost:8080/api/products/${productId}`, productData)
        .then(response => {
            console.log('Product updated successfully:', response.data);
            alert("Product updated successfully!");
            $('#editProductModal').modal('hide');
            getProducts();
        })
        .catch(error => {
            console.error('Error updating product:', error);
            alert("Failed to update product. Please try again later.");
        });
}

document.getElementById("editProductForm").addEventListener("submit", editProduct);
