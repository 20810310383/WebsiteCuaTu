const SanPham = require("../../models/SanPham")
const LoaiSP = require("../../models/LoaiSP");
require('rootpath')();

module.exports = {
    chiTietSPHomeHienThi1: async (req, res) => {

        try {
            const productId = req.body.idDetailtSPP;
            console.log("productId: ",productId);
            const productDetails = await SanPham.findById(productId).populate("IdLoaiSP");
            console.log("productDetails: ",productDetails);
            res.json({
                productDetails
                // name: productDetails.TenSP,
                // Image: productDetails.Image,
                // newPrice: productDetails.GiaBan,
                // oldPrice: productDetails.GiaCu,
                // description: productDetails.MoTa,
                // sizeOptions: ["S", "M", "L", "XL", "XXL"],  // Example, replace with actual size options
                // Add other details as needed
            });
        } catch (error) {
            console.error('Error fetching product details:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    chiTietSPHomeHienThi1_ChiTiet: async (req, res) => {

        try {
            let hoten = req.session.hoten
            let logIn = req.session.loggedIn
            let active =''

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
            const TimSpNoiBat = await SanPham.find({ SpMoi_SpNoiBat: "Nổi Bật" }).populate("IdLoaiSP");
            const spNoiBat = TimSpNoiBat.filter(product => product.IdLoaiSP && product.IdLoaiSP.TenLoaiSP !== "Avatar");       


            const productId = req.query.idDetailtSP;
            const productDetails = await SanPham.findById(productId).populate("IdLoaiSP");
            
            res.render("TrangChu/layouts/DetailtSP/detailtProductHT1.ejs", {
                hoten, logIn,
                rootPath: '/', 
                formatCurrency, getRelativeImagePath,
                spNoiBat,   
                productDetails, active
            })
        } catch (error) {
            console.error('Error fetching product details:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    chiTietSPHomeHienThi2_ChiTiet: async (req, res) => {

        try {
            let hoten = req.session.hoten
            let logIn = req.session.loggedIn
            let active =''

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
            const spNew = TimSpNew.filter(product => product.IdLoaiSP && (product.IdLoaiSP.TenLoaiSP === "Avatar" ));           

            const productId = req.query.idDetailtSP_ht2;
            const productDetails = await SanPham.findById(productId).populate("IdLoaiSP");
            
            res.render("TrangChu/layouts/DetailtSP/detailtProductHT2.ejs", {
                hoten, logIn,
                rootPath: '/', 
                formatCurrency, getRelativeImagePath,
                spNew,
                productDetails, active
            })
        } catch (error) {
            console.error('Error fetching product details:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
}