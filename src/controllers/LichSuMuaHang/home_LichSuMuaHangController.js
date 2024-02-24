const SanPham = require("../../models/SanPham");
const Cart = require("../../models/Cart");
const HoaDon = require("../../models/HoaDon");
const HuyDonHang = require("../../models/HuyDonHang");
const LoaiSP = require("../../models/LoaiSP");
require('dotenv').config();
require('rootpath')();

// --------------------------------------

module.exports = {
    home_LichSuMuaHang: async (req, res) => {
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

        res.render("KhachHang/LichSuMuaHang/trangChuLichSuMuaHang.ejs", {
            formatCurrency, 
            rootPath: '/' , 
            getRelativeImagePath, rutGonMa,
            hoten, logIn, 

        })
    }
}