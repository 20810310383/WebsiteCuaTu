const SanPham = require("../../models/SanPham")
const Cart = require("../../models/Cart")
const LoaiSP = require("../../models/LoaiSP");
require('rootpath')();

// --------------------------------------

module.exports = {
    
    // hiển thị thông tin chi tiết giỏ hàng
    getChiTietCart: async (req, res) => {
        try {
            const customerAccountId = req.session.userId;
            const detailCart = await Cart.findOne({ MaTKKH: customerAccountId }).exec();
    
            if (!detailCart) {
                console.log("Giỏ hàng trống");
                return res.json({ success: false, message: "Giỏ hàng trống" });
            }
    
            const cartItems = detailCart.cart.items;
            const productDetailsArray = await Promise.all(cartItems.map(async item => {
                console.log(`item._id cần xóa: ${item._id}`); // xem id can xoa
    
                try {
                    const productDetails = await SanPham.findById(item.productId).populate('IdLoaiSP').exec();
                    console.log("productDetails: ",productDetails);
    
                    if (productDetails) {
                        const { TenSP, GiaBan } = productDetails;
                        const totalPriceForItem = item.qty * GiaBan;
    
                        return {
                            productDetails,
                            qty: item.qty,
                            totalPriceForItem,
                            _id: item._id
                        };
                    } else {
                        console.log("Không tìm thấy chi tiết sản phẩm cho mặt hàng:", item.productId);
                        return null;
                    }
                } catch (error) {
                    console.error("Lỗi khi truy xuất chi tiết sản phẩm:", error);
                    return null;
                }
            }));
    
            const totalCartPrice = cartItems.reduce((acc, cur) => acc + cur.qty * cur.GiaBan, 0);
    
            res.json({
                success: true,
                productDetails: productDetailsArray.filter(Boolean),
                cartItemss: { items: cartItems, totalPrice: totalCartPrice }
            });
        } catch (error) {
            console.error("Lỗi khi truy xuất giỏ hàng:", error);
            res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi truy xuất giỏ hàng." });
        }
    },
    
    getChiTietCart2: async (req, res) => {
        const hoten = req.session.hoten;
        const logIn = req.session.loggedIn;
    
        // Hàm để định dạng số tiền thành chuỗi có ký tự VND
        const formatCurrency = amount => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        };
    
        // Hàm để chuyển đổi đường dẫn tương đối của hình ảnh
        const getRelativeImagePath = absolutePath => {
            const rootPath = '<%= rootPath.replace(/\\/g, "\\\\") %>';
            return absolutePath ? absolutePath.replace(rootPath, '').replace(/\\/g, '/').replace(/^\/?images\/upload\//, '') : '';
        };
    
        try {
            const customerAccountId = req.session.userId;
            const detailCart = await Cart.findOne({ MaTKKH: customerAccountId }).exec();
    
            if (!detailCart) {
                console.log("Giỏ hàng trống");
                return res.render("layouts/chiTietCart.ejs", { 
                    formatCurrency, 
                    rootPath: '/', 
                    getRelativeImagePath, 
                    hoten, logIn, 
                    productDetails: [], 
                    cartItemss: { items: [], totalPrice: 0 } });
            }
    
            const cartItems = detailCart.cart.items;
            const productDetailsArray = await Promise.all(cartItems.map(async item => {
                console.log(`item._id cần xóa: ${item._id}`); // xem id can xoa
    
                try {
                    const productDetails = await SanPham.findById(item.productId).exec();
    
                    if (productDetails) {
                        const { TenSP, GiaBan } = productDetails;
                        const totalPriceForItem = item.qty * GiaBan;
    
                        return {
                            productDetails,
                            qty: item.qty,
                            totalPriceForItem,
                            _id: item._id
                        };
                    } else {
                        console.log("Không tìm thấy chi tiết sản phẩm cho mặt hàng:", item.productId);
                        return null;
                    }
                } catch (error) {
                    console.error("Lỗi khi truy xuất chi tiết sản phẩm:", error);
                    return null;
                }
            }));
    
            const totalCartPrice = cartItems.reduce((acc, cur) => acc + cur.qty * cur.GiaBan, 0);
    
            res.render("layouts/chiTietCart.ejs", { 
                formatCurrency, 
                rootPath: '/', 
                getRelativeImagePath, 
                hoten, logIn, 
                productDetails: productDetailsArray.filter(Boolean), 
                cartItemss: { items: cartItems, totalPrice: totalCartPrice } });
        } catch (error) {
            console.error("Lỗi khi truy xuất giỏ hàng:", error);
            res.status(500).send("Đã xảy ra lỗi khi truy xuất giỏ hàng.");
        }
    },
    
    getChiTietCart_XemCT: async (req, res) => {
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
       
       

        res.render("TrangChu/layouts/ChiTietCart/chiTietCart.ejs", {
            formatCurrency: formatCurrency, 
            rootPath: '/', 
            getRelativeImagePath: getRelativeImagePath,            
            hoten, logIn,

        })
    }
}