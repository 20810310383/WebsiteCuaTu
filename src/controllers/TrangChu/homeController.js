const SanPham = require("../../models/SanPham")
const LoaiSP = require("../../models/LoaiSP")
require('rootpath')();

module.exports = {
    getHomeHienThi1: async (req, res) => {
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
        
        // Hiển thị 1: select tất cả sp KHÔNG PHẢI LÀ Avatar
        const TimSpNew = await SanPham.find({ SpMoi_SpNoiBat: "Mới" }).populate("IdLoaiSP");
        const spNew = TimSpNew.filter(product => product.IdLoaiSP && (product.IdLoaiSP.TenLoaiSP !== "Avatar" ));

        const TimSpNoiBat = await SanPham.find({ SpMoi_SpNoiBat: "Nổi Bật" }).populate("IdLoaiSP");
        const spNoiBat = TimSpNoiBat.filter(product => product.IdLoaiSP && product.IdLoaiSP.TenLoaiSP !== "Avatar");

        console.log("spNew: ", spNew);


        res.render("home.ejs", {
            hoten, logIn,
            rootPath: '/', 
            formatCurrency, getRelativeImagePath,
            spNew, spNoiBat
        })
    },

    getHomeHienThi2: async (req, res) => {
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

        // Hiển thị 2: select tất cả sp là Avatar
        const TimSpNew = await SanPham.find({ SpMoi_SpNoiBat: "Mới" }).populate("IdLoaiSP");
        const spNew = TimSpNew.filter(product => product.IdLoaiSP && (product.IdLoaiSP.TenLoaiSP === "Avatar" ));

        const TimSpNoiBat = await SanPham.find({ SpMoi_SpNoiBat: "Nổi Bật" }).populate("IdLoaiSP");
        const spNoiBat = TimSpNoiBat.filter(product => product.IdLoaiSP && product.IdLoaiSP.TenLoaiSP === "Avatar");

        console.log("spNew: ", spNew);

        res.render("home2.ejs", {
            hoten, logIn, 
            rootPath: '/', 
            formatCurrency, getRelativeImagePath,
            spNew, spNoiBat
        })
    },

}