const SanPham = require("../../models/SanPham")
const Cart = require("../../models/Cart")
const LoaiSP = require("../../models/LoaiSP");
require('rootpath')();

// --------------------------------------

module.exports = {
    // trang dien thong tin dat hang va check don hang
    getCheckOut: async (req, res) => {
        let hoten = req.session.hoten
        let logIn = req.session.loggedIn

        // Hàm để định dạng số tiền thành chuỗi có ký tự VND
        function formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        }

        // edit file img
        function getRelativeImagePath(absolutePath) {
            const rootPath = '<%= rootPath.replace(/\\/g, "\\\\") %>';
            const relativePath = absolutePath ? absolutePath.replace(rootPath, '').replace(/\\/g, '/').replace(/^\/?images\/upload\//, '') : '';
            return relativePath;
        }

        // rút gọn mã HD
        function rutGonMa(hexString ) {
            const shortenedHex = hexString.substring(hexString.length - 10);
            return shortenedHex;
        }

        const customerAccountId = req.session.userId;
        console.log("customerAccountId:", customerAccountId);
        let detailCart = await Cart.findOne({MaTKKH: customerAccountId}).exec();
        let productDetailsArray = []
        let cartItemss = detailCart.cart 

        let totalCartPrice = 0;
        // Tính tổng giá của tất cả sản phẩm trong giỏ hàng
        for (const item of cartItemss.items) {
            const productDetails = await SanPham.findById(item.productId).exec();
            totalCartPrice += productDetails.GiaBan * item.qty;
        }

        let giam_Gia = 0
        if(totalCartPrice <= 500000) {
            giam_Gia = totalCartPrice * 0.02 // giam 2% tong so tien
        } else if (500000 < totalCartPrice && totalCartPrice <= 1000000) {
            giam_Gia = totalCartPrice * 0.03 // giam 3% tong so tien
        } else if (1000000 < totalCartPrice && totalCartPrice <= 10000000) {
            giam_Gia = totalCartPrice * 0.05 // giam 5% tong so tien
        } else {
            giam_Gia = totalCartPrice * 0.1 // giam 10% tong so tien
        }
        console.log("giamgia chi tiet: ", giam_Gia);

        if (detailCart) {
            const cartItems = detailCart.cart.items;
            
            for (const item of cartItems) {

                // console.log(`item._id cần xóa: ${item._id}`);   // xem id can xoa

                try {
                    const productDetails = await SanPham.findById(item.productId).populate('IdLoaiSP').exec();

                    if (productDetails) {
                        const tensp = productDetails.TenSP;
                        const qty = item.qty;
                        const size = item.size;
                        const giaBan = productDetails.GiaBan;

                        // Đẩy chi tiết sản phẩm vào mảng
                        productDetailsArray.push({
                            productDetails, 
                            qty, size,
                            _id: item._id
                        });
                    } else {
                        console.log("Không tìm thấy chi tiết sản phẩm cho mặt hàng:", item.productId);
                    }
                } catch (error) {
                    console.error("Lỗi khi truy xuất chi tiết sản phẩm:", error);
                }
            }
        } else {
            console.log("Giỏ hàng trống");
        }

        res.render("TrangChu/layouts/ChiTietCart/checkOut.ejs", {
            formatCurrency, 
            rootPath: '/' , 
            getRelativeImagePath, rutGonMa,
            hoten, logIn, 
            productDetailsArray,
            cartItemss, detailCart,
            totalCartPrice, // Truyền tổng giá của tất cả sản phẩm xuống EJS
            giam_Gia
            
        })
    },

    // xu ly nut dat hang
    datHang: async (req, res) => {

    }
}