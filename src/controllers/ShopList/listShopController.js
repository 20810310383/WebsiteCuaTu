const SanPham = require("../../models/SanPham")
const LoaiSP = require("../../models/LoaiSP")
const LoaiSPNamNu = require("../../models/LoaiSPNamNu")
require('rootpath')();



module.exports = {
    getHomeListShop_PhanTrang: (req, res) => { 
        if (req.query.page) {
            return res.redirect(`/shop-list-ht1?page=${req.query.page}`)
        }
        res.redirect(`/shop-list-ht1`)
    },
    getHomeListShop_TheoLoai_PhanTrang: (req, res) => { 

        let redirectUrl = '/shop-list-ht1';
        if (req.query.page) {
            // const idPL = req.session.idPL || req.query.tenloaiNH;
            const idPL = req.query.idPL;
            redirectUrl += `?idPL=${idPL}&page=${req.query.page}`;
        }

        res.redirect(redirectUrl);
    },

    getHomeListShop: async (req, res) => {
        let hoten = req.session.hoten
        let logIn = req.session.loggedIn
        let active = 'shoplist'
        let idPL = req.query.idPL
        req.session.idPL = idPL;

        console.log("idPL: ", idPL);
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

        // hiển thị kiểu phân loại
        let loaiSP = await LoaiSP.find().exec();
        const tongSL = [];
        for (const loaiSp of loaiSP) {
            const soLuongSanPham = await SanPham.countDocuments({ IdLoaiSP: loaiSp._id });
            tongSL.push({ TenLoaiSP: loaiSp.TenLoaiSP, soLuongSanPham, IDLoaiSP: loaiSp._id });
        }
        
        // sản phẩm bán chạy (SoLuongBan > 100)
        const spBanChay = await SanPham.find({ SoLuongBan: { $gt: 100 } });

        if(!idPL){

            const all = await SanPham.find().populate('IdLoaiSP').exec();
            const loaiSPNamNu = await LoaiSPNamNu.find().exec();

            // Lọc kết quả bằng cách sử dụng filter
            const filteredResults = all.filter(product => product.IdLoaiSP && (product.IdLoaiSP.TenLoaiSP !== "Avatar"));

            // Áp dụng skip và limit sau khi đã lọc
            const startIndex = skip;
            const endIndex = startIndex + limit;
            const slicedResults = filteredResults.slice(startIndex, endIndex);

            // Tính toán tổng số trang
            const totalProducts = filteredResults.length;
            const numPage = Math.ceil(totalProducts / limit);

            console.log("Tổng Products: ", totalProducts);
            console.log("numPage", numPage);

            res.render("TrangChu/layouts/ShopList/listShopNuocHoa.ejs", {
                hoten, logIn, active,
                rootPath: '/', 
                formatCurrency, getRelativeImagePath,
                soTrang: numPage, 
                curPage: page, 
                all: slicedResults,
                loaiSPNamNu, tongSL, 
                searchSPSession: req.session.idPL,
                spBanChay
            })
        } else {
            const all = await SanPham.find({IdLoaiSP: idPL}).populate('IdLoaiSP').exec();
            const loaiSPNamNu = await LoaiSPNamNu.find().exec();

            // Lọc kết quả bằng cách sử dụng filter
            const filteredResults = all.filter(product => product.IdLoaiSP );

            // Áp dụng skip và limit sau khi đã lọc
            const startIndex = skip;
            const endIndex = startIndex + limit;
            const slicedResults = filteredResults.slice(startIndex, endIndex);

            // Tính toán tổng số trang
            const totalProducts = filteredResults.length;
            const numPage = Math.ceil(totalProducts / limit);

            console.log("Tổng Products: ", totalProducts);
            console.log("numPage", numPage);

            res.render("TrangChu/layouts/ShopList/listShopNuocHoa.ejs", {
                hoten, logIn, active,
                rootPath: '/', 
                formatCurrency, getRelativeImagePath,
                soTrang: numPage, 
                curPage: page, 
                all: slicedResults,
                loaiSPNamNu, tongSL, 
                searchSPSession: req.session.idPL,
                spBanChay
            })
        }
    },


}