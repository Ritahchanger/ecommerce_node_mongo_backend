const mongoose = require("mongoose");

const validCategories = ['Mercedez Benz', 'BMW', 'Audi', 'Lexus', 'Tesla'];

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: validCategories,
    },
    description: {
        type: String,
    }
});
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
