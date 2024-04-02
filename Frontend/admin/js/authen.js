// auth.js

function isAuthenticated() {
    var token = sessionStorage.getItem("token");
    return token !== null;
}

// Kiểm tra token khi trang được tải
window.onload = function() {
    if (!isAuthenticated()) {
        window.location.href = "login.html";
    }
};
