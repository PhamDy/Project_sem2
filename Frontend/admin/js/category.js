// Get Token
const token = sessionStorage.getItem('token');

//-----------------------------------------------------------------
//ADD CATEGORY

// Function to add category
function addCategory(event) {
    event.preventDefault();
    event.stopPropagation();
    // Retrieve form data
    var name = document.getElementById("categoryName").value;
    var status = document.getElementById("categoryStatus").value;



    // Send POST request to add category
    axios.post(`http://localhost:8080/api/category/create?name=${name}&status=${status}`,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
    })
        .then(function(response) {
            console.log(response.data);
            alert("Category added successfully!");
            $('#addCategoryModal').modal('hide'); 
            getCategory();
        })
        .catch(function(error) {
            console.error(error);
            alert("Failed to add category. Please try again later.");
        });
}
document.getElementById('addCategoryForm').addEventListener('submit', addCategory);




//========================================================================
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

        // Send PUT request to update category
        axios.patch(`http://localhost:8080/api/category/update?id=${id}&name=${name}&status=${status}`, { 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
         })
            .then(function(response) {
                console.log(response.data);
                alert("Category updated successfully!");
                getCategory();
                $('#updateCategoryModal').modal('hide'); 
            })
            .catch(function(error) {
                console.error(error);
                alert("Failed to update category.");
            });
    }

    // Add event listener for form submission
    document.getElementById('updateCategoryForm').addEventListener('submit', updateCategory); 






//========================================================================
// DELETE CATEGORY

async function deleteCategory(id) {
  try {
    const response = await axios.patch(`http://localhost:8080/api/category/delete?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    alert('Delete Success');
    getCategory();
  } catch (error) {
    alert('ERROR')
    console.error('Lỗi khi xóa dữ liệu:', error.response.data);
  }
}

