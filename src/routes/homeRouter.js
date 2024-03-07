const express = require('express');
const { getHomeHienThi2, getHomeHienThi1 } = require("../controllers/TrangChu/homeController");
const { getFormLoginKH, dangKyTKKH, dangNhapTKKH, dangXuatTKKH } = require('../controllers/Login/loginKHController');
const { chiTietSPHomeHienThi1, chiTietSPHomeHienThi1_ChiTiet, chiTietSPHomeHienThi2_ChiTiet } = require('../controllers/CTSanPham/detailtSP');
const { getHomeListShop, getHomeListShop_PhanTrang } = require('../controllers/ShopList/listShopController');
const { getHomeListShopGame, getHomeListShopGame_PhanTrang } = require('../controllers/ShopList/listShopGameController');
const { searchNH_PhanTrang, searchNH, searchNH_PhanLoai_PhanTrang } = require('../controllers/SearchSP/searchNHController');
const { searchGame, searchGame_PhanTrang } = require('../controllers/SearchSP/searchGameController');
const { getHomeListShopPhanLoaiNam, getHomeListShopPhanLoaiNam_PhanTrang, getHomeListShopPhanLoaiNu, getHomeListShopPhanLoaiNu_PhanTrang } = require('../controllers/PhanLoaiSP/phanLoaiNuocHoaController');
const { getHomeListShopGamePhanLoaiNam_PhanTrang, getHomeListShopGamePhanLoaiNam, getHomeListShopGamePhanLoaiNu_PhanTrang, getHomeListShopGamePhanLoaiNu } = require('../controllers/PhanLoaiSP/phanLoaiGameController');
const { addToCart } = require('../controllers/Cart/addToCartController');
const { getCartInfo } = require('../controllers/Cart/getCartInfoController');
const {getChiTietCart, getChiTietCart_XemCT} = require('../controllers/Cart/getChiTietCartController');
const { removeACTCart } = require('../controllers/Cart/remove_Mot_SPCartController');
const { getCheckOut, datHang } = require('../controllers/Cart/datHangController');
const { getEditAProductCart, updateAProductCart } = require('../controllers/Cart/edit_Mot_SPCartController');
const { home_LichSuMuaHang } = require('../controllers/LichSuMuaHang/home_LichSuMuaHangController');
const { getLoginAdmin, dangNhapAdmin } = require('../controllers/Login/loginAdminController');
const { getHomePageAdmin } = require('../controllers/AdminQL/HomeAdmin/homeAdminController');
const { getHomeQLKH, getHomePhanTrang_TKKH } = require('../controllers/AdminQL/QuanLyTK/quanLyTKKHController');
const { getHomePhanTrang_SearchTKKH, getSearchTKKH } = require('../controllers/AdminQL/QuanLyTK/searchTKKHController');
const { deleteTKKH } = require('../controllers/AdminQL/QuanLyTK/deleteTKKHController');
const { getEditTKKH, editTKKH } = require('../controllers/AdminQL/QuanLyTK/editTKKHController');
const { getHomeQLAdmin, getHomePhanTrang_TKAdmin } = require('../controllers/AdminQL/QuanLyTKAdmin/quanLyTKAdminController');
const { getEditTKAdmin, editTKAdmin } = require('../controllers/AdminQL/QuanLyTKAdmin/editTKAdminController');
const { deleteTKAdmin } = require('../controllers/AdminQL/QuanLyTKAdmin/deleteTKAdminController');
const { getCreateTKAdmin, createTKAdmin } = require('../controllers/AdminQL/QuanLyTKAdmin/createTKAdminController');
const { getHomePhanTrang_SearchTKAdmin, getSearchTKAdmin } = require('../controllers/AdminQL/QuanLyTKAdmin/searchTKAdminController');
const { getHomeNuocHoa, getHomeNuocHoaPhanTrang } = require('../controllers/AdminQL/QuanLySanPham/QuanLySPNuocHoa/homeQLNuocHoa');
const { getCreateNuocHoa, createNuocHoa } = require('../controllers/AdminQL/QuanLySanPham/QuanLySPNuocHoa/createSPNuocHoa');
const { getEditNuocHoa, handleEditNuocHoa, getEditNuocHoaDaXoa, handleEditNuocHoaDaXoa } = require('../controllers/AdminQL/QuanLySanPham/QuanLySPNuocHoa/editSPNuocHoa');
const { deleteSP } = require('../controllers/AdminQL/QuanLySanPham/QuanLySPNuocHoa/deleteSPNuocHoa');
const { getHomeSearchNuocHoa, getHomeSearchNuocHoaPhanTrang, getHomeSearchNuocHoaDaXoaPhanTrang, getHomeSearchNuocHoaDaXoa } = require('../controllers/AdminQL/QuanLySanPham/QuanLySPNuocHoa/searchSPNuocHoa');
const { getHomeGame, getHomeGamePhanTrang } = require('../controllers/AdminQL/QuanLySanPham/QuanLyAccGame/homeQLGame');
const { getCreateGame, createGame } = require('../controllers/AdminQL/QuanLySanPham/QuanLyAccGame/createSPGame');
const { getEditGame, handleEditGame } = require('../controllers/AdminQL/QuanLySanPham/QuanLyAccGame/editSPGame');
const { getHomeSearchGamePhanTrang, getHomeSearchGame } = require('../controllers/AdminQL/QuanLySanPham/QuanLyAccGame/searchSPGame');
const { getHomeDaXoaNuocHoaPhanTrang, getHomeDaXoaNuocHoa } = require('../controllers/AdminQL/QuanLySanPham/QuanLySPNuocHoa/daXoaSPNuocHoa');


