const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log(`{message:database connected successfully}`);
    }catch(error){
        console.log(`message:${error.message}`);
        process.exit(1);
    }
}
module.exports = connectDB;