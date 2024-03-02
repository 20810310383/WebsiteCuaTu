const TaiKhoan_Admin = require("../../../models/TaiKhoan_Admin")

// --------------------------------------------

module.exports = {

    // get trang nhập liệu edit
    getEditTKAdmin: async (req, res) =>{
        let tk = req.session.tk
        let logged = req.session.loggedIn
        let activee = 'danhmucquanly'

        let idEdit = req.query.idEdit
        console.log("idEdit: ", idEdit);

        let tkEdit = await TaiKhoan_Admin.findById(idEdit)

        if(tkEdit) {
            res.render("AdminQL/TrangQLAdmin/QL_TaiKhoanAdmin/getEditTKAdmin.ejs", {
                tk, logged, activee, tkEdit
            })
        } else {
            return res.status(404).json({message: "Không tìm thấy account khách hàng này!"})
        }    
    },

    // xử lý nút save tài khoản khách hàng
    editTKAdmin: async (req, res) => {
        
        let idDeEdit = req.params.idDeEdit
        let TenDangNhap = req.body.TenDangNhap
        let HoTen = req.body.HoTen
        let MatKhau = req.body.MatKhau
        console.log("idDeEdit: ", idDeEdit);

        let updateAdmin = await TaiKhoan_Admin.updateOne({_id: idDeEdit}, {
            TenDangNhap: TenDangNhap,
            HoTen: HoTen,
            MatKhau: MatKhau
        })
        
        if(updateAdmin){
            console.log("updateAdmin: ", updateAdmin);
            return res.status(200).json({
                message: "Bạn đã chỉnh sửa tài khoản admin thành công!",
                success: true,
                KQ: 0,
                data: updateAdmin
            })
        } else {
            return res.status(204).json({
                message: "Chỉnh sửa thất bại! Vui lòng thử lại",
                success: false,                
            })
        }        
    }
}