// rút gọn file ảnh chỉ lấy tên ảnh, ví dụ: abc.png
function getRelativeImagePath(absolutePath) {
    const rootPath = '<%= rootPath.replace(/\\/g, "\\\\") %>';
    const relativePath = absolutePath ? absolutePath.replace(rootPath, '').replace(/\\/g, '/').replace(/^\/?images\/upload\//, '') : '';
    return relativePath;
}

// format tiền tệ
function formatCurrency(amount) {
return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}       

// rút gọn mã HD
function rutGonMa(hexString ) {
    const shortenedHex = hexString.substring(hexString.length - 10);
    return shortenedHex;
}

// Đoạn mã JavaScript để chuyển đổi HTML thành văn bản
function convertHtml(html) {
    const $ = cheerio.load(html);
    return $('body').text();
}