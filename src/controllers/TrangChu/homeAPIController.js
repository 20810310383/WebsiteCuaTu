require('rootpath')();
const SanPham = require("../../models/SanPham")
const {uploadSingleFile} = require("../../services/fileService")

module.exports = {

    // tao 1 san pham va upload file anh vao db
    postCreateSP: async (req, res) => {

        let {TenSP, IdLoaiSP, GiaBan, GiaCu, MoTa, New_Hot, Size, SoLuongTon, SoLuongBan, Image, SpMoi_SpNoiBat} = req.body

        let imageUrl = ""
        // kiem tra xem da co file hay chua
        if (!req.files || Object.keys(req.files).length === 0) {
            // khong lam gi
        }
        else {
            let kq = await uploadSingleFile(req.files.Image)
            imageUrl = kq.path
            console.log(">>> check kq: ", kq.path);
        }

        let SP = await SanPham.create({
            TenSP: TenSP, 
            IdLoaiSP: IdLoaiSP, 
            GiaBan: GiaBan, 
            GiaCu: GiaCu, 
            MoTa: MoTa, 
            New_Hot: New_Hot, 
            Size: Size, 
            SoLuongTon: SoLuongTon, 
            SoLuongBan: SoLuongBan,
            Image: imageUrl,
            SpMoi_SpNoiBat: SpMoi_SpNoiBat
        })
        
        return res.status(200).json({
            errCode: 0,
            data: SP
        })
    },
}