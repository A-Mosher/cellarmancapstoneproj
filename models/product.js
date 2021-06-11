const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 255 },
    style: { type: String, required: true, minlength: 2, maxlength: 255 },
    tank: { type: String, required: true, minlength: 2, maxlength: 255 },
    yeast: { type: String },
    additions: { type: String },
    gravity: { type: Number, required: true },
    temperature: { type: Number, required: true },
    pH: { type: Number, required: true },
    brewOrBlendDate: { type: Date, default: Date.now },

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;