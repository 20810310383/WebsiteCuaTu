require("dotenv").config();
const mongoose = require("mongoose");
let dbConnection = null;

const dbState = [
  { value: 0, label: "disconnected" },
  { value: 1, label: "connected" },
  { value: 2, label: "connecting" },
  { value: 3, label: "disconnecting" },
];

const connection = async () => {
 if(!dbConnection){
    try {
        const user = process.env.DB_USER;
        const pass = process.env.DB_PASSWORD;
        const dbName = process.env.DB_NAME;
        // const options = {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     minPoolSize: 1,
        //     maxPoolSize: 50,
        //   }
        mongoose.connect(
          `mongodb://${user}:${pass}@127.0.0.1/${dbName}?authSource=admin`
        );
     dbConnection = mongoose.connection;
        // const state = Number(mongoose.connection.readyState);
        // console.log(dbState.find((f) => f.value === state).label, "to db"); 
        console.log('MongoDB connected!');
      } catch (error) {
        console.log(">> error connection DB: ", error);
      }
      return dbConnection
 }
};

module.exports = connection;
