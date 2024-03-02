const SanPham = require("../../../../models/SanPham")
const LoaiSP = require("../../../../models/LoaiSP")
const LoaiSPNamNu = require("../../../../models/LoaiSPNamNu")
require('rootpath')();
const moment = require('moment-timezone');
// --------------------------------------------

// Hàm chuyển đổi ngày giờ sang múi giờ Việt Nam
function convertToVietnamTime(dateTime) {
    // 'Asia/Ho_Chi_Minh' là mã của múi giờ Việt Nam
    return moment(dateTime).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY ');
}

module.exports = {
    // trang nhập liệu để tạo mới sản phẩm
    getCreateNuocHoa: async (req, res) => {
        let tk = req.session.tk
        let logged = req.session.loggedIn
        let activee = 'active_sanpham'

        res.render("AdminQL/TrangQLAdmin/QuanLySanPham/QuanLySPNuocHoa/getCreateNuocHoa.ejs", {
            tk, logged, activee,

        })
    },

    // xử lý nút tạo mới
    createNuocHoa: async (req, res) => {
        


    }
}