const { Product, validate } = require('../models/product');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        return res.send(products);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
        
        return res.send(product);

    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

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
            fermStatus: req.body.fermStatus,
            notes: req.body.notes,
        });

        await product.save();

        return res.send(product);

    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                style: req.body.style,
                tank: req.body.tank,
                yeast: req.body.yeast,
                additions: req.body.additions,
                gravity: req.body.gravity,
                temperature: req.body.temperature,
                pH: req.body.pH,
                fermStatus: req.body.fermStatus,
                packageStatus: req.body.packageStatus,
                notes: req.body.notes,
            },
            { new: true }
        );

        if (!product)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

        await product.save();

        return res.send(product);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const product = await Product.findByIdAndRemove(req.params.id);

        if (!product)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

        return res.send(product);

    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;