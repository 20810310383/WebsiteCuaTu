const TaiKhoan_Admin = require("../../../models/TaiKhoan_Admin")
require('rootpath')();
const moment = require('moment-timezone');
// --------------------------------------------

// Hàm chuyển đổi ngày giờ sang múi giờ Việt Nam
function convertToVietnamTime(dateTime) {
    // 'Asia/Ho_Chi_Minh' là mã của múi giờ Việt Nam
    return moment(dateTime).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY ');
}

module.exports = {

    // phân trang ...
    getHomePhanTrang_TKAdmin: (req, res) => { 
        if (req.query.page) {
            return res.redirect(`/page-qly-tkadmin?page=${req.query.page}`)
        }
        res.redirect(`/page-qly-tkadmin`)
    },

    getHomeQLAdmin: async (req, res) => {

        let tk = req.session.tk
        let logged = req.session.loggedIn
        let activee = 'danhmucquanly'

        let page = 1
        const limit = 6
        
        if(req.query.page){
            page = req.query.page
            page = page < 1 ? page + 1 : page
        }
        
        let skip = (page - 1) * limit
        const allTKKH = await TaiKhoan_Admin.find({}).skip(skip).limit(limit).exec()
        console.log("tai khoan admin: ", allTKKH);

        // Chuyển đổi ngày giờ tạo tài khoản admin sang múi giờ Việt Nam
        const allTKKhachHangnWithVietnamTime = allTKKH.map(item => ({
            ...item._doc,
            NgayTao: convertToVietnamTime(item.NgayTao)
        }));

        // tính toán tổng số trang cần hiển thị bằng cách: CHIA (tổng số sản phẩm) cho (số lượng sản phẩm trên mỗi trang)
        let numPage = parseInt((await TaiKhoan_Admin.find({})).length) / limit

        // kiểm tra xem phần thập phân của numPage có bằng 0 hay không
        // Nếu bằng 0, nghĩa là numPage là một số nguyên, không cần phải thêm một trang nữa
        // Ngược lại, nếu có phần thập phân, nó thêm một trang nữa để đảm bảo rằng tất cả các sản phẩm được hiển thị.
        numPage = numPage - parseInt(numPage) === 0 ? numPage : numPage + 1   

        res.render("AdminQL/TrangQLAdmin/QL_TaiKhoanAdmin/quanLyTKAdmin.ejs", {
            tk, logged, activee,
            soTrang: numPage, 
            curPage: page, 
            QLtaikhoan_kh: allTKKhachHangnWithVietnamTime,
            searchSPSession: req.session.tenSPSearch || '',
        })
    },
}   