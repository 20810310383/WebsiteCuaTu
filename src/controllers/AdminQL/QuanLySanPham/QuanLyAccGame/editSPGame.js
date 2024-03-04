const SanPham = require("../../../../models/SanPham")
const LoaiSP = require("../../../../models/LoaiSP")
const LoaiSPNamNu = require("../../../../models/LoaiSPNamNu")
const {uploadSingleFile, uploadMultipleFiles} = require("../../../../services/fileService")
const moment = require('moment-timezone');
require('rootpath')();
// --------------------------------------------

// Hàm chuyển đổi ngày giờ sang múi giờ Việt Nam
function convertToVietnamTime(dateTime) {
    // 'Asia/Ho_Chi_Minh' là mã của múi giờ Việt Nam
    return moment(dateTime).tz('Asia/Ho_Chi_Minh').format('DD-MM-YYYY ');
}

module.exports = {
    // trang nhập liệu để edit sản phẩm
    getEditGame: async (req, res) => {
        let tk = req.session.tk
        let logged = req.session.loggedIn
        let activee = 'active_sanpham'
        let idEdit = req.query.idEdit

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

        let loaiSP = await LoaiSP.find({}).exec()        

        let loaiSPNamNu = await LoaiSPNamNu.find({}).exec()
        
        let sanPhamEdit = await SanPham.findById(idEdit).populate('IdLoaiSP').populate('IdNam_Nu').exec()

        res.render("AdminQL/TrangQLAdmin/QuanLySanPham/QuanLySPGame/getEditGame.ejs", {
            tk, logged, activee,
            rootPath: '/', 
            formatCurrency, getRelativeImagePath,
            loaiSP, loaiSPNamNu, sanPhamEdit
        })
    },

    // xử lý nút edit
    handleEditGame: async (req, res) => {
        let id = req.params.idEdit
        console.log(">>> check id: ",id);
        let TenSP = req.body.TenSP
        let IdLoaiSP = req.body.IdLoaiSP
        let GiaBan = req.body.GiaBan
        let GiaCu = req.body.GiaCu
        let MoTa = req.body.MoTa
        let New_Hot = req.body.New_Hot
        let SpMoi_SpNoiBat = req.body.SpMoi_SpNoiBat
        let IdNam_Nu = req.body.IdNam_Nu

        let imageUrl = req.body.noFileSelected
        let imageUrl1 = req.body.noFileSelected1
        let imageUrl2 = req.body.noFileSelected2
        // let imageUrl = ''
        // let imageUrl1 = ''
        // let imageUrl2 = ''
        // kiem tra xem da co file hay chua
        if (!req.files || Object.keys(req.files).length === 0) {
            // khong lam gi
        }
        else {
            let kq = await uploadSingleFile(req.files.Image)
            let kq1 = await uploadSingleFile(req.files.Image1)
            let kq2 = await uploadSingleFile(req.files.Image2)
            imageUrl = kq.path
            imageUrl1 = kq1.path
            imageUrl2 = kq2.path
            console.log(">>> check kq: ", kq.path);
        }

        let updateSP = await SanPham.findByIdAndUpdate({_id: id},{
            TenSP: TenSP, 
            IdLoaiSP: IdLoaiSP, 
            GiaBan: GiaBan, 
            GiaCu: GiaCu, 
            MoTa: MoTa, 
            New_Hot: New_Hot,            
            Image: imageUrl,
            Image1: imageUrl1,
            Image2: imageUrl2,
            SpMoi_SpNoiBat: SpMoi_SpNoiBat,
            IdNam_Nu: IdNam_Nu
        })

        if(updateSP){
            console.log(">>> check updateSP: ", updateSP);
            return res.status(200).json({
                message: "Bạn đã chỉnh sửa sản phẩm thành công!",
                success: true,
                errCode: 0,
                data: updateSP
            })
        } else {
            return res.status(500).json({
                message: "Bạn chỉnh sửa sản phẩm thất bại!",
                success: false,
                errCode: -1,
            })
        }    
    }
}