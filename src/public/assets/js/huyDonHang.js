// cách 1 dùng params
function huyDonHang(huydonhang) {
    console.log("huydonhang >>>",huydonhang);
    if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
        fetch(`/huy-don-hang/${huydonhang}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            // Có thể thêm các tùy chọn khác như body nếu cần
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Thành Công!',
                    text: data.message,
                    confirmButtonText: 'OK'
                })
                .then(() => {                    
                    window.location.reload(); // Tải lại trang hiện tại
                });
            } else {                
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: data.message,
                    confirmButtonText: 'OK SHOP'
                });                       
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
}