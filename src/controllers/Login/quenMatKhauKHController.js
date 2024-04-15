const TaiKhoan_KH = require("../../models/TaiKhoan_KH")
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

module.exports = {

    quenMatKhauKH: async (req, res) => {
        let email_doimk = req.body.email_doimk
        console.log("email đổi mk: ",email_doimk);

        let tk_doimk = await TaiKhoan_KH.findOne({TenDangNhap: email_doimk})
        if (!tk_doimk) {
            console.log("không tồn tại tài khoản ");
            return res.status(404).json({ success: false,  message: 'Không tồn tại tài khoản! Vui lòng kiểm tra lại email của bạn.' });
        }

        // tạo ra mật khẩu ngẫu nhiên để ném cho người dùng, slice(-8): nó sẽ lấy 8 kí tự cuối cùng từ toString(36)
        // ví dụ: nếu số ngẫu nhiên được sinh ra là 0.123456789
        // sau khi chuyển đổi thành hệ cơ số 36, nó có thể trông như sau: 0.123abcd, rồi lấy 8 kí tự cuối là 123abcd
        const newPassword = Math.random().toString(36).slice(-8);

        // một chuỗi đã được mã hóa có thể lưu vào cơ sở dữ liệu.
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // lưu lại mật khẩu mới vào db
        tk_doimk.MatKhau = hashedPassword;
        await tk_doimk.save();

        //---- GỬI mật khẩu mới về cho khách hàng
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
        });

        // thông tin của email khách hàng nhận mk mới
        const mailOptions = {
            from: "Admin",
            to: email_doimk,
            subject: 'Yêu cầu lấy lại mật khẩu',
            text: `Mật khẩu mới của bạn là: ${newPassword}`,
            html: `
            <p style="color: green;">Mật khẩu mới của bạn là: ${newPassword}</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Lỗi gửi Email:', error);
                return res.status(500).json({success: false, message: 'Lỗi gửi Email:' });
            }
            console.log('Email sent:', info.response);            
            res.status(200).json({success: true, message: `Mật khẩu mới được gửi tới email của bạn. Vui lòng hãy check Email ${email_doimk} để lấy lại mật khẩu!` });
        });
    }

}