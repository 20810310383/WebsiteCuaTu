const SanPham = require("../../../../models/SanPham")
const LoaiSP = require("../../../../models/LoaiSP")
const LoaiSPNamNu = require("../../../../models/LoaiSPNamNu")
require('rootpath')();
const cheerio = require('cheerio');
const moment = require('moment-timezone');
// --------------------------------------------

// Hàm chuyển đổi ngày giờ sang múi giờ Việt Nam
function convertToVietnamTime(dateTime) {
    // 'Asia/Ho_Chi_Minh' là mã của múi giờ Việt Nam
    return moment(dateTime).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY ');
}

module.exports = {
    // phân trang ...
    getHomeGamePhanTrang: (req, res) => { 
        if (req.query.page) {
            return res.redirect(`/page-qly-game?page=${req.query.page}`)
        }
        res.redirect(`/page-qly-game`)
    },

    // home quản lý nước hoa
    getHomeGame: async (req, res) => {

        let tk = req.session.tk
        let logged = req.session.loggedIn
        let activee = 'active_sanpham'

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

        // Đoạn mã JavaScript để chuyển đổi HTML thành văn bản
        function convertHtml(html) {
            const $ = cheerio.load(html);
            return $('body').text();
        }

        let page = 1
        const limit = 6
        
        if(req.query.page){
            page = req.query.page
            page = page < 1 ? page + 1 : page
        }

        let skip = (page - 1) * limit

        const all = await SanPham.find({}).populate('IdLoaiSP').populate('IdNam_Nu').exec();

        // Lọc kết quả bằng cách sử dụng filter
        const filteredResults = all.filter(product => product.IdLoaiSP && product.IdNam_Nu && (product.IdLoaiSP.TenLoaiSP === "Avatar"));

        // Áp dụng skip và limit sau khi đã lọc
        const startIndex = skip;
        const endIndex = startIndex + limit;
        const slicedResults = filteredResults.slice(startIndex, endIndex);

        // Tính toán tổng số trang
        const totalProducts = filteredResults.length;
        const numPage = Math.ceil(totalProducts / limit);

        console.log("Tổng Products: ", totalProducts);
        console.log("numPage", numPage);
        console.log("filteredResults", filteredResults);

        res.render("AdminQL/TrangQLAdmin/QuanLySanPham/QuanLySPGame/getHomeGame.ejs", {
            tk, logged, activee,
            rootPath: '/', 
            formatCurrency, getRelativeImagePath, convertHtml,
            soTrang: numPage, 
            curPage: page, 
            all: slicedResults,
        })
    }
}