const TaiKhoan_Admin = require("../../models/TaiKhoan_Admin")
const jwt = require('jsonwebtoken');

//  --------------------------------------------

module.exports = {
    // form đăng nhập
    getLoginAdmin: (req, res) => {
        res.render("AdminQL/LoginAdmin/loginAdmin.ejs");
    },

    // đăng ký tài khoản
    dangKyAdmin: async (req, res) => {

    },

    // đăng nhập tài khoản
    dangNhapAdmin: async (req, res) => {
        try {
            let tk = req.body.TenDangNhap
            let matkhau = req.body.MatKhau
      
            // Check if the user exists
            const user = await TaiKhoan_Admin.findOne({ TenDangNhap: tk, MatKhau: matkhau });
            if (!user) {
                return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
            }                               
            
            // Tạo token
            // const token = jwt.sign({ tk: tk }, 'SHA384', { expiresIn: '1d' });

            // // Gửi cookie
            // res.cookie("jwt", token, {
            //     httpOnly: true,
            //     expires: new Date(Date.now() + 1000 * 86400), // 1 day
            //     // secure: true, // Sử dụng khi chỉ có kết nối HTTPS
            //     // sameSite: 'None' // Sử dụng khi chạy trong môi trường Cross-Site
            // });

            // Lưu trạng thái đăng nhập vào session
            req.session.loggedIn = true
			req.session.tk = tk
            console.log("user: ", user); 
        
            return res.status(200).json({ success: true, message: 'Đăng nhập thành công' });
            // res.redirect(`/gethomeAdmin`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    // đăng xuất
    // dangXuatAdmin: (req, res) => {
    //     if (req.session.tk) {
    //         req.session.destroy();
    //     }
    //     // req.logout();
    //     res.redirect("/login-admin");
    // },
    dangXuatAdmin: async (req, res) => { 
        // if (req.session.tk) {
        // }
        // xóa cookie 
        // req.cookie('connect.sid', null);
        // res.clearCookie('connect.sid',{ path: '/' });
        // res.clearCookie('jwt');
        // res.clearCookie('mycookie')
        // req.session.destroy();        

        req.session.destroy(function(){
            res.clearCookie('connect.sid');
            res.clearCookie('jwt');
            res.clearCookie(this.cookie, { path: '/' });
            req.session.destroy(null);
            res.redirect("/login-admin");
        })
        
        res.redirect("/login-admin");
    },
}