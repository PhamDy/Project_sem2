
//------------------------------------------------------------------------------------------------------
//ADD CATEGORY



// Function to get token from sessionStorage
function getToken() {
    // take token from session storage
    const token = sessionStorage.getItem('token');

    // check token exist
    if (!token) {
    console.error('Bearer token is missing.');
    return token;
    }

}

const token = getToken();

// header have token
const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
};

// Function to add category
function addCategory(event) {
    event.preventDefault();
    event.stopPropagation(); // Ngăn chặn hành vi mặc định của form

    // Retrieve form data
    var name = document.getElementById("categoryName").value;
    var status = document.getElementById("categoryStatus").value;

    // Send POST request to add category
    axios.post(`http://localhost:8080/api/category/create?name=${name}&status=${status}`, { headers })
        .then(function(response) {
            console.log(response.data);
            alert("Category added successfully!");
            getCategory();
            $('#addCategoryModal').modal('hide'); // Đóng modal sau khi thêm thành công
        })
        .catch(function(error) {
            console.error(error);
            alert(`${name} is exist`);
        });
}

document.getElementById('addCategoryBtn').addEventListener('click', function () {
    $('#addCategoryModal').modal('show');
}); 

// Add event listener for form submission
document.getElementById('addCategoryForm').addEventListener('submit', addCategory); 





//------------------------------------------------------------------------------------------------------
//UPDATE CATEGORY

// Function to display update category modal
function displayUpdateModal(id, name, status) {
    document.getElementById('updateCategoryId').value = id;
    document.getElementById('updateCategoryName').value = name;
    document.getElementById('updateCategoryStatus').value = status;

    $('#updateCategoryModal').modal('show');
}

// Function to update category
function updateCategory(event) {
    event.preventDefault();

    // Retrieve form data
    var id = document.getElementById("updateCategoryId").value;
    var name = document.getElementById("updateCategoryName").value;
    var status = document.getElementById("updateCategoryStatus").value;

    // Send patch request to update category
    axios.patch(`http://localhost:8080/api/category/update?id=${id}&name=${name}&status=${status}`, { headers })
        .then(function(response) {
            console.log(response.data);
            alert("Category updated successfully!");
            getCategory();
            $('#updateCategoryModal').modal('hide'); // Close modal after successful update
        })
        .catch(function(error) {
            console.error(error);
            alert("Failed to update category.");
        });
}

// Add event listener for form submission
document.getElementById('updateCategoryForm').addEventListener('submit', updateCategory); 


//------------------------------------------------------------------------------------------------------
// DELETE CATEGORY

async function deleteCategory(id) {
    try {       
        // Gửi yêu cầu DELETE đến endpoint để xóa danh mục
        const response = await axios.patch(`http://localhost:8080/api/category/delete?id=${id}`, { headers });

        // Kiểm tra xem yêu cầu đã thành công hay không
        if (response.status === 200) {
            console.log('Category deleted successfully.');
            getCategory();
            if (row) {
                row.remove();
            }
        } else {
            console.error('Failed to delete category.');
        }
    } catch (error) {
        console.error('Error deleting category:', error);
    }

    
}


