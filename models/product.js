const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 100 },
    style: { type: String, required: true, minlength: 2, maxlength: 100 },
    tank: { type: String, required: true, minlength: 2, maxlength: 100 },
    yeast: { type: String },
    additions: { type: String },
    gravity: { type: Number, required: true },
    temperature: { type: Number, required: true },
    pH: { type: Number, required: true },
    brewOrBlendDate: { type: Date, default: Date.now },

});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        style: Joi.string().min(2).max(100).required(),
        tank: Joi.string().min(2).max(100).required(),
        yeast: Joi.string(),
        additions: Joi.string(),
        gravity: Joi.number().required(),
        temperature: Joi.number().required(),
        pH: Joi.number().required(),
    });
    return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
exports.productSchema = productSchema;