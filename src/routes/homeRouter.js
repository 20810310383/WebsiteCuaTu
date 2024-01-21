const express = require('express');
const { getHomeHienThi2, getHomeHienThi1 } = require("../controllers/TrangChu/homeController");
const { getFormLoginKH, dangKyTKKH, dangNhapTKKH, dangXuatTKKH } = require('../controllers/Login/loginKHController');


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




module.exports = router;