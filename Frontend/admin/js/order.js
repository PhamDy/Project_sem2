
// Gọi function filterTableByStatus() sau khi trang đã được tải xong
window.addEventListener("DOMContentLoaded", function() {
    // Lấy status từ URL
    var params = new URLSearchParams(window.location.search);
    var status = params.get("status");
    var fromPage = params.get("fromPage");
    
    // Kiểm tra điều kiện: Nếu fromPage là 'a' thì mới gọi function filterTableByStatus()
    if (fromPage === 'a') {
        filterTableByStatus(status);
    }
});
// function to filter table by date
function filterTableByDate() {
    var startDate = new Date($('#filterDateStart').val());
    var endDate = new Date($('#filterDateEnd').val());
    
    $('#dataTable tbody tr').hide();
    $('#dataTable tbody tr').each(function() {
        var createdAt = new Date($(this).find('td:eq(2)').text());
        if (createdAt >= startDate && createdAt <= endDate) {
            $(this).show();
        }
    });
}

// Hàm filterTableByStatus
function filterTableByStatus(status) {
    $('#dataTable tbody tr').hide();
    if (status === '') {
        $('#dataTable tbody tr').show();
    } else {
        $('#dataTable tbody tr').each(function() {
            if ($(this).find('td:eq(9)').text().toLowerCase() === status) {
                $(this).show();
            }
        });
    }
}