const router = express.Router();
//  ********************************************************

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
// router.get("/search-nuoc-hoa", searchNH_PhanTrang)
// router.get("/search-nuoc-hoa", searchNH_PhanLoai_PhanTrang)
router.get("/search-nuoc-hoa", async (req, res) => {
    if (req.query.search_nuochoa) {
        return searchNH_PhanTrang(req, res);

    } else if (req.query.tenloaiNH && req.query.giaSP) {
        return searchNH_PhanLoai_PhanTrang(req, res);
        
    } else {
        res.redirect(`/search-nuoc-hoa`);
    }
});



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
// get chi tiet cart tại trang
router.get("/get-chi-tiet-cart", getChiTietCart)
// get trang xem chi tiết giỏ hàng
router.get("/detailt-cart-trang-moi", getChiTietCart_XemCT)
// xóa 1 sản phẩm trong cart
router.post("/remove-mot-sp", removeACTCart)
// trang dien thong tin dat hang va check don hang
router.get("/checkout", getCheckOut)
// get Edit A Product Cart
router.get("/get-edit-sp-cart", getEditAProductCart)
// xử lý nút update 
router.post("/update-sp-cart", updateAProductCart)
// xử lý nút bấm đặt hàng
router.post("/dat-hang", datHang)



// Lịch sử mua hàng
router.get("/lsu-mua-hang", home_LichSuMuaHang)


//**********************************************************************

// VỀ PHẦN ADMIN QUẢN LÝ 
// get login admin
router.get("/login-admin", getLoginAdmin)
// btn đăng nhập
router.post("/login-admin", dangNhapAdmin)
// get gome page admin
router.get("/home-page-admin", getHomePageAdmin)



// get home quản lý tài khoản khách hàng
router.get("/page-qly-tkkh", getHomeQLKH)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/page-qly-tkkh", getHomePhanTrang_TKKH)
// get home tìm kiếm tài khoản khách hàng
router.get("/page-search-tkkh", getSearchTKKH)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/page-search-tkkh", getHomePhanTrang_SearchTKKH)
// xóa tài khoản khách hàng
router.delete("/xoatkkh/:idxoa", deleteTKKH)
// get trang nhập liệu edit
router.get("/get-page-edit", getEditTKKH)
// xử lý nút save tài khoản khách hàng
router.put("/update-tk-kh/:idDeEdit", editTKKH)



