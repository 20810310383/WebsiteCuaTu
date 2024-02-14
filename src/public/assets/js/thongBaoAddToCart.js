$(document).ready(function() {
    // Bắt sự kiện khi form được submit
    $('#form-addtocart').submit(function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        
        // Lấy dữ liệu form
        const formData = $(this).serialize();
        // Gửi yêu cầu thêm sản phẩm vào giỏ hàng
        addToCart(formData);
    });
});


// Hàm gửi yêu cầu thêm sản phẩm vào giỏ hàng và cập nhật thông tin giỏ hàng
function addToCart(formData) {
    $.ajax({
        url: '/addtocart?productId=<%= productDetails._id %>',
        type: 'POST',
        data: formData,
        success: function(response) {
            // Thêm thành công, cập nhật thông tin giỏ hàng
            // updateCartInfo();

            // Hiển thị thông báo khi thành công
            // alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
            showCustomAlert('Đã thêm sản phẩm vào giỏ hàng thành công!');

            // Chuyển hướng trang sau khi thêm vào giỏ hàng thành công
            // window.location.href = '/detailt-cart-trang-moi';
        },
        error: function(error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    });
}

// Hàm hiển thị thông báo tùy chỉnh
function showCustomAlert(message) {
    const alertElement = document.getElementById('custom-alert');
    const messageElement = document.getElementById('alert-message');

    // Hiển thị thông báo và đặt nội dung
    alertElement.style.display = 'block';
    messageElement.innerText = message;

    // Ẩn thông báo sau một khoảng thời gian (ví dụ: 5 giây)
    setTimeout(() => {
        hideCustomAlert();
        // window.location.href = '/detailt-cart-trang-moi';
    }, 1000);
}

// Hàm ẩn thông báo tùy chỉnh
function hideCustomAlert() {
    const alertElement = document.getElementById('custom-alert');

    // Ẩn thông báo
    alertElement.style.display = 'none';
}