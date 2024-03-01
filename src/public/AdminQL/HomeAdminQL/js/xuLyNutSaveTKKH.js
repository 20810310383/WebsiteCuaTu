function updateUser(id) {

    // Lấy các giá trị từ form
    const TenDangNhap = document.getElementById('TenDangNhap').value;
    const HoTen = document.getElementById('HoTen').value;
    const MatKhau = document.getElementById('MatKhau').value;

    // Dữ liệu cập nhật
    const updateData = {
        TenDangNhap: TenDangNhap,
        HoTen: HoTen,
        MatKhau: MatKhau
    };

    fetch(`/update-tk-kh/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData) // Chuyển đổi dữ liệu cập nhật thành chuỗi JSON và gửi đi
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
                window.location.href = '/page-qly-tkkh';
            });
        } else {                
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Có lỗi xảy ra khi chỉnh sửa. Vui lòng thử lại sau.',
                confirmButtonText: 'OK SHOP'
            });                       
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