// get home quản lý tài khoản admin
router.get("/page-qly-tkadmin", getHomeQLAdmin)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/page-qly-tkadmin", getHomePhanTrang_TKAdmin)
// get trang nhập liệu edit
router.get("/get-page-tk-admin-edit", getEditTKAdmin)
// xử lý nút save tài khoản admin
router.put("/update-tk-admin/:idDeEdit", editTKAdmin)
// xóa tài khoản admin
router.delete("/xoatkAdmin/:idxoa", deleteTKAdmin)
// get trang nhập liệu create
router.get("/create-admin", getCreateTKAdmin)
// xử lý nút create tài khoản admin
router.post("/create-tk-admin", createTKAdmin)
// get home tìm kiếm tài khoản admin
router.get("/page-search-tkadmin", getSearchTKAdmin)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/page-search-tkadmin", getHomePhanTrang_SearchTKAdmin)



// get home quản lý sản phẩm là nước hoa
router.get("/page-qly-nuoc-hoa", getHomeNuocHoa)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/page-qly-nuoc-hoa", getHomeNuocHoaPhanTrang)
// get trang nhập liệu create
router.get("/create-sp-nuochoa", getCreateNuocHoa)
// xử lý nút create sản phẩm nước hoa
router.post("/create-sp-nuochoa", createNuocHoa)
// get trang nhập liệu edit
router.get("/edit-sp-nuochoa", getEditNuocHoa)
// xử lý nút save sản phẩm nước hoa
router.put("/save-sp-nuochoa/:idEdit", handleEditNuocHoa)
// xóa sản phẩm nước hoa
router.delete("/xoa-sp-nuoc-hoa/:idxoa", deleteSP)
// get home tìm kiếm sản phẩm nước hoa
router.get("/search-qly-nuoc-hoa", getHomeSearchNuocHoa)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/search-qly-nuoc-hoa", getHomeSearchNuocHoaPhanTrang)

// get home sản phẩm nước hoa đã xóa
router.get("/da-xoa-sp-nuochoa", getHomeDaXoaNuocHoa)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/da-xoa-sp-nuochoa", getHomeDaXoaNuocHoaPhanTrang)
// get trang nhập liệu edit đã xóa
router.get("/edit-sp-nuochoa-daxoa", getEditNuocHoaDaXoa)
// xử lý nút save sản phẩm nước hoa đã xóa
router.put("/save-sp-nuochoa-da-xoa/:idEditDaXoa", handleEditNuocHoaDaXoa)
// get home tìm kiếm sản phẩm nước hoa đã xóa
router.get("/search-qly-nuoc-hoa-da-xoa", getHomeSearchNuocHoaDaXoa)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/search-qly-nuoc-hoa-da-xoa", getHomeSearchNuocHoaDaXoaPhanTrang)




// get home quản lý sản phẩm là game
router.get("/page-qly-game", getHomeGame)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/page-qly-game", getHomeGamePhanTrang)
// get trang nhập liệu create
router.get("/create-sp-game", getCreateGame)
// xử lý nút create sản phẩm game
router.post("/create-sp-game", createGame)
// get trang nhập liệu edit
router.get("/edit-sp-game", getEditGame)
// xử lý nút save sản phẩm game
router.put("/save-sp-game/:idEdit", handleEditGame)
// xóa sản phẩm game
router.delete("/xoa-sp-game/:idxoa", deleteSP)
// get home tìm kiếm sản phẩm game
router.get("/search-qly-game", getHomeSearchGame)
// khi bấm vào trang khác thì chuyển hướng sao cho đúng logic ...
router.get("/search-qly-game", getHomeSearchGamePhanTrang)



module.exports = router;