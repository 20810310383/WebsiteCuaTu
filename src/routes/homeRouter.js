const express = require('express');
const { getHomeHienThi2, getHomeHienThi1 } = require("../controllers/TrangChu/homeController");
const { getFormLoginKH, dangKyTKKH, dangNhapTKKH, dangXuatTKKH } = require('../controllers/Login/loginKHController');
const { chiTietSPHomeHienThi1, chiTietSPHomeHienThi1_ChiTiet, chiTietSPHomeHienThi2_ChiTiet } = require('../controllers/CTSanPham/detailtSP');


const router = express.Router();
//  -------------------------------------------

// TRANG CHU
router.get("/", getHomeHienThi1)
router.get("/hien-thi-2-home", getHomeHienThi2)


// LOGIN Tai Khoan Khach Hang
router.get("/login-tk-kh", getFormLoginKH)
// Dang Ky Tai Khoan Khach Hang
router.post("/dang-ky-tkkh", dangKyTKKH)
// Dang Nhap Tai Khoan Khach Hang
router.post("/dang-nhap-tkkh", dangNhapTKKH)
// Dang Xuat Tai Khoan Khach Hang
router.get("/dang-xuat-tkkh", dangXuatTKKH)


// Chi Tiet San Pham
// router.get("/detailt-sp", chiTietSPHomeHienThi1)
router.get("/detailt-sp-ht1", chiTietSPHomeHienThi1_ChiTiet)
router.get("/detailt-sp-ht2", chiTietSPHomeHienThi2_ChiTiet)



module.exports = router;