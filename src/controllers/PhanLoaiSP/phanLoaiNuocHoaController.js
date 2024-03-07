const SanPham = require("../../models/SanPham")
const LoaiSP = require("../../models/LoaiSP")
const LoaiSPNamNu = require("../../models/LoaiSPNamNu")
require('rootpath')();



module.exports = {
    getHomeListShopPhanLoaiNam_PhanTrang: (req, res) => { 
        if (req.query.page) {
            return res.redirect(`/shop-list-phan-loai-nuoc-hoa-nam?page=${req.query.page}`)
        }
        res.redirect(`/shop-list-phan-loai-nuoc-hoa-nam`)
    },

    getHomeListShopPhanLoaiNam: async (req, res) => {
        let hoten = req.session.hoten
        let logIn = req.session.loggedIn
        let active = 'phanloai'

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

        let page = 1
        const limit = 6
        
        if(req.query.page){
            page = req.query.page
            page = page < 1 ? page + 1 : page
        }

        let skip = (page - 1) * limit

        const all = await SanPham.find().populate('IdLoaiSP').populate('IdNam_Nu').exec();
        const loaiSPNamNu = await LoaiSPNamNu.find().exec();

        // Lọc kết quả bằng cách sử dụng filter
        const filteredResults = all.filter(product => 
            product.IdLoaiSP && (product.IdLoaiSP.TenLoaiSP !== "Avatar") && 
            product.IdNam_Nu && (product.IdNam_Nu.TenLoaiNamNu === "nam"));

        // Áp dụng skip và limit sau khi đã lọc
        const startIndex = skip;
        const endIndex = startIndex + limit;
        const slicedResults = filteredResults.slice(startIndex, endIndex);

        // Tính toán tổng số trang
        const totalProducts = filteredResults.length;
        const numPage = Math.ceil(totalProducts / limit);

        console.log("Tổng Products: ", totalProducts);
        console.log("numPage", numPage);

        res.render("TrangChu/layouts/PhanLoaiSP/phanLoaiNuocHoa.ejs", {
            hoten, logIn, active,
            rootPath: '/', 
            formatCurrency, getRelativeImagePath,
            soTrang: numPage, 
            curPage: page, 
            all: slicedResults,
            loaiSPNamNu
        })
    },

    getHomeListShopPhanLoaiNu_PhanTrang: (req, res) => { 
        if (req.query.page) {
            return res.redirect(`/shop-list-phan-loai-nuoc-hoa-nu?page=${req.query.page}`)
        }
        res.redirect(`/shop-list-phan-loai-nuoc-hoa-nu`)
    },

    getHomeListShopPhanLoaiNu: async (req, res) => {
        let hoten = req.session.hoten
        let logIn = req.session.loggedIn
        let active = 'phanloai'

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

        let page = 1
        const limit = 6
        
        if(req.query.page){
            page = req.query.page
            page = page < 1 ? page + 1 : page
        }

        let skip = (page - 1) * limit

        const all = await SanPham.find().populate('IdLoaiSP').populate('IdNam_Nu').exec();
        const loaiSPNamNu = await LoaiSPNamNu.find().exec();

        // Lọc kết quả bằng cách sử dụng filter
        const filteredResults = all.filter(product => 
            product.IdLoaiSP && (product.IdLoaiSP.TenLoaiSP !== "Avatar") && 
            product.IdNam_Nu && (product.IdNam_Nu.TenLoaiNamNu === "nữ"));

        // Áp dụng skip và limit sau khi đã lọc
        const startIndex = skip;
        const endIndex = startIndex + limit;
        const slicedResults = filteredResults.slice(startIndex, endIndex);

        // Tính toán tổng số trang
        const totalProducts = filteredResults.length;
        const numPage = Math.ceil(totalProducts / limit);

        console.log("Tổng Products: ", totalProducts);
        console.log("numPage", numPage);

        res.render("TrangChu/layouts/PhanLoaiSP/phanLoaiNuocHoa.ejs", {
            hoten, logIn, active,
            rootPath: '/', 
            formatCurrency, getRelativeImagePath,
            soTrang: numPage, 
            curPage: page, 
            all: slicedResults,
            loaiSPNamNu
        })
    },


}