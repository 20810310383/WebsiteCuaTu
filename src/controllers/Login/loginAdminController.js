const TaiKhoan_Admin = require("../../models/TaiKhoan_Admin")

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
    dangXuatAdmin: (req, res) => {
        if (req.session.tk) {
            req.session.destroy();
        }
        // req.logout();
        res.redirect("/login-admin");
    },
}