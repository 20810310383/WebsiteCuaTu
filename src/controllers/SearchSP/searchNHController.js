const SanPham = require("../../models/SanPham")
const LoaiSP = require("../../models/LoaiSP")
const LoaiSPNamNu = require("../../models/LoaiSPNamNu")
require('rootpath')();

module.exports = {
    searchNH_PhanTrang: async (req, res) => {
        if (req.query.page) {
            return res.redirect(`/search-nuoc-hoa?search_nuochoa=${req.session.tenSPSearch}&page=${req.query.page}`)
        }
        res.redirect(`/search-nuoc-hoa`)
    },

    searchNH: async (req, res) => {
        let hoten = req.session.hoten
        let logIn = req.session.loggedIn
        let active = 'shoplist'

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
        const limit = 3
        let tenSPSearch = req.query.search_nuochoa

        // Lưu trữ giá trị tìm kiếm trong session hoặc cookie
        req.session.tenSPSearch = tenSPSearch;
        
        if(req.query.page){
            page = req.query.page
            page = page < 1 ? page + 1 : page
        }

        let skip = (page - 1) * limit

        const all = await SanPham.find({TenSP: { $regex: new RegExp(tenSPSearch, 'i') }}).populate('IdLoaiSP').exec();

        // Lọc kết quả bằng cách sử dụng filter
        const filteredResults = all.filter(product => product.IdLoaiSP && (product.IdLoaiSP.TenLoaiSP !== "Avatar"));

        // Áp dụng skip và limit sau khi đã lọc
        const startIndex = skip;
        const endIndex = startIndex + limit;
        const slicedResults = filteredResults.slice(startIndex, endIndex);

        // Tính toán tổng số trang
        const totalProducts = filteredResults.length;
        const numPage = Math.ceil(totalProducts / limit);

        res.render("TrangChu/layouts/SearchSP/searchShopNuocHoa.ejs", {
            hoten, logIn, active,
            formatCurrency, getRelativeImagePath, rootPath: '/', 
            soTrang: numPage, 
            curPage: page, 
            all: slicedResults,
            searchSPSession: req.session.tenSPSearch || '',
        })
    },
}