const SanPham = require("../../models/SanPham");
const Cart = require("../../models/Cart");
const HoaDon = require("../../models/HoaDon");
const LoaiSP = require("../../models/LoaiSP");
const nodemailer = require('nodemailer');
require('dotenv').config();
require('rootpath')();

// --------------------------------------

module.exports = {
    // trang dien thong tin dat hang va check don hang
    getCheckOut: async (req, res) => {
        let hoten = req.session.hoten
        let logIn = req.session.loggedIn
        let active = "shoplist"

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

        // rút gọn mã HD
        function rutGonMa(hexString ) {
            const shortenedHex = hexString.substring(hexString.length - 10);
            return shortenedHex;
        }        
        

        const customerAccountId = req.session.userId;
        console.log("customerAccountId:", customerAccountId);
        let detailCart = await Cart.findOne({MaTKKH: customerAccountId}).exec();
        let productDetailsArray = []
        let cartItemss = detailCart.cart 

        let totalCartPrice = 0;
        // Tính tổng giá của tất cả sản phẩm trong giỏ hàng
        for (const item of cartItemss.items) {
            const productDetails = await SanPham.findById(item.productId).exec();
            totalCartPrice += item.donGia * item.qty;
        }

        let giam_Gia = 0
        if(totalCartPrice <= 500000) {
            giam_Gia = totalCartPrice * 0.02 // giam 2% tong so tien
        } else if (500000 < totalCartPrice && totalCartPrice <= 1000000) {
            giam_Gia = totalCartPrice * 0.03 // giam 3% tong so tien
        } else if (1000000 < totalCartPrice && totalCartPrice <= 10000000) {
            giam_Gia = totalCartPrice * 0.04 // giam 4% tong so tien
        } else {
            giam_Gia = totalCartPrice * 0.05 // giam 5% tong so tien
        }
        console.log("giamgia chi tiet: ", giam_Gia);

        if (detailCart) {
            const cartItems = detailCart.cart.items;
            
            for (const item of cartItems) {

                // console.log(`item._id cần xóa: ${item._id}`);   // xem id can xoa

                try {
                    const productDetails = await SanPham.findById(item.productId).populate('IdLoaiSP').exec();

                    if (productDetails) {
                        const tensp = productDetails.TenSP;
                        const qty = item.qty;
                        const size = item.size;
                        const donGia = item.donGia;
                        const giaBan = productDetails.GiaBan;

                        // Đẩy chi tiết sản phẩm vào mảng
                        productDetailsArray.push({
                            productDetails, 
                            qty, size,
                            donGia, donGia,
                            _id: item._id
                        });
                    } else {
                        console.log("Không tìm thấy chi tiết sản phẩm cho mặt hàng:", item.productId);
                    }
                } catch (error) {
                    console.error("Lỗi khi truy xuất chi tiết sản phẩm:", error);
                }
            }
        } else {
            console.log("Giỏ hàng trống");
        }

        res.render("TrangChu/layouts/ChiTietCart/checkOut.ejs", {
            formatCurrency, active,
            rootPath: '/' , 
            getRelativeImagePath, rutGonMa,
            hoten, logIn, 
            productDetailsArray,
            cartItemss, detailCart,
            totalCartPrice, // Truyền tổng giá của tất cả sản phẩm xuống EJS
            giam_Gia
            
        })
    },

    // xu ly nut dat hang
    datHang: async (req, res) => {
        try {
            let Ho = req.body.Ho
            let Ten = req.body.Ten
            let ThanhPho = req.body.ThanhPho
            let QuanHuyen = req.body.QuanHuyen
            let PhuongXa = req.body.PhuongXa
            let DiaChiChiTiet = req.body.DiaChiChiTiet
            let SoDienThoai = req.body.SoDienThoai
            let Email = req.body.Email
            let Note = req.body.Note

            let Soluongdat = req.body.soluongdat
            let PhiShip = req.body.PhiShip
            let TongGia = req.body.TongGia
            let CanThanhToan = req.body.CanThanhToan
            let GiamGia = req.body.GiamGia
            let SoTienGiamGia = req.body.SoTienGiamGia

            console.log(" soluongdat: ", Soluongdat, "\n PhiShip: ", PhiShip, "\n CanThanhToan: ",CanThanhToan);

            //---- GỬI XÁC NHẬN ĐƠN HÀNG VỀ EMAIL
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS
                }
            });
              
            const sendOrderConfirmationEmail = async (toEmail) => {
                const mailOptions = {
                    from: 'Khắc Tú',
                    to: toEmail,
                    subject: 'Xác nhận đơn hàng của bạn.',
                    html: `
                            <p style="color: navy; font-size: 20px;">Cảm ơn bạn <span style="color: black; font-weight: bold; font-style: italic;">${Ho} ${Ten} </span>đã đặt hàng!!</p>
                            <p style="color: green; font-style: italic;">Đơn hàng của bạn đã được xác nhận.</p>
                            <p>Tổng số lượng đặt: <span style="color: blue;">${Soluongdat}</span> sản phẩm</p>
                            <p>Tổng tiền của ${Soluongdat} sản phẩm: <span style="color: red;">${TongGia}</span></p>
                            <p>Phí giao hàng: <span style="color: red;">${PhiShip}</span></p>
                            <p>Bạn được giảm  ${GiamGia}% cụ thể là: <span style="color: red;">-${SoTienGiamGia}</span></p>
                            <p>Số tiền cần thanh toán: <span style="color: red;">${CanThanhToan}</span></p>
                            <p>Số Điện Thoại Của Bạn ${Ho} ${Ten}: ${SoDienThoai}</p>
                            <p>Địa chỉ nhận hàng: <span style="color: navy; font-style: italic;">${DiaChiChiTiet}</span></p>                            
                            <p>Link Website của tôi: <a href="https://webshop-dokhactu.onrender.com">WebShop Khắc Tú</a></p>
                        `
                };
              
                return new Promise((resolve, reject) => {
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            resolve();
                        }
                    });
                });
            };
            //-------------
            // Chuyển đổi từ chuỗi sang số
            const giaTriSo_PhiShip = parseInt(PhiShip.replace(/[^0-9]/g, ''));     
            const giaTriSo_SoTienGiamGia = parseInt(SoTienGiamGia.replace(/[^0-9]/g, ''));
            const giaTriSo_CanThanhToan = parseInt(CanThanhToan.replace(/[^0-9]/g, ''));
    
            const customerAccountId = req.session.userId;
            console.log(">>> check id customerAccountId checkout: ", customerAccountId);

            // --------------------------------------
            // tìm cái giỏ hàng từ thằng customerAccountId trước
            let idcanxoa = await Cart.findOne({MaTKKH: customerAccountId})    
            let cartId = idcanxoa._id
            // rồi tiếp theo tìm theo _id của cái giỏ hàng đó để thêm vào hóa đơn
            let giohang = await Cart.findById(cartId).populate('cart.items.productId')
            console.log(">>> check giohang:",giohang);

            // chọc tới items để lấy ra tất cả sp trong giỏ hàng để chút nữa map ra thêm vào hóa đđn
            const cartItems = giohang.cart.items

            let datHang = await HoaDon.create({
                Ho: Ho,
                Ten: Ten,
                ThanhPho: ThanhPho,
                QuanHuyen: QuanHuyen,
                PhuongXa: PhuongXa,
                DiaChiChiTiet: DiaChiChiTiet,
                SoDienThoai: SoDienThoai,
                Email: Email,
                Note: Note,
                PhiShip: giaTriSo_PhiShip,   
                CanThanhToan: giaTriSo_CanThanhToan,
                GiamGia: GiamGia,
                SoTienGiamGia: giaTriSo_SoTienGiamGia,
                TongSLDat: Soluongdat,
                MaKH: customerAccountId,
                cart: {
                    items: cartItems.map(item => ({
                        productId: item.productId._id,
                        qty: item.qty,
                        size: item.size,
                        donGia: item.donGia,
                    })),                    
                }
            }) 
            
            if(datHang){
                // Gửi email thông báo đặt hàng thành công
                await sendOrderConfirmationEmail(Email);

                // khi login thì sẽ có giỏ hàng khi add, khi dat hang thanh cong, sẽ xóa luôn trong db đi
                await Cart.deleteOne({_id: cartId});
                
                // Nếu có giỏ hàng, xóa giỏ hàng
                req.session.cartId = null;

                let cart = new Cart({
                    cart: {
                        items: [],                        
                    },
                    MaTKKH: customerAccountId,
                });
                await cart.save()


                res.status(201).json({ success: true, message: 'Bạn Đã Đặt Hàng Thành Công' });
            }else {
                console.log("dat hang that bai");
                res.status(500).json({ success: false, message: 'Đặt Hàng thất bại' });
            }

        } catch(error) {
            console.error("Lỗi Rồi Cụ:", error);
            res.status(500).json({ success: false, message: 'Đặt Hàng thất bại' });
        }
    }
}