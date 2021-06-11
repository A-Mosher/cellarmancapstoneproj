const { Product, validate } = require('../models/product');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const product = new Product({
            name: req.body.name,
            style: req.body.style,
            tank: req.body.tank,
            yeast: req.body.yeast,
            additions: req.body.additions,
            gravity: req.body.gravity,
            temperature: req.body.temperature,
            pH: req.body.pH,
        });

        await product.save();

        return res.send(product);

    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;