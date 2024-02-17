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

        res.render("TrangChu/layouts/ChiTietCart/checkOut.ejs", {
            formatCurrency, 
            rootPath: '/' , 
            getRelativeImagePath, rutGonMa,
            hoten, logIn, 
            
        })
    },

    // xu ly nut dat hang
    datHang: async (req, res) => {

    }
}