function deleteUser(userId) {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
        fetch(`/xoatkkh/${userId}`, {
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
                    text: 'Có lỗi xảy ra khi xóa. Vui lòng thử lại sau.',
                    confirmButtonText: 'OK SHOP'
                });                       
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
}


function deleteAdmin(userId) {
    if (confirm("Bạn có chắc chắn muốn khóa tài khoản này không?")) {
        fetch(`/xoatkAdmin/${userId}`, {
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
                    text: 'Có lỗi xảy ra khi xóa. Vui lòng thử lại sau.',
                    confirmButtonText: 'OK SHOP'
                });                       
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
}


// ****************************************************************************************
// cách 1 dùng params
function deleteAdminPhanQuyen1(userId) {
    console.log("userId >>>",userId);
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
        fetch(`/xoatk-phan-quyen/${userId}`, {
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
                    text: 'Có lỗi xảy ra khi xóa. Vui lòng thử lại sau.',
                    confirmButtonText: 'OK SHOP'
                });                       
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
}

// cách 2 dùng req.body 
function deleteAdminPhanQuyenFromInput() {
    // Lấy giá trị của thẻ input có id là "adminId"
    const adminId = document.getElementById('adminId').value;
    console.log(">>>> ",adminId);

    if (confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
        // Gửi yêu cầu DELETE với dữ liệu adminId trong body
        fetch(`/xoatk-phan-quyen`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ adminId: adminId }) // Gửi adminId trong body
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
                    text: 'Có lỗi xảy ra khi xóa. Vui lòng thử lại sau.',
                    confirmButtonText: 'OK SHOP'
                });                       
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }    
}

