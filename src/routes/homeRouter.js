const express = require('express');
const { getHomeHienThi2, getHomeHienThi1 } = require("../controllers/TrangChu/homeController");
const { getFormLoginKH, dangKyTKKH, dangNhapTKKH, dangXuatTKKH } = require('../controllers/Login/loginKHController');
const { chiTietSPHomeHienThi1, chiTietSPHomeHienThi1_ChiTiet, chiTietSPHomeHienThi2_ChiTiet } = require('../controllers/CTSanPham/detailtSP');
const { getHomeListShop, getHomeListShop_PhanTrang } = require('../controllers/ShopList/listShop');
const { getHomeListShopGame, getHomeListShopGame_PhanTrang } = require('../controllers/ShopList/listShopGame');
const { searchNH_PhanTrang, searchNH } = require('../controllers/SearchSP/searchNHController');
const { searchGame, searchGame_PhanTrang } = require('../controllers/SearchSP/searchGameController');


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
router.post("/detailt-sp", chiTietSPHomeHienThi1)
router.get("/detailt-sp-ht1", chiTietSPHomeHienThi1_ChiTiet)
router.get("/detailt-sp-ht2", chiTietSPHomeHienThi2_ChiTiet)


// list shop
// SHOP Nuoc Hoa
router.get("/shop-list-ht1", getHomeListShop)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/shop-list-ht1", getHomeListShop_PhanTrang)
// Search SanPham
router.get("/search-nuoc-hoa", searchNH)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/search-nuoc-hoa", searchNH_PhanTrang)


// SHOP Ban GAME
router.get("/shop-list-ht2", getHomeListShopGame)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/shop-list-ht2", getHomeListShopGame_PhanTrang)
// Search SanPham
router.get("/search-game", searchGame)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/search-game", searchGame_PhanTrang)








module.exports = router;