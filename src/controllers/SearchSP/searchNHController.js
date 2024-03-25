const SanPham = require("../../models/SanPham")
const LoaiSP = require("../../models/LoaiSP")
const LoaiSPNamNu = require("../../models/LoaiSPNamNu")
require('rootpath')();

module.exports = {
    searchNH_PhanTrang: async (req, res) => {
        // if (req.query.page) {
        //     return res.redirect(`/search-nuoc-hoa?search_nuochoa=${req.session.tenSPSearch}&page=${req.query.page}`)
        // }
        // res.redirect(`/search-nuoc-hoa`)

        let redirectUrl = '/search-nuoc-hoa';

        if (req.query.page) {
            const tenSPSearch = req.session.tenSPSearch || req.query.search_nuochoa;
            redirectUrl += `?search_nuochoa=${tenSPSearch}&page=${req.query.page}`;
        }

        res.redirect(redirectUrl);
    },

    // **********************************************************************************
    searchNH_PhanLoai_PhanTrang: async (req, res) => {
        // if (req.query.page) {
        //     return res.redirect(`/search-nuoc-hoa?tenloaiNH=${req.session.tenloaiNH}&giaSP=${req.session.giaSP}&page=${req.query.page}`)
        // }
        // res.redirect(`/search-nuoc-hoa`)

        let redirectUrl = '/search-nuoc-hoa';

        if (req.query.page) {
            const tenloaiNH = req.session.tenSPSearch || req.query.tenloaiNH;
            const giaSP = req.session.giaSP || req.query.giaSP;
            redirectUrl += `?tenloaiNH=${tenloaiNH}&giaSP=${giaSP}&page=${req.query.page}`;
        }

        res.redirect(redirectUrl);
    },

    searchNH: async (req, res) => {
        let hoten = req.session.hoten
        let logIn = req.session.loggedIn
        let active = 'shoplist'

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

        // convert tiền từ số thành dạng có cả chữ. ví dụ: 1000 -> 1M
        function convertPriceRange(range) {
            const ranges = range.split('-');
            const minPrice = parseFloat(ranges[0]);
            const maxPrice = parseFloat(ranges[1]);
            
            // Chuyển đổi minPrice và maxPrice thành dạng chuỗi mong muốn
            let formattedMinPrice = minPrice < 1000 ? `${minPrice}k` : `${minPrice / 1000}M`;
            let formattedMaxPrice = maxPrice < 1000 ? `${maxPrice}k` : `${maxPrice / 1000}M`;

            // Kiểm tra nếu giá trị chia cho 1000 là NaN thì sử dụng giá ban đầu
            formattedMinPrice = isNaN(formattedMinPrice) ? `${minPrice}k` : formattedMinPrice;
            formattedMaxPrice = isNaN(formattedMaxPrice) ? `${maxPrice}k` : formattedMaxPrice;

            // Kiểm tra nếu giá trị rỗng, trả về chuỗi "Hãy chọn"
            const finalMinPrice = formattedMinPrice == '' ? 'Hãy' : formattedMinPrice;
            const finalMaxPrice = formattedMaxPrice == '' ? 'Chọn' : formattedMaxPrice;
    
            return `${finalMinPrice} đến ${finalMaxPrice}`;
        }

        let loaiSP = await LoaiSP.find().exec();
        let tongSL = 0;

        for (const loai of loaiSP) {
            const tongSLSanPham = await SanPham.countDocuments({ IdLoaiSP: loai._id });
            console.log("loaiSP._id:", loai._id);
            console.log("Số lượng sản phẩm:", tongSLSanPham);
            tongSL += tongSLSanPham; // Cộng dồn số lượng sản phẩm cho mỗi loại sản phẩm
        }

        console.log("Tổng số lượng sản phẩm:", tongSL);

        


        let page = 1
        const limit = 3
        let tenSPSearch = req.query.search_nuochoa
        let tenloaiNH = req.query.tenloaiNH;
        let giaSP = req.query.giaSP;

        // Lưu trữ giá trị tìm kiếm trong session hoặc cookie
        req.session.tenSPSearch = tenSPSearch;
        req.session.tenloaiNH = tenloaiNH;
        req.session.giaSP = giaSP;

        
        if(req.query.page){
            page = req.query.page
            page = page < 1 ? page + 1 : page
        }

        let skip = (page - 1) * limit

        // tìm trên thanh tìm kiếm
        if(tenSPSearch){
            const all = await SanPham.find({TenSP: { $regex: new RegExp(tenSPSearch, 'i') }}).populate('IdLoaiSP').populate('IdNam_Nu').exec();
            const loaiSPNamNu = await LoaiSPNamNu.find().exec();
    
            // Lọc kết quả bằng cách sử dụng filter
            const filteredResults = all.filter(product => product.IdLoaiSP && (product.IdLoaiSP.TenLoaiSP !== "Avatar"));
    
            // Áp dụng skip và limit sau khi đã lọc
            const startIndex = skip;
            const endIndex = startIndex + limit;
            const slicedResults = filteredResults.slice(startIndex, endIndex);
    
            // Tính toán tổng số trang
            const totalProducts = filteredResults.length;
            const numPage = Math.ceil(totalProducts / limit);
    
            res.render("TrangChu/layouts/SearchSP/searchShopNuocHoa.ejs", {
                hoten, logIn, active,
                formatCurrency, getRelativeImagePath, rootPath: '/', 
                soTrang: numPage, 
                curPage: page, 
                all: slicedResults,
                searchSPSession: req.session.tenSPSearch || '',
                tenloaiNHSession: '',
                giaSPSession: '',
                loaiSPNamNu,
                convertPriceRange,
                loaiSP, tongSL
            })
            
        } else if(tenloaiNH && giaSP) {
            
            const loaiSPNamNu = await LoaiSPNamNu.find().exec();

            let giaRange = giaSP.split('-');
            console.log("gia value: ". giaRange);

            let minPrice = parseInt(giaRange[0]) * 1000; // chuyển 100k thành 100000
            let maxPrice = parseInt(giaRange[1]) * 1000; // chuyển 5M thành 5000000

            console.log(" minPrice: ", minPrice + "\n maxPrice: ", maxPrice);

            const all = await SanPham.find({
                IdNam_Nu: tenloaiNH,
                GiaBan: {
                    $gte: minPrice,
                    $lte: maxPrice
                }
            }).populate('IdLoaiSP').populate('IdNam_Nu').exec();
            
    
            // Lọc kết quả bằng cách sử dụng filter
            const filteredResults = all.filter(product => product.IdLoaiSP && (product.IdLoaiSP.TenLoaiSP !== "Avatar"));
    
            // Áp dụng skip và limit sau khi đã lọc
            const startIndex = skip;
            const endIndex = startIndex + limit;
            const slicedResults = filteredResults.slice(startIndex, endIndex);
    
            // Tính toán tổng số trang
            const totalProducts = filteredResults.length;
            const numPage = Math.ceil(totalProducts / limit);
    
            res.render("TrangChu/layouts/SearchSP/searchShopNuocHoa.ejs", {
                hoten, logIn, active,
                formatCurrency, getRelativeImagePath, rootPath: '/', convertPriceRange,
                soTrang: numPage, 
                curPage: page, 
                all: slicedResults,
                searchSPSession: req.session.tenSPSearch || '',
                tenloaiNHSession: req.session.tenloaiNH || '',
                giaSPSession: req.session.giaSP || '',
                loaiSPNamNu, loaiSP, tongSL
            })
        } else {
            // Trường hợp không xác định được tiêu chí tìm kiếm
            const all = await SanPham.find({TenSP: { $regex: new RegExp(tenSPSearch, 'i') }}).populate('IdLoaiSP').populate('IdNam_Nu').exec();
            const loaiSPNamNu = await LoaiSPNamNu.find().exec();

            // Lọc kết quả bằng cách sử dụng filter
            const filteredResults = all.filter(product => product.IdLoaiSP && (product.IdLoaiSP.TenLoaiSP !== "Avatar"));

            // Áp dụng skip và limit sau khi đã lọc
            const startIndex = skip;
            const endIndex = startIndex + limit;
            const slicedResults = filteredResults.slice(startIndex, endIndex);

            // Tính toán tổng số trang
            const totalProducts = filteredResults.length;
            const numPage = Math.ceil(totalProducts / limit);

            res.render("TrangChu/layouts/SearchSP/searchShopNuocHoa.ejs", {
                hoten, logIn, active,
                formatCurrency, getRelativeImagePath, rootPath: '/', 
                soTrang: numPage, 
                curPage: page, 
                all: slicedResults,
                searchSPSession: req.session.tenSPSearch || '',
                tenloaiNHSession: '',
                giaSPSession: '',
                loaiSPNamNu, convertPriceRange, loaiSP, tongSL
            })
        }        
    },
}