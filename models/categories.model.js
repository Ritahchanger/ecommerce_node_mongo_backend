const mongoose = required("mongoose");

const validCategories = ['Mercedez Benz','BMW','Audi','Lexus','Tesla'];

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        enum:validCategories,
    },
    description:{
        type:String,
    }
})

const Category = mongoose.Schema('Category',categorySchema);

module.exports=Category;