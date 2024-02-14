document.addEventListener('DOMContentLoaded', function () {
    updateCartInfo(); // Gọi hàm cập nhật thông tin giỏ hàng khi trang được tải

    // Hàm cập nhật thông tin giỏ hàng
    async function updateCartInfo() {
        try {
            const response = await fetch('/get-info-cart');
            const data = await response.json();

            // Cập nhật tổng số lượng và tổng tiền trên giao diện
            document.getElementById('totalQuantity').innerText = data.totalQuaty;

            if(data.totalQuaty == 0) {
                document.getElementById('totalPrice').innerText = '0đ';
            } else {
                document.getElementById('totalPrice').innerText = formatCurrency(data.totalPrice);
            }            

            if(data.totalQuaty == 0) {
                document.getElementById('cartTotalPrice').innerText = '0đ';
            } else {
                document.getElementById('cartTotalPrice').innerText = formatCurrency(data.totalPrice);
            }

            if(data.phiShip === 0) {
                document.getElementById('shipping_price').innerText = 'Free Ship';
            } else {
                document.getElementById('shipping_price').innerText = formatCurrency(data.phiShip);
            }

        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin giỏ hàng:', error);
        }
    }   

    // Hàm định dạng tiền tệ (có thể thay đổi theo định dạng tiền của bạn)
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    
});