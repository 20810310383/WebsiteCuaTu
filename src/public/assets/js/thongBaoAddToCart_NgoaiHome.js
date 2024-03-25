    // Add this script to handle the notification
    document.addEventListener("DOMContentLoaded", function () {
        const productForms = document.querySelectorAll("#form-addtocart-new");

        productForms.forEach(function(form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                const productId = form.querySelector("input[name='quantity']").getAttribute("data-product-id");
                const PriceBanMoi = form.querySelector("input[name='PriceBanMoi']").value

                fetch(`/addtocart?productId=${productId}`, {
                    method: "POST",
                    body: new URLSearchParams({
                        quantity: 1,
                        size: "100ml",
                        PriceBanMoi: PriceBanMoi
                    }),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if(data.logged){
                        if (data.success) {
                            // Show success alert
                            // alert("Sản phẩm đã được thêm vào giỏ hàng!");
                            Swal.fire({
                                icon: 'success',
                                title: 'Thành công!',
                                text: 'Sản phẩm đã được thêm vào giỏ hàng.',
                                confirmButtonText: 'Mua Tiếp'
                            })
                            .then(() => {
                                window.location.reload(); // Tải lại trang hiện tại    
                            });
                        } else {
                            // Show error alert
                            // alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!"); 
                            Swal.fire({
                                icon: 'error',
                                title: 'Lỗi!',
                                text: 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.',
                                confirmButtonText: 'OK SHOP'
                            });                       
                        }
                    } else {
                        if (data.success) {
                            // Show success alert
                            // alert("Sản phẩm đã được thêm vào giỏ hàng!");
                            Swal.fire({
                                icon: 'success',
                                title: 'Thành công!', 
                                text: 'Sản phẩm đã được thêm vào giỏ hàng. Nhưng bạn cần đăng nhập để tiến hành đặt hàng',
                                confirmButtonText: 'Đi tới đăng nhập'
                            })
                            .then(() => {
                                window.location.href = '/login-tk-kh';
                            });
                        } else {
                            // Show error alert
                            // alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!"); 
                            Swal.fire({
                                icon: 'error',
                                title: 'Lỗi!',
                                text: 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.',
                                confirmButtonText: 'OK SHOP'
                            });                       
                        }
                    }
                    
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            });
        });
    });