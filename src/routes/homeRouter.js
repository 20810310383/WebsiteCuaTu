const express = require('express');
const { getHomeHienThi2, getHomeHienThi1 } = require("../controllers/TrangChu/homeController");
const { getFormLoginKH, dangKyTKKH, dangNhapTKKH, dangXuatTKKH } = require('../controllers/Login/loginKHController');
const { chiTietSPHomeHienThi1, chiTietSPHomeHienThi1_ChiTiet, chiTietSPHomeHienThi2_ChiTiet } = require('../controllers/CTSanPham/detailtSP');
const { getHomeListShop, getHomeListShop_PhanTrang } = require('../controllers/ShopList/listShop');
const { getHomeListShopGame, getHomeListShopGame_PhanTrang } = require('../controllers/ShopList/listShopGame');
const { searchNH_PhanTrang, searchNH } = require('../controllers/SearchSP/searchNHController');
const { searchGame, searchGame_PhanTrang } = require('../controllers/SearchSP/searchGameController');
const { getHomeListShopPhanLoaiNam, getHomeListShopPhanLoaiNam_PhanTrang, getHomeListShopPhanLoaiNu, getHomeListShopPhanLoaiNu_PhanTrang } = require('../controllers/PhanLoaiSP/phanLoaiNuocHoaController');
const { getHomeListShopGamePhanLoaiNam_PhanTrang, getHomeListShopGamePhanLoaiNam, getHomeListShopGamePhanLoaiNu_PhanTrang, getHomeListShopGamePhanLoaiNu } = require('../controllers/PhanLoaiSP/phanLoaiGameController');
const { addToCart } = require('../controllers/Cart/addToCartController');
const { getCartInfo } = require('../controllers/Cart/getCartInfoController');


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


// Phan Loai San Pham 
// SHOP Nuoc Hoa
// phan loai nam
router.get("/shop-list-phan-loai-nuoc-hoa-nam", getHomeListShopPhanLoaiNam)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/shop-list-phan-loai-nuoc-hoa-nam", getHomeListShopPhanLoaiNam_PhanTrang)
// phan loai nu
router.get("/shop-list-phan-loai-nuoc-hoa-nu", getHomeListShopPhanLoaiNu)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/shop-list-phan-loai-nuoc-hoa-nu", getHomeListShopPhanLoaiNu_PhanTrang)


// SHOP GAME
// phan loai nam
router.get("/shop-list-phan-loai-game-nam", getHomeListShopGamePhanLoaiNam)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/shop-list-phan-loai-game-nam", getHomeListShopGamePhanLoaiNam_PhanTrang)
// phan loai nu
router.get("/shop-list-phan-loai-game-nu", getHomeListShopGamePhanLoaiNu)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/shop-list-phan-loai-game-nu", getHomeListShopGamePhanLoaiNu_PhanTrang)


// Cart Products
// Add to Cart
router.post("/addtocart", addToCart)
// get info cart
router.get("/get-info-cart", getCartInfo)

module.exports = router;