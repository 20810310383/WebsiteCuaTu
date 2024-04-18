require('dotenv').config();
const express = require('express')
const configViewEngine = require('./config/viewEngine');
const homeRoutes = require('./routes/homeRouter');
const homeAPIRoutes = require('./routes/homeAPI');

const connection = require('./config/database');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { MongoClient } = require('mongodb');
const cookieParser = require("cookie-parser");
const session = require('express-session');

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const { v4: uuidv4 } = require('uuid');

// default options
app.use(fileUpload());
configViewEngine(app);

const oneDay = 1000 * 60 * 60 * 24;     // lưu phiên trong 1 ngày
app.use(session({
    genid: function(req) {
        // return new Date().getTime()
        return uuidv4(); // Sử dụng UUID v4 để sinh giá trị duy nhất cho phiên
    },
    secret: 'secret-key',  // Chuỗi bí mật để mã hóa phiên
    saveUninitialized: true,
    cookie: { 
        maxAge: oneDay, 
    },     // đặt thời gian hết hạn của cookie
    resave: true  
}));
app.use(cookieParser());

  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// khai bao route
app.use('/', homeRoutes);
app.use('/api/v1/', homeAPIRoutes);

// -------  đoạn này là config chạy đẩy hosting lên domain
connection()
//test connection
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`ĐÃ CHẠY ...   >>>  http://localhost:${port}`)
  });


// ------- đoạn dưới là connect db làm như bthg khi chạy docker
//test connection
// (async () => {
//     try {
//         // using mongoose
//         await connection()
//         app.listen(port, hostname, () => {
//             console.log(`http://localhost:${port}`)
//         })
//     } catch(error) {
//         console.log(">>> LỖI RỒI CỤ: ", error);
//     }  
// })();

//     app.listen(port, hostname, () => {
//             console.log(`http://localhost:${port}`)
//         })
//     } catch(error) {
//         console.log(">>> LỖI RỒI CỤ: ", error);
//     }  
// })